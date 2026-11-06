// Storage adapter. Switch providers with env vars only:
//   NEXT_PUBLIC_STORAGE_PROVIDER = "supabase" (default) | "r2"
//   NEXT_PUBLIC_MEDIA_BASE_URL   = public base URL for media (required for r2, e.g. https://media.example.com)
//   r2 server-side: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET
import { createClient } from "./supabase";

export const PROVIDER = process.env.NEXT_PUBLIC_STORAGE_PROVIDER || "supabase";
export const BUCKET = "media";
export const MAX_BYTES = PROVIDER === "r2" ? 500 * 1024 * 1024 : 50 * 1024 * 1024;

export function publicUrl(key) {
  if (!key) return null;
  if (/^https?:\/\//.test(key)) return key;
  const base = process.env.NEXT_PUBLIC_MEDIA_BASE_URL;
  if (base) return `${base.replace(/\/$/, "")}/${key}`;
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${key}`;
}

// Uploads straight from the browser. Returns the storage key.
export async function uploadFile(file, key, onProgress) {
  if (PROVIDER === "r2") {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch("/api/upload-url", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${session?.access_token || ""}` },
      body: JSON.stringify({ key, contentType: file.type, size: file.size }),
    });
    if (!res.ok) throw new Error((await res.json()).error || "Could not get upload link");
    const { url } = await res.json();
    await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", url);
      xhr.setRequestHeader("content-type", file.type);
      xhr.upload.onprogress = (e) => e.lengthComputable && onProgress?.(e.loaded / e.total);
      xhr.onload = () => (xhr.status < 300 ? resolve() : reject(new Error(`Upload failed (${xhr.status})`)));
      xhr.onerror = () => reject(new Error("Network error during upload"));
      xhr.send(file);
    });
    return key;
  }
  const supabase = createClient();
  onProgress?.(0.05);
  const { error } = await supabase.storage.from(BUCKET).upload(key, file, { upsert: false, contentType: file.type });
  if (error) throw error;
  onProgress?.(1);
  return key;
}

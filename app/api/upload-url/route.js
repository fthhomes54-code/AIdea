import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const ALLOWED = /^(image\/(jpeg|png|webp|gif)|video\/(mp4|webm|quicktime))$/;

// Signs a one-time direct-upload URL for Cloudflare R2. Only used when NEXT_PUBLIC_STORAGE_PROVIDER=r2.
export async function POST(req) {
  const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET } = process.env;
  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET)
    return NextResponse.json({ error: "R2 not configured" }, { status: 501 });
  const token = (req.headers.get("authorization") || "").replace("Bearer ", "");
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const { data: { user } } = await sb.auth.getUser(token);
  if (!user) return NextResponse.json({ error: "Sign in first" }, { status: 401 });
  const { key, contentType, size } = await req.json();
  if (!key?.startsWith(`${user.id}/`) || key.includes("..")) return NextResponse.json({ error: "Bad key" }, { status: 400 });
  if (!ALLOWED.test(contentType || "")) return NextResponse.json({ error: "File type not allowed" }, { status: 400 });
  if (!(size > 0 && size <= 500 * 1024 * 1024)) return NextResponse.json({ error: "Max 500 MB" }, { status: 400 });
  const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
  });
  const url = await getSignedUrl(s3, new PutObjectCommand({ Bucket: R2_BUCKET, Key: key, ContentType: contentType, ContentLength: size }), { expiresIn: 900 });
  return NextResponse.json({ url });
}

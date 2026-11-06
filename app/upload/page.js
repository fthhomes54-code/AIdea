"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import { createClient } from "@/lib/supabase";
import { uploadFile, MAX_BYTES } from "@/lib/storage";
import { TAGS } from "@/lib/supabase";

const ACCEPT = "image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime";

function grabFrame(file) {
  return new Promise((resolve) => {
    const v = document.createElement("video");
    v.preload = "metadata"; v.muted = true; v.playsInline = true;
    v.src = URL.createObjectURL(file);
    v.onloadedmetadata = () => { v.currentTime = Math.min(1, (v.duration || 2) / 2); };
    v.onseeked = () => {
      const c = document.createElement("canvas");
      const w = Math.min(1280, v.videoWidth || 1280);
      c.width = w; c.height = Math.round(w * ((v.videoHeight || 720) / (v.videoWidth || 1280)));
      c.getContext("2d").drawImage(v, 0, 0, c.width, c.height);
      c.toBlob((b) => resolve({ blob: b, duration: Math.round(v.duration || 0) }), "image/jpeg", 0.85);
    };
    v.onerror = () => resolve({ blob: null, duration: null });
  });
}

export default function UploadPage() {
  const router = useRouter();
  const [user, setUser] = useState(undefined);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [custom, setCustom] = useState("");
  const [nsfw, setNsfw] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      if (!data.user) router.replace("/signup"); else setUser(data.user);
    });
  }, [router]);

  const pick = (f) => {
    if (!f) return;
    if (f.size > MAX_BYTES) { setStatus(`That file is over ${Math.round(MAX_BYTES / 1048576)} MB.`); return; }
    setStatus(""); setFile(f); setPreview(URL.createObjectURL(f));
    if (!title) setTitle(f.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ").slice(0, 80));
  };

  const post = async () => {
    if (!file || !title.trim()) return;
    setBusy(true); setStatus("Uploading…");
    try {
      const isVideo = file.type.startsWith("video/");
      const ext = (file.name.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
      const id = crypto.randomUUID();
      const key = `${user.id}/${id}.${ext}`;
      await uploadFile(file, key, setProgress);
      let thumbKey = null, duration = null;
      if (isVideo) {
        const { blob, duration: d } = await grabFrame(file);
        duration = d;
        if (blob) { thumbKey = `${user.id}/${id}-thumb.jpg`; await uploadFile(new File([blob], "thumb.jpg", { type: "image/jpeg" }), thumbKey); }
      }
      const allTags = [...new Set([...tags, ...custom.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean)])].slice(0, 10);
      const { data, error } = await createClient().from("posts").insert({
        author_id: user.id, media_type: isVideo ? "video" : "art", title: title.trim().slice(0, 120),
        caption: title.trim().slice(0, 120), media_url: key, storage_key: key, thumb_key: thumbKey,
        thumbnail_url: thumbKey || (isVideo ? null : key), tags: allTags, nsfw, duration_s: duration, size_bytes: file.size,
      }).select("id").single();
      if (error) throw error;
      router.push(`/v/${data.id}`);
    } catch (e) { setStatus(e.message || "Upload failed"); setBusy(false); }
  };

  if (!user) return <AppShell />;
  return (
    <AppShell>
      <div className="max-w-xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Upload</h1>
        <label className="glass rounded-xl flex flex-col items-center justify-center aspect-video cursor-pointer overflow-hidden mb-4"
          onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); pick(e.dataTransfer.files[0]); }}>
          {preview ? (file.type.startsWith("video/") ? <video src={preview} className="w-full h-full object-contain" controls muted /> : <img src={preview} alt="" className="w-full h-full object-contain" />)
            : <><span className="text-lg font-medium">Tap to pick a video or image</span><span className="text-xs text-muted mt-1">MP4, WebM, MOV, JPG, PNG, WebP, GIF · up to {Math.round(MAX_BYTES / 1048576)} MB</span></>}
          <input type="file" accept={ACCEPT} className="hidden" onChange={(e) => pick(e.target.files[0])} />
        </label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" maxLength={120}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:border-blue" />
        <div className="flex flex-wrap gap-1.5 mb-3">
          {TAGS.map((t) => (
            <button key={t} onClick={() => setTags(tags.includes(t) ? tags.filter((x) => x !== t) : [...tags, t])}
              className={`px-3 py-1 rounded-full text-xs ${tags.includes(t) ? "bg-blue text-white" : "bg-white/5 text-muted"}`}>{t}</button>
          ))}
        </div>
        <input value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="More tags, comma separated"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:border-blue" />
        <label className="flex items-center gap-2 text-sm text-muted mb-5">
          <input type="checkbox" checked={nsfw} onChange={(e) => setNsfw(e.target.checked)} /> Adult content (18+)
        </label>
        {busy && <div className="h-1.5 bg-white/10 rounded-full mb-3 overflow-hidden"><div className="h-full bg-blue transition-all" style={{ width: `${Math.round(progress * 100)}%` }} /></div>}
        <button disabled={busy || !file || !title.trim()} onClick={post} className="w-full bg-blue hover:bg-blue-600 disabled:opacity-50 text-white rounded-full py-2.5 font-medium">
          {busy ? "Posting…" : "Post"}
        </button>
        {status && <p className="text-sm mt-3 text-gold">{status}</p>}
      </div>
    </AppShell>
  );
}

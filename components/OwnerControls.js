"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function OwnerControls({ post }) {
  const [mine, setMine] = useState(false);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(post.title || "");
  const [tags, setTags] = useState((post.tags || []).join(", "));
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => setMine(!!data.user && data.user.id === post.author_id));
  }, [post.author_id]);
  if (!mine) return null;

  const save = async () => {
    setBusy(true); setMsg("");
    const t = title.trim().slice(0, 120);
    const tg = [...new Set(tags.split(/[,\s]+/).map((x) => x.trim().replace(/^#+/, "").toLowerCase()).filter(Boolean))].slice(0, 10);
    const { error } = await createClient().from("posts").update({ title: t, caption: t, tags: tg }).eq("id", post.id);
    setBusy(false);
    if (error) return setMsg(error.message);
    setEditing(false); window.location.reload();
  };
  const remove = async () => {
    if (!confirm("Delete this post for good? This can't be undone.")) return;
    setBusy(true); setMsg("");
    const sb = createClient();
    const keys = [post.storage_key, post.thumb_key].filter((k) => k && !/^https?:/.test(k));
    const { error } = await sb.from("posts").delete().eq("id", post.id);
    if (error) { setBusy(false); return setMsg(error.message); }
    if (keys.length) await sb.storage.from("media").remove(keys);
    window.location.href = "/profile";
  };

  return (
    <div className="mt-4 border border-white/10 rounded-xl p-3 text-sm">
      {editing ? (
        <div className="space-y-2">
          <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} placeholder="Title" className="w-full bg-white/5 rounded-lg px-3 py-2" />
          <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags, separated by commas" className="w-full bg-white/5 rounded-lg px-3 py-2" />
          <div className="flex gap-2">
            <button disabled={busy || !title.trim()} onClick={save} className="px-3 py-1.5 rounded-lg bg-blue text-white disabled:opacity-50">Save</button>
            <button disabled={busy} onClick={() => setEditing(false)} className="px-3 py-1.5 rounded-lg bg-white/10">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <span className="text-gray-400 mr-auto">Your post</span>
          <button disabled={busy} onClick={() => setEditing(true)} className="px-3 py-1.5 rounded-lg bg-white/10">Edit</button>
          <button disabled={busy} onClick={remove} className="px-3 py-1.5 rounded-lg bg-red-600/80 text-white">Delete</button>
        </div>
      )}
      {msg && <p className="text-red-400 mt-2">{msg}</p>}
    </div>
  );
}

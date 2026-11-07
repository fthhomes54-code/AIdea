"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import ReportButton from "./ReportButton";

export default function Comments({ postId }) {
  const [me, setMe] = useState(null);
  const [list, setList] = useState([]);
  const [body, setBody] = useState("");
  const [err, setErr] = useState("");
  const load = async () => {
    const { data } = await createClient().from("comments").select("id,body,created_at,author_id,profiles!comments_author_id_fkey(username,display_name)").eq("post_id", postId).order("created_at", { ascending: false }).limit(100);
    setList(data || []);
  };
  useEffect(() => { createClient().auth.getUser().then(({ data }) => setMe(data.user || null)); load(); }, [postId]);
  const post = async () => {
    const text = body.trim();
    if (!text) return;
    setErr("");
    const { error } = await createClient().from("comments").insert({ post_id: postId, author_id: me.id, body: text.slice(0, 1000) });
    if (error) return setErr(error.message);
    setBody(""); load();
  };
  const del = async (id) => { await createClient().from("comments").delete().eq("id", id); load(); };
  return (
    <section className="mt-6">
      <h2 className="text-sm font-semibold mb-3">{list.length} comments</h2>
      {me ? (
        <div className="flex gap-2 mb-4">
          <input value={body} onChange={(e) => setBody(e.target.value)} onKeyDown={(e) => e.key === "Enter" && post()} maxLength={1000} placeholder="Add a comment"
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue" />
          <button onClick={post} disabled={!body.trim()} className="bg-blue disabled:opacity-50 text-white px-4 rounded-full text-sm">Post</button>
        </div>
      ) : <Link href="/signup" className="block text-sm text-blue mb-4">Sign up to comment</Link>}
      {err && <p className="text-xs text-gold mb-3">{err}</p>}
      <div className="space-y-3">
        {list.map((c) => (
          <div key={c.id} className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue to-gold flex items-center justify-center text-[10px] font-bold shrink-0">{(c.profiles?.display_name || c.profiles?.username || "U").slice(0, 2).toUpperCase()}</div>
            <div className="min-w-0 flex-1">
              <div className="text-xs"><Link href={`/u/${c.profiles?.username}`} className="font-medium">@{c.profiles?.username}</Link> <span className="text-muted">{new Date(c.created_at).toLocaleDateString()}</span></div>
              <p className="text-sm text-gray-300 break-words">{c.body}</p>
              <div className="flex gap-3 mt-0.5">
                {me?.id === c.author_id ? <button onClick={() => del(c.id)} className="text-[11px] text-muted hover:text-white">Delete</button> : <ReportButton commentId={c.id} small />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

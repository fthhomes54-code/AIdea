"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import { createClient } from "@/lib/supabase";

export default function AdminReports() {
  const [ok, setOk] = useState(undefined);
  const [rows, setRows] = useState([]);
  const [tab, setTab] = useState("open");
  const load = async (t = tab) => {
    const { data } = await createClient().from("reports")
      .select("id,reason,status,created_at,post_id,comment_id,posts(id,title,status),comments(id,body,post_id),profiles!reports_reporter_id_fkey(username)")
      .eq("status", t).order("created_at", { ascending: false }).limit(200);
    setRows(data || []);
  };
  useEffect(() => {
    createClient().rpc("is_admin").then(({ data }) => { setOk(!!data); if (data) load(); });
  }, []);
  const act = async (r, action) => {
    const sb = createClient();
    if (r.post_id && (action === "hide" || action === "remove" || action === "restore"))
      await sb.from("posts").update({ status: action === "hide" ? "hidden" : action === "remove" ? "removed" : "live" }).eq("id", r.post_id);
    if (r.comment_id && action === "remove") await sb.from("comments").delete().eq("id", r.comment_id);
    await sb.from("reports").update({ status: action === "dismiss" || action === "restore" ? "dismissed" : "actioned" }).eq("id", r.id);
    load();
  };
  if (ok === undefined) return <AppShell><div className="p-6 text-sm text-muted">Loading…</div></AppShell>;
  if (!ok) return <AppShell><div className="p-6 text-sm text-muted">Admins only.</div></AppShell>;
  return (
    <AppShell>
      <div className="px-4 sm:px-6 py-5">
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-xl font-bold mr-3">Reports</h1>
          {["open", "actioned", "dismissed"].map((t) => (
            <button key={t} onClick={() => { setTab(t); load(t); }} className={`px-3 py-1 rounded-full text-xs ${tab === t ? "bg-white text-black" : "bg-white/5 text-muted"}`}>{t}</button>
          ))}
        </div>
        <div className="divide-y divide-white/5 glass rounded-xl">
          {rows.map((r) => (
            <div key={r.id} className="p-3 flex flex-wrap items-center gap-3 text-sm">
              <span className="px-2 py-0.5 rounded-full bg-red-600/30 text-xs">{r.reason}</span>
              <div className="flex-1 min-w-0">
                {r.posts ? <Link href={`/v/${r.posts.id}`} className="font-medium hover:underline">{r.posts.title || "Untitled"}</Link>
                  : r.comments ? <span>Comment: “{r.comments.body}”</span> : <span className="text-muted">Deleted</span>}
                <div className="text-xs text-muted">by @{r.profiles?.username} · {new Date(r.created_at).toLocaleString()}{r.posts ? ` · post is ${r.posts.status}` : ""}</div>
              </div>
              {tab === "open" && (
                <div className="flex gap-1.5">
                  {r.post_id && <button onClick={() => act(r, "hide")} className="text-xs px-3 py-1 rounded-full glass">Hide</button>}
                  <button onClick={() => act(r, "remove")} className="text-xs px-3 py-1 rounded-full bg-red-600 text-white">Remove</button>
                  {r.post_id && r.posts?.status !== "live" && <button onClick={() => act(r, "restore")} className="text-xs px-3 py-1 rounded-full glass">Restore</button>}
                  <button onClick={() => act(r, "dismiss")} className="text-xs px-3 py-1 rounded-full glass">Dismiss</button>
                </div>
              )}
            </div>
          ))}
          {!rows.length && <div className="p-4 text-sm text-muted">No {tab} reports.</div>}
        </div>
      </div>
    </AppShell>
  );
}

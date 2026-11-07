"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import { createClient } from "@/lib/supabase";
import { uploadFile } from "@/lib/storage";

export default function Settings() {
  const router = useRouter();
  const [p, setP] = useState(null);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    const sb = createClient();
    sb.auth.getUser().then(async ({ data }) => {
      if (!data.user) return router.replace("/login");
      const { data: prof } = await sb.from("profiles").select("id,username,display_name,bio,avatar_url,show_adult").eq("id", data.user.id).maybeSingle();
      setP(prof);
    });
  }, [router]);
  if (!p) return <AppShell><div className="p-6 text-sm text-muted">Loading…</div></AppShell>;
  const set = (k) => (e) => setP({ ...p, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  const save = async () => {
    setMsg("");
    const username = p.username.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 30);
    const { error } = await createClient().from("profiles").update({ username, display_name: p.display_name, bio: p.bio, show_adult: p.show_adult, avatar_url: p.avatar_url }).eq("id", p.id);
    setMsg(error ? (error.code === "23505" ? "That username is taken." : error.message) : "Saved.");
  };
  const avatar = async (f) => {
    if (!f) return;
    const key = `${p.id}/avatar-${Date.now()}.${(f.name.split(".").pop() || "jpg").toLowerCase()}`;
    try { await uploadFile(f, key); setP({ ...p, avatar_url: key }); setMsg("Photo uploaded — tap Save."); } catch (e) { setMsg(e.message); }
  };
  const signOut = async () => { await createClient().auth.signOut(); window.location.href = "/"; };
  const field = "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue";
  return (
    <AppShell>
      <div className="max-w-lg px-4 sm:px-6 py-6 space-y-4">
        <h1 className="text-xl font-bold">Settings</h1>
        <label className="block text-xs text-muted">Profile photo<input type="file" accept="image/*" onChange={(e) => avatar(e.target.files[0])} className="block mt-1 text-sm" /></label>
        <label className="block text-xs text-muted">Username<input value={p.username} onChange={set("username")} className={field + " mt-1"} /></label>
        <label className="block text-xs text-muted">Display name<input value={p.display_name || ""} onChange={set("display_name")} className={field + " mt-1"} /></label>
        <label className="block text-xs text-muted">Bio<textarea value={p.bio || ""} onChange={set("bio")} rows={3} className={field + " mt-1"} /></label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!p.show_adult} onChange={set("show_adult")} /> Show adult (18+) content — I am 18 or older</label>
        <div className="flex gap-2">
          <button onClick={save} className="bg-blue hover:bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium">Save</button>
          <button onClick={signOut} className="glass px-5 py-2 rounded-full text-sm">Sign out</button>
        </div>
        {msg && <p className="text-sm text-gold">{msg}</p>}
      </div>
    </AppShell>
  );
}

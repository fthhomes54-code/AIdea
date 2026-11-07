"use client";
import { useState } from "react";
import { Flag } from "lucide-react";
import { createClient } from "@/lib/supabase";

const REASONS = [
  ["spam", "Spam"], ["adult_untagged", "Adult, not tagged"], ["hate", "Hate or threats"], ["minors", "Involves minors"],
  ["copyright", "Copyright"], ["deepfake", "Deepfake of a real person"], ["other", "Other"],
];

export default function ReportButton({ postId, commentId, small }) {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const send = async (reason) => {
    const sb = createClient();
    const { data: { user } } = await sb.auth.getUser();
    if (!user) { window.location.href = "/signup"; return; }
    const { error } = await sb.from("reports").insert({ reporter_id: user.id, post_id: postId || null, comment_id: commentId || null, reason });
    setMsg(error ? (error.code === "23505" ? "Already reported." : error.message) : "Reported. Thanks.");
    setOpen(false);
  };
  if (msg) return <span className="text-xs text-muted">{msg}</span>;
  return (
    <span className="relative">
      <button onClick={() => setOpen(!open)} className={`flex items-center gap-1 text-muted hover:text-white ${small ? "text-[11px]" : "text-xs px-3 py-1.5 rounded-full glass"}`}>
        <Flag className="w-3.5 h-3.5" /> Report
      </button>
      {open && (
        <div className="absolute z-20 right-0 mt-1 w-52 glass rounded-lg p-1 bg-[#14141c]">
          {REASONS.map(([v, l]) => <button key={v} onClick={() => send(v)} className="block w-full text-left text-xs px-3 py-1.5 rounded hover:bg-white/10">{l}</button>)}
        </div>
      )}
    </span>
  );
}

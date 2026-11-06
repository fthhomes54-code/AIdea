"use client";
import { useState } from "react";

const OUT = [
  { name: "Facebook", color: "bg-blue-600", url: (u) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}` },
  { name: "X", color: "bg-black border border-gray-700", url: (u, t) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}` },
  { name: "WhatsApp", color: "bg-green-600", url: (u, t) => `https://wa.me/?text=${encodeURIComponent(t + " " + u)}` },
  { name: "Telegram", color: "bg-sky-600", url: (u, t) => `https://t.me/share/url?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}` },
  { name: "Reddit", color: "bg-orange-600", url: (u, t) => `https://www.reddit.com/submit?url=${encodeURIComponent(u)}&title=${encodeURIComponent(t)}` },
];

export default function ShareBar({ title, creator }) {
  const [copied, setCopied] = useState(false);
  const text = `Watch "${title}"${creator ? ` by ${creator}` : ""} on AIdea`;
  const open = (p) => window.open(p.url(window.location.href, text), "_blank", "width=600,height=500");
  const copy = async () => { await navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="flex flex-wrap gap-1.5">
      {OUT.map((p) => <button key={p.name} onClick={() => open(p)} className={`text-xs px-3 py-1.5 rounded-full text-white ${p.color}`}>{p.name}</button>)}
      <button onClick={copy} className="text-xs px-3 py-1.5 rounded-full glass">{copied ? "Copied" : "Copy link (Instagram, TikTok)"}</button>
    </div>
  );
}

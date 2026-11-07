"use client";
import { useState } from "react";
const SITES = [
  { name: "X", cls: "bg-black border border-gray-700", url: (u, t) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}` },
  { name: "Facebook", cls: "bg-blue-600", url: (u) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}` },
  { name: "Reddit", cls: "bg-orange-600", url: (u, t) => `https://www.reddit.com/submit?url=${encodeURIComponent(u)}&title=${encodeURIComponent(t)}` },
  { name: "Pinterest", cls: "bg-red-700", url: (u, t) => `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(u)}&description=${encodeURIComponent(t)}` },
  { name: "LinkedIn", cls: "bg-sky-700", url: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}` },
  { name: "WhatsApp", cls: "bg-green-600", url: (u, t) => `https://wa.me/?text=${encodeURIComponent(t + " " + u)}` },
];
// Share a post anywhere, or download the original and open the YouTube/TikTok/Instagram uploaders.
export default function CrossPost({ url, title, fileUrl, isVideo }) {
  const [copied, setCopied] = useState(false);
  const text = `${title} on AIdea`;
  const open = (u) => window.open(u, "_blank", "noopener,width=640,height=560");
  return (
    <div className="mt-4 glass rounded-xl p-4">
      <div className="text-sm font-semibold mb-2">Share or cross-post</div>
      <div className="flex flex-wrap gap-2">
        {SITES.map((s) => <button key={s.name} onClick={() => open(s.url(url, text))} className={`text-xs px-3 py-1.5 rounded-full text-white ${s.cls}`}>{s.name}</button>)}
        <button onClick={async () => { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="text-xs px-3 py-1.5 rounded-full bg-white/10">{copied ? "Copied" : "Copy link"}</button>
      </div>
      {fileUrl && (
        <div className="flex flex-wrap gap-2 mt-3 items-center">
          <a href={fileUrl} download target="_blank" className="text-xs px-3 py-1.5 rounded-full bg-white text-black font-medium">Download original</a>
          {isVideo && <button onClick={() => open("https://www.youtube.com/upload")} className="text-xs px-3 py-1.5 rounded-full bg-red-600 text-white">Upload to YouTube</button>}
          <button onClick={() => open("https://www.tiktok.com/upload")} className="text-xs px-3 py-1.5 rounded-full bg-black border border-gray-700 text-white">TikTok</button>
          <button onClick={() => open("https://www.instagram.com/")} className="text-xs px-3 py-1.5 rounded-full bg-pink-600 text-white">Instagram</button>
          <span className="text-[11px] text-muted">Download, then upload it on the other site.</span>
        </div>
      )}
    </div>
  );
}

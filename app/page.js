"use client";

import { useState } from "react";
import {
  Sparkles,
  Play,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Search,
} from "lucide-react";

const OUTBOUND_SHARE = [
  { name: "Facebook", color: "bg-blue-600", url: (u) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}` },
  { name: "Instagram", color: "bg-pink-600", url: () => `https://www.instagram.com/` },
  { name: "TikTok", color: "bg-black border border-gray-700", url: () => `https://www.tiktok.com/` },
  { name: "YouTube", color: "bg-red-600", url: () => `https://www.youtube.com/` },
  { name: "X", color: "bg-black border border-gray-700", url: (u, t) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}` },
  { name: "WhatsApp", color: "bg-green-600", url: (u, t) => `https://wa.me/?text=${encodeURIComponent(t + " " + u)}` },
];

const VIDEOS = [
  { id: 1, title: "Neon City Chase", creator: "CyberAI", time: "1:42", likes: "842", comments: "56", tag: "Cyberpunk" },
  { id: 2, title: "Anime Battle Sequence", creator: "AnimeForge", time: "0:58", likes: "1.2k", comments: "89", tag: "Anime" },
  { id: 3, title: "Photorealistic Portrait", creator: "RealVision", time: "0:34", likes: "567", comments: "23", tag: "Realistic" },
  { id: 4, title: "Fantasy Dragon Flight", creator: "MythMaker", time: "2:15", likes: "1.8k", comments: "142", tag: "Fantasy" },
  { id: 5, title: "Abstract Light Waves", creator: "AbstractLab", time: "1:08", likes: "321", comments: "17", tag: "Abstract" },
  { id: 6, title: "Cyberpunk Rain Alley", creator: "NeonDream", time: "1:55", likes: "976", comments: "64", tag: "Cyberpunk" },
  { id: 7, title: "AI Music Visualizer", creator: "SoundAI", time: "3:22", likes: "2.1k", comments: "201", tag: "Abstract" },
  { id: 8, title: "Epic Landscape Timelapse", creator: "WorldGen", time: "1:17", likes: "734", comments: "45", tag: "Realistic" },
  { id: 9, title: "Mecha Showdown", creator: "MechaAI", time: "2:40", likes: "1.4k", comments: "98", tag: "Anime" },
];

export default function Home() {
  const [openShare, setOpenShare] = useState(null);
  const [copied, setCopied] = useState(false);

  const share = (platform, video) => {
    const url = `https://aidea.app/v/${video.id}`;
    const text = `Watch \"${video.title}\" by ${video.creator} on AIdea`;
    window.open(platform.url(url, text), "_blank", "width=600,height=400");
  };

  const copyLink = async (video) => {
    await navigator.clipboard.writeText(`https://aidea.app/v/${video.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Nav */}
      <nav className="sticky top-0 z-50 glass border-b border-white/5 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-gold" />
            <span className="text-xl font-bold">AIdea</span>
          </div>
          <div className="flex-1 max-w-md hidden sm:block relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              placeholder="Search AI videos..."
              className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue"
            />
          </div>
          <button className="bg-blue hover:bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Filters */}
      <div className="sticky top-[57px] z-40 bg-[#0a0a0f]/95 backdrop-blur px-4 py-3 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto">
          {["All", "Video", "Art", "Show", "Newest", "Trending"].map((f) => (
            <button
              key={f}
              className="px-4 py-1.5 rounded-full text-sm bg-white/5 hover:bg-white/10 text-muted whitespace-nowrap"
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid — YouTube for AI creators */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VIDEOS.map((video) => (
            <div key={video.id} className="glass rounded-xl overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-blue/30 to-gold/20 cursor-pointer group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur flex items-center justify-center group-hover:scale-105 transition">
                    <Play className="w-7 h-7 text-white fill-white" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 text-xs bg-black/70 px-1.5 py-0.5 rounded">{video.time}</span>
                <span className="absolute top-2 left-2 text-xs bg-blue/80 px-2 py-0.5 rounded-full">{video.tag}</span>
              </div>

              <div className="p-3">
                <div className="flex gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue to-gold flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {video.creator.slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm truncate">{video.title}</div>
                    <div className="text-xs text-muted">{video.creator}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted">
                  <div className="flex gap-3">
                    <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {video.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> {video.comments}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setOpenShare(openShare === video.id ? null : video.id)}>
                      <Share2 className="w-4 h-4" />
                    </button>
                    <Bookmark className="w-4 h-4" />
                  </div>
                </div>

                {openShare === video.id && (
                  <div className="mt-3 pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
                    {OUTBOUND_SHARE.map((p) => (
                      <button
                        key={p.name}
                        onClick={() => share(p, video)}
                        className={`text-[10px] px-2 py-1 rounded-full text-white ${p.color}`}
                      >
                        {p.name}
                      </button>
                    ))}
                    <button
                      onClick={() => copyLink(video)}
                      className="text-[10px] px-2 py-1 rounded-full glass"
                    >
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-white/5 py-6 text-center text-xs text-muted">
        AIdea — Place for AI creators.
      </footer>
    </div>
  );
}
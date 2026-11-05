"use client";

import { useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  Video,
  Tv,
  Share2,
  Sparkles,
  Folder,
  TrendingUp,
  Clock,
  Users,
  Play,
  Heart,
  MessageCircle,
  Bookmark,
  Link as LinkIcon,
  Search,
} from "lucide-react";

const OUTBOUND_SHARE = [
  { name: "Facebook", color: "bg-blue-600 hover:bg-blue-500", url: (u, t) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}` },
  { name: "Instagram", color: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90", url: (u) => `https://www.instagram.com/` },
  { name: "TikTok", color: "bg-black hover:bg-gray-800 border border-gray-700", url: (u) => `https://www.tiktok.com/` },
  { name: "YouTube", color: "bg-red-600 hover:bg-red-500", url: (u) => `https://www.youtube.com/` },
  { name: "X", color: "bg-black hover:bg-gray-800 border border-gray-700", url: (u, t) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}` },
  { name: "WhatsApp", color: "bg-green-600 hover:bg-green-500", url: (u, t) => `https://wa.me/?text=${encodeURIComponent(t + " " + u)}` },
  { name: "Telegram", color: "bg-sky-600 hover:bg-sky-500", url: (u, t) => `https://t.me/share/url?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}` },
  { name: "Reddit", color: "bg-orange-600 hover:bg-orange-500", url: (u, t) => `https://www.reddit.com/submit?url=${encodeURIComponent(u)}&title=${encodeURIComponent(t)}` },
];

const SAMPLE_VIDEOS = [
  { id: 1, title: "Neon City Chase", creator: "CyberAI", time: "1:42", likes: 842, comments: 56, tag: "Cyberpunk" },
  { id: 2, title: "Anime Battle Sequence", creator: "AnimeForge", time: "0:58", likes: 1204, comments: 89, tag: "Anime" },
  { id: 3, title: "Photorealistic Portrait", creator: "RealVision", time: "0:34", likes: 567, comments: 23, tag: "Realistic" },
  { id: 4, title: "Fantasy Dragon Flight", creator: "MythMaker", time: "2:15", likes: 1890, comments: 142, tag: "Fantasy" },
  { id: 5, title: "Abstract Light Waves", creator: "AbstractLab", time: "1:08", likes: 321, comments: 17, tag: "Abstract" },
  { id: 6, title: "Cyberpunk Rain Alley", creator: "NeonDream", time: "1:55", likes: 976, comments: 64, tag: "Cyberpunk" },
  { id: 7, title: "AI Music Visualizer", creator: "SoundAI", time: "3:22", likes: 2103, comments: 201, tag: "Abstract" },
  { id: 8, title: "Epic Landscape Timelapse", creator: "WorldGen", time: "1:17", likes: 734, comments: 45, tag: "Realistic" },
  { id: 9, title: "Mecha Showdown", creator: "MechaAI", time: "2:40", likes: 1456, comments: 98, tag: "Anime" },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [openShare, setOpenShare] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleShare = (platform, video) => {
    const url = `https://aidea.app/v/${video.id}`;
    const text = `Watch \"${video.title}\" by ${video.creator} on AIdea`;
    window.open(platform.url(url, text), "_blank", "width=600,height=400");
  };

  const handleCopy = async (video) => {
    await navigator.clipboard.writeText(`https://aidea.app/v/${video.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filters = ["All", "Video", "Art", "Show", "Newest", "Trending"];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 glass border-b border-white/5 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-gold" />
            <span className="text-xl font-bold">AIdea</span>
          </div>

          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search AI videos, art, shows..."
                className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue"
              />
            </div>
          </div>

          <button className="bg-blue hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload
          </button>
        </div>
      </nav>

      {/* Filters */}
      <div className="sticky top-[60px] z-40 bg-[#0a0a0f]/90 backdrop-blur border-b border-white/5 px-4 py-3">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto pb-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                activeFilter === f
                  ? "bg-blue text-white"
                  : "bg-white/5 text-muted hover:bg-white/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid Feed */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SAMPLE_VIDEOS.map((video) => (
            <div key={video.id} className="glass rounded-xl overflow-hidden group">
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-blue/20 via-purple-900/20 to-gold/20 cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 text-white fill-white" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 text-xs bg-black/70 px-1.5 py-0.5 rounded">
                  {video.time}
                </div>
                <div className="absolute top-2 left-2 text-xs bg-blue/80 px-2 py-0.5 rounded-full">
                  {video.tag}
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <div className="flex items-start gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue to-gold flex-shrink-0 flex items-center justify-center text-xs font-bold">
                    {video.creator.slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm truncate">{video.title}</div>
                    <div className="text-xs text-muted">{video.creator}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {video.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> {video.comments}</span>
                  </div>
                  <button
                    onClick={() => setOpenShare(openShare === video.id ? null : video.id)}
                    className="hover:text-white"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Share menu */}
                {openShare === video.id && (
                  <div className="mt-3 pt-3 border-t border-white/5">
                    <div className="flex flex-wrap gap-1.5">
                      {OUTBOUND_SHARE.slice(0, 6).map((platform) => (
                        <button
                          key={platform.name}
                          onClick={() => handleShare(platform, video)}
                          className={`text-[10px] px-2 py-1 rounded-full text-white ${platform.color}`}
                        >
                          {platform.name}
                        </button>
                      ))}
                      <button
                        onClick={() => handleCopy(video)}
                        className="text-[10px] px-2 py-1 rounded-full glass"
                      >
                        {copied ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-4 text-center text-xs text-muted">
        AIdea — AI creation is the feature, not the liability. No demonetization. No AI penalties.
      </footer>
    </div>
  );
}
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
  {
    id: 1,
    title: "Neon City Chase",
    creator: "CyberAI",
    time: "1:42",
    likes: "842",
    comments: "56",
    tag: "Cyberpunk",
    thumb: "https://videocdn.cdnpk.net/videos/21142582-bdcc-5ec3-a4ab-865713584771/horizontal/thumbnails/large.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 2,
    title: "Anime Battle Sequence",
    creator: "AnimeForge",
    time: "0:58",
    likes: "1.2k",
    comments: "89",
    tag: "Anime",
    thumb: "https://i.ytimg.com/vi/hZE9eR8fFSk/maxresdefault.jpg",
  },
  {
    id: 3,
    title: "Photorealistic Portrait",
    creator: "RealVision",
    time: "0:34",
    likes: "567",
    comments: "23",
    tag: "Realistic",
    thumb: "https://p16-seeyou-useast8.capcutcdn-us.com/tos-useast8-i-2zwwjm3azk-tx2/c807df9a4fcf4d03ae093539523fec3d~tplv-2zwwjm3azk-compress:q75.image",
  },
  {
    id: 4,
    title: "Fantasy Dragon Flight",
    creator: "MythMaker",
    time: "2:15",
    likes: "1.8k",
    comments: "142",
    tag: "Fantasy",
    thumb: "https://leading-kindness-fb9fb04983.media.strapiapp.com/pseo_asset_cb6814ac_6f61_4cbe_978c_d36975689abf_72aa70a671.png",
  },
  {
    id: 5,
    title: "Abstract Light Waves",
    creator: "AbstractLab",
    time: "1:08",
    likes: "321",
    comments: "17",
    tag: "Abstract",
    thumb: "https://cms-assets.youmind.com/media/1793780766211_5fihoz_HWMgxtza0AA-zvq.jpg",
  },
  {
    id: 6,
    title: "Cyberpunk Rain Alley",
    creator: "NeonDream",
    time: "1:55",
    likes: "976",
    comments: "64",
    tag: "Cyberpunk",
    thumb: "https://videocdn.cdnpk.net/videos/1c58bcc8-809a-5d75-ae15-02cf4630658a/horizontal/thumbnails/large.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 7,
    title: "AI Music Visualizer",
    creator: "SoundAI",
    time: "3:22",
    likes: "2.1k",
    comments: "201",
    tag: "Abstract",
    thumb: "https://external-cdn.morphic.com/website-production/images/seo/anime-fight-scenes/scenes/rooftop-katana-duel.jpeg",
  },
  {
    id: 8,
    title: "Epic Landscape Timelapse",
    creator: "WorldGen",
    time: "1:17",
    likes: "734",
    comments: "45",
    tag: "Realistic",
    thumb: "https://cdn.leonardo.ai/users/9db46376-bafd-4edc-9627-bbf333abba79/generations/f67054aa-ade8-423c-bbfd-475ebaecfa38/segments/4:4:1/Lucid_Realism_ultra_realistic_cinematic_youtube_thumbnail_port_3.jpg",
  },
  {
    id: 9,
    title: "Mecha Showdown",
    creator: "MechaAI",
    time: "2:40",
    likes: "1.4k",
    comments: "98",
    tag: "Anime",
    thumb: "https://autoweeb.com/assets/blog_images/storytelling-and-worldbuilding-in-ai-anime-1.jpeg",
  },
];

const SHORTS = VIDEOS.slice(0, 6);

function VideoCard({ video, onShare, openShare, onToggleShare, copied, onCopy }) {
  return (
    <div className="glass rounded-xl overflow-hidden">
      <div
        className="relative aspect-video bg-cover bg-center cursor-pointer group"
        style={{ backgroundImage: `url(${video.thumb})` }}
      >
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur flex items-center justify-center group-hover:scale-105 transition">
            <Play className="w-6 h-6 text-white fill-white" />
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
            <button onClick={() => onToggleShare(video.id)}>
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
                onClick={() => onShare(p, video)}
                className={`text-[10px] px-2 py-1 rounded-full text-white ${p.color}`}
              >
                {p.name}
              </button>
            ))}
            <button
              onClick={() => onCopy(video)}
              className="text-[10px] px-2 py-1 rounded-full glass"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [openShare, setOpenShare] = useState(null);
  const [copied, setCopied] = useState(false);
  const [selectedForShare, setSelectedForShare] = useState(VIDEOS[0]);

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

  const quickShare = (platform) => {
    share(platform, selectedForShare);
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

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Main Feed */}
        <main className="flex-1">
          {/* First row of videos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {VIDEOS.slice(0, 4).map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                openShare={openShare}
                onToggleShare={setOpenShare}
                onShare={share}
                copied={copied}
                onCopy={copyLink}
              />
            ))}
          </div>

          {/* Shorts section — YouTube style break */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="text-red-500">Shorts</span>
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {SHORTS.map((video) => (
                <div key={video.id} className="flex-shrink-0 w-40">
                  <div
                    className="relative aspect-[9/16] rounded-xl overflow-hidden bg-cover bg-center cursor-pointer"
                    style={{ backgroundImage: `url(${video.thumb})` }}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="text-xs font-medium truncate">{video.title}</div>
                      <div className="text-[10px] text-muted">{video.creator}</div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-8 h-8 text-white fill-white opacity-80" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Rest of videos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {VIDEOS.slice(4).map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                openShare={openShare}
                onToggleShare={setOpenShare}
                onShare={share}
                copied={copied}
                onCopy={copyLink}
              />
            ))}
          </div>
        </main>

        {/* Sticky Share Sidebar — always visible on desktop */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-28 glass rounded-xl p-4">
            <div className="text-sm font-medium mb-1">Share to</div>
            <div className="text-xs text-muted mb-3 truncate">{selectedForShare.title}</div>
            <div className="flex flex-col gap-2">
              {OUTBOUND_SHARE.map((p) => (
                <button
                  key={p.name}
                  onClick={() => quickShare(p)}
                  className={`text-xs py-2 rounded-full text-white ${p.color}`}
                >
                  {p.name}
                </button>
              ))}
              <button
                onClick={() => copyLink(selectedForShare)}
                className="text-xs py-2 rounded-full glass"
              >
                {copied ? "Copied" : "Copy Link"}
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile sticky share bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/5 p-3 z-50">
        <div className="flex gap-2 overflow-x-auto">
          {OUTBOUND_SHARE.map((p) => (
            <button
              key={p.name}
              onClick={() => quickShare(p)}
              className={`text-[10px] px-3 py-1.5 rounded-full text-white whitespace-nowrap ${p.color}`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <footer className="border-t border-white/5 py-6 text-center text-xs text-muted pb-16 lg:pb-6">
        AIdea — Place for AI creators.
      </footer>
    </div>
  );
}
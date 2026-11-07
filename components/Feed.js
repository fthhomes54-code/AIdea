"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import { createClient } from "@/lib/supabase";
import { toCard, POST_SELECT } from "@/lib/posts";
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


function VideoCard({ video, onShare, openShare, onToggleShare, copied, onCopy }) {
  return (
    <div className="glass rounded-xl overflow-hidden">
      <Link
        href={video.real ? `/v/${video.id}` : "/signup"}
        className="block relative aspect-video bg-cover bg-center cursor-pointer group"
        style={{ backgroundImage: `url(${video.thumb})` }}
      >
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
        {video.mediaType !== "art" && <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 backdrop-blur flex items-center justify-center group-hover:scale-105 transition">
            <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
          </div>
        </div>}
        <span className="absolute bottom-1.5 right-1.5 text-[10px] sm:text-xs bg-black/70 px-1.5 py-0.5 rounded">{video.time}</span>
        <span className="absolute top-1.5 left-1.5 text-[10px] sm:text-xs bg-blue/80 px-1.5 py-0.5 rounded-full">{video.tag}</span>
      </Link>

      <div className="p-2 sm:p-3">
        <div className="flex gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue to-gold flex items-center justify-center text-[10px] sm:text-xs font-bold flex-shrink-0">
            {video.creator.slice(0, 2)}
          </div>
          <div className="min-w-0">
            <div className="font-medium text-xs sm:text-sm truncate">{video.title}</div>
            {video.username ? <Link href={`/u/${video.username}`} className="text-[10px] sm:text-xs text-muted hover:text-white">{video.creator}</Link> : <div className="text-[10px] sm:text-xs text-muted">{video.creator}</div>}
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted">
          <div className="flex gap-2 sm:gap-3">
            <span className="flex items-center gap-0.5"><Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {video.likes}</span>
            <span className="flex items-center gap-0.5"><MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {video.comments}</span>
          </div>
          <div className="flex gap-1.5 sm:gap-2">
            <button onClick={() => onToggleShare(video.id)}>
              <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>

        {openShare === video.id && (
          <div className="mt-2 pt-2 border-t border-white/5 flex flex-wrap gap-1">
            {OUTBOUND_SHARE.map((p) => (
              <button
                key={p.name}
                onClick={() => onShare(p, video)}
                className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full text-white ${p.color}`}
              >
                {p.name}
              </button>
            ))}
            <button
              onClick={() => onCopy(video)}
              className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full glass"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const FILTERS = [
  { label: "All", q: {} }, { label: "Video", q: { type: "video" } }, { label: "Art", q: { type: "art" } },
  { label: "Newest", q: { sort: "new" } }, { label: "Trending", q: { sort: "trending" } }, { label: "Following", q: { view: "following" } },
];

export default function Home({ params = {} }) {
  const [openShare, setOpenShare] = useState(null);
  const [copied, setCopied] = useState(false);
  const [posts, setPosts] = useState(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    const sb = createClient();
    (async () => {
      let q = sb.from("posts").select(POST_SELECT).eq("status", "live").limit(48);
      if (params.type) q = q.eq("media_type", params.type);
      if (params.q) q = q.textSearch("search_vector", params.q, { type: "websearch" });
      if (params.view === "following") {
        const { data: { user } } = await sb.auth.getUser();
        if (!user) { setNote("Sign in to see creators you follow."); setPosts([]); return; }
        const { data: f } = await sb.from("follows").select("following_id").eq("follower_id", user.id);
        const ids = (f || []).map((r) => r.following_id);
        if (!ids.length) { setNote("Follow creators to fill this tab."); setPosts([]); return; }
        q = q.in("author_id", ids);
      }
      q = params.sort === "trending" ? q.order("likes_count", { ascending: false }).order("created_at", { ascending: false }) : q.order("created_at", { ascending: false });
      const { data, error } = await q;
      setPosts(error ? [] : (data || []).map(toCard));
    })();
  }, [params.type, params.q, params.view, params.sort]);

  const filtered = params.type || params.q || params.view;
  const real = posts || [];
  const list = real.length ? real : filtered ? [] : VIDEOS;
  const shorts = (real.filter((p) => p.mediaType === "video").length >= 3 ? real.filter((p) => p.mediaType === "video") : VIDEOS).slice(0, 8);
  const siteUrl = () => (typeof window !== "undefined" ? window.location.origin : "https://aidea-six.vercel.app");
  const urlFor = (v) => (v.real ? `${siteUrl()}/v/${v.id}` : siteUrl());

  const share = (platform, video) => {
    const text = `Watch "${video.title}" by ${video.creator} on AIdea`;
    window.open(platform.url(urlFor(video), text), "_blank", "width=600,height=400");
  };
  const copyLink = async (video) => {
    await navigator.clipboard.writeText(urlFor(video));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const active = (f) => Object.keys(f.q).length === 0 ? !params.type && !params.sort && !params.view : Object.entries(f.q).every(([k, v]) => params[k] === v);
  const href = (f) => "/?" + new URLSearchParams(f.q).toString();
  const card = (video) => (
    <VideoCard key={video.id} video={video} openShare={openShare} onToggleShare={(id) => setOpenShare(openShare === id ? null : id)} onShare={share} copied={copied} onCopy={copyLink} />
  );

  return (
    <AppShell>
      <div className="sticky top-14 z-30 bg-[#0a0a0f]/95 backdrop-blur px-3 sm:px-4 py-2.5 border-b border-white/5">
        <div className="flex gap-2 overflow-x-auto">
          {FILTERS.map((f) => (
            <Link key={f.label} href={href(f)} className={`px-3.5 py-1.5 rounded-full text-sm whitespace-nowrap ${active(f) ? "bg-white text-black" : "bg-white/5 hover:bg-white/10 text-muted"}`}>{f.label}</Link>
          ))}
        </div>
      </div>
      <div className="px-3 sm:px-4 py-4">
        {params.q && <div className="text-sm text-muted mb-3">Results for "{params.q}"</div>}
        {note && <div className="text-sm text-muted mb-3">{note}</div>}
        {posts === null ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="glass rounded-xl aspect-video animate-pulse" />)}</div>
        ) : params.view === "shorts" ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">{shorts.map((v) => (
            <Link key={v.id} href={v.real ? `/v/${v.id}` : "/signup"} className="relative aspect-[9/16] rounded-xl overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${v.thumb})` }}>
              <div className="absolute inset-0 bg-black/20" /><div className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] sm:text-xs font-medium truncate">{v.title}</div>
            </Link>))}</div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 mb-6">{list.slice(0, 8).map(card)}</div>
            {!filtered && (
              <section className="mb-6">
                <h2 className="text-base sm:text-lg font-semibold mb-2"><span className="text-red-500">Shorts</span></h2>
                <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
                  {shorts.map((video) => (
                    <Link key={video.id} href={video.real ? `/v/${video.id}` : "/signup"} className="flex-shrink-0 w-28 sm:w-36">
                      <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${video.thumb})` }}>
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute bottom-1.5 left-1.5 right-1.5">
                          <div className="text-[10px] sm:text-xs font-medium truncate">{video.title}</div>
                          <div className="text-[9px] sm:text-[10px] text-muted">{video.creator}</div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center"><Play className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white opacity-80" /></div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">{list.slice(8).map(card)}</div>
            {filtered && !list.length && !note && <div className="text-sm text-muted">Nothing here yet.</div>}
          </>
        )}
      </div>
    </AppShell>
  );
}

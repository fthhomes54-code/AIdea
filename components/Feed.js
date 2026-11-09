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
  { name: "Reddit", color: "bg-orange-600", url: (u, t) => `https://www.reddit.com/submit?url=${encodeURIComponent(u)}&title=${encodeURIComponent(t)}` },
  { name: "Pinterest", color: "bg-red-700", url: (u, t) => `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(u)}&description=${encodeURIComponent(t)}` },
  { name: "LinkedIn", color: "bg-sky-700", url: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}` },
  { name: "Email", color: "bg-gray-600", url: (u, t) => `mailto:?subject=${encodeURIComponent(t)}&body=${encodeURIComponent(u)}` },
  { name: "X", color: "bg-black border border-gray-700", url: (u, t) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}` },
  { name: "WhatsApp", color: "bg-green-600", url: (u, t) => `https://wa.me/?text=${encodeURIComponent(t + " " + u)}` },
];


function VideoCard({ video, onShare, openShare, onToggleShare, copied, onCopy }) {
  return (
    <div className="glass rounded-xl overflow-hidden">
      <Link
        href={video.real ? `/v/${video.id}` : "/signup"}
        className="block relative aspect-video bg-contain bg-no-repeat bg-center bg-black cursor-pointer group"
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
            {video.views && <span>{video.views} views</span>}
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
  { label: "For You", q: { view: "foryou" } }, { label: "Trending", q: { sort: "trending" } }, { label: "Newest", q: { sort: "new" } }, { label: "Subscriptions", q: { view: "following" } },
];

export default function Home({ params = {} }) {
  const [openShare, setOpenShare] = useState(null);
  const [copied, setCopied] = useState(false);
  const [posts, setPosts] = useState(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    const sb = createClient();
    (async () => {
      const ranked = params.sort === "trending" || params.view === "foryou";
      let q = (params.view === "foryou" ? sb.rpc("for_you") : params.sort === "trending" ? sb.rpc("hot_posts") : sb.from("posts")).select(POST_SELECT).eq("status", "live").limit(48);
      if (params.type) q = q.eq("media_type", params.type);
      if (params.q) q = q.textSearch("search_vector", params.q, { type: "websearch" });
      if (params.view === "following") {
        const { data: { user } } = await sb.auth.getUser();
        if (!user) { setNote("Sign in to see channels you subscribe to."); setPosts([]); return; }
        const { data: f } = await sb.from("follows").select("following_id").eq("follower_id", user.id);
        const ids = (f || []).map((r) => r.following_id);
        if (!ids.length) { setNote("Subscribe to channels to fill this tab."); setPosts([]); return; }
        q = q.in("author_id", ids);
      }
      if (!ranked) q = q.order("created_at", { ascending: false });
      const { data, error } = await q;
      setPosts(error ? [] : (data || []).map(toCard));
    })();
  }, [params.type, params.q, params.view, params.sort]);

  const filtered = params.type || params.q || params.view;
  const list = posts || [];
  const shorts = list.filter((p) => p.mediaType === "video").slice(0, 8);
  const siteUrl = () => (typeof window !== "undefined" ? window.location.origin : "https://aidea-six.vercel.app");
  const urlFor = (v) => `${siteUrl()}/v/${v.id}`;
  const emptyInvite = (
    <div className="text-center py-16 px-4">
      <p className="text-sm text-muted mb-4">Nothing here yet. Be one of the first to share AI art or AI video.</p>
      <Link href="/signup" className="inline-block bg-blue hover:bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium">Join AIdea</Link>
    </div>
  );

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
          shorts.length ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">{shorts.map((v) => (
              <Link key={v.id} href={`/v/${v.id}`} className="relative aspect-[9/16] rounded-xl overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${v.thumb})` }}>
                <div className="absolute inset-0 bg-black/20" /><div className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] sm:text-xs font-medium truncate">{v.title}</div>
              </Link>))}</div>
          ) : emptyInvite
        ) : !list.length ? (
          emptyInvite
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 mb-6">{list.slice(0, 8).map(card)}</div>
            {!filtered && shorts.length > 0 && (
              <section className="mb-6">
                <h2 className="text-base sm:text-lg font-semibold mb-2"><span className="text-red-500">Shorts</span></h2>
                <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
                  {shorts.map((video) => (
                    <Link key={video.id} href={`/v/${video.id}`} className="flex-shrink-0 w-28 sm:w-36">
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
          </>
        )}
      </div>
    </AppShell>
  );
}

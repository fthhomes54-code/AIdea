import { notFound } from "next/navigation";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import ShareBar from "@/components/ShareBar";
import PostActions from "@/components/PostActions";
import OwnerControls from "@/components/OwnerControls";
import Comments from "@/components/Comments";
import ViewCounter from "@/components/ViewCounter";
import CrossPost from "@/components/CrossPost";
import EpisodeScript from "@/components/EpisodeScript";
import { createPublic } from "@/lib/supabase-server";
import { publicUrl } from "@/lib/storage";
import { POST_SELECT, fmtCount } from "@/lib/posts";

export const dynamic = "force-dynamic";

async function getPost(id) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const { data } = await createPublic().from("posts").select(POST_SELECT + ",script").eq("id", id).maybeSingle();
  return data;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const p = await getPost(id);
  if (!p) return { title: "Not found" };
  const by = p.profiles?.display_name || p.profiles?.username || "a creator";
  const title = p.title || "AI creation";
  const description = `${p.media_type === "video" ? "AI video" : "AI art"} by ${by} on AIdea${p.tags?.length ? " · #" + p.tags.slice(0, 3).join(" #") : ""}`;
  const img = publicUrl(p.thumb_key || p.thumbnail_url || (p.media_type === "video" ? null : p.storage_key)) || "/og.png";
  const url = `/v/${p.id}`;
  const og = { title, description, url, siteName: "AIdea", type: p.media_type === "video" ? "video.other" : "article", images: [{ url: img }] };
  const robots = /smoke test|delete me/i.test(p.title || "") ? { index: false } : undefined;
  return { title, description, robots, alternates: { canonical: url }, openGraph: og, twitter: { card: "summary_large_image", title, description, images: [img] } };
}

export default async function WatchPage({ params }) {
  const { id } = await params;
  const p = await getPost(id);
  if (!p) notFound();
  const src = publicUrl(p.storage_key || p.media_url);
  const by = p.profiles?.display_name || p.profiles?.username;
  const { data: more } = await createPublic().from("posts").select("id,title,thumb_key,thumbnail_url,storage_key,media_type").eq("status", "live").neq("id", p.id).order("created_at", { ascending: false }).limit(8);
  return (
    <AppShell>
      <div className="px-3 sm:px-6 py-4 grid lg:grid-cols-[1fr_320px] gap-6 max-w-[1400px]">
        <div>
          <div className="rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center">
            {p.media_type === "video"
              ? <video src={src} poster={publicUrl(p.thumb_key) || undefined} controls playsInline className="w-full h-full" />
              : <img src={src} alt={p.title || ""} className="max-h-full max-w-full object-contain" />}
          </div>
          <h1 className="text-lg sm:text-xl font-semibold mt-3">{p.title || "Untitled"}</h1>
          <div className="flex flex-wrap items-center justify-between gap-3 mt-2">
            <Link href={`/u/${p.profiles?.username}`} className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue to-gold flex items-center justify-center text-xs font-bold">{(by || "AI").slice(0, 2).toUpperCase()}</div>
              <div><div className="text-sm font-medium">{by}</div><div className="text-xs text-muted">@{p.profiles?.username}</div></div>
            </Link>
            <div className="text-xs text-muted">{fmtCount(p.views || 0)} views · {fmtCount(p.likes_count)} likes · {new Date(p.created_at).toLocaleDateString()}</div>
          </div>
          {p.tags?.length > 0 && <div className="flex flex-wrap gap-1.5 mt-3">{p.tags.map((t) => <Link key={t} href={`/?q=${encodeURIComponent(t)}`} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-muted">#{t}</Link>)}</div>}
          <div className="mt-4"><PostActions postId={p.id} initialLikes={p.likes_count} /></div>
          <OwnerControls post={{ id: p.id, author_id: p.author_id, title: p.title, tags: p.tags, storage_key: p.storage_key, thumb_key: p.thumb_key }} />
          <div className="mt-3"><ShareBar title={p.title || "AI creation"} creator={by} /></div>
          <ViewCounter postId={p.id} />
          <CrossPost url={`https://aidea-six.vercel.app/v/${p.id}`} title={p.title || "AIdea post"} fileUrl={src} isVideo={p.media_type === "video"} />
          <EpisodeScript script={p.script} />
          <Comments postId={p.id} />
        </div>
        <aside className="space-y-3">
          <div className="text-sm font-semibold">More on AIdea</div>
          {(more || []).map((m) => (
            <Link key={m.id} href={`/v/${m.id}`} className="flex gap-2 group">
              <div className="w-40 aspect-video rounded-lg bg-contain bg-no-repeat bg-center bg-black shrink-0" style={{ backgroundImage: `url(${publicUrl(m.thumb_key || m.thumbnail_url || (m.media_type === "video" ? null : m.storage_key)) || "/og.png"})` }} />
              <div className="text-sm group-hover:text-white text-gray-300 line-clamp-2">{m.title || "Untitled"}</div>
            </Link>
          ))}
        </aside>
      </div>
    </AppShell>
  );
}

import Badges from "@/components/Badges";
import { notFound } from "next/navigation";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import FollowButton from "@/components/FollowButton";
import { createPublic } from "@/lib/supabase-server";
import { publicUrl } from "@/lib/storage";
import { POST_SELECT, toCard } from "@/lib/posts";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { username } = await params;
  const { data: u } = await createPublic().from("profiles").select("username,display_name,bio,avatar_url").eq("username", username).maybeSingle();
  if (!u) return { title: "Not found" };
  return { title: u.display_name || u.username, description: u.bio || `AI creations by @${u.username} on AIdea`, openGraph: { title: `${u.display_name || u.username} on AIdea`, images: u.avatar_url ? [u.avatar_url] : ["/og.png"] } };
}

export default async function Channel({ params }) {
  const { username } = await params;
  const sb = createPublic();
  const { data: u } = await sb.from("profiles").select("id,username,display_name,bio,avatar_url,banner_url").eq("username", username).maybeSingle();
  if (!u) notFound();
  const [{ data: posts }, { count: followers }] = await Promise.all([
    sb.from("posts").select(POST_SELECT).eq("author_id", u.id).eq("status", "live").order("created_at", { ascending: false }).limit(60),
    sb.from("follows").select("*", { count: "exact", head: true }).eq("following_id", u.id),
  ]);
  const { data: stats } = await sb.from("creator_stats").select("posts,likes,golden_hour,founding,points").eq("author_id", u.id).maybeSingle();
  const cards = (posts || []).map(toCard);
  return (
    <AppShell>
      {u.banner_url
        ? <div className="bg-black flex justify-center"><img src={publicUrl(u.banner_url)} alt="" className="w-full max-w-[1200px] max-h-[460px] object-contain" /></div>
        : <div className="h-28 sm:h-40 bg-gradient-to-r from-blue/40 to-gold/30" />}
      <div className="px-4 sm:px-6 -mt-8 flex flex-wrap items-end gap-4">
        <div className="w-20 h-20 rounded-full border-4 border-[#0a0a0f] bg-gradient-to-br from-blue to-gold bg-cover bg-center flex items-center justify-center text-xl font-bold" style={u.avatar_url ? { backgroundImage: `url(${publicUrl(u.avatar_url)})` } : undefined}>
          {!u.avatar_url && (u.display_name || u.username).slice(0, 2).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0 pb-1">
          <h1 className="text-xl font-bold">{u.display_name || u.username}</h1>
          <div className="text-xs text-muted">@{u.username} · {followers || 0} followers · {cards.length} posts</div>
          <Badges stats={stats} />
        </div>
        <FollowButton userId={u.id} />
      </div>
      {u.bio && <p className="px-4 sm:px-6 mt-3 text-sm text-gray-300 max-w-2xl">{u.bio}</p>}
      <div className="px-4 sm:px-6 py-5 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
        {cards.map((c) => (
          <Link key={c.id} href={`/v/${c.id}`} className="glass rounded-xl overflow-hidden">
            <div className="relative aspect-video bg-contain bg-no-repeat bg-center bg-black" style={{ backgroundImage: `url(${c.thumb})` }}>
              {c.time && <span className="absolute bottom-1.5 right-1.5 text-[10px] bg-black/70 px-1.5 py-0.5 rounded">{c.time}</span>}
            </div>
            <div className="p-2 text-xs sm:text-sm truncate">{c.title}</div>
          </Link>
        ))}
        {!cards.length && <div className="text-sm text-muted col-span-full">No posts yet.</div>}
      </div>
    </AppShell>
  );
}

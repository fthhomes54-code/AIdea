import { createPublic } from "@/lib/supabase-server";
import articles from "@/lib/articles.json";
export const revalidate = 3600;
const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://aidea-six.vercel.app";
export default async function sitemap() {
  const s = createPublic();
  const out = ["", "/terms", "/privacy", "/rules", "/signup", "/learn"].map((p) => ({ url: BASE + p, changeFrequency: "daily" }));
  articles.forEach((a) => out.push({ url: `${BASE}/learn/${a.slug}`, changeFrequency: "monthly" }));
  const { data: posts } = await s.from("posts").select("id,created_at,title").eq("status", "live").order("created_at", { ascending: false }).limit(5000);
  (posts || []).filter((p) => !/smoke test|delete me/i.test(p.title || "")).forEach((p) => out.push({ url: `${BASE}/v/${p.id}`, lastModified: p.created_at }));
  const { data: users } = await s.from("profiles").select("username").not("username", "is", null).limit(5000);
  (users || []).filter((u) => !/smoke|test\d*$/i.test(u.username)).forEach((u) => out.push({ url: `${BASE}/u/${u.username}` }));
  return out;
}

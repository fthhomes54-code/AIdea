import { createPublic } from "@/lib/supabase-server";
export const revalidate = 3600;
const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://aidea-six.vercel.app";
export default async function sitemap() {
  const s = createPublic();
  const out = ["", "/terms", "/privacy", "/rules", "/signup"].map((p) => ({ url: BASE + p, changeFrequency: "daily" }));
  const { data: posts } = await s.from("posts").select("id,created_at").order("created_at", { ascending: false }).limit(5000);
  (posts || []).forEach((p) => out.push({ url: `${BASE}/v/${p.id}`, lastModified: p.created_at }));
  const { data: users } = await s.from("profiles").select("username").not("username", "is", null).limit(5000);
  (users || []).forEach((u) => out.push({ url: `${BASE}/u/${u.username}` }));
  return out;
}

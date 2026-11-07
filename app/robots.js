const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://aidea-six.vercel.app";
export default function robots() {
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/settings", "/upload", "/admin", "/auth", "/api", "/profile"] }], sitemap: `${BASE}/sitemap.xml` };
}

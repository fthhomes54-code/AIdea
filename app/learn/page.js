import AppShell from "@/components/AppShell";
import articles from "@/lib/articles.json";
export const metadata = { title: "Learn: AI shows and series", description: "Guides to watching, making and sharing AI shows, series and short films on AIdea.", alternates: { canonical: "/learn" }, openGraph: { title: "AIdea | Learn: AI shows and series", description: "Guides to watching, making and sharing AI shows, series and short films on AIdea.", url: "/learn", siteName: "AIdea", type: "website", images: [{ url: "/og.png" }] } };
export default function Learn() {
  return (
    <AppShell>
      <div className="max-w-2xl px-4 sm:px-6 py-6 space-y-4">
        <h1 className="text-2xl font-bold text-white">Learn</h1>
        <p className="text-gray-400 text-sm">Guides for AI show creators and fans.</p>
        <ul className="space-y-3">
          {articles.map((a) => (
            <li key={a.slug} className="rounded-xl bg-white/5 p-4">
              <a href={`/learn/${a.slug}`} className="text-white font-semibold hover:text-gold">{a.title}</a>
              <p className="text-gray-400 text-sm mt-1">{a.meta}</p>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}

import AppShell from "@/components/AppShell";
import Rich from "@/components/Rich";
import articles from "@/lib/articles.json";
import { notFound } from "next/navigation";
export function generateStaticParams() { return articles.map((a) => ({ slug: a.slug })); }
const find = (s) => articles.find((a) => a.slug === s);
export async function generateMetadata({ params }) {
  const { slug } = await params; const a = find(slug); if (!a) return {};
  return { title: a.title, description: a.meta, alternates: { canonical: `/learn/${a.slug}` }, openGraph: { title: a.title, description: a.meta, type: "article" } };
}
export default async function Article({ params }) {
  const { slug } = await params; const a = find(slug); if (!a) notFound();
  return (
    <AppShell>
      <article className="max-w-2xl px-4 sm:px-6 py-6 text-gray-300 space-y-4 leading-relaxed">
        <a href="/learn" className="text-sm text-gray-500 hover:text-gold">← Learn</a>
        <h1 className="text-2xl font-bold text-white">{a.title}</h1>
        {a.blocks.map((b, i) => b.h ? <h2 key={i} className="text-lg font-semibold text-white pt-2">{b.h}</h2>
          : b.ul ? <ul key={i} className="list-disc pl-5 space-y-1">{b.ul.map((x, j) => <li key={j}><Rich text={x} /></li>)}</ul>
          : <p key={i}><Rich text={b.p} /></p>)}
        <a href="/upload" className="inline-block mt-4 rounded-lg bg-gold px-4 py-2 font-semibold text-black">Share your show</a>
      </article>
    </AppShell>
  );
}

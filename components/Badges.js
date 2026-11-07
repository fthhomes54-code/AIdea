// Creator badges computed from the creator_stats view.
export function badgeList(s) {
  if (!s) return [];
  const b = [];
  if (s.founding) b.push({ label: "Founding Creator", cls: "bg-gold text-black" });
  if (s.golden_hour > 0) b.push({ label: "Golden Hour 2026", cls: "bg-amber-600 text-white" });
  if (s.posts >= 25) b.push({ label: "25 Posts", cls: "bg-white/10" });
  else if (s.posts >= 10) b.push({ label: "10 Posts", cls: "bg-white/10" });
  else if (s.posts >= 1) b.push({ label: "First Post", cls: "bg-white/10" });
  return b;
}
export default function Badges({ stats }) {
  const b = badgeList(stats);
  if (!b.length && !stats) return null;
  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-2">
      {b.map((x) => <span key={x.label} className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${x.cls}`}>{x.label}</span>)}
      {stats && <span className="text-[11px] text-muted ml-1">{stats.points} pts</span>}
    </div>
  );
}

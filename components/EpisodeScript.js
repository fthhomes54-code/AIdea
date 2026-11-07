// Renders an episode script: host photo beside each line, B-roll between stories.
export default function EpisodeScript({ script }) {
  if (!script?.segments?.length) return null;
  return (
    <section className="mt-6 glass rounded-xl p-4 sm:p-6">
      <h2 className="text-base font-semibold mb-4">Episode script</h2>
      <div className="space-y-6">
        {script.segments.map((s, i) => (
          <div key={i} className="space-y-4">
            {i > 0 && <div className="h-px bg-white/10" />}
            {(s.broll || []).map((b, j) => (
              <figure key={j} className="rounded-lg overflow-hidden bg-black/40">
                <img src={b.src} alt={b.caption || ""} className="w-full max-h-[520px] object-contain bg-black" loading="lazy" />
                {(b.caption || b.credit) && <figcaption className="text-xs text-muted px-3 py-2">{b.caption}{b.credit && <span className="block opacity-70">{b.credit}</span>}</figcaption>}
              </figure>
            ))}
            {s.lines.map((l, k) => {
              const suki = /suki/i.test(l.host);
              return (
                <div key={k} className="flex gap-3 items-start">
                  {l.img && <img src={l.img} alt={l.host} className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover object-top shrink-0 ring-2 ${suki ? "ring-white/70" : "ring-gold"}`} loading="lazy" />}
                  <div>
                    <div className={`text-xs font-bold tracking-wide ${suki ? "text-white" : "text-gold"}`}>{l.host.toUpperCase()}</div>
                    <p className="text-sm text-gray-200 leading-relaxed mt-0.5">{l.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

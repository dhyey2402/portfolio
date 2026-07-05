import { EXPERTISE, MARQUEE } from '../../lib/data';
import { useReveal } from '../../hooks/usePortfolio';
import { Code2, Server, Database, BrainCircuit } from 'lucide-react';

const ICONS = [Code2, Server, Database, BrainCircuit];

export default function Expertise() {
  const ref = useReveal();

  return (
    <section id="expertise" ref={ref} className="relative py-28 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center gap-4 mb-6 reveal">
          <span className="section-num">02 / Expertise</span>
          <span className="h-px flex-1 bg-slate-800" />
        </div>
        <h2 className="reveal reveal-delay-1 font-display text-5xl md:text-6xl text-slate-100">
          Tech <span className="italic text-amber-300">stack.</span>
        </h2>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXPERTISE.map((cat, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div key={cat.title} className={`reveal reveal-delay-${(i % 4) + 1} group relative rounded-2xl border border-slate-800 bg-slate-950/50 p-6 hover:border-amber-400/50 transition-colors`}>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl grid place-items-center bg-amber-400/10 text-amber-300 border border-amber-400/30">
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="font-display text-xl text-slate-100">{cat.title}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {cat.items.map(it => (
                    <li key={it} className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 group-hover:border-amber-400/30 transition-colors">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Marquee ribbon */}
      <div className="mt-20 border-y border-slate-900 bg-slate-950/60 py-6 marquee">
        <div className="marquee-track flex gap-12 whitespace-nowrap font-display text-4xl md:text-5xl text-slate-500">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((w, i) => (
            <span key={i} className="inline-flex items-center gap-12">
              <span className="italic">{w}</span>
              <span className="text-amber-400/70">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

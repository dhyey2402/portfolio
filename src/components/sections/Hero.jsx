import { HERO_STATS } from '../../lib/data';
import { useMagnetic, useReveal } from '../../hooks/usePortfolio';
import { ArrowDown, Github, FileDown, Terminal, ArrowUpRight, Brain, Rocket, Cloud, Code2 } from 'lucide-react';

function MagBtn({ children, href, variant = 'amber', target, ...rest }) {
  const ref = useMagnetic(0.28, 100);
  const base = 'mag inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold';
  const cls = variant === 'amber' ? `${base} btn-amber` : `${base} btn-ghost`;
  return (
    <a ref={ref} href={href} target={target} rel={target ? 'noreferrer' : undefined} className={cls} {...rest}>
      {children}
    </a>
  );
}

export default function Hero() {
  const ref = useReveal();

  return (
    <section id="home" ref={ref} className="relative min-h-screen pt-28 pb-20 overflow-hidden grain">
      <div className="hero-bg">
        <div className="grid" />
        <div className="blob b1" />
        <div className="blob b2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        {/* Status pill */}
        <div className="reveal flex items-center gap-2 text-xs font-mono tracking-widest text-amber-300/90">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-70" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
          </span>
          AVAILABLE FOR NEW OPPORTUNITIES
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <h1 className="font-display text-[13vw] leading-[0.92] tracking-tight sm:text-7xl md:text-8xl lg:text-[7.5rem] text-slate-100">
              <span className="word reveal"><span>Engineering</span></span>
              <br />
              <span className="word reveal reveal-delay-1"><span className="italic text-amber-300">digital</span></span>{' '}
              <span className="word reveal reveal-delay-2"><span>experiences.</span></span>
            </h1>
            <p className="reveal reveal-delay-3 mt-8 max-w-xl text-slate-400 text-lg leading-relaxed">
              Hi, I’m <span className="text-slate-200 font-medium">Dhyey Patel</span> — a backend engineer and AI developer
              crafting scalable APIs, intelligent systems, and production-grade SaaS.
            </p>

            <div className="reveal reveal-delay-4 mt-10 flex flex-wrap items-center gap-3">
              <MagBtn href="#projects" variant="amber">
                See selected work <ArrowDown className="w-4 h-4" />
              </MagBtn>
              <MagBtn href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" variant="ghost">
                <FileDown className="w-4 h-4" /> Resume
              </MagBtn>
              <MagBtn href="https://github.com/dhyey2402" target="_blank" variant="ghost">
                <Github className="w-4 h-4" /> GitHub
              </MagBtn>
            </div>
          </div>

          {/* Right Column: Terminal & Stats */}
          <div className="lg:col-span-5 flex flex-col gap-6 pt-10 lg:pt-0 lg:-mt-16">
            {/* Creative Bento Stats */}
            <div className="grid grid-cols-3 gap-4">
              {HERO_STATS.map((s, i) => {
                const ICONS = [Rocket, Code2, Brain, Cloud];
                const Icon = ICONS[i];
                const isWide = i === 1 || i === 2; // Interlocking pattern
                
                return (
                  <div 
                    key={s.label} 
                    className={`group relative rounded-3xl p-6 overflow-hidden border border-slate-800/60 bg-slate-900/40 hover:bg-slate-900/80 transition-all duration-700 reveal reveal-delay-${(i % 4) + 1} ${isWide ? 'col-span-2' : 'col-span-1'}`}
                  >
                    {/* Glowing hover backdrop */}
                    <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"></div>
                    
                    <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                      <div className="flex items-start justify-between">
                        <Icon className="w-5 h-5 text-slate-600 group-hover:text-amber-400 transition-colors duration-500" />
                        <ArrowUpRight className="w-5 h-5 text-amber-500 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-3 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0" />
                      </div>
                      <div>
                        <div className="font-display text-4xl lg:text-5xl text-slate-300 group-hover:text-amber-300 transition-colors duration-500">{s.value}</div>
                        <div className="mt-2 text-[10px] font-mono uppercase tracking-widest text-slate-500 group-hover:text-amber-400/80 transition-colors duration-500">{s.label}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mt-16 flex items-center gap-3 text-slate-500 font-mono text-xs">
          <span className="h-px w-10 bg-slate-700" /> SCROLL <ArrowDown className="w-3.5 h-3.5 animate-bounce text-amber-300" />
        </div>
      </div>
    </section>
  );
}

import { ABOUT } from '../../lib/data';
import { useReveal } from '../../hooks/usePortfolio';
import { MapPin, GraduationCap, Sparkles } from 'lucide-react';

export default function About() {
  const ref = useReveal();
  return (
    <section id="about" ref={ref} className="relative py-28 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center gap-4 mb-6 reveal">
          <span className="section-num">01 / About Me</span>
          <span className="h-px flex-1 bg-slate-800" />
        </div>
        <h2 className="reveal reveal-delay-1 font-display text-5xl md:text-6xl text-slate-100">
          Who <span className="italic text-amber-300">I am.</span>
        </h2>

        <div className="mt-14 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="reveal reveal-delay-2 inline-flex items-center gap-2 text-amber-300 text-sm font-mono">
              <Sparkles className="w-4 h-4" /> {ABOUT.role}
            </div>
            {ABOUT.paragraphs.map((p, i) => (
              <p key={i} className={`reveal reveal-delay-${Math.min(i + 2, 4)} text-slate-300 text-lg leading-relaxed`}>{p}</p>
            ))}

            <div className="reveal reveal-delay-4 grid sm:grid-cols-2 gap-4 pt-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-500"><MapPin className="w-3.5 h-3.5" /> Location</div>
                <div className="mt-2 text-slate-100 font-display text-2xl">{ABOUT.location.city}</div>
                <div className="text-slate-400 text-sm">{ABOUT.location.region}</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-500"><GraduationCap className="w-3.5 h-3.5" /> Education</div>
                <div className="mt-2 text-slate-100 font-semibold">{ABOUT.education.degree}</div>
                <div className="text-slate-400 text-sm">{ABOUT.education.school}</div>
                <div className="text-amber-300/80 font-mono text-xs mt-1">{ABOUT.education.period}</div>
              </div>
            </div>
          </div>

          {/* Portrait card */}
          <div className="lg:col-span-5">
            <div className="reveal reveal-delay-3 gradient-border rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 amber-glow">
              <div className="aspect-[4/5] relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(40_90%_55%_/_0.25),transparent_55%)]" />
                <img src="https://dhyey2402.github.io/portfolio/assets/images/profile-photo.png"
                  alt="Dhyey Patel"
                  className="absolute inset-0 w-full h-full object-cover object-top mix-blend-luminosity opacity-90"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute left-5 bottom-5 right-5">
                  <div className="font-display text-3xl text-white">Dhyey Patel</div>
                  <div className="text-amber-300 text-sm font-mono">Software Engineer</div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Currently Building · Open to Opportunities
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

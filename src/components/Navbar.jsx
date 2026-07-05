import { useEffect, useState } from 'react';
import { NAV_LINKS } from '../lib/data';
import { useActiveSection } from '../hooks/usePortfolio';
import { ArrowUpRight, Github } from 'lucide-react';

export default function Navbar() {
  const active = useActiveSection(NAV_LINKS.map(l => l.id));
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'nav-glass' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">
        <a href="#home" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/40 grid place-items-center text-amber-400 font-display italic text-lg">d</span>
          <span className="hidden sm:block font-mono text-xs tracking-widest text-slate-300 group-hover:text-amber-400 transition">DHYEY.PATEL</span>
        </a>

        <nav className="hidden md:flex items-center gap-1 rounded-full border border-slate-800/80 bg-slate-950/40 backdrop-blur px-2 py-1.5">
          {NAV_LINKS.map(l => (
            <a key={l.id} href={`#${l.id}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${active === l.id ? 'bg-amber-400/15 text-amber-300' : 'text-slate-300 hover:text-white'}`}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="https://github.com/dhyey2402" target="_blank" rel="noreferrer"
            className="btn-ghost hidden sm:inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm">
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a href="#contact"
            className="btn-amber inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold">
            Let’s Talk <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

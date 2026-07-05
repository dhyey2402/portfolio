import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { CONTACT } from '../lib/data';

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-900 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/40 grid place-items-center text-amber-400 font-display italic text-lg">d</span>
          <div className="text-slate-400 text-sm">
            <div className="font-mono text-xs tracking-widest text-slate-500">DHYEY.PATEL</div>
            © {new Date().getFullYear()} — Crafted with care & caffeine.
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a href={`mailto:${CONTACT.email}`} className="btn-ghost inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs"><Mail className="w-3.5 h-3.5" /> Email</a>
          <a href={CONTACT.github} target="_blank" rel="noreferrer" className="btn-ghost inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs"><Github className="w-3.5 h-3.5" /> GitHub</a>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="btn-ghost inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs"><Linkedin className="w-3.5 h-3.5" /> LinkedIn</a>
          <a href="#home" className="btn-amber inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold"><ArrowUp className="w-3.5 h-3.5" /> Top</a>
        </div>
      </div>
    </footer>
  );
}

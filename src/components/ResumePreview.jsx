import { useEffect, useState, useRef } from 'react';
import { X, Download, Mail, MapPin, Github, Linkedin, Globe, ExternalLink, Sparkles, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { RESUME_DATA } from '../lib/resumeData';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/* ─── Animated skill bar ─── */
function SkillBar({ name, delay = 0 }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setWidth(75 + Math.random() * 25), 300 + delay * 60);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono tracking-wide
                 bg-gradient-to-r from-amber-500/10 to-amber-400/5 border border-amber-500/20
                 text-amber-300/90 backdrop-blur-sm transition-all duration-500 hover:border-amber-400/50
                 hover:shadow-[0_0_12px_rgba(245,184,74,0.15)] hover:scale-[1.04] cursor-default"
      style={{ animationDelay: `${delay * 40}ms` }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70 shadow-[0_0_4px_rgba(245,184,74,0.6)]" />
      {name}
    </span>
  );
}

/* ─── Section wrapper with staggered reveal ─── */
function ResumeSection({ children, title, icon, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200 + delay * 120);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        className
      )}
    >
      {title && (
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20">
            {icon}
          </div>
          <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-300/80 font-mono">{title}</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-amber-500/20 to-transparent" />
        </div>
      )}
      {children}
    </div>
  );
}

/* ─── Project card ─── */
function ProjectEntry({ project, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group relative">
      {/* Timeline connector */}
      {index > 0 && (
        <div className="absolute -top-3 left-[11px] w-px h-3 bg-gradient-to-b from-transparent to-slate-700/50" />
      )}
      <div
        className="relative pl-8 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Timeline dot */}
        <div className="absolute left-0 top-2 w-[22px] h-[22px] rounded-full border-2 border-slate-700 bg-slate-900/80 flex items-center justify-center
                        group-hover:border-amber-500/50 transition-colors duration-300">
          <div className="w-2 h-2 rounded-full bg-amber-500/60 group-hover:bg-amber-400 group-hover:shadow-[0_0_8px_rgba(245,184,74,0.4)] transition-all duration-300" />
        </div>

        <div className="flex items-start justify-between gap-4 mb-1.5">
          <div>
            <h4 className="text-sm font-semibold text-slate-200 group-hover:text-amber-300 transition-colors duration-300">
              {project.name}
              <span className="ml-2 text-[10px] font-mono text-slate-500 font-normal">{project.role}</span>
            </h4>
          </div>
          <div className="flex items-center gap-2 flex-none">
            <span className="text-[10px] font-mono text-slate-500 tracking-wide">{project.period}</span>
            <ChevronDown className={cn(
              'w-3.5 h-3.5 text-slate-600 transition-transform duration-300',
              expanded && 'rotate-180 text-amber-400'
            )} />
          </div>
        </div>

        <div className={cn(
          'overflow-hidden transition-all duration-500 ease-out',
          expanded ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'
        )}>
          <ul className="space-y-1.5 pb-2">
            {project.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-[12px] text-slate-400 leading-relaxed">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-500/50 flex-none" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT: ResumePreview
   ═══════════════════════════════════════════════ */
export default function ResumePreview({ isOpen, onClose }) {
  const contentRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  // Track scroll progress
  const handleScroll = (e) => {
    const el = e.target;
    const progress = el.scrollTop / (el.scrollHeight - el.clientHeight);
    setScrollProgress(Math.min(1, progress));
  };

  const r = RESUME_DATA;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 transition-all duration-500',
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      )}
    >
      {/* Backdrop with animated mesh */}
      <div
        className="absolute inset-0 cursor-pointer transition-all duration-500"
        onClick={onClose}
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(245,184,74,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(245,184,74,0.04) 0%, transparent 50%), rgba(2,6,12,0.85)',
          backdropFilter: 'blur(20px)',
        }}
      />

      {/* Modal container */}
      <div
        className={cn(
          'relative w-full max-w-4xl max-h-[92vh] flex flex-col transition-all duration-600 ease-out',
          isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'
        )}
      >
        {/* ── Floating header bar ── */}
        <div className="relative z-10 flex items-center justify-between px-6 py-4 
                        bg-slate-950/80 backdrop-blur-2xl rounded-t-[1.5rem] border border-b-0 border-white/[0.08]">
          {/* Left: Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/25">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-200 font-mono tracking-wide">Resume Preview</h2>
              <p className="text-[10px] text-slate-500 font-mono tracking-wider mt-0.5">INTERACTIVE • LIVE DATA</p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Scroll progress indicator */}
            <div className="hidden sm:flex items-center gap-2 mr-3">
              <div className="w-24 h-1 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-200"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-slate-600">{Math.round(scrollProgress * 100)}%</span>
            </div>

            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              download="dhyey_patel_resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold
                         bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 
                         shadow-[0_0_20px_rgba(245,184,74,0.25)] hover:shadow-[0_0_30px_rgba(245,184,74,0.4)]
                         hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </a>

            <button
              onClick={onClose}
              className="p-2 ml-1 text-slate-500 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
              aria-label="Close resume preview"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* ── Resume document ── */}
        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="relative flex-1 overflow-y-auto rounded-b-[1.5rem] border border-t-0 border-white/[0.08]
                     bg-gradient-to-b from-slate-950/90 via-[#0a0f18]/95 to-slate-950/90 backdrop-blur-2xl
                     no-scrollbar"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(245,184,74,0.2) transparent',
          }}
        >
          {/* Animated top glow */}
          <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-10"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(245,184,74,0.08) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-20 px-6 sm:px-10 md:px-14 py-10 space-y-10">

            {/* ═══ HEADER / NAME CARD ═══ */}
            <ResumeSection delay={0}>
              <div className="relative p-8 sm:p-10 rounded-3xl overflow-hidden
                              bg-gradient-to-br from-slate-900/60 via-slate-800/20 to-slate-900/40 
                              border border-white/[0.08]
                              shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16">
                  <div className="absolute top-3 left-3 w-6 h-px bg-amber-500/40" />
                  <div className="absolute top-3 left-3 w-px h-6 bg-amber-500/40" />
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16">
                  <div className="absolute bottom-3 right-3 w-6 h-px bg-amber-500/40" />
                  <div className="absolute bottom-3 right-3 w-px h-6 bg-amber-500/40" />
                </div>

                {/* Name & title */}
                <div className="text-center">
                  <h1 className="text-4xl sm:text-5xl font-display text-slate-100 tracking-tight leading-none mb-3">
                    {r.name}
                  </h1>
                  <p className="text-base sm:text-lg text-amber-400/90 font-medium tracking-wide mb-6">{r.title}</p>
                  <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed italic">{r.tagline}</p>
                </div>

                {/* Contact bar */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                  {[
                    { icon: <Mail className="w-3.5 h-3.5" />, text: r.contact.email, href: `mailto:${r.contact.email}` },
                    { icon: <MapPin className="w-3.5 h-3.5" />, text: r.contact.location },
                    { icon: <Github className="w-3.5 h-3.5" />, text: r.contact.github, href: `https://${r.contact.github}` },
                    { icon: <Linkedin className="w-3.5 h-3.5" />, text: 'LinkedIn', href: `https://${r.contact.linkedin}` },
                    { icon: <Globe className="w-3.5 h-3.5" />, text: 'Portfolio', href: `https://${r.contact.portfolio}` },
                  ].map((c, i) => {
                    const Tag = c.href ? 'a' : 'span';
                    return (
                      <Tag
                        key={i}
                        href={c.href}
                        target={c.href ? '_blank' : undefined}
                        rel={c.href ? 'noreferrer' : undefined}
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-500 
                                   hover:text-amber-400 transition-colors duration-300 cursor-pointer group"
                      >
                        <span className="text-slate-600 group-hover:text-amber-500 transition-colors">{c.icon}</span>
                        {c.text}
                        {c.href && <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />}
                      </Tag>
                    );
                  })}
                </div>
              </div>
            </ResumeSection>

            {/* ═══ SUMMARY ═══ */}
            <ResumeSection title="Professional Summary" icon={<Sparkles className="w-4 h-4 text-amber-400" />} delay={1}>
              <div className="relative pl-5 border-l-2 border-amber-500/20">
                <p className="text-sm text-slate-300/90 leading-[1.8] tracking-wide">{r.summary}</p>
              </div>
            </ResumeSection>

            {/* ═══ TECHNICAL SKILLS ═══ */}
            <ResumeSection title="Technical Skills" icon={<span className="text-amber-400 text-sm font-bold">⚡</span>} delay={2}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {r.skills.map((group, gi) => (
                  <div
                    key={group.category}
                    className="p-5 rounded-2xl bg-slate-900/30 border border-white/[0.06]
                               hover:border-amber-500/15 transition-all duration-500
                               hover:shadow-[0_0_25px_rgba(245,184,74,0.05)]"
                  >
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-3 font-mono">
                      {group.category}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item, ii) => (
                        <SkillBar key={item} name={item} delay={gi * 4 + ii} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ResumeSection>

            {/* ═══ EDUCATION ═══ */}
            <ResumeSection title="Education" icon={<span className="text-amber-400 text-sm">🎓</span>} delay={3}>
              <div className="flex items-start gap-5 p-6 rounded-2xl bg-slate-900/30 border border-white/[0.06]
                              hover:border-amber-500/15 transition-all duration-500">
                {/* Degree icon */}
                <div className="flex-none w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/15 to-amber-600/5 
                                border border-amber-500/20 flex items-center justify-center">
                  <span className="text-2xl">🏛️</span>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-slate-200 mb-1">{r.education.degree}</h4>
                  <p className="text-sm text-slate-400">{r.education.institution}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[10px] font-mono tracking-wider text-amber-400/70 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/15">
                      {r.education.period}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {r.education.location}
                    </span>
                  </div>
                </div>
              </div>
            </ResumeSection>

            {/* ═══ PROJECTS ═══ */}
            <ResumeSection title="Selected Projects" icon={<span className="text-amber-400 text-sm">🚀</span>} delay={4}>
              <div className="space-y-4">
                {r.projects.map((proj, i) => (
                  <ProjectEntry key={proj.name} project={proj} index={i} />
                ))}
              </div>
            </ResumeSection>

            {/* ═══ INTERESTS ═══ */}
            <ResumeSection title="Interests" icon={<span className="text-amber-400 text-sm">💡</span>} delay={5}>
              <div className="flex flex-wrap gap-2">
                {r.interests.map((interest, i) => (
                  <span
                    key={interest}
                    className="px-4 py-2 rounded-full text-[11px] font-mono tracking-wide
                               bg-gradient-to-r from-slate-800/60 to-slate-900/40 border border-white/[0.06]
                               text-slate-400 hover:text-amber-300 hover:border-amber-500/20
                               transition-all duration-400 cursor-default"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </ResumeSection>

            {/* ═══ BOTTOM CTA ═══ */}
            <ResumeSection delay={6}>
              <div className="text-center py-8 border-t border-white/[0.06]">
                <p className="text-[11px] font-mono tracking-widest text-slate-600 mb-4 uppercase">Get the full document</p>
                <a
                  href={`${import.meta.env.BASE_URL}resume.pdf`}
                  download="dhyey_patel_resume.pdf"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-sm font-semibold
                             bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 
                             shadow-[0_4px_30px_rgba(245,184,74,0.25)] hover:shadow-[0_4px_40px_rgba(245,184,74,0.45)]
                             hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  Download Resume (PDF)
                </a>
              </div>
            </ResumeSection>

          </div>
        </div>
      </div>
    </div>
  );
}

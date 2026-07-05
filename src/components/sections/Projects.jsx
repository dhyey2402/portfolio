import { useState } from 'react';
import { PROJECTS } from '../../lib/data';
import { useReveal } from '../../hooks/usePortfolio';
import { ArrowUpRight, Github, ExternalLink, Video } from 'lucide-react';
import ProjectModal from '../ProjectModal';

function ProjectCard({ p, index, onOpenModal }) {
  return (
    <article 
      onClick={() => onOpenModal(p)}
      className={`proj-card project-card-btn group relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950/50 reveal reveal-delay-${(index % 4) + 1} cursor-pointer hover:border-amber-400/50 transition-colors`} 
      data-cursor="hover"
    >
      <div className="relative aspect-[16/10] overflow-hidden pointer-events-none">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="proj-img absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        {/* Amber corner */}
        <div className="proj-corner absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-amber-400 text-slate-950 px-3 py-1.5 text-xs font-semibold">
          View <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-950/70 backdrop-blur border border-slate-800 px-3 py-1.5 text-xs font-mono uppercase tracking-widest text-amber-300">
            {p.tag}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 transition-transform duration-300 group-hover:-translate-y-16">
          <h3 className="font-display text-2xl md:text-3xl text-white drop-shadow-md">{p.name}</h3>
        </div>

        {/* Hover Action Buttons */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto z-20 px-4">
          {p.links.video && p.links.video !== '#' && (
            <a href={p.links.video} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
              className="flex-1 flex justify-center items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 rounded-full py-2.5 text-sm font-bold shadow-[0_4px_20px_rgba(245,184,74,0.3)] hover:scale-105 transition-transform">
              <Video className="w-4 h-4" /> Demo
            </a>
          )}
          {p.links.live && p.links.live !== '#' && (
            <a href={p.links.live} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
              className="flex-1 flex justify-center items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 rounded-full py-2.5 text-sm font-bold shadow-[0_4px_20px_rgba(245,184,74,0.3)] hover:scale-105 transition-transform">
              <ExternalLink className="w-4 h-4" /> Live
            </a>
          )}
          {p.links.github && p.links.github !== '#' && (
            <a href={p.links.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
              className="flex-1 flex justify-center items-center gap-1.5 bg-slate-900/90 backdrop-blur text-slate-200 rounded-full py-2.5 text-sm font-semibold shadow-lg border border-slate-700 hover:bg-slate-800 hover:text-white hover:scale-105 transition-all">
              <Github className="w-4 h-4" /> Code
            </a>
          )}
        </div>
      </div>

      <div className="p-5 space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">{p.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {p.tech.map(t => (
            <span key={t} className="text-[11px] font-mono uppercase tracking-wider px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">{t}</span>
          ))}
        </div>

        <ul className="space-y-1.5 text-sm text-slate-400">
          {p.features.map(f => (
            <li key={f} className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-amber-400 flex-none" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

      </div>
    </article>
  );
}

export default function Projects() {
  const ref = useReveal();
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <section id="projects" ref={ref} className="relative py-28 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-4 mb-6 reveal">
            <span className="section-num">03 / Selected Works</span>
            <span className="h-px flex-1 bg-slate-800" />
          </div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="reveal reveal-delay-1 font-display text-5xl md:text-6xl text-slate-100 max-w-xl">
              Featured <span className="italic text-amber-300">projects.</span>
            </h2>
            <p className="reveal reveal-delay-2 max-w-md text-slate-400">
              A curated set of production-grade builds spanning SaaS platforms, enterprise ERPs, and AI systems. Click any project for an architectural deep dive.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => (
              <ProjectCard 
                p={p} 
                index={i} 
                key={p.id} 
                onOpenModal={setSelectedProject} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Modal */}
      <ProjectModal 
        isOpen={!!selectedProject}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

import { useEffect, useState } from 'react';
import { X, ExternalLink, Github, MonitorPlay } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function ProjectModal({ isOpen, onClose, project }) {
  const [activeTab, setActiveTab] = useState('overview');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset tab to overview on open
      setActiveTab('overview');
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 transition-all duration-500",
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      )}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-xl cursor-pointer transition-opacity duration-500" 
        onClick={onClose} 
      />

      {/* Modal Card */}
      <div
        className={cn(
          "relative w-full max-w-5xl max-h-[90vh] bg-slate-900/40 backdrop-blur-2xl border border-white/10 ring-1 ring-white/5 rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] overflow-hidden flex flex-col transition-all duration-500",
          isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-8 opacity-0"
        )}
      >
        {/* Header */}
        <div className="flex-none flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl md:text-3xl font-display text-white/90 drop-shadow-sm">{project.name}</h2>
          <button 
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 backdrop-blur-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          
          {/* Tabs */}
          <div className="flex items-center gap-2 mb-8 bg-black/20 p-1.5 rounded-2xl w-max border border-white/5 shadow-inner">
            <button
              onClick={() => setActiveTab('overview')}
              className={cn(
                "px-5 py-2 text-sm font-semibold rounded-xl transition-all duration-300",
                activeTab === 'overview' 
                  ? "bg-white/15 text-white shadow-[0_2px_10px_rgba(0,0,0,0.2)] border border-white/10" 
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              )}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={cn(
                "px-5 py-2 text-sm font-semibold rounded-xl transition-all duration-300",
                activeTab === 'architecture' 
                  ? "bg-white/15 text-white shadow-[0_2px_10px_rgba(0,0,0,0.2)] border border-white/10" 
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              )}
            >
              Engineering Architecture
            </button>
          </div>

          <div className="grid lg:grid-cols-12 gap-10">
            {/* Main Content Column */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* --- OVERVIEW TAB --- */}
              {activeTab === 'overview' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <section>
                    <h3 className="text-xs uppercase tracking-widest text-white/50 mb-3 font-semibold">The Problem</h3>
                    <p className="text-white/80 leading-relaxed">{project.problem}</p>
                  </section>
                  <section>
                    <h3 className="text-xs uppercase tracking-widest text-white/50 mb-3 font-semibold">The Solution</h3>
                    <p className="text-white/80 leading-relaxed">{project.overview}</p>
                  </section>
                  <section>
                    <h3 className="text-xs uppercase tracking-widest text-white/50 mb-3 font-semibold">Key Highlights</h3>
                    <ul className="space-y-3">
                      {project.highlights?.map((h, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/80 bg-white/5 p-3 rounded-2xl border border-white/5 backdrop-blur-md">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400/80 shadow-[0_0_8px_rgba(251,191,36,0.8)] flex-none" />
                          <span className="text-sm leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <h3 className="text-xs uppercase tracking-widest text-white/50 mb-3 font-semibold">Challenges & Outcomes</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-3xl p-6 border border-white/10 backdrop-blur-md shadow-inner transition-transform hover:scale-[1.02] duration-300">
                        <h4 className="text-amber-300/90 font-semibold mb-3 flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-amber-400/50"></span> Challenges
                        </h4>
                        <p className="text-white/70 text-sm leading-relaxed">{project.challenges}</p>
                      </div>
                      <div className="bg-white/5 rounded-3xl p-6 border border-white/10 backdrop-blur-md shadow-inner transition-transform hover:scale-[1.02] duration-300">
                        <h4 className="text-amber-300/90 font-semibold mb-3 flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-amber-400/50"></span> Outcome
                        </h4>
                        <p className="text-white/70 text-sm leading-relaxed">{project.outcome}</p>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {/* --- ARCHITECTURE TAB --- */}
              {activeTab === 'architecture' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <section>
                    <h3 className="text-xs uppercase tracking-widest text-white/50 mb-4 font-semibold">Request Flow</h3>
                    <div className="flex flex-wrap items-center gap-2">
                      {project.request_flow?.map((node, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-amber-300/90 text-sm font-mono shadow-sm backdrop-blur-md">
                            {node}
                          </span>
                          {idx < project.request_flow.length - 1 && (
                            <span className="text-white/30 font-mono">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                  
                  <section>
                    <h3 className="text-xs uppercase tracking-widest text-white/50 mb-4 font-semibold">Node Architecture</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {['frontend', 'api', 'backend', 'db'].map(layer => {
                        const titleKey = `node_${layer}`;
                        const descKey = `node_${layer}_details`;
                        if (!project[titleKey]) return null;
                        return (
                          <div key={layer} className="p-5 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-inner transition-transform hover:-translate-y-1 duration-300">
                            <h4 className="text-white/90 font-semibold mb-2">{project[titleKey]}</h4>
                            <p className="text-white/60 text-sm leading-relaxed">{project[descKey]}</p>
                          </div>
                        )
                      })}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xs uppercase tracking-widest text-white/50 mb-4 font-semibold">Engineering Decisions</h3>
                    <ul className="space-y-3">
                      {project.engineering_decisions?.map((d, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/80 text-sm bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
                          <span className="text-amber-400/80 font-bold mt-0.5">✓</span>
                          <span className="leading-relaxed">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4 space-y-8">
              {/* Project Image */}
              <div className="rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)] bg-black/20">
                <img src={project.image} alt={project.name} className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Links */}
              <div className="flex flex-col gap-3">
                {project.links.live && project.links.live !== '#' && (
                  <a href={project.links.live} target="_blank" rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold bg-amber-400 text-slate-950 shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] hover:scale-[1.02] transition-all duration-300">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
                {project.links.github && project.links.github !== '#' && (
                  <a href={project.links.github} target="_blank" rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold bg-white/10 border border-white/10 text-white hover:bg-white/20 hover:scale-[1.02] transition-all duration-300 backdrop-blur-md">
                    <Github className="w-4 h-4" /> Source Code
                  </a>
                )}
                {project.links.video && project.links.video !== '#' && (
                  <a href={project.links.video} target="_blank" rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold bg-white/10 border border-white/10 text-white hover:bg-white/20 hover:scale-[1.02] transition-all duration-300 backdrop-blur-md">
                    <MonitorPlay className="w-4 h-4" /> Video Walkthrough
                  </a>
                )}
              </div>

              {/* Meta Stats */}
              <div className="space-y-5 pt-6 border-t border-white/10">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-white/40 mb-1.5 font-bold">Architecture Type</h4>
                  <p className="text-white/90 text-sm font-medium">{project.tag}</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-white/40 mb-1.5 font-bold">Scale / Usage</h4>
                  <p className="text-white/90 text-sm font-medium">{project.scale || 'Standard'}</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-white/40 mb-3 font-bold">Core Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.capabilities?.map(c => (
                      <span key={c} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-mono uppercase tracking-widest text-amber-300/90 backdrop-blur-md shadow-sm">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

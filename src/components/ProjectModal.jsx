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
        "fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 transition-all duration-300",
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      )}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer" 
        onClick={onClose} 
      />

      {/* Modal Card */}
      <div
        className={cn(
          "relative w-full max-w-5xl max-h-[90vh] bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300",
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        )}
      >
        {/* Header */}
        <div className="flex-none flex items-center justify-between p-6 border-b border-slate-800">
          <h2 className="text-2xl md:text-3xl font-display text-slate-100">{project.name}</h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-900 rounded-full transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          
          {/* Tabs */}
          <div className="flex items-center gap-4 border-b border-slate-800 mb-8 pb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={cn(
                "pb-3 text-sm font-semibold transition relative",
                activeTab === 'overview' ? "text-amber-400" : "text-slate-400 hover:text-slate-200"
              )}
            >
              Overview
              {activeTab === 'overview' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={cn(
                "pb-3 text-sm font-semibold transition relative",
                activeTab === 'architecture' ? "text-amber-400" : "text-slate-400 hover:text-slate-200"
              )}
            >
              Engineering Architecture
              {activeTab === 'architecture' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400" />
              )}
            </button>
          </div>

          <div className="grid lg:grid-cols-12 gap-10">
            {/* Main Content Column */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* --- OVERVIEW TAB --- */}
              {activeTab === 'overview' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <section>
                    <h3 className="text-sm uppercase tracking-widest text-slate-500 mb-3">The Problem</h3>
                    <p className="text-slate-300 leading-relaxed">{project.problem}</p>
                  </section>
                  <section>
                    <h3 className="text-sm uppercase tracking-widest text-slate-500 mb-3">The Solution</h3>
                    <p className="text-slate-300 leading-relaxed">{project.overview}</p>
                  </section>
                  <section>
                    <h3 className="text-sm uppercase tracking-widest text-slate-500 mb-3">Key Highlights</h3>
                    <ul className="space-y-2">
                      {project.highlights?.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-300">
                          <span className="mt-2 h-1 w-1 rounded-full bg-amber-400 flex-none" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <h3 className="text-sm uppercase tracking-widest text-slate-500 mb-3">Challenges & Outcomes</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-slate-900/50 rounded-2xl p-5 border border-slate-800">
                        <h4 className="text-amber-300 font-semibold mb-2">Challenges</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">{project.challenges}</p>
                      </div>
                      <div className="bg-slate-900/50 rounded-2xl p-5 border border-slate-800">
                        <h4 className="text-amber-300 font-semibold mb-2">Outcome</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">{project.outcome}</p>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {/* --- ARCHITECTURE TAB --- */}
              {activeTab === 'architecture' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <section>
                    <h3 className="text-sm uppercase tracking-widest text-slate-500 mb-4">Request Flow</h3>
                    <div className="flex flex-wrap items-center gap-3">
                      {project.request_flow?.map((node, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <span className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-amber-300 text-sm font-mono">
                            {node}
                          </span>
                          {idx < project.request_flow.length - 1 && (
                            <span className="text-slate-600 font-mono">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                  
                  <section>
                    <h3 className="text-sm uppercase tracking-widest text-slate-500 mb-4">Node Architecture</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {['frontend', 'api', 'backend', 'db'].map(layer => {
                        const titleKey = `node_${layer}`;
                        const descKey = `node_${layer}_details`;
                        if (!project[titleKey]) return null;
                        return (
                          <div key={layer} className="p-4 rounded-xl border border-slate-800 bg-slate-900/30">
                            <h4 className="text-slate-200 font-semibold mb-1">{project[titleKey]}</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">{project[descKey]}</p>
                          </div>
                        )
                      })}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-sm uppercase tracking-widest text-slate-500 mb-3">Engineering Decisions</h3>
                    <ul className="space-y-3">
                      {project.engineering_decisions?.map((d, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                          <span className="text-amber-400 font-bold">✓</span>
                          <span>{d}</span>
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
              <div className="rounded-2xl overflow-hidden border border-slate-800">
                <img src={project.image} alt={project.name} className="w-full h-auto object-cover" />
              </div>

              {/* Links */}
              <div className="flex flex-col gap-3">
                {project.links.live && project.links.live !== '#' && (
                  <a href={project.links.live} target="_blank" rel="noreferrer"
                    className="w-full btn-amber inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
                {project.links.github && project.links.github !== '#' && (
                  <a href={project.links.github} target="_blank" rel="noreferrer"
                    className="w-full btn-ghost inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 transition">
                    <Github className="w-4 h-4" /> Source Code
                  </a>
                )}
                {project.links.video && project.links.video !== '#' && (
                  <a href={project.links.video} target="_blank" rel="noreferrer"
                    className="w-full btn-ghost inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 transition">
                    <MonitorPlay className="w-4 h-4" /> Video Walkthrough
                  </a>
                )}
              </div>

              {/* Meta Stats */}
              <div className="space-y-4 pt-6 border-t border-slate-800">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-1">Architecture Type</h4>
                  <p className="text-slate-200 text-sm">{project.tag}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-1">Scale / Usage</h4>
                  <p className="text-slate-200 text-sm">{project.scale || 'Standard'}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-2">Core Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.capabilities?.map(c => (
                      <span key={c} className="px-2 py-1 bg-slate-900 border border-slate-800 rounded-md text-[11px] font-mono uppercase tracking-wider text-amber-300">
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

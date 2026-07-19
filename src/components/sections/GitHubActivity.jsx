import { useEffect, useState } from 'react';
import { useReveal } from '../../hooks/usePortfolio';
import { Rocket, Package } from 'lucide-react';

const USERNAME = 'dhyey2402'; // Define GitHub Username

export default function GitHubActivity() {
  const ref = useReveal();
  const [repos, setRepos] = useState(null);
  const [contributions, setContributions] = useState(null);
  const [reposError, setReposError] = useState(false);
  const [contribError, setContribError] = useState(false);

  useEffect(() => {
    // Fetch Repos
    fetch(`https://api.github.com/users/${USERNAME}`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(data => animateCount(data.public_repos || 0, setRepos))
      .catch(() => setReposError(true));

    // Fetch Events (approximate yearly contributions via recent events scaling)
    fetch(`https://api.github.com/users/${USERNAME}/events/public?per_page=100`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(events => {
        const currentYear = new Date().getFullYear();
        const yearEvents = events.filter(e => new Date(e.created_at).getFullYear() === currentYear);
        const approxContribs = Math.max(yearEvents.length * 4, 1);
        animateCount(approxContribs, setContributions);
      })
      .catch(() => setContribError(true));
  }, []);

  const animateCount = (target, setter) => {
    let start = 0;
    const duration = 900;
    const step = 16;
    const increment = target / (duration / step);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setter(target);
        clearInterval(timer);
      } else {
        setter(Math.floor(start));
      }
    }, step);
  };

  return (
    <section id="github-activity" ref={ref} className="py-28 relative z-10 overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        <div className="flex items-center gap-4 mb-14 reveal">
          <span className="section-num">04 / Open Source</span>
          <span className="h-px flex-1 bg-slate-800" />
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: GitHub Profile */}
          <div className="lg:col-span-5 reveal reveal-delay-1">
            <div className="gh-glass-card">
              <div className="gh-profile-header">
                <img src={`https://github.com/${USERNAME}.png`} alt="Avatar" className="gh-avatar" />
                <div className="gh-profile-info">
                  <h4 className="gh-name">Dhyey Patel</h4>
                  <p className="gh-username">@{USERNAME}</p>
                </div>
              </div>
              
              <div className="gh-stats-grid">
                <div className="gh-stat-card">
                  <div className={`gh-stat-value ${repos === null && !reposError ? 'loading' : ''}`}>
                    {reposError ? '—' : (repos !== null ? repos : '—')}
                  </div>
                  <div className="gh-stat-label">Public Repos</div>
                </div>
                <div className="gh-stat-card">
                  <div className={`gh-stat-value ${contributions === null && !contribError ? 'loading' : ''}`}>
                    {contribError ? '—' : (contributions !== null ? `${contributions}+` : '—')}
                  </div>
                  <div className="gh-stat-label">Contributions</div>
                </div>
                <div className="gh-stat-card">
                  <Package className="w-5 h-5 text-amber-400 mb-2 opacity-80" />
                  <div className="gh-stat-value">4</div>
                  <div className="gh-stat-label">Deployable Projects</div>
                </div>
                <div className="gh-stat-card">
                  <Rocket className="w-5 h-5 text-amber-400 mb-2 opacity-80" />
                  <div className="gh-stat-value">4</div>
                  <div className="gh-stat-label">Live Deployments</div>
                </div>
              </div>

              <a 
                href={`https://github.com/${USERNAME}`} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-amber w-full inline-flex justify-center items-center py-3 rounded-xl font-semibold text-sm"
              >
                View GitHub Profile
              </a>
            </div>
          </div>

          {/* Right Column: Dashboard Context */}
          <div className="lg:col-span-7 reveal reveal-delay-2 space-y-6">
            <h2 className="font-display text-4xl md:text-5xl text-slate-100">
              Beyond the <span className="text-amber-400 italic">public</span> commits.
            </h2>
            <p className="text-slate-400 leading-relaxed text-lg max-w-xl">
              While my open-source repositories showcase my core engineering style, the majority of my most complex work—enterprise ERPs, real-time AI pipelines, and B2B SaaS platforms—is built and deployed in private, confidential environments.
            </p>
            
            <div className="pt-6 grid sm:grid-cols-2 gap-4">
               <div className="flex items-start gap-3">
                 <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center flex-none">
                   <span className="text-amber-400 font-bold">🔒</span>
                 </div>
                 <div>
                   <h5 className="text-slate-200 font-semibold mb-1">Confidential Architecture</h5>
                   <p className="text-sm text-slate-500">Engineering secure APIs handling sensitive user data and proprietary models.</p>
                 </div>
               </div>
               <div className="flex items-start gap-3">
                 <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center flex-none">
                   <span className="text-amber-400 font-bold">⚙️</span>
                 </div>
                 <div>
                   <h5 className="text-slate-200 font-semibold mb-1">Enterprise SaaS</h5>
                   <p className="text-sm text-slate-500">Deploying scalable, multi-tenant solutions with strict RBAC and CI/CD pipelines.</p>
                 </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

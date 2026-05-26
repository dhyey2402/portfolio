// ============================================================
// DHYEY PATEL PORTFOLIO — SCRIPT.JS
// All backend logic preserved: EmailJS, Modal, Playground API
// Visual updates: Particle colors, Navbar, Cursor
// ============================================================

// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

// ────────────────────────────────────────────────────────────
// MOBILE MENU
// ────────────────────────────────────────────────────────────
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const navbar = document.getElementById('navbar');

let isMenuOpen = false;

mobileBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        setTimeout(() => { mobileMenu.classList.remove('opacity-0'); }, 10);
        mobileBtn.innerHTML = '<i class="fas fa-times"></i>';
        document.body.style.overflow = 'hidden';
    } else {
        closeMobileMenu();
    }
});

function closeMobileMenu() {
    isMenuOpen = false;
    mobileMenu.classList.add('opacity-0');
    setTimeout(() => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
    }, 300);
    mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = 'auto';
}

mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

// ────────────────────────────────────────────────────────────
// NAVBAR SCROLL EFFECT
// ────────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(3,7,18,0.92)';
        navbar.style.borderBottomColor = 'rgba(34,211,238,0.1)';
    } else {
        navbar.style.background = 'rgba(3,7,18,0.6)';
        navbar.style.borderBottomColor = 'rgba(255,255,255,0.05)';
    }
});

// ────────────────────────────────────────────────────────────
// CURSOR SPOTLIGHT & MAGNETIC CURSOR
// ────────────────────────────────────────────────────────────
const spotlight = document.createElement('div');
spotlight.className = 'cursor-spotlight';
spotlight.id = 'cursor-spotlight';
document.body.appendChild(spotlight);

const cursorDot  = document.getElementById('custom-cursor-dot');
const cursorRing = document.getElementById('custom-cursor-ring');

let mousePos = { x: 0, y: 0 };
let ringPos  = { x: 0, y: 0 };
let dotPos   = { x: 0, y: 0 };

document.addEventListener('mousemove', (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
});

const tickCursor = () => {
    const lerpRing = 0.13;
    const lerpDot  = 0.45;

    ringPos.x += (mousePos.x - ringPos.x) * lerpRing;
    ringPos.y += (mousePos.y - ringPos.y) * lerpRing;
    dotPos.x  += (mousePos.x - dotPos.x)  * lerpDot;
    dotPos.y  += (mousePos.y - dotPos.y)  * lerpDot;

    if (cursorRing) { cursorRing.style.left = `${ringPos.x}px`; cursorRing.style.top = `${ringPos.y}px`; }
    if (cursorDot)  { cursorDot.style.left  = `${dotPos.x}px`;  cursorDot.style.top  = `${dotPos.y}px`;  }
    if (spotlight)  { spotlight.style.left  = `${ringPos.x}px`; spotlight.style.top  = `${ringPos.y}px`; }

    requestAnimationFrame(tickCursor);
};
requestAnimationFrame(tickCursor);

const interactiveElements = document.querySelectorAll('a, button, select, .project-card, .bento-card, .social-btn, .tech-pill-interactive');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot?.classList.add('cursor-active-dot');
        cursorRing?.classList.add('cursor-active-ring');
    });
    el.addEventListener('mouseleave', () => {
        cursorDot?.classList.remove('cursor-active-dot');
        cursorRing?.classList.remove('cursor-active-ring');
    });
});

// ────────────────────────────────────────────────────────────
// 3D TILT PARALLAX
// ────────────────────────────────────────────────────────────
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width  / 2;
        const cy = rect.height / 2;
        const rotX = -((y - cy) / cy) * 7;
        const rotY =  ((x - cx) / cx) * 7;
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
        card.style.transition = 'transform .6s cubic-bezier(.25,1,.5,1)';
    });
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform .1s linear';
    });
});


// ────────────────────────────────────────────────────────────
// HERO TERMINAL TYPEWRITER
// ────────────────────────────────────────────────────────────
const typedCodeSpan = document.getElementById('typed-code');
if (typedCodeSpan) {
    const codeScripts = [
        'def evaluate_models(X, y):\n    # Soft-voting ensemble prediction analytics\n    models = [xgb, rf, gb]\n    scores = [m.fit(X, y).score(X, y) for m in models]\n    return np.mean(scores)',
        'def ingest_telemetry(payload):\n    # Extract real-time river sensors baseflow\n    soil = payload["soil_saturation_pct"]\n    inflow = payload["water_inflow_m3_s"]\n    return baseflow_physics_est(soil, inflow)',
        'def vectorized_aggregate(df):\n    # Optimize large sales region data processing\n    pivot = df.groupby(["region", "campaign"]).sales.sum()\n    return pivot.reset_index()'
    ];

    let scriptIdx = 0, charIdx = 0, isDeleting = false;

    function type() {
        const full = codeScripts[scriptIdx];
        if (!isDeleting) {
            charIdx++;
            typedCodeSpan.innerHTML = full.substring(0, charIdx).replace(/\n/g, '<br>&gt;&gt;&gt; ');
            let delay = 35;
            if (charIdx === full.length) { isDeleting = true; delay = 3500; }
            setTimeout(type, delay);
        } else {
            charIdx--;
            typedCodeSpan.innerHTML = full.substring(0, charIdx).replace(/\n/g, '<br>&gt;&gt;&gt; ');
            let delay = 15;
            if (charIdx === 0) { isDeleting = false; scriptIdx = (scriptIdx + 1) % codeScripts.length; delay = 800; }
            setTimeout(type, delay);
        }
    }
    setTimeout(type, 1500);
}

// ────────────────────────────────────────────────────────────
// TECH PILL CONNECTIVITY HIGHLIGHT
// ────────────────────────────────────────────────────────────
const techPillRelationships = {
    'python':      ['django','flask','pandas','numpy','scikit-learn','tensorflow','pytorch','postgresql','mysql','sql'],
    'javascript':  ['html-css','rest-api'],
    'sql':         ['postgresql','mysql','django','flask'],
    'html-css':    ['javascript'],
    'django':      ['python','sql','postgresql','rest-api','jwt'],
    'flask':       ['python','sql','mysql','rest-api','pandas'],
    'rest-api':    ['django','flask','javascript','jwt'],
    'jwt':         ['django','rest-api'],
    'postgresql':  ['sql','django','python'],
    'mysql':       ['sql','flask','python'],
    'pandas':      ['python','numpy','scikit-learn','flask'],
    'numpy':       ['python','pandas','scikit-learn','tensorflow','pytorch'],
    'tensorflow':  ['python','numpy','scikit-learn','pytorch'],
    'pytorch':     ['python','numpy','scikit-learn','tensorflow'],
    'scikit-learn':['python','pandas','numpy','tensorflow','pytorch'],
    'nlp':         ['python','tensorflow','pytorch','scikit-learn']
};

const techPills = document.querySelectorAll('.tech-pill-interactive');
techPills.forEach(pill => {
    pill.addEventListener('mouseenter', () => {
        const key  = pill.getAttribute('data-tech');
        const conn = techPillRelationships[key] || [];
        techPills.forEach(p => {
            const pk = p.getAttribute('data-tech');
            if (pk === key || conn.includes(pk)) p.classList.add('highlighted');
            else p.classList.add('dimmed');
        });
    });
    pill.addEventListener('mouseleave', () => {
        techPills.forEach(p => p.classList.remove('highlighted','dimmed'));
    });
});

// ────────────────────────────────────────────────────────────
// GSAP SCROLL ANIMATIONS
// ────────────────────────────────────────────────────────────
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('h2, h3, .section-title').forEach(el => {
    gsap.fromTo(el,
        { y: 40, opacity: 0 },
        { scrollTrigger: { trigger: el, start: 'top 87%' }, y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
});

gsap.utils.toArray('.bento-card').forEach((card, i) => {
    gsap.fromTo(card,
        { y: 70, opacity: 0 },
        { scrollTrigger: { trigger: card, start: 'top 93%', end: 'bottom 25%', scrub: 1.2 }, y: 0, opacity: 1, ease: 'power1.out' }
    );
});

gsap.utils.toArray('.skill-category-card').forEach((card, i) => {
    gsap.fromTo(card,
        { y: 55, opacity: 0 },
        { scrollTrigger: { trigger: card, start: 'top 91%', end: 'bottom 30%', scrub: 1 }, y: 0, opacity: 1, ease: 'power2.out' }
    );
});

gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.fromTo(card,
        { y: 80, opacity: 0 },
        { scrollTrigger: { trigger: card, start: 'top 92%', end: 'bottom 20%', scrub: 1.3 }, y: 0, opacity: 1, ease: 'power1.out' }
    );
});

// ────────────────────────────────────────────────────────────
// EMAILJS CONTACT FORM
// ────────────────────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>&nbsp; Sending...';
        btn.disabled = true;

        emailjs.sendForm('service_mrih1ld', 'template_2rqc26a', contactForm)
            .then(() => {
                btn.innerHTML = '<i class="fas fa-check"></i>&nbsp; Message Sent!';
                btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                contactForm.reset();
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            })
            .catch((err) => {
                console.error('EmailJS error:', err);
                btn.innerHTML = '<i class="fas fa-times"></i>&nbsp; Failed — Try Again';
                btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                btn.disabled = false;
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                }, 4000);
            });
    });
}

// ────────────────────────────────────────────────────────────
// PROJECT MODAL & API PLAYGROUND
// ────────────────────────────────────────────────────────────
const projectModal  = document.getElementById('project-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalCard     = document.getElementById('modal-card');
const projectCards  = document.querySelectorAll('.project-card-btn');

projectCards.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return;

        // Reset tabs
        document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
        document.querySelector('.modal-tab[data-tab="overview"]').classList.add('active');
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.add('hidden'));
        document.getElementById('tab-content-overview').classList.remove('hidden');

        // Populate content
        document.getElementById('modal-title').textContent    = btn.getAttribute('data-p-title');
        document.getElementById('modal-overview').textContent = btn.getAttribute('data-p-overview');
        document.getElementById('modal-challenges').textContent = btn.getAttribute('data-p-challenges');

        const populateStack = (id, attr) => {
            const container = document.getElementById(id);
            container.innerHTML = '';
            const techs = btn.getAttribute(attr);
            if (techs) {
                techs.split(',').forEach(t => {
                    if (!t.trim()) return;
                    const span = document.createElement('span');
                    span.className = 'tech-tag';
                    span.textContent = t.trim();
                    container.appendChild(span);
                });
            } else {
                container.innerHTML = '<span style="font-size:0.75rem;color:#475569;font-style:italic">None</span>';
            }
        };
        populateStack('modal-tech-frontend', 'data-p-tech-frontend');
        populateStack('modal-tech-backend',  'data-p-tech-backend');
        populateStack('modal-tech-db',       'data-p-tech-db');

        const populateList = (id, attr) => {
            const container = document.getElementById(id);
            container.innerHTML = '';
            const items = btn.getAttribute(attr);
            if (items) {
                items.split('|').forEach(item => {
                    if (!item.trim()) return;
                    const li = document.createElement('li');
                    li.textContent = item.trim();
                    container.appendChild(li);
                });
            }
        };
        populateList('modal-features',   'data-p-features');
        populateList('modal-highlights', 'data-p-highlights');

        // Architecture diagram
        const archStr = btn.getAttribute('data-p-architecture');
        const archBox = document.getElementById('modal-architecture');
        archBox.innerHTML = '';
        if (archStr) {
            archStr.split('➔').forEach((node, i, arr) => {
                const s = document.createElement('span');
                s.style.cssText = 'padding:8px 14px;background:rgba(34,211,238,0.06);border:1px solid rgba(34,211,238,0.15);border-radius:8px;flex-shrink:0;color:#94a3b8;font-family:JetBrains Mono,monospace;font-size:0.78rem;';
                s.textContent = node.trim();
                archBox.appendChild(s);
                if (i < arr.length - 1) {
                    const arrow = document.createElement('i');
                    arrow.className = 'fas fa-arrow-right';
                    arrow.style.cssText = 'color:rgba(34,211,238,0.4);flex-shrink:0;font-size:0.8rem;';
                    archBox.appendChild(arrow);
                }
            });
        }

        // Sandbox routes
        const title  = btn.getAttribute('data-p-title');
        const select = document.getElementById('playground-endpoint-select');
        select.innerHTML = '';
        let routes = [];
        if (title.includes('JalDarshi')) {
            routes = [
                { value: 'get-telemetry',  text: 'GET /api/v1/sensors/iot-telemetry' },
                { value: 'predict-flood',  text: 'POST /api/v1/predict/flood-probability' }
            ];
        } else if (title.includes('Sales')) {
            routes = [
                { value: 'sales-summary', text: 'GET /api/v1/sales/region-summary' },
                { value: 'vector-agg',    text: 'POST /api/v1/sales/vector-aggregate' }
            ];
        } else {
            routes = [
                { value: 'attendance', text: 'GET /api/v1/student/attendance' },
                { value: 'role-auth',  text: 'POST /api/v1/auth/role-authorize' }
            ];
        }
        routes.forEach(r => {
            const opt = document.createElement('option');
            opt.value = r.value; opt.textContent = r.text;
            select.appendChild(opt);
        });

        document.getElementById('playground-console-output').innerHTML =
            `<div class="console-line comment">// Terminal ready. Select a route above and press Execute.</div>`;

        const githubLink = document.getElementById('modal-github');
        const demoLink   = document.getElementById('modal-demo');
        githubLink.href = btn.getAttribute('data-p-github');
        githubLink.style.display = btn.getAttribute('data-p-github') === '#' ? 'none' : 'flex';
        demoLink.href   = btn.getAttribute('data-p-demo');
        demoLink.style.display   = btn.getAttribute('data-p-demo')   === '#' ? 'none' : 'flex';

        // Show modal
        projectModal.classList.remove('hidden');
        projectModal.classList.add('flex');
        setTimeout(() => {
            projectModal.classList.remove('opacity-0');
            modalCard.classList.remove('scale-95','translate-y-4');
            modalCard.classList.add('scale-100','translate-y-0');
        }, 10);
        document.body.style.overflow = 'hidden';
    });
});

// Modal tabs
document.querySelectorAll('.modal-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.getAttribute('data-tab');
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.add('hidden'));
        document.getElementById(`tab-content-${target}`).classList.remove('hidden');
    });
});

// API Playground execute
const executeBtn    = document.getElementById('playground-execute-btn');
const consoleOutput = document.getElementById('playground-console-output');

if (executeBtn && consoleOutput) {
    executeBtn.addEventListener('click', () => {
        const select = document.getElementById('playground-endpoint-select');
        const val    = select.value;
        const text   = select.options[select.selectedIndex].text;

        executeBtn.disabled = true;
        executeBtn.innerHTML = 'Executing... <i class="fas fa-circle-notch fa-spin text-xs"></i>';
        consoleOutput.innerHTML = '';

        const logLine = (txt, type = 'info') => {
            const line = document.createElement('div');
            line.className = `console-line ${type}`;
            line.textContent = txt;
            consoleOutput.appendChild(line);
            consoleOutput.scrollTop = consoleOutput.scrollHeight;
        };

        logLine(`$ curl -X ${text.split(' ')[0]} "https://api.dhyey.dev${text.split(' ')[1]}"`, 'info');

        setTimeout(() => {
            logLine('> Connecting to secure API gateway...', 'comment');
            setTimeout(() => {
                logLine('> TLS handshake validated.', 'comment');
                setTimeout(() => {
                    logLine('HTTP/1.1 200 OK', 'success');
                    logLine('Content-Type: application/json', 'success');
                    logLine(`X-Inference-Time: ${Math.floor(Math.random()*40)+30}ms`, 'success');
                    logLine('', 'comment');

                    const payloads = {
                        'predict-flood':  { status:'success', timestamp:new Date().toISOString(), features_processed:73, ensemble_weights:{xgboost:0.45,random_forest:0.35,gradient_boosting:0.20}, inference_latency_ms:78.4, risk_assessment:{ probability:0.912, level:'CRITICAL_ALERT', recommendation:'Bypass catchment flood gates'} },
                        'get-telemetry':  { status:'active', sensors_reporting:14, soil_saturation_pct:87.2, water_inflow_m3_s:420.5, precipitation_rate_mm_h:14.5 },
                        'sales-summary':  { status:'success', total_regions:4, aggregated_sales:1489320.00, active_campaign_performance:'optimized' },
                        'vector-agg':     { status:'completed', rows_processed:145820, dataframe_dimension:[145820,12], vectorized_pipeline_ms:112.5 },
                        'attendance':     { status:'success', active_academic_year:'2025-2026', students_present_count:1420, attendance_ratio:0.942 },
                        'role-auth':      { authorized:true, principal:'dhyey_admin', role:'SuperAdministrator', token_expiry:'8h' }
                    };

                    const lines = JSON.stringify(payloads[val] || {}, null, 2).split('\n');
                    let i = 0;
                    const stream = () => {
                        if (i < lines.length) {
                            logLine(lines[i], 'success');
                            i++;
                            setTimeout(stream, 40);
                        } else {
                            executeBtn.disabled = false;
                            executeBtn.innerHTML = 'Execute <i class="fas fa-play text-[10px]"></i>';
                        }
                    };
                    setTimeout(stream, 200);
                }, 400);
            }, 300);
        }, 400);
    });
}

function closeProjectModal() {
    projectModal.classList.add('opacity-0');
    modalCard.classList.add('scale-95','translate-y-4');
    modalCard.classList.remove('scale-100','translate-y-0');
    setTimeout(() => {
        projectModal.classList.add('hidden');
        projectModal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }, 300);
}

modalCloseBtn?.addEventListener('click', closeProjectModal);
modalBackdrop?.addEventListener('click', closeProjectModal);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !projectModal.classList.contains('hidden')) closeProjectModal();
});

// ────────────────────────────────────────────────────────────
// PARTICLE NETWORK CANVAS (Cyan palette)
// ────────────────────────────────────────────────────────────
const particleCanvas = document.getElementById('bg-particle-canvas');
if (particleCanvas) {
    const ctx = particleCanvas.getContext('2d');
    let particles = [];

    const resizeCanvas = () => {
        particleCanvas.width  = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class NetworkNode {
        constructor() {
            this.reset();
        }
        reset() {
            this.x  = Math.random() * particleCanvas.width;
            this.y  = Math.random() * particleCanvas.height;
            this.vx = (Math.random() - 0.5) * 0.28;
            this.vy = (Math.random() - 0.5) * 0.28;
            this.r  = Math.random() * 1.4 + 0.5;
            const palette = [
                'rgba(34,211,238,0.5)',    // Cyan
                'rgba(167,139,250,0.35)',  // Violet
                'rgba(52,211,153,0.3)',    // Emerald
            ];
            this.color = palette[Math.floor(Math.random() * palette.length)];
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > particleCanvas.width)  this.vx *= -1;
            if (this.y < 0 || this.y > particleCanvas.height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    const count = Math.min(60, Math.floor((particleCanvas.width * particleCanvas.height) / 22000));
    for (let i = 0; i < count; i++) particles.push(new NetworkNode());

    let pointer = { x: null, y: null };
    document.addEventListener('mousemove', (e) => { pointer.x = e.clientX; pointer.y = e.clientY; });
    document.addEventListener('mouseleave', () => { pointer.x = null; pointer.y = null; });

    const drawNetwork = () => {
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx   = particles[i].x - particles[j].x;
                const dy   = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 115) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(34,211,238,${0.07 * (1 - dist/115)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }

            if (pointer.x && pointer.y) {
                const mx   = particles[i].x - pointer.x;
                const my   = particles[i].y - pointer.y;
                const mDist = Math.sqrt(mx*mx + my*my);
                if (mDist < 140) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(pointer.x, pointer.y);
                    ctx.strokeStyle = `rgba(167,139,250,${0.1 * (1 - mDist/140)})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(drawNetwork);
    };
    drawNetwork();
}

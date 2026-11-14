/* ==========================================================================
   Dhyey Patel — Portfolio Vol. 01
   Vanilla JS: navigation, reveals, hover previews, case studies, small stuff.
   ========================================================================== */

(() => {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ----------------------------------------------------------------------
     Project data + cover artwork
     ---------------------------------------------------------------------- */

  const coverMarkup = (project, lazy = false) => `
    <span class="cover">
      <img
        class="cover__img"
        src="${project.image}"
        alt=""
        width="1600"
        height="1000"
        decoding="async"${lazy ? ' loading="lazy"' : ""}
      />
    </span>`;

  const projects = {
    voicescript: {
      index: "01",
      title: "VoiceScript AI",
      subtitle: "Speech-to-text that keeps up with the conversation.",
      year: "2026",
      role: "Solo — full-stack & UX",
      stack: ["Next.js", "React", "Flask", "PostgreSQL", "Deepgram", "JWT"],
      flow: "Next.js → Flask API → 16kHz WAV conversion → Deepgram → PostgreSQL",
      overview:
        "VoiceScript is a speech-to-text SaaS that records audio in the browser, transcribes it through Deepgram and keeps every transcript searchable, editable and exportable behind JWT authentication.",
      highlights: [
        "Browser MediaRecorder capture, a live waveform and drag-and-drop uploads for WebM, WAV, MP3, M4A and OGG (up to 10MB).",
        "Server-side conversion to 16kHz mono WAV with pydub, including a graceful fallback when ffmpeg is unavailable.",
        "Punctuated Deepgram transcripts with a typewriter reveal, archive search, rename, copy and .txt export.",
        "Next.js App Router front end, Flask API, SQLAlchemy/PostgreSQL persistence and JWT-protected routes.",
      ],
      note: "“The hard part was not transcription — it was making the whole audio lifecycle feel instant.”",
      github: "https://github.com/dhyey2402/VoiceScript-AI",
      live: "https://voice-script-ai-two.vercel.app",
      tag: "Speech to text",
      accent: "#e63c0f",
      image: "assets/images/work/voicescript.jpg",
    },

    procura: {
      index: "02",
      title: "Procura",
      subtitle: "Enterprise procurement without the enterprise drag.",
      year: "2026",
      role: "Solo — full-stack & architecture",
      stack: ["Django", "DRF", "React", "PostgreSQL", "SimpleJWT"],
      flow: "React → DRF API → tenant-scoped models → PostgreSQL",
      overview:
        "Procura is a multi-tenant procurement ERP where organizations operate in complete isolation — with department budgets, twelve enterprise roles and approval chains that change with transaction value.",
      highlights: [
        "Strict tenant isolation: no organization can see another's vendors, users, budgets or transactions.",
        "RFQ → quotation → purchase order → invoice → closure, with an append-only audit trail at every step.",
        "Threshold routing sends low-value requests to a department manager and high-value ones through executive and finance sign-off.",
        "Django + DRF API with SimpleJWT, a React 18 front end and dynamic per-organization branding.",
      ],
      note: "“Enterprise software is mostly permissions, money and edge cases. That is the fun part.”",
      github: "https://github.com/dhyey2402/Procura",
      live: null,
      tag: "Procurement ERP",
      accent: "#9a421c",
      image: "assets/images/work/procura.jpg",
    },

    finora: {
      index: "03",
      title: "Finora",
      subtitle: "Inventory and accounting, finally in sync.",
      year: "2026",
      role: "Solo — full-stack & product",
      stack: ["Next.js 16", "React 19", "FastAPI", "PostgreSQL", "SQLAlchemy"],
      flow: "Next.js → FastAPI → SQLAlchemy 2 → PostgreSQL",
      overview:
        "Finora is a multi-company cloud ERP. Selling an item automatically moves stock, books the sale and updates the ledgers — so inventory and money never drift apart.",
      highlights: [
        "Automatic inventory-to-accounting sync: sales, purchases and vouchers post the right entries without manual double entry.",
        "One account can manage multiple isolated companies, each with customers, suppliers, stock items and ledgers.",
        "Billing, purchasing, reporting and role-aware dashboards in a single workspace.",
        "Next.js 16 + React 19 front end, FastAPI backend, PostgreSQL and SQLAlchemy 2.",
      ],
      note: "“If the books and the warehouse disagree, the product has failed.”",
      github: "https://github.com/dhyey2402/Finora",
      live: "https://finora-theta-murex.vercel.app",
      tag: "Cloud ERP",
      accent: "#3c6244",
      image: "assets/images/work/finora.jpg",
    },

    codesentry: {
      index: "04",
      title: "CodeSentry",
      subtitle: "A second pair of eyes that never gets tired.",
      year: "2026",
      role: "Solo — full-stack & AI integration",
      stack: ["FastAPI", "React", "PostgreSQL", "OpenAI", "Bandit", "Docker"],
      flow: "Upload → static scanners + LLM → scored report → dashboard",
      overview:
        "CodeSentry pairs static analysis with LLM review to surface security flaws, complexity hotspots and refactors in one workspace — before code reaches production.",
      highlights: [
        "Static analysis with Bandit, Flake8 and Radon for vulnerabilities, style and complexity.",
        "LLM-assisted review that turns findings into context-aware fixes and refactoring suggestions.",
        "Project history and dashboards to track quality trends over time.",
        "Docker-ready FastAPI backend, React front end, PostgreSQL and JWT authentication.",
      ],
      note: "“A good review does not just find problems. It explains the smallest fix.”",
      github: "https://github.com/dhyey2402/CodeSentry",
      live: "https://code-sentry-fawn.vercel.app",
      tag: "AI code review",
      accent: "#557a20",
      image: "assets/images/work/codesentry.jpg",
    },

    zuvio: {
      index: "05",
      title: "Zuvio",
      subtitle: "Cloud media storage with rules that hold.",
      year: "2026",
      role: "Solo — architecture & full-stack",
      stack: ["React", "FastAPI", "PostgreSQL", "AWS S3", "Alembic"],
      flow: "Browser → presigned URL → S3 · FastAPI → metadata in PostgreSQL",
      overview:
        "Zuvio is a secure cloud media workspace for teams. Files go straight to object storage through presigned URLs; PostgreSQL only ever holds metadata and permissions.",
      highlights: [
        "Direct-to-cloud uploads: the backend signs a time-bound URL and the browser uploads without proxying large files.",
        "Owner, editor and viewer roles, expiring public links and safe recovery from trash.",
        "Metadata, permissions and activities modelled for auditability, with a versioning-ready schema.",
        "React front end, FastAPI backend, PostgreSQL and S3-compatible object storage.",
      ],
      note: "“Separate the bytes from the rules. Storage scales better that way.”",
      github: "https://github.com/dhyey2402/Zuvio",
      live: null,
      tag: "Media workspace",
      accent: "#2b3bd6",
      image: "assets/images/work/zuvio.jpg",
    },

    quizora: {
      index: "06",
      title: "Quizora",
      subtitle: "Timed assessments that grade themselves.",
      year: "2026",
      role: "Solo — full-stack & product",
      stack: ["FastAPI", "React", "PostgreSQL", "SQLAlchemy", "JWT"],
      flow: "React → FastAPI → SQLAlchemy → PostgreSQL",
      overview:
        "Quizora is an online assessment platform where admins build timed quizzes and students take them in a distraction-free environment. Every submission is validated and scored on the server, then rolled into performance analytics.",
      highlights: [
        "Role-based JWT authentication with bcrypt hashing — separate admin and student surfaces, protected on both ends.",
        "Quiz builder for categories, questions and options, with join codes, durations, passing scores and attempt limits.",
        "Backend-enforced timers and server-side scoring, so results can't be manipulated from the browser.",
        "Instant results with correct, incorrect and unanswered breakdowns, plus score history and progress analytics.",
      ],
      note: "“A quiz timer is only fair when the server owns the clock.”",
      github: "https://github.com/dhyey2402/Cognivault",
      live: "https://quizora-two.vercel.app",
      tag: "Assessment platform",
      accent: "#6a3fbf",
      image: "assets/images/work/quizora.jpg",
    },

    signly: {
      index: "07",
      title: "Signly",
      subtitle: "PDF signatures with a paper trail.",
      year: "2026",
      role: "Solo — full-stack & product",
      stack: ["FastAPI", "React", "PostgreSQL", "PyMuPDF", "JWT"],
      flow: "React → FastAPI → PyMuPDF stamping → PostgreSQL",
      overview:
        "Signly takes a PDF from upload to signed copy: place signature fields, share a tokenized public link and collect a signature — while every view, rejection and download lands in an audit trail.",
      highlights: [
        "Drag-and-drop signature placement stored as relative coordinates, so fields land correctly on any page size.",
        "Public signing links with UUID tokens and 7-day expiry — recipients never need an account.",
        "PyMuPDF stamps signatures into the document; owners download the original or the signed PDF.",
        "Lifecycle audit trail with timestamps and IP addresses, plus dashboard KPIs and downloadable reports.",
      ],
      note: "“A signature is a promise. The audit trail is the proof.”",
      github: "https://github.com/dhyey2402/document-signature-app",
      live: "https://signly-omega.vercel.app",
      tag: "Document signing",
      accent: "#a3341f",
      image: "assets/images/work/signly.jpg",
    },

    aegisone: {
      index: "08",
      title: "AegisOne",
      subtitle: "The whole insurance lifecycle in one system.",
      year: "2026",
      role: "Solo — full-stack",
      stack: ["Flask", "React", "PostgreSQL", "SQLAlchemy", "JWT"],
      flow: "React → Flask API → SQLAlchemy → PostgreSQL",
      overview:
        "AegisOne is an insurance management platform that keeps customers, policies, premium payments, claims and documents in one place — so a policy's story is never spread across five spreadsheets.",
      highlights: [
        "Full policy lifecycle — issue, renew and lapse — with customer records and document attachments.",
        "Claims pipeline from intimation to settlement, with status tracking and reviewer notes.",
        "Premium payment ledger and renewal visibility, surfaced in a real-time portfolio dashboard.",
        "JWT-secured Flask API with Marshmallow validation, SQLAlchemy models and PostgreSQL persistence.",
      ],
      note: "“Insurance is a business of promises. The software should never lose one.”",
      github: "https://github.com/dhyey2402/AegisOne",
      live: "https://aegisone-nine.vercel.app",
      tag: "Insurance platform",
      accent: "#175e7a",
      image: "assets/images/work/aegisone.jpg",
    },

    scriva: {
      index: "09",
      title: "Scriva",
      subtitle: "A portfolio that edits itself.",
      year: "2026",
      role: "Solo — full-stack & architecture",
      stack: ["Django", "DRF", "React", "PostgreSQL", "JWT"],
      flow: "React CMS + public site → DRF API → Neon PostgreSQL",
      overview:
        "Scriva is a decoupled portfolio publishing engine: a private CMS where every section is editable and a public portfolio that reads only what has been published — both on one Django REST API.",
      highlights: [
        "Two surfaces, one API: an authenticated React CMS and a public portfolio restricted to PUBLISHED records.",
        "Content models for profile, projects, writing, experience, testimonials, skills and social links.",
        "Draft-to-published workflow enforced at the ORM layer, so unfinished work never leaks.",
        "JWT access and refresh tokens, multipart media uploads, and a contact form that persists and emails.",
      ],
      note: "“Publishing should be a decision, not a deploy.”",
      github: "https://github.com/dhyey2402/Scriva",
      live: "https://scriva-nine.vercel.app",
      tag: "Portfolio CMS",
      accent: "#7a4b8c",
      image: "assets/images/work/scriva.jpg",
    },
  };

  $$(".work-card").forEach((card) => {
    const project = projects[card.dataset.project];
    const art = $(".work-card__art", card);
    if (project && art) art.innerHTML = coverMarkup(project, true);
  });

  /* ----------------------------------------------------------------------
     Footer year + local time
     ---------------------------------------------------------------------- */

  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const timeEl = $("#localTime");
  const updateClock = () => {
    if (!timeEl) return;
    const time = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    }).format(new Date());
    timeEl.textContent = `${time} IST`;
  };
  updateClock();
  window.setInterval(updateClock, 30000);

  /* ----------------------------------------------------------------------
     Navigation: scroll state, hide-on-scroll, progress bar
     ---------------------------------------------------------------------- */

  const nav = $("#nav");
  const progress = $("#progress");
  let lastScrollY = window.scrollY;
  let menuOpen = false;

  const handleScroll = () => {
    const y = window.scrollY;

    if (nav) {
      nav.classList.toggle("is-scrolled", y > 18);
      if (!menuOpen && y > 420 && y > lastScrollY) {
        nav.classList.add("is-hidden");
      } else {
        nav.classList.remove("is-hidden");
      }
    }

    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    }

    lastScrollY = y;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  /* ----------------------------------------------------------------------
     Mobile menu
     ---------------------------------------------------------------------- */

  const menu = $("#menu");
  const menuOpenBtn = $("#menuOpen");
  const menuCloseBtn = $("#menuClose");
  let menuTimer = null;

  const openMenu = () => {
    if (!menu) return;
    window.clearTimeout(menuTimer);
    menu.hidden = false;
    menuOpen = true;
    document.body.classList.add("is-locked");
    if (menuOpenBtn) menuOpenBtn.setAttribute("aria-expanded", "true");
    window.requestAnimationFrame(() => {
      menu.classList.add("is-open");
      if (menuCloseBtn) menuCloseBtn.focus();
    });
  };

  const closeMenu = (restoreFocus = true) => {
    if (!menu || !menuOpen) return;
    menu.classList.remove("is-open");
    menuOpen = false;
    document.body.classList.remove("is-locked");
    if (menuOpenBtn) menuOpenBtn.setAttribute("aria-expanded", "false");
    menuTimer = window.setTimeout(() => {
      menu.hidden = true;
      if (restoreFocus && menuOpenBtn) menuOpenBtn.focus();
    }, 340);
  };

  if (menuOpenBtn) menuOpenBtn.addEventListener("click", openMenu);
  if (menuCloseBtn) menuCloseBtn.addEventListener("click", () => closeMenu());
  $$(".menu__nav a").forEach((link) => {
    link.addEventListener("click", () => closeMenu(false));
  });

  /* ----------------------------------------------------------------------
     In-page navigation that never leaves a fragment in the address bar
     ---------------------------------------------------------------------- */

  const stripHashFromUrl = () => {
    if (!window.location.hash) return;
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  };

  stripHashFromUrl();
  window.addEventListener("hashchange", stripHashFromUrl);

  document.addEventListener("click", (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const link = event.target.closest?.('a[href*="#"]');
    if (!link) return;

    const url = new URL(link.href, document.baseURI);
    if (
      url.origin !== window.location.origin ||
      url.pathname !== window.location.pathname ||
      url.search !== window.location.search
    ) {
      return;
    }

    const id = url.hash.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return;

    event.preventDefault();
    if (id === "top") {
      window.scrollTo({ top: 0 });
    } else {
      target.scrollIntoView({ block: "start" });
      if (link.classList.contains("skip-link")) {
        target.focus({ preventScroll: true });
      }
    }
    stripHashFromUrl();
  });

  /* ----------------------------------------------------------------------
     Reveal on scroll + count-up stats
     ---------------------------------------------------------------------- */

  const revealEls = $$(".reveal");

  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in-view"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count || "0");
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progressValue = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progressValue, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (progressValue < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target.toFixed(decimals);
      }
    };

    window.requestAnimationFrame(step);
  };

  const counters = $$("[data-count]");
  if (counters.length) {
    if (prefersReduced || !("IntersectionObserver" in window)) {
      counters.forEach((el) => {
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        el.textContent = parseFloat(el.dataset.count).toFixed(decimals);
      });
    } else {
      const countObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            animateCount(entry.target);
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach((el) => countObserver.observe(el));
    }
  }

  /* ----------------------------------------------------------------------
     Hero portrait parallax
     ---------------------------------------------------------------------- */

  const portraitFrame = $("#portraitFrame");
  const hero = $("#top");
  if (portraitFrame && hero && finePointer && !prefersReduced) {
    hero.addEventListener("pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      portraitFrame.style.transform = `translate3d(${(x * -9).toFixed(2)}px, ${(y * -7).toFixed(2)}px, 0)`;
    });
    hero.addEventListener("pointerleave", () => {
      portraitFrame.style.transform = "";
    });
  }

  /* ----------------------------------------------------------------------
     Case study dialog
     ---------------------------------------------------------------------- */

  const workList = $("#workList");
  const caseEl = $("#case");
  const caseSheet = $("#caseSheet");
  const caseScroll = $("#caseScroll");
  const caseCover = $("#caseCover");
  const casePrevBtn = $("#casePrev");
  const caseNextBtn = $("#caseNext");
  const caseKeys = Object.keys(projects);
  let lastFocused = null;
  let caseCloseTimer = null;
  let caseKey = null;

  const setText = (selector, value) => {
    const el = $(selector);
    if (el) el.textContent = value;
  };

  const buildLinks = (project) => {
    const links = [];

    if (project.live) {
      links.push(`
        <a class="case__link case__link--live" href="${project.live}" target="_blank" rel="noopener">
          <span>Live demo</span>
          <svg class="icon" aria-hidden="true"><use href="#i-arrow-up-right"></use></svg>
        </a>`);
    }

    if (project.github) {
      links.push(`
        <a class="case__link" href="${project.github}" target="_blank" rel="noopener">
          <span>View source</span>
          <svg class="icon" aria-hidden="true"><use href="#i-github"></use></svg>
        </a>`);
    }

    return links.join("");
  };

  const renderCase = (key) => {
    const project = projects[key];
    if (!project || !caseEl) return;

    caseKey = key;
    caseSheet?.style.setProperty("--case-accent", project.accent);

    setText("#caseIndex", project.index);
    setText("#caseKicker", `Case study — ${project.year}`);
    setText("#caseLabel", project.tag);
    setText("#caseTitle", project.title);
    setText("#caseSubtitle", project.subtitle);
    setText("#caseRole", project.role);
    setText("#caseYear", project.year);
    setText("#caseFlow", project.flow);
    setText("#caseOverview", project.overview);
    setText("#caseNote", project.note);
    setText("#caseVisualNote", `Built with ${project.stack.slice(0, 3).join(" · ")}`);

    if (caseCover) caseCover.innerHTML = coverMarkup(project);

    const stack = $("#caseStack");
    if (stack) stack.innerHTML = project.stack.map((item) => `<span>${item}</span>`).join("");

    const links = $("#caseLinks");
    if (links) links.innerHTML = buildLinks(project);

    const highlights = $("#caseHighlights");
    if (highlights) highlights.innerHTML = project.highlights.map((item) => `<li>${item}</li>`).join("");
  };

  const switchCase = (direction) => {
    if (!caseKey) return;
    const index = caseKeys.indexOf(caseKey);
    if (index < 0) return;

    renderCase(caseKeys[(index + direction + caseKeys.length) % caseKeys.length]);

    if (caseScroll) {
      caseScroll.scrollTop = 0;
      if (!prefersReduced) {
        caseScroll.animate(
          [
            { opacity: 0, transform: "translateY(16px)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 420, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
        );
      }
    }
  };

  const openCase = (key) => {
    const project = projects[key];
    if (!project || !caseEl) return;

    lastFocused = document.activeElement;
    renderCase(key);

    window.clearTimeout(caseCloseTimer);
    caseEl.hidden = false;
    document.body.classList.add("is-locked");

    window.requestAnimationFrame(() => {
      caseEl.classList.add("is-open");
      if (caseScroll) caseScroll.scrollTop = 0;
      if (caseSheet) caseSheet.focus({ preventScroll: true });
    });
  };

  const closeCase = () => {
    if (!caseEl || caseEl.hidden) return;

    caseEl.classList.remove("is-open");
    document.body.classList.remove("is-locked");
    window.clearTimeout(caseCloseTimer);

    caseCloseTimer = window.setTimeout(() => {
      caseEl.hidden = true;
      if (lastFocused && typeof lastFocused.focus === "function") {
        lastFocused.focus({ preventScroll: true });
      }
    }, 400);
  };

  if (caseEl) {
    $$("[data-close]", caseEl).forEach((el) => el.addEventListener("click", closeCase));
    casePrevBtn?.addEventListener("click", () => switchCase(-1));
    caseNextBtn?.addEventListener("click", () => switchCase(1));

    caseEl.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        switchCase(1);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        switchCase(-1);
        return;
      }
      if (event.key !== "Tab" || !caseSheet) return;

      const focusable = $$(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        caseSheet
      ).filter((el) => el.offsetParent !== null);

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  if (workList) {
    $$(".work-card", workList).forEach((card) => {
      card.addEventListener("click", (event) => {
        const key = card.dataset.project;
        if (!projects[key]) return;
        event.preventDefault();
        openCase(key);
      });
    });
  }

  /* ----------------------------------------------------------------------
     Resume preview dialog — pages rendered in-page with PDF.js, custom UI
     ---------------------------------------------------------------------- */

  const resumeEl = $("#resumeModal");
  const resumeSheet = $("#resumeSheet");
  const resumeViewer = $("#resumeViewer");
  const resumeStage = $("#resumeStage");
  const resumePages = $("#resumePages");
  const resumeMessage = $("#resumeMessage");
  const resumeStatus = $("#resumeStatus");
  const resumeProgress = $("#resumeProgress");
  const resumePageMeta = $("#resumePageMeta");
  const resumeZoomLabel = $("#resumeZoom");
  const resumeFit = $("#resumeFit");
  const resumePager = $("#resumePager");
  const resumePageLabel = $("#resumePage");
  const resumePrev = $("#resumePrev");
  const resumeNext = $("#resumeNext");
  const resumeZoomButtons = $$("[data-resume-zoom]", resumeEl || document);

  const RESUME_ZOOM_MIN = 0.25;
  const RESUME_ZOOM_MAX = 4;
  const RESUME_ZOOM_STEP = 0.25;
  const RESUME_SCREEN_SCALE = 96 / 72;

  let resumeLastFocused = null;
  let resumeCloseTimer = null;
  let resumeLoadPromise = null;
  let resumeDoc = null;
  let resumePagesData = [];
  let resumeZoom = 1;
  let resumeFitActive = false;
  let resumeResetView = false;
  let resumeCurrentPage = 1;
  let resumeRenderToken = 0;
  let resumeRenderTimer = null;
  let resumeResizeTimer = null;
  let resumeTasks = [];
  let resumePan = null;

  const setResumeProgress = (value) => {
    if (!resumeProgress) return;
    const bar = resumeProgress.firstElementChild;
    resumeProgress.classList.add("is-active");
    if (bar) {
      bar.style.width = `${Math.min(100, Math.max(0, Math.round(value * 100)))}%`;
    }
  };

  const hideResumeProgress = () => {
    resumeProgress?.classList.remove("is-active");
  };

  const bumpResumeZoom = () => {
    if (!resumeZoomLabel) return;
    resumeZoomLabel.classList.remove("is-bump");
    void resumeZoomLabel.offsetWidth;
    resumeZoomLabel.classList.add("is-bump");
  };

  const resumeStageHasOverflow = () =>
    !!resumeStage &&
    (resumeStage.scrollWidth > resumeStage.clientWidth + 1 ||
      resumeStage.scrollHeight > resumeStage.clientHeight + 1);

  const syncResumeStageCursor = () => {
    resumeStage?.classList.toggle("is-pannable", resumeStageHasOverflow());
  };

  const setResumeControlsEnabled = (enabled) => {
    resumeZoomButtons.forEach((button) => {
      button.disabled = !enabled;
    });
    if (resumeFit) resumeFit.disabled = !enabled;
    if (resumePrev) resumePrev.disabled = !enabled || resumeCurrentPage <= 1;
    if (resumeNext) resumeNext.disabled = !enabled || resumeCurrentPage >= resumePagesData.length;
  };

  const updatePagerUI = () => {
    if (!resumePager) return;
    resumePager.hidden = resumePagesData.length <= 1;
    if (resumePageLabel) {
      resumePageLabel.textContent = `${resumeCurrentPage} / ${Math.max(1, resumePagesData.length)}`;
    }
    if (resumePrev) resumePrev.disabled = resumeCurrentPage <= 1;
    if (resumeNext) resumeNext.disabled = resumeCurrentPage >= resumePagesData.length;
  };

  const updateCurrentPage = () => {
    if (!resumeStage || !resumePages) return;

    if (resumePagesData.length < 2) {
      if (resumeCurrentPage !== 1) {
        resumeCurrentPage = 1;
        updatePagerUI();
      }
      return;
    }

    const stageTop = resumeStage.getBoundingClientRect().top;
    const probe = stageTop + Math.min(resumeStage.clientHeight * 0.4, 180);
    let current = 1;

    $$(".resume-viewer__page", resumePages).forEach((pageEl) => {
      if (pageEl.getBoundingClientRect().top <= probe) {
        current = Number(pageEl.dataset.page) || current;
      }
    });

    if (current !== resumeCurrentPage) {
      resumeCurrentPage = current;
      updatePagerUI();
    }
  };

  const goToResumePage = (delta) => {
    if (!resumeStage || !resumePages || resumePagesData.length < 2) return;

    const target = Math.min(resumePagesData.length, Math.max(1, resumeCurrentPage + delta));
    const pageEl = $$(".resume-viewer__page", resumePages)[target - 1];
    if (!pageEl) return;

    resumeCurrentPage = target;
    updatePagerUI();
    const top =
      pageEl.getBoundingClientRect().top -
      resumeStage.getBoundingClientRect().top +
      resumeStage.scrollTop -
      12;

    resumeStage.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
  };

  const cancelResumeTasks = () => {
    resumeTasks.forEach((task) => {
      try {
        task.cancel();
      } catch {
        /* render already settled */
      }
    });
    resumeTasks = [];
  };

  const showResumeError = (error) => {
    console.error("Résumé preview failed:", error);
    hideResumeProgress();
    resumeViewer?.classList.add("is-error");
    resumeViewer?.classList.remove("is-loading");
    if (resumeMessage) {
      resumeMessage.textContent = "Preview unavailable — use “Download PDF” instead.";
      resumeMessage.hidden = false;
    }
    if (resumeStatus) resumeStatus.textContent = "PDF";
    setResumeControlsEnabled(false);
  };

  const renderResume = async () => {
    if (!resumeDoc || !resumeStage || !resumePages || !resumeEl || resumeEl.hidden) return;

    const token = ++resumeRenderToken;
    cancelResumeTasks();

    const stageStyle = window.getComputedStyle(resumeStage);
    const padX = parseFloat(stageStyle.paddingLeft) + parseFloat(stageStyle.paddingRight);
    const padY = parseFloat(stageStyle.paddingTop) + parseFloat(stageStyle.paddingBottom);
    const availableWidth = Math.max(160, resumeStage.clientWidth - padX);
    const availableHeight = Math.max(160, resumeStage.clientHeight - padY);
    const first = resumePagesData[0];
    if (!first) return;

    const fitScale = Math.min(availableWidth / first.width, availableHeight / first.height);
    if (resumeFitActive) {
      resumeZoom = fitScale / RESUME_SCREEN_SCALE;
    }
    const scale = resumeZoom * RESUME_SCREEN_SCALE;
    const outputScale = Math.min(window.devicePixelRatio || 1, 2);

    const previousWidth = resumePages.offsetWidth;
    const previousHeight = resumePages.offsetHeight;
    const resetView = resumeResetView;
    resumeResetView = false;
    const focusX =
      !resetView && previousWidth
        ? (resumeStage.scrollLeft + resumeStage.clientWidth / 2) / previousWidth
        : 0.5;
    const focusY =
      !resetView && previousHeight
        ? (resumeStage.scrollTop + resumeStage.clientHeight / 2) / previousHeight
        : 0.5;

    const pageEls = $$(".resume-viewer__page", resumePages);
    if (pageEls.length !== resumePagesData.length) return;

    try {
      for (let index = 0; index < resumePagesData.length; index += 1) {
        if (token !== resumeRenderToken) return;

        const viewport = resumePagesData[index].page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.floor(viewport.width * outputScale));
        canvas.height = Math.max(1, Math.floor(viewport.height * outputScale));
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;
        canvas.setAttribute("role", "img");
        canvas.setAttribute(
          "aria-label",
          `Résumé page ${index + 1} of ${resumePagesData.length}`
        );

        const task = resumePagesData[index].page.render({
          canvasContext: canvas.getContext("2d", { alpha: false }),
          viewport,
          transform:
            outputScale === 1 ? null : [outputScale, 0, 0, outputScale, 0, 0],
        });
        resumeTasks.push(task);
        await task.promise;

        if (token !== resumeRenderToken) return;
        pageEls[index].replaceChildren(canvas);
      }
    } catch (error) {
      if (token !== resumeRenderToken || error?.name === "RenderingCancelledException") {
        return;
      }
      showResumeError(error);
      return;
    }

    if (token !== resumeRenderToken) return;

    resumeTasks = [];
    hideResumeProgress();
    if (resumeMessage) resumeMessage.hidden = true;
    resumeViewer?.classList.remove("is-loading", "is-error");
    if (resumeStatus) resumeStatus.textContent = "PDF · VECTOR";
    if (resumeZoomLabel) {
      resumeZoomLabel.textContent = `${Math.round(resumeZoom * 100)}%`;
    }
    resumeFit?.classList.toggle("is-active", resumeFitActive);
    updatePagerUI();
    syncResumeStageCursor();

    if (resetView || (previousWidth && previousHeight)) {
      window.requestAnimationFrame(() => {
        if (token !== resumeRenderToken) return;
        if (resetView) {
          resumeStage.scrollLeft = 0;
          resumeStage.scrollTop = 0;
        } else {
          resumeStage.scrollLeft =
            focusX * resumePages.offsetWidth - resumeStage.clientWidth / 2;
          resumeStage.scrollTop =
            focusY * resumePages.offsetHeight - resumeStage.clientHeight / 2;
        }
        syncResumeStageCursor();
      });
    }
  };

  const scheduleResumeRender = () => {
    window.clearTimeout(resumeRenderTimer);
    resumeRenderTimer = window.setTimeout(renderResume, 90);
  };

  const loadResumeDoc = () => {
    if (resumeDoc) return Promise.resolve(resumeDoc);
    if (resumeLoadPromise) return resumeLoadPromise;

    resumeLoadPromise = (async () => {
      setResumeProgress(0.06);
      const pdfjs = await import(new URL("vendor/pdfjs/pdf.min.js", document.baseURI).href);
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "vendor/pdfjs/pdf.worker.min.js",
        document.baseURI
      ).href;

      const loadingTask = pdfjs.getDocument({
        url: new URL("assets/resume.pdf", document.baseURI).href,
      });
      loadingTask.onProgress = ({ loaded, total }) => {
        if (total) setResumeProgress(loaded / total);
      };

      const doc = await loadingTask.promise;
      setResumeProgress(1);
      const pages = [];

      for (let index = 1; index <= doc.numPages; index += 1) {
        const page = await doc.getPage(index);
        const viewport = page.getViewport({ scale: 1 });
        pages.push({ page, width: viewport.width, height: viewport.height });
      }

      resumeDoc = doc;
      resumePagesData = pages;
      if (resumePageMeta) resumePageMeta.textContent = String(doc.numPages);
      return doc;
    })().catch((error) => {
      resumeLoadPromise = null;
      throw error;
    });

    return resumeLoadPromise;
  };

  const buildResumePages = () => {
    if (!resumePages) return;

    resumePages.textContent = "";
    const fragment = document.createDocumentFragment();
    resumePagesData.forEach((entry, index) => {
      const pageEl = document.createElement("div");
      pageEl.className = "resume-viewer__page";
      pageEl.dataset.page = String(index + 1);
      fragment.appendChild(pageEl);
    });
    resumePages.appendChild(fragment);
    resumeCurrentPage = 1;
  };

  const startResumeViewer = () => {
    if (!resumeEl || resumeEl.hidden || !resumePages) return;

    resumeZoom = 1;
    resumeFitActive = false;
    resumeResetView = true;
    resumeFit?.classList.remove("is-active");
    if (resumeStatus) resumeStatus.textContent = "PDF · VECTOR";
    resumeStage?.scrollTo({ top: 0, left: 0, behavior: "auto" });

    if (!resumePages.childElementCount) {
      resumeViewer?.classList.remove("is-error");
      if (resumeMessage) {
        resumeMessage.textContent = "Rendering résumé…";
        resumeMessage.hidden = false;
      }
    }

    loadResumeDoc()
      .then(() => {
        if (!resumeEl || resumeEl.hidden) return;
        if (resumePages.childElementCount !== resumePagesData.length) {
          buildResumePages();
        }
        setResumeControlsEnabled(true);
        updatePagerUI();
        return renderResume();
      })
      .catch(showResumeError);
  };

  const setResumeZoom = (direction) => {
    if (!resumeDoc) return;

    const next = Math.round((resumeZoom + direction * RESUME_ZOOM_STEP) * 100) / 100;
    if (next === resumeZoom || next < RESUME_ZOOM_MIN || next > RESUME_ZOOM_MAX) {
      return;
    }

    resumeZoom = next;
    resumeFitActive = false;
    resumeFit?.classList.remove("is-active");
    bumpResumeZoom();
    scheduleResumeRender();
  };

  const fitResume = () => {
    if (!resumeDoc) return;
    resumeFitActive = true;
    resumeFit?.classList.add("is-active");
    bumpResumeZoom();
    scheduleResumeRender();
  };

  const toggleResumeZoom = () => {
    if (!resumeDoc) return;

    if (resumeFitActive) {
      resumeFitActive = false;
      resumeZoom = 1;
      resumeFit?.classList.remove("is-active");
    } else {
      resumeFitActive = true;
      resumeFit?.classList.add("is-active");
    }

    bumpResumeZoom();
    scheduleResumeRender();
  };

  const openResume = (trigger) => {
    if (!resumeEl || !resumeEl.hidden) return;

    resumeLastFocused = trigger || document.activeElement;
    window.clearTimeout(resumeCloseTimer);
    resumeEl.hidden = false;
    document.body.classList.add("is-locked");

    window.requestAnimationFrame(() => {
      resumeEl.classList.add("is-open");
      if (resumeSheet) resumeSheet.focus({ preventScroll: true });
      startResumeViewer();
    });
  };

  const closeResume = () => {
    if (!resumeEl || resumeEl.hidden) return;

    resumeEl.classList.remove("is-open");
    document.body.classList.remove("is-locked");
    window.clearTimeout(resumeCloseTimer);
    window.clearTimeout(resumeRenderTimer);
    resumeRenderToken += 1;
    cancelResumeTasks();
    hideResumeProgress();
    resumePan = null;
    resumeStage?.classList.remove("is-panning");

    resumeCloseTimer = window.setTimeout(() => {
      resumeEl.hidden = true;
      if (resumeLastFocused && typeof resumeLastFocused.focus === "function") {
        resumeLastFocused.focus({ preventScroll: true });
      }
    }, 400);
  };

  if (resumeEl) {
    $$("[data-resume-close]", resumeEl).forEach((el) =>
      el.addEventListener("click", closeResume)
    );

    resumeZoomButtons.forEach((button) => {
      button.addEventListener("click", () => {
        setResumeZoom(button.dataset.resumeZoom === "in" ? 1 : -1);
      });
    });

    resumeFit?.addEventListener("click", fitResume);
    resumePrev?.addEventListener("click", () => goToResumePage(-1));
    resumeNext?.addEventListener("click", () => goToResumePage(1));

    resumeStage?.addEventListener("scroll", updateCurrentPage, { passive: true });

    resumeStage?.addEventListener(
      "wheel",
      (event) => {
        if (!event.ctrlKey && !event.metaKey) return;
        event.preventDefault();
        setResumeZoom(event.deltaY < 0 ? 1 : -1);
      },
      { passive: false }
    );

    resumeStage?.addEventListener("pointerdown", (event) => {
      if (
        event.pointerType !== "mouse" ||
        event.button !== 0 ||
        !resumeStageHasOverflow()
      ) {
        return;
      }

      resumePan = {
        pointerId: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        left: resumeStage.scrollLeft,
        top: resumeStage.scrollTop,
      };
      resumeStage.setPointerCapture(event.pointerId);
      resumeStage.classList.add("is-panning");
    });

    resumeStage?.addEventListener("pointermove", (event) => {
      if (!resumePan || event.pointerId !== resumePan.pointerId) return;
      resumeStage.scrollLeft = resumePan.left - (event.clientX - resumePan.x);
      resumeStage.scrollTop = resumePan.top - (event.clientY - resumePan.y);
    });

    const endResumePan = () => {
      if (!resumePan) return;
      if (resumeStage.hasPointerCapture(resumePan.pointerId)) {
        resumeStage.releasePointerCapture(resumePan.pointerId);
      }
      resumePan = null;
      resumeStage.classList.remove("is-panning");
    };

    resumeStage?.addEventListener("pointerup", endResumePan);
    resumeStage?.addEventListener("pointercancel", endResumePan);

    resumeStage?.addEventListener("dblclick", (event) => {
      if (!resumeDoc) return;
      event.preventDefault();
      toggleResumeZoom();
    });

    resumeEl.addEventListener("keydown", (event) => {
      if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        setResumeZoom(1);
        return;
      }
      if (event.key === "-") {
        event.preventDefault();
        setResumeZoom(-1);
        return;
      }
      if (event.key === "0") {
        event.preventDefault();
        fitResume();
        return;
      }
      if (event.key !== "Tab" || !resumeSheet) return;

      const focusable = $$(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        resumeSheet
      ).filter((el) => el.offsetParent !== null);

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (
        event.shiftKey &&
        (document.activeElement === first || document.activeElement === resumeSheet)
      ) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (resumeEl.hidden || !resumeDoc) return;
      window.clearTimeout(resumeResizeTimer);
      resumeResizeTimer = window.setTimeout(renderResume, 180);
    });
  }

  $$("[data-resume-open]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      event.preventDefault();
      openResume(link);
    });
  });

  /* Global escape closes menu or dialog */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (resumeEl && !resumeEl.hidden) {
      closeResume();
    } else if (caseEl && !caseEl.hidden) {
      closeCase();
    } else if (menuOpen) {
      closeMenu();
    }
  });

  /* ----------------------------------------------------------------------
     Copy email + toast
     ---------------------------------------------------------------------- */

  const toast = $("#toast");
  let toastTimer = null;

  const showToast = () => {
    if (!toast) return;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      let copied = false;
      try {
        copied = document.execCommand("copy");
      } catch (fallbackError) {
        copied = false;
      }
      document.body.removeChild(textarea);
      return copied;
    }
  };

  const copyBtn = $("#copyEmail");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const email = copyBtn.dataset.email || "dhyeyp060@gmail.com";
      const copied = await copyText(email);
      if (toast) {
        toast.textContent = copied ? "Email copied — talk soon." : "Email: " + email;
      }
      showToast();
    });
  }
  const aboutSpec = $("#aboutSpec");
  if (aboutSpec) {
    const specStamp = $("#specStamp");
    aboutSpec.addEventListener("click", () => {
      if (!specStamp) return;
      aboutSpec.classList.remove("is-thumping");
      specStamp.classList.remove("is-stamped");
      void specStamp.getBoundingClientRect();
      specStamp.classList.add("is-stamped");
      aboutSpec.classList.add("is-thumping");
    });
    aboutSpec.addEventListener("animationend", () => {
      aboutSpec.classList.remove("is-thumping");
    });
  }
})();

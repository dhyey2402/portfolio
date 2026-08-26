// Resume data for the interactive resume preview
// This data drives the beautifully rendered resume modal

export const RESUME_DATA = {
  name: 'Dhyey Patel',
  title: 'Backend Engineer & AI Developer',
  tagline: 'Building scalable APIs, intelligent systems, and production-grade SaaS platforms',
  contact: {
    email: 'dhyeyp060@gmail.com',
    location: 'Ahmedabad, Gujarat, India',
    github: 'github.com/dhyey2402',
    linkedin: 'linkedin.com/in/dhyey-patel-1b304b306',
    portfolio: 'dhyey2402.github.io/portfolio',
  },
  summary:
    'Passionate Backend Engineer & AI Developer with hands-on experience building scalable backend services, secure APIs, and intelligent applications. Experienced in bridging modern AI capabilities with production-ready backend systems. Built AI platforms, enterprise ERPs, and database-intensive SaaS tools using Python, Django, FastAPI, and PostgreSQL.',
  education: {
    degree: 'B.Tech in Computer Science',
    institution: 'Karnavati University / UnitedWorld Institute of Technology',
    period: '2024 — 2028',
    location: 'Ahmedabad, India',
  },
  skills: [
    { category: 'Languages', items: ['Python', 'JavaScript (ES6+)', 'SQL', 'HTML/CSS'] },
    { category: 'Backend & APIs', items: ['Django', 'Flask', 'FastAPI', 'REST APIs', 'JWT Auth', 'Middleware'] },
    { category: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Query Optimization'] },
    { category: 'AI / ML', items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'NLP', 'OpenCV', 'LLM APIs'] },
    { category: 'Tools & DevOps', items: ['Git', 'Docker', 'Linux', 'AWS', 'Vercel', 'Postman', 'VS Code'] },
    { category: 'Frontend', items: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Responsive Design'] },
  ],
  projects: [
    {
      name: 'CodeSentry',
      role: 'AI Code Review Platform',
      period: '2024',
      bullets: [
        'Built AI-powered code review and static analysis platform using FastAPI + React',
        'Designed comprehensive 5-metric scoring system across Quality, Security, Performance, Readability, and Complexity',
        'Implemented automated security vulnerability detection with intelligent AI suggestions',
      ],
    },
    {
      name: 'Finora',
      role: 'Cloud ERP System',
      period: '2024',
      bullets: [
        'Engineered multi-tenant cloud ERP with double-entry accounting and automated inventory sync',
        'Built with Next.js + FastAPI + PostgreSQL with Row-Level Security for tenant isolation',
        'Designed immutable ledger system where every stock movement generates automatic journal entries',
      ],
    },
    {
      name: 'JalDarshi AI',
      role: 'AI Flood Forecasting System',
      period: '2024',
      bullets: [
        'Developed real-time AI flood prediction system using soft-voting ensemble (XGBoost + RF + GB)',
        'Achieved 91.2% ROC-AUC accuracy in historical back-testing, outperforming baselines by 14%',
        'Built with Django + React, ingesting live meteorological data for localized risk assessment',
      ],
    },
    {
      name: 'Trackademic AI',
      role: 'Smart Classroom CV System',
      period: '2024',
      bullets: [
        'Created AI-powered attendance system using real-time face recognition with 98% accuracy',
        'Implemented edge-to-cloud architecture sending only lightweight facial embeddings to FastAPI backend',
        'Used PostgreSQL with pgvector extensions for rapid nearest-neighbor face matching',
      ],
    },
    {
      name: 'EduFusionERP',
      role: 'Educational Enterprise ERP',
      period: '2024',
      bullets: [
        'Built comprehensive ERP with Flask + SQLAlchemy managing 30+ heavily relational tables',
        'Designed granular RBAC system supporting extremely fine-grained access control',
        'Reduced administrative data-entry time by 40% across 5 unified workflows',
      ],
    },
    {
      name: 'Procura',
      role: 'Procurement SaaS Platform',
      period: '2024',
      bullets: [
        'Developed multi-tenant SaaS procurement platform with Django REST Framework + React 18',
        'Built dynamic approval workflow engine with sequential and parallel approval chains',
        'Implemented real-time budget tracking and vendor portal with JWT-based stateless auth',
      ],
    },
  ],
  interests: ['Open Source Contributions', 'System Design', 'AI Research', 'Cloud Architecture', 'Competitive Programming'],
};

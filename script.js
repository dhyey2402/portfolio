// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile Menu
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const navbar = document.getElementById('navbar');

let isMenuOpen = false;

mobileBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        // Small timeout to allow display:block to apply before changing opacity
        setTimeout(() => {
            mobileMenu.classList.remove('opacity-0');
        }, 10);
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
    }, 300);
    mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = 'auto';
}

mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg');
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
    } else {
        navbar.classList.remove('shadow-lg');
        navbar.style.background = 'rgba(10, 10, 10, 0.6)';
    }
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate Bento Cards
gsap.utils.toArray('.bento-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: i * 0.1
    });
});

// Animate Skill Categories
gsap.utils.toArray('.skill-category-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: i * 0.1
    });
});

// Animate Projects
gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: i * 0.15
    });
});

// Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Form inputs
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Visual feedback
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
        btn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            console.log('Form Data:', { name, email, subject, message });
            btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully';
            contactForm.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// Project Modal Logic
const projectModal = document.getElementById('project-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalCard = document.getElementById('modal-card');

const titleEls = document.querySelectorAll('.project-title-btn');

titleEls.forEach(btn => {
    btn.addEventListener('click', () => {
        // Populate Strings
        document.getElementById('modal-title').textContent = btn.getAttribute('data-p-title');
        document.getElementById('modal-overview').textContent = btn.getAttribute('data-p-overview');
        document.getElementById('modal-challenges').textContent = btn.getAttribute('data-p-challenges');
        
        // Helper: Tech Stack Populator
        const populateTechs = (containerId, attributeName) => {
            const container = document.getElementById(containerId);
            container.innerHTML = '';
            const techsData = btn.getAttribute(attributeName);
            if(techsData) {
                techsData.split(',').forEach(t => {
                    if(!t.trim()) return;
                    const span = document.createElement('span');
                    span.className = 'text-xs font-medium text-gray-300 py-1 px-3 rounded-full bg-white/5 border border-white/10';
                    span.textContent = t.trim();
                    container.appendChild(span);
                });
            } else {
                container.innerHTML = '<span class="text-xs text-gray-600 italic">None</span>';
            }
        };

        populateTechs('modal-tech-frontend', 'data-p-tech-frontend');
        populateTechs('modal-tech-backend', 'data-p-tech-backend');
        populateTechs('modal-tech-db', 'data-p-tech-db');

        // Helper: Lists Populator
        const populateList = (containerId, attributeName) => {
            const container = document.getElementById(containerId);
            container.innerHTML = '';
            const itemsData = btn.getAttribute(attributeName);
            if(itemsData) {
                itemsData.split('|').forEach(f => {
                    if(!f.trim()) return;
                    const li = document.createElement('li');
                    li.textContent = f.trim();
                    container.appendChild(li);
                });
            }
        };

        populateList('modal-features', 'data-p-features');
        populateList('modal-highlights', 'data-p-highlights');

        // Architecture Flow
        const archStr = btn.getAttribute('data-p-architecture');
        const archContainer = document.getElementById('modal-architecture');
        archContainer.innerHTML = '';
        if(archStr) {
            const steps = archStr.split('➔');
            steps.forEach((step, index) => {
                const s = document.createElement('span');
                s.className = "px-3 py-1.5 bg-white/5 rounded-md border border-white/10 flex-shrink-0 text-gray-300";
                s.textContent = step.trim();
                archContainer.appendChild(s);
                
                if(index < steps.length - 1) {
                    const arrow = document.createElement('i');
                    arrow.className = "fas fa-arrow-right text-gray-500 opacity-50 flex-shrink-0";
                    archContainer.appendChild(arrow);
                }
            });
        }

        // Links
        const githubLink = document.getElementById('modal-github');
        const demoLink = document.getElementById('modal-demo');
        
        githubLink.href = btn.getAttribute('data-p-github');
        githubLink.style.display = btn.getAttribute('data-p-github') === '#' ? 'none' : 'flex';

        demoLink.href = btn.getAttribute('data-p-demo');
        demoLink.style.display = btn.getAttribute('data-p-demo') === '#' ? 'none' : 'flex';

        // Show modal
        projectModal.classList.remove('hidden');
        projectModal.classList.add('flex');
        
        // Timeout for transition
        setTimeout(() => {
            projectModal.classList.remove('opacity-0');
            modalCard.classList.remove('scale-95', 'translate-y-4');
            modalCard.classList.add('scale-100', 'translate-y-0');
        }, 10);
        
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
    });
});


function closeProjectModal() {
    projectModal.classList.add('opacity-0');
    modalCard.classList.add('scale-95', 'translate-y-4');
    modalCard.classList.remove('scale-100', 'translate-y-0');
    
    setTimeout(() => {
        projectModal.classList.add('hidden');
        projectModal.classList.remove('flex');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }, 300);
}

modalCloseBtn.addEventListener('click', closeProjectModal);
modalBackdrop.addEventListener('click', closeProjectModal);

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !projectModal.classList.contains('hidden')) {
        closeProjectModal();
    }
});

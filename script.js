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

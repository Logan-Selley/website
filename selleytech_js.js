// SelleyTech interactions. MOTION 1: motion marks state changes (scroll
// position, section entry, progress); nothing loops and nothing floats.

// Smooth scrolling for in-page navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (id === '#') return;
        e.preventDefault();
        const target = document.querySelector(id);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Cards enter once when they first appear; after that they are static
const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            reveal.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.skill-card, .project-card').forEach(el => {
    el.classList.add('will-reveal');
    reveal.observe(el);
});

// Scroll progress: the amber transect line
window.addEventListener('scroll', () => {
    const bar = document.querySelector('.scroll-progress');
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (bar && docHeight > 0) {
        bar.style.transform = `scaleX(${window.scrollY / docHeight})`;
    }
}, { passive: true });

// Nav condenses after the fold
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 100);
}, { passive: true });

// Active nav link follows the section in view
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}, { passive: true });

// Back to top. The report pages load this file too and have no button,
// so the element is optional here.
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

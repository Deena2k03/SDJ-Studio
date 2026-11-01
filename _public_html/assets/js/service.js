document.addEventListener("DOMContentLoaded", () => {

    // 1. Updated Load Component with Callback support
    const loadComponent = (id, path, callback) => {
        fetch(path)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.text();
            })
            .then(data => {
                const el = document.getElementById(id);
                if (el) {
                    el.innerHTML = data;
                    // Run the logic ONLY after the HTML is placed in the DOM
                    if (callback) callback();
                }
            })
            .catch(err => console.error("Failed to load component:", path, err));
    };

    // 2. Navbar Logic (The "Opening" part)
    const initNavbar = () => {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('nav-links');

        if (!hamburger || !navLinks) {
            console.warn("Navbar elements not found inside the loaded component");
            return;
        }

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    };

    // 3. Execution
    // Use leading slashes "/" to ensure paths work from any subfolder
    loadComponent("navbar", "/assets/components/navbar.html", initNavbar);
    
    loadComponent("footer", "/assets/components/footer.html", () => {
        const yearEl = document.getElementById("year");
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    });
});



// HERO SCROLL REVEAL ONLY
const hero = document.querySelector('.service-hero');

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (hero) heroObserver.observe(hero);

window.addEventListener("load", () => {
    document.querySelector('.service-hero')?.classList.add('active');
});



// STUDIO SECTION REVEAL
const studioSection = document.querySelector('.studio-services-premium');

const studioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            studioObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

if (studioSection) studioObserver.observe(studioSection);


// LIGHT BOARD SECTION REVEAL
// LIGHT BOARD SECTION REVEAL
const lightSection = document.querySelector('.light-board-premium');

// Use a smaller threshold for mobile so content appears sooner
const isMobile = window.innerWidth <= 768;
const revealThreshold = isMobile ? 0.05 : 0.2; 

const lightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Stop observing once triggered to save performance
            lightObserver.unobserve(entry.target);
        }
    });
}, { 
    threshold: revealThreshold,
    rootMargin: '0px 0px -50px 0px' // Triggers slightly before the section hits the viewport
});

if (lightSection) lightObserver.observe(lightSection);


// GLASS SECTION REVEAL
const glassSection = document.querySelector('.glass-works-section');

const glassObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            glassObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

if (glassSection) glassObserver.observe(glassSection);


// INTERIOR SECTION REVEAL
// INTERIOR WORKS SECTION REVEAL
const interiorSection = document.querySelector('.interior-works-section');

// Check screen width for mobile optimization
const isMobileDevice = window.innerWidth <= 768;

const interiorObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            interiorObserver.unobserve(entry.target);
        }
    });
}, { 
    // On mobile, trigger as soon as 5% is visible; on desktop, keep 20%
    threshold: isMobileDevice ? 0.05 : 0.2,
    // rootMargin helps trigger the animation slightly early (50px before entering)
    rootMargin: '0px 0px -50px 0px' 
});

if (interiorSection) interiorObserver.observe(interiorSection);

// EXTERIOR SECTION REVEAL
const exteriorSection = document.querySelector('.exterior-works-section');

const exteriorObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            exteriorObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

if (exteriorSection) exteriorObserver.observe(exteriorSection);


// WHY CHOOSE SECTION REVEAL
const whySection = document.querySelector('.why-choose-us');

const whyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            whyObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

if (whySection) whyObserver.observe(whySection);


// CTA SECTION REVEAL
const ctaSection = document.querySelector('.premium-cta');

const ctaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            ctaObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

if (ctaSection) ctaObserver.observe(ctaSection);
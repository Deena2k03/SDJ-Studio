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
// Navbar and Fotter Logic Ends

    // 2. Hero Animation (Immediate)
    const heroContent = document.querySelector('.about-hero-content');
    const heroVisual = document.querySelector('.about-hero-visual');

    if (heroContent && heroVisual) {
        Object.assign(heroContent.style, { opacity: "0", transform: "translateY(30px)", transition: "all 1s ease" });
        Object.assign(heroVisual.style, { opacity: "0", transform: "translateX(30px)", transition: "all 1s ease" });
        setTimeout(() => {
            heroContent.style.opacity = "1";
            heroContent.style.transform = "translateY(0)";
            heroVisual.style.opacity = "1";
            heroVisual.style.transform = "translateX(0)";
        }, 200);
    }

    // 3. Robust Scroll Reveal (Fixes the "Invisible" issue)
    const revealOptions = {
        threshold: 0.1, // Trigger when 10% is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Optional: stop watching once it's visible
                scrollObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // This selects BOTH classes used in your HTML
    const elementsToReveal = document.querySelectorAll(".reveal, .mv-reveal-item");
    elementsToReveal.forEach(el => scrollObserver.observe(el));
});






document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector('.test-track');
    const cards = document.querySelectorAll('.testi-card');
    const dotsContainer = document.querySelector('.slider-dots');

    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    const gap = 30; // Must match CSS gap

    function getVisibleCards() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 992) return 2;
        return 3;
    }

    // Create Dots
    function createDots() {
        dotsContainer.innerHTML = '';
        const visibleCards = getVisibleCards();
        const maxDots = cards.length - visibleCards + 1;
        
        for (let i = 0; i < maxDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        const visibleCards = getVisibleCards();
        const cardWidth = cards[0].getBoundingClientRect().width;
        
        // Prevent going out of bounds
        if (index > cards.length - visibleCards) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        // Calculate Move: (Card Width + Gap) * Index
        const moveDistance = (cardWidth + gap) * currentIndex;
        track.style.transform = `translateX(-${moveDistance}px)`;
        updateDots();
    }

    // Auto Slide
    let autoSlide = setInterval(() => {
        const visibleCards = getVisibleCards();
        let nextIndex = currentIndex + 1;
        if (nextIndex > cards.length - visibleCards) nextIndex = 0;
        goToSlide(nextIndex);
    }, 4000);

    // Reset Interval on click
    dotsContainer.addEventListener('click', () => {
        clearInterval(autoSlide);
        autoSlide = setInterval(() => {
            const visibleCards = getVisibleCards();
            let nextIndex = currentIndex + 1;
            if (nextIndex > cards.length - visibleCards) nextIndex = 0;
            goToSlide(nextIndex);
        }, 4000);
    });

    // Initialize
    window.addEventListener('resize', () => {
        createDots();
        goToSlide(0);
    });
    
    createDots();
});
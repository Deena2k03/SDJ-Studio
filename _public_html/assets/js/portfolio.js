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

// Navbar and Footer ends



// HERO SCROLL REVEAL
const heroSection = document.querySelector('.sdj-hero-premium');

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (heroSection) heroObserver.observe(heroSection);

window.addEventListener("load", () => {
    document.querySelector('.sdj-hero-premium')?.classList.add('active');
});


// FILTER SECTION REVEAL
const filterSection = document.querySelector('.portfolio-filters');

const filterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            filterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

if (filterSection) filterObserver.observe(filterSection);


// PROJECT SECTION REVEAL
const projectSections = document.querySelectorAll('.reveal-projects');

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { 
    threshold: 0.05   // 👈 VERY IMPORTANT (mobile fix)
});

projectSections.forEach(section => {
    projectObserver.observe(section);
});



/**
 * 1. INDIVIDUAL CARD EXPANSION
 * This logic finds the card relative to the button clicked,
 * ensuring only the correct card expands.
 */
function toggleProject(projectId) {
    const card = document.getElementById(projectId);
    
    if (!card) return;

    const btn = card.querySelector('.view-works-btn');

    // OPTIONAL: Close any other open gallery first (Accordion effect)
    document.querySelectorAll('.project-card.active').forEach(openCard => {
        if (openCard !== card) {
            openCard.classList.remove('active');
            const otherBtn = openCard.querySelector('.view-works-btn');
            if (otherBtn) otherBtn.innerText = "View Gallery ↓";
        }
    });

    // Toggle the current card
    const isActive = card.classList.toggle('active');
    
    // Update button text
    btn.innerText = isActive ? "Close Gallery ↑" : "View Gallery ↓";

    // Smooth scroll to the card if opening
    if (isActive) {
        setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
    }
}

/**
 * 2. FULLSCREEN LIGHTBOX LOGIC
 * Global variables to track the current gallery state
 */
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbVid = document.getElementById('lb-video');
let currentGalleryItems = [];
let currentIdx = 0;

function openLightbox(element) {
    // Locate the specific gallery grid belonging ONLY to this card
    const parentGrid = element.closest('.gallery-grid');
    currentGalleryItems = Array.from(parentGrid.querySelectorAll('.gallery-item'));
    
    // Find index of clicked item
    currentIdx = currentGalleryItems.indexOf(element);

    updateLightbox();
    
    // Show Lightbox
    lightbox.style.display = 'flex';
    setTimeout(() => lightbox.classList.add('active'), 10);
    document.body.style.overflow = 'hidden'; // Lock background scroll
}

function updateLightbox() {
    // Reset displays and pause videos
    lbImg.style.display = 'none';
    lbVid.style.display = 'none';
    lbVid.pause();

    const currentItem = currentGalleryItems[currentIdx];
    const media = currentItem.querySelector('img, video');

    if (media.tagName.toLowerCase() === 'img') {
        lbImg.src = media.src;
        lbImg.style.display = 'block';
    } else {
        // Find source for video within the element
        const videoSource = media.querySelector('source').src;
        lbVid.src = videoSource;
        lbVid.style.display = 'block';
        lbVid.load();
        lbVid.play();
    }
}

function changeSlide(dir) {
    // Loop through items (length + dir) % length handles both directions
    currentIdx = (currentIdx + dir + currentGalleryItems.length) % currentGalleryItems.length;
    updateLightbox();
}

function forceCloseLightbox() {
    lightbox.classList.remove('active');
    setTimeout(() => {
        lightbox.style.display = 'none';
        lbVid.pause();
        lbVid.src = ""; // Clear video source
        lbImg.src = ""; // Clear image source
    }, 300);
    document.body.style.overflow = 'auto'; // Unlock scroll
}

// Close on backdrop click
function closeLightbox(e) {
    if (e.target === lightbox) forceCloseLightbox();
}

/**
 * 3. KEYBOARD & ACCESSIBILITY
 */
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex' || lightbox.classList.contains('active')) {
        if (e.key === 'ArrowRight') changeSlide(1);
        if (e.key === 'ArrowLeft') changeSlide(-1);
        if (e.key === 'Escape') forceCloseLightbox();
    }
});










// next Section


document.addEventListener("DOMContentLoaded", function() {
    const counterSection = document.getElementById("counter-section");
    const counters = document.querySelectorAll(".count-up");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. Start Scroll Reveal
                counterSection.classList.add("stats-visible");
                
                // 2. Start Number Loading for all counters in the section
                counters.forEach(counter => {
                    animateValue(counter);
                });
                
                // 3. Stop observing after it has been seen once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05 // Section must be 50% visible before triggering
    });

    observer.observe(counterSection);

    // Number Loading Function
    function animateValue(obj) {
        const start = 0;
        const end = parseInt(obj.getAttribute("data-count")); // Get target number
        const duration = 2000; // Animation length in ms
        let current = start;
        let range = end - start;
        let increment = end > start ? 1 : -1;
        
        // Dynamic step time to make larger numbers (e.g., 200) move faster
        let stepTime = Math.abs(Math.floor(duration / range));
        stepTime = stepTime < 10 ? 10 : stepTime; // Safety break so JS doesn't crash

        const timer = setInterval(() => {
            current += increment;
            obj.textContent = current;
            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);
    }
});








const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("imgFullSize");
    const galleryImages = document.querySelectorAll(".gallery-item1 img");

    // Loop through all gallery images
    galleryImages.forEach(img => {
        img.onclick = function() {
            modal.style.display = "block";
            modalImg.src = this.src; // Set modal image to the clicked image's source
        }
    });

    // Close modal when clicking the 'X'
    document.querySelector(".close-modal").onclick = function() {
        modal.style.display = "none";
    }

    // Close modal when clicking anywhere outside the image
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
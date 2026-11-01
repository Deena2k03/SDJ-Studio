function loadComponent(id, file, callback) {
    fetch(file)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;

            if (callback) callback();
        });
}

// Navbar Logic
function initNavbar() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (!hamburger || !navLinks) {
        console.log("Navbar elements not found");
        return;
    }

    console.log("Navbar working ✅");

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // ✅ Close menu on link click (mobile)
    document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {

        const href = link.getAttribute("href");

        // Close menu first
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');

        // ✅ Fix navigation issue on mobile
        if (href && !href.startsWith("#")) {
            window.location.href = href;
        }
    });
});
}

// ✅ Load Navbar
loadComponent("navbar", "/assets/components/navbar.html", initNavbar);

loadComponent("footer", "/assets/components/footer.html", () => {
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});
// Navbar and Footer Ends

/* =========================
   Section 2 Scroll Reveal Logic
========================= */
document.addEventListener("DOMContentLoaded", () => {

    const worksSection = document.querySelector(".works");
    const workCards = document.querySelectorAll(".work-card");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                worksSection.classList.add("show");

                workCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add("show");
                    }, index * 150);
                });

                observer.unobserve(worksSection);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(worksSection);

});



/* =========================
   WHY SECTION REVEAL
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const whySection = document.querySelector(".why");
    const cards = document.querySelectorAll(".why-card");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                // Show section
                whySection.classList.add("show");

                // Stagger cards
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, index * 150);
                });

                observer.unobserve(whySection);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(whySection);

});


/* =========================
   SERVICES SECTION REVEAL (FIXED)
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const sections = document.querySelectorAll(".services");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        observer.observe(section);
    });

});



document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.getElementById('reviewsWrapper');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    const totalReviews = 7;
    
    // Function to calculate how many cards are visible
    function getVisibleCards() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    function updateReviewSlider(index) {
        const visibleCards = getVisibleCards();
        const maxIndex = totalReviews - visibleCards;
        
        // Ensure index doesn't go out of bounds
        if (index > maxIndex) index = 0;
        if (index < 0) index = maxIndex;
        
        currentIndex = index;
        
        const cardWidth = document.querySelector('.review-card').offsetWidth + 20; // width + margin
        wrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    // Dot Clicks
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            updateReviewSlider(i);
            resetAutoPlay();
        });
    });

    // Auto Play Logic
    let autoPlay = setInterval(() => {
        let next = currentIndex + 1;
        updateReviewSlider(next);
    }, 5000);

    function resetAutoPlay() {
        clearInterval(autoPlay);
        autoPlay = setInterval(() => {
            let next = currentIndex + 1;
            updateReviewSlider(next);
        }, 5000);
    }

    // Adjust on window resize to prevent alignment issues
    window.addEventListener('resize', () => updateReviewSlider(currentIndex));
});


document.addEventListener("DOMContentLoaded", () => {
    const reviewsSection = document.querySelector('.reviews');
    const cards = document.querySelectorAll('.reviews .review-card');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger section reveal
                reviewsSection.classList.add('reveal-visible');

                // Stagger the individual cards
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, index * 200); // 200ms delay between each card
                });

                // Stop observing once revealed
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Triggers when 20% of the section is visible
    });

    if (reviewsSection) {
        revealObserver.observe(reviewsSection);
    }
});



document.addEventListener("DOMContentLoaded", () => {
    const trustSection = document.querySelector('.trust-section');

    const trustObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trustSection.classList.add('reveal-visible');
                trustObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    if (trustSection) {
        trustObserver.observe(trustSection);
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const trustSection = document.querySelector('.trust-section');
    const statItems = document.querySelectorAll('.stat-item');

    const trustObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger the main section containers
                trustSection.classList.add('reveal-visible');

                // Stagger the checkmark list items for extra detail
                statItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = "1";
                        item.style.transform = "translateY(0)";
                    }, 400 + (index * 150)); // Starts after main text begins moving
                });

                // Stop observing after the animation has fired
                trustObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Triggers when 20% of the section is in view
    });

    if (trustSection) {
        trustObserver.observe(trustSection);
    }
});



document.addEventListener("DOMContentLoaded", () => {
    const logoRevealItems = document.querySelectorAll('.logo-slider-section .reveal-item');

    const logoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to trigger CSS transition
                entry.target.classList.add('show-item');
                
                // If it's the container, we might want to delay it slightly 
                // after the title appears
                if (entry.target.classList.contains('logo-slider-container')) {
                    entry.target.style.transitionDelay = "0.3s";
                }
                
                logoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    logoRevealItems.forEach(item => {
        logoObserver.observe(item);
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const finalCta = document.querySelector('.final-cta');

    const ctaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                finalCta.classList.add('reveal-visible');
                ctaObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (finalCta) {
        ctaObserver.observe(finalCta);
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const finalCta = document.querySelector('.final-cta');
    const ctaButtons = document.querySelectorAll('.cta-btn');

    const ctaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. Reveal the main container and text
                finalCta.classList.add('reveal-visible');

                // 2. Stagger the buttons (Consultation -> Call -> WhatsApp)
                ctaButtons.forEach((btn, index) => {
                    setTimeout(() => {
                        btn.style.opacity = "1";
                        btn.style.transform = "translateY(0)";
                    }, 400 + (index * 200)); // Delay starts after title, buttons 200ms apart
                });

                // Stop observing once animation triggers
                ctaObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (finalCta) {
        ctaObserver.observe(finalCta);
    }
});


// Works Starts






const wrapper = document.querySelector(".hero-wrapper");
const slides = document.querySelectorAll(".hero-slide1");
const nextBtn = document.querySelector(".hero-arrow.right");
const prevBtn = document.querySelector(".hero-arrow.left");
const hero = document.querySelector(".hero");

/* Background images */
const backgrounds = [
    "assets/public/studio.png",
    "assets/public/lightboards.png",
    "assets/public/interior.png"
];

let index = 0;
let interval;

/* Update slider */
function updateSlider() {
    wrapper.style.transform = `translateX(-${index * 100}%)`;

    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");

    // ✅ FIXED BACKGROUND SWITCH
    hero.style.backgroundImage = `url(${backgrounds[index]})`;
}

/* Next */
function nextSlide() {
    index = (index + 1) % slides.length;
    updateSlider();
}

/* Prev */
function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    updateSlider();
}

/* Auto */
function startAutoSlide() {
    interval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
    clearInterval(interval);
    startAutoSlide();
}

nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
});

/* Init */
updateSlider();
startAutoSlide();



const worksWrapper = document.querySelector(".works-wrapper");
const workNext = document.querySelector(".work-arrow.right");
const workPrev = document.querySelector(".work-arrow.left");

if (workNext && workPrev) {
    const scrollAmount = 300;

    workNext.addEventListener("click", () => {
        worksWrapper.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
        });
    });

    workPrev.addEventListener("click", () => {
        worksWrapper.scrollBy({
            left: -scrollAmount,
            behavior: "smooth"
        });
    });
}

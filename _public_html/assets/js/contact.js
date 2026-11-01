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





// CONTACT SECTION REVEAL
const contactSection = document.querySelector('.studio-contact-info');

const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            contactObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

if (contactSection) contactObserver.observe(contactSection);





// 1. Initialize EmailJS
emailjs.init({
    publicKey: "GCo1YTbKUrqcWmHfL",
});

// 2. Get Form Elements
const contactForm = document.getElementById("contact-form");
const statusMsg = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

// 3. Add the Event Listener
if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault(); // STOP the page from reloading

        // Change button state
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        // Grab values at the moment of click
        const templateParams = {
            from_name: document.getElementById("from_name").value,
            phone_number: document.getElementById("phone_number").value,
            reply_to: document.getElementById("reply_to").value,
            service_type: document.getElementById("service_type").value,
            message: document.getElementById("message").value
        };

        // 4. Send the Email
        emailjs.send("service_tqevf99", "template_rlcgo0h", templateParams)
            .then(() => {
                submitBtn.innerText = "Send Message →";
                submitBtn.disabled = false;
                statusMsg.innerHTML = "<span style='color: #4CAF50;'>✅ Message sent successfully!</span>";
                contactForm.reset(); 
            })
            .catch((error) => {
                submitBtn.innerText = "Send Message →";
                submitBtn.disabled = false;
                statusMsg.innerHTML = "<span style='color: #f44336;'>❌ Failed: " + error.text + "</span>";
                console.error("EmailJS Error:", error);
            });
    });
}
// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Hero Background Slider Logic
function initSlider(selector) {
    const slides = document.querySelectorAll(selector);
    let currentSlide = 0;
    const slideInterval = 5000;

    if (slides.length === 0) return;

    // Ensure first slide is active
    slides[currentSlide].classList.add('active');

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, slideInterval);
}

// Initialize sliders for both hero images
initSlider('.hero-img-main .slide');
initSlider('.hero-img-accent .slide');

// Toggle menu when hamburger icon is clicked
hamburger.addEventListener('click', () => {
    // Toggle 'active' class on links container to show/hide menu
    navLinks.classList.toggle('active');
    // Toggle 'active' class on hamburger to animate icon
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        // Remove 'active' class to hide menu
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Prevent default jump-to behavior
        e.preventDefault();
        // Find the target element based on href attribute
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Scroll to the target element smoothly
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    // Check if scrolled down more than 100px
    if (window.scrollY > 100) {
        // Darker background and smaller padding when scrolled
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.padding = '0.8rem 0';
    } else {
        // Default transparent background and larger padding at top
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.padding = '1.2rem 0';
    }
});

// Active Link Highlighting based on Scroll Position
const sections = document.querySelectorAll('section');
const navLinksItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    // Loop through sections to find which one is currently in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    // Add 'active' class to the corresponding nav link
    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Handle Form Submission via WhatsApp
const bookingForm = document.getElementById('bookingForm');
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent actual form submission

    // Get values from form inputs
    const name = bookingForm.querySelector('input[type="text"]').value;
    const email = bookingForm.querySelector('input[type="email"]').value;
    const phone = bookingForm.querySelector('input[type="tel"]').value;
    const serviceType = bookingForm.querySelector('select').value;
    const message = bookingForm.querySelector('textarea').value;

    // Create a formatted WhatsApp message
    const whatsappMessage = `*New Booking Inquiry*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Service Type:* ${encodeURIComponent(serviceType)}%0A*Message:* ${encodeURIComponent(message)}`;

    // Destination WhatsApp number
    const whatsappNumber = '919304855444';

    // Open WhatsApp Web/App with the pre-filled message
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');

    // Reset form fields after submission
    bookingForm.reset();
});

// Scroll Animation: Fate In elements when they come into view
const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Adjust trigger point slightly above bottom
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // If element is in viewport
        if (entry.isIntersecting) {
            // Make it visible and reset position
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Select and observe all sections except hero (which is already visible)
const allSections = document.querySelectorAll('section');
allSections.forEach(section => {
    if (!section.classList.contains('hero')) {
        // Set initial state: invisible and shifted down
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        // Start observing
        observer.observe(section);
    }
});

// Portfolio Item Click Effect
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('h3').textContent;
        alert(`View ${title} Gallery - Feature coming soon!`);
    });
});

// Rotating Hero Taglines with Typing Effect
const taglines = [
    "Wedding Photography",
    "Cinematic Videography",
    "Pre-Wedding Shoots",
    "Event Coverage",
    "Corporate Events",
    "Birthday Parties"
];

let currentTagline = 0;
const taglineElement = document.getElementById('heroTagline');
let charIndex = 0;
let isDeleting = false;

if (taglineElement) {
    function typeTagline() {
        const currentText = taglines[currentTagline];

        if (isDeleting) {
            // Instant clear when deleting logic
            taglineElement.textContent = '';
            charIndex = 0;
            isDeleting = false;
            // Move to next tagline
            currentTagline = (currentTagline + 1) % taglines.length;
            setTimeout(typeTagline, 500); // Short pause before starting next word
            return;
        }

        // Type characters one by one
        taglineElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        let typeSpeed = 80;

        // If word is complete
        if (charIndex === currentText.length) {
            typeSpeed = 2000; // Wait longer before deleting
            isDeleting = true; // Set flag to trigger clear on next loop
        }

        setTimeout(typeTagline, typeSpeed);
    }

    // Start the typing effect
    typeTagline();
}

// Counter Animation for Stats Section
const counters = document.querySelectorAll('.stat-number');
let counterAnimated = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Trigger only once when visible
        if (entry.isIntersecting && !counterAnimated) {
            counterAnimated = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const increment = target / 100;
                let count = 0;

                const updateCounter = () => {
                    if (count < target) {
                        count += increment;
                        counter.textContent = Math.ceil(count);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target + '+';
                    }
                };

                updateCounter();
            });
        }
    });
}, { threshold: 0.5 });

// Start observing stats section
const statsSection = document.querySelector('.stats');
if (statsSection) {
    counterObserver.observe(statsSection);
}

// Custom Cursor Glow Effect that follows mouse
const cursorGlow = document.querySelector('.cursor-glow');

if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        // Update glow position to match cursor
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
        cursorGlow.style.opacity = '1'; // Make visible on movement
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0'; // Hide when mouse leaves window
    });
}

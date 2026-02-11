// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.padding = '0.8rem 0';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.padding = '1.2rem 0';
    }
});

// Active Link Highlight
const sections = document.querySelectorAll('section');
const navLinksItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Form Submission
const bookingForm = document.getElementById('bookingForm');
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = bookingForm.querySelector('input[type="text"]').value;
    const email = bookingForm.querySelector('input[type="email"]').value;
    const phone = bookingForm.querySelector('input[type="tel"]').value;
    const serviceType = bookingForm.querySelector('select').value;
    const message = bookingForm.querySelector('textarea').value;

    // Create WhatsApp message
    const whatsappMessage = `*New Booking Inquiry*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Service Type:* ${encodeURIComponent(serviceType)}%0A*Message:* ${encodeURIComponent(message)}`;

    // WhatsApp number (replace with your number)
    const whatsappNumber = '919304855444';

    // Open WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');

    // Reset form
    bookingForm.reset();
});

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
const allSections = document.querySelectorAll('section');
allSections.forEach(section => {
    if (!section.classList.contains('hero')) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
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
            // Instant clear logic
            taglineElement.textContent = '';
            charIndex = 0;
            isDeleting = false;
            currentTagline = (currentTagline + 1) % taglines.length;
            setTimeout(typeTagline, 500); // Short pause before starting next word
            return;
        }

        taglineElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        let typeSpeed = 80;

        if (charIndex === currentText.length) {
            typeSpeed = 2000; // Wait time at end of word
            isDeleting = true; // Set flag to trigger clear on next loop
        }

        setTimeout(typeTagline, typeSpeed);
    }

    typeTagline();
}

// Counter Animation for Stats
const counters = document.querySelectorAll('.stat-number');
let counterAnimated = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
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

const statsSection = document.querySelector('.stats');
if (statsSection) {
    counterObserver.observe(statsSection);
}

// Mouse Interaction Effect
const cursorGlow = document.querySelector('.cursor-glow');

if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
        cursorGlow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });
}

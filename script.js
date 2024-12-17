// Navigation functionality
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

// Handle navbar scroll effect - make navbar translucent on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        navbar.style.backgroundColor = 'rgba(243, 243, 243, 0.8)';
        navbar.style.backdropFilter = 'blur(8px)';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.backgroundColor = 'rgba(243, 243, 243, 0.5)';
        navbar.style.backdropFilter = 'blur(8px)';
    }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
        }
    });
});

// Scroll animations for About section cards
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card');
    
    elements.forEach((element, index) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (elementPosition < screenPosition - 100) {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200); // Stagger the animations
        }
    });
};

// Initialize animations
window.addEventListener('load', () => {
    // Set initial states for feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
    });
    
    // Start animation check
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// Portfolio hover effects
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        portfolioItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.style.opacity = '0.5';
            }
        });
    });

    item.addEventListener('mouseleave', () => {
        portfolioItems.forEach(otherItem => {
            otherItem.style.opacity = '1';
        });
    });
});

// Form validation and submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const formData = new FormData(contactForm);
        let isValid = true;
        let errorMessages = [];

        formData.forEach((value, key) => {
            if (!value.trim()) {
                isValid = false;
                errorMessages.push(`${key} is required`);
            }
        });

        if (isValid) {
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Simulate API call
            setTimeout(() => {
                submitButton.textContent = 'Message Sent!';
                contactForm.reset();
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                }, 2000);
            }, 1500);
        } else {
            // Display error messages
            alert(errorMessages.join('\n'));
        }
    });
}

// Lazy loading for images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));
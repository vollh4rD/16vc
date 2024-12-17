// Wait for DOM content to be loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animation observers
    initializeAnimations();
    
    // Initialize navigation functionality
    initializeNavigation();
    
    // Initialize portfolio scroll
    initializePortfolio();
});

// Animation initialization
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Handle feature cards sequential animation
                if (entry.target.classList.contains('features-grid')) {
                    animateFeatureCards(entry.target);
                }
                
                // Handle team members sequential animation
                if (entry.target.classList.contains('team-grid')) {
                    animateTeamMembers(entry.target);
                }
                
                // Handle portfolio items animation
                if (entry.target.classList.contains('portfolio-track')) {
                    animatePortfolioItems(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements with animations
    const elementsToAnimate = document.querySelectorAll(
        'section, .fade-in, .features-grid, .team-grid, .portfolio-track'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Feature cards animation
function animateFeatureCards(container) {
    const cards = container.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 200);
    });
}

// Team members animation
function animateTeamMembers(container) {
    const members = container.querySelectorAll('.team-member');
    members.forEach((member, index) => {
        setTimeout(() => {
            member.classList.add('visible');
        }, index * 200);
    });
}

// Portfolio items animation
function animatePortfolioItems(container) {
    const items = container.querySelectorAll('.portfolio-item');
    items.forEach((item, index) => {
        item.style.animationDelay = `${index * 200}ms`;
    });
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

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
                scrollToElement(target);
                // Close mobile menu after clicking
                navLinks.classList.remove('active');
            }
        });
    });
}

// Portfolio scroll functionality
function initializePortfolio() {
    const portfolioTrack = document.querySelector('.portfolio-track');
    if (portfolioTrack) {
        // Clone portfolio items for infinite scroll
        const items = portfolioTrack.children;
        const itemCount = items.length;
        
        // Clone items and append to track
        for (let i = 0; i < itemCount; i++) {
            const clone = items[i].cloneNode(true);
            portfolioTrack.appendChild(clone);
        }

        // Hover effect for portfolio items
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
    }
}

// Smooth scroll function with header offset
function scrollToElement(element) {
    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
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

// Handle resize events
let resizeTimer;
window.addEventListener('resize', () => {
    // Debounce resize events
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reinitialize any size-dependent functionality
        if (window.innerWidth > 768) {
            document.querySelector('.nav-links')?.classList.remove('active');
        }
    }, 250);
});

// Add error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = '/assets/placeholder.png';
        this.alt = 'Image not available';
    });
});

// Initialize accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.accordion-item.active');
            
            if (currentlyActive && currentlyActive !== item) {
                // Close currently active item
                currentlyActive.classList.remove('active');
                currentlyActive.querySelector('.accordion-content').classList.remove('show');
                currentlyActive.querySelector('.icon').textContent = '+';
            }
            
            // Toggle clicked item
            const content = item.querySelector('.accordion-content');
            const icon = item.querySelector('.icon');
            
            item.classList.toggle('active');
            content.classList.toggle('show');
            icon.textContent = item.classList.contains('active') ? '-' : '+';
        });
    });
});

// Initialize FAQ accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        
        header.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            
            item.classList.toggle('active');
        });
    });
});
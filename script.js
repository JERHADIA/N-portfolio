// ==================== MOBILE MENU TOGGLE ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== SMOOTH SCROLL BEHAVIOR ====================
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

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = entry.target.dataset.animation || 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.setProperty('--delay', `${index * 0.1}s`);
    card.dataset.animation = `scaleIn 0.6s ease-out ${index * 0.1}s both`;
    observer.observe(card);
});

// Observe skill categories
document.querySelectorAll('.skill-category').forEach((skill, index) => {
    skill.style.opacity = '0';
    skill.dataset.animation = `scaleIn 0.6s ease-out ${index * 0.1}s both`;
    observer.observe(skill);
});

// Observe experience items
document.querySelectorAll('.experience-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.dataset.animation = `slideInLeft 0.8s ease-out ${index * 0.2}s both`;
    observer.observe(item);
});

// ==================== NAVBAR BACKGROUND ON SCROLL ====================
const navbar = document.querySelector('.navbar');
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const heroBottom = heroSection.offsetHeight;
    if (window.scrollY > heroBottom - 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
});

// ==================== ACTIVE NAV LINK ====================
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const navLink = document.querySelector(`a[href="#${section.id}"]`);
        
        if (navLink && rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            navLinks.forEach(link => link.style.color = 'var(--text-dark)');
            navLink.style.color = 'var(--primary-color)';
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElement = document.querySelector('.hero::before');
    
    document.querySelectorAll('.scroll-indicator').forEach(indicator => {
        indicator.style.opacity = Math.max(0, 1 - scrolled / 300);
        indicator.style.transform = `translateX(-50%) translateY(${scrolled * 0.5}px)`;
    });
});

// ==================== TYPING ANIMATION ====================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// ==================== COUNT UP ANIMATION ====================
function countUp(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ==================== MOUSE FOLLOW EFFECT ====================
const heroContent = document.querySelector('.hero-content');

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768 && heroContent) {
        const x = (e.clientX - window.innerWidth / 2) / 100;
        const y = (e.clientY - window.innerHeight / 2) / 100;
        
        heroContent.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;
    }
});

document.addEventListener('mouseenter', () => {
    if (heroContent) {
        heroContent.style.transition = 'transform 0.1s ease-out';
    }
});

document.addEventListener('mouseleave', () => {
    if (heroContent) {
        heroContent.style.transition = 'transform 0.6s ease-out';
        heroContent.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    }
});

// ==================== BUTTON RIPPLE EFFECT ====================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Add ripple styles if not already in CSS
        if (!document.querySelector('style[data-ripple]')) {
            const style = document.createElement('style');
            style.setAttribute('data-ripple', 'true');
            style.innerHTML = `
                .btn { position: relative; overflow: hidden; }
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple-animation 0.6s ease-out;
                    pointer-events: none;
                }
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ==================== PAGE LOAD ANIMATION ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Set initial opacity
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-out';

// ==================== LINK PREVIEW ON HOVER ====================
document.querySelectorAll('.project-link, .social-icon').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ==================== SCROLL TO TOP BUTTON ====================
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scrollToTop';
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateY(-5px)';
        this.style.boxShadow = '0 6px 20px rgba(124, 58, 237, 0.6)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(124, 58, 237, 0.4)';
    });
}

createScrollToTopButton();

// ==================== FOCUS MANAGEMENT ====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            updateActiveLink();
            scrollTimeout = null;
        }, 100);
    }
});

// ==================== LAZY LOADING FOR IMAGES ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== TOAST NOTIFICATION ====================
function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: #7c3aed;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideUp 0.3s ease-out;
        z-index: 10000;
        font-weight: 500;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease-out forwards';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ==================== CONTACT FORM HANDLING ====================
const contactButtons = document.querySelectorAll('a[href="mailto:contact@example.com"]');
contactButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // You can replace this with a form if needed
        showToast('Opening email client...');
    });
});

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
    
    // Animate counter if it exists
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        countUp(counter, target);
    });
});

// ==================== SMOOTH TRANSITION BETWEEN PAGES ====================
document.body.style.opacity = '1';

// Add smooth transitions
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-out';
});

// ==================== MOBILE PERFORMANCE OPTIMIZATION ====================
if (window.innerWidth < 768) {
    // Disable parallax on mobile for better performance
    document.querySelectorAll('[style*="transform"]').forEach(el => {
        el.style.willChange = 'auto';
    });
}

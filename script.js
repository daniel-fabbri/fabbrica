// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks?.classList.remove('active');
        mobileMenuBtn?.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav?.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !nav?.classList.contains('scroll-down')) {
        nav?.classList.remove('scroll-up');
        nav?.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && nav?.classList.contains('scroll-down')) {
        nav?.classList.remove('scroll-down');
        nav?.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
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

// Observe all animated elements
document.querySelectorAll('.service-card, .case-card, .process-step, .tech-category').forEach(el => {
    observer.observe(el);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect for hero orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.2);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add mouse move parallax effect on hero
const hero = document.querySelector('.hero');
const orbs = document.querySelectorAll('.gradient-orb');

hero?.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const moveX = (clientX - innerWidth / 2) / innerWidth * 30;
    const moveY = (clientY - innerHeight / 2) / innerHeight * 30;
    
    orbs.forEach((orb, index) => {
        const speed = 1 + (index * 0.3);
        orb.style.transition = 'transform 0.3s ease-out';
        orb.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
    });
});

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Cursor trail effect (optional - for extra flair)
const createCursorTrail = () => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);
    return trail;
};

let trails = [];
const maxTrails = 5;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) { // Only on desktop
        if (trails.length >= maxTrails) {
            const oldTrail = trails.shift();
            oldTrail.remove();
        }
        
        const trail = createCursorTrail();
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        trails.push(trail);
        
        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(0)';
        }, 10);
        
        setTimeout(() => {
            trail.remove();
            trails = trails.filter(t => t !== trail);
        }, 500);
    }
});

// Stats counter animation
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
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
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value');
            statValues.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('+')) {
                    const number = parseInt(text);
                    stat.textContent = '0+';
                    animateCounter(stat, number);
                } else if (text.includes('%')) {
                    const number = parseInt(text);
                    stat.textContent = '0%';
                    const tempElement = { value: 0 };
                    const timer = setInterval(() => {
                        tempElement.value++;
                        stat.textContent = tempElement.value + '%';
                        if (tempElement.value >= number) {
                            clearInterval(timer);
                        }
                    }, 20);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Add CSS for cursor trail dynamically
const style = document.createElement('style');
style.textContent = `
    .cursor-trail {
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    body.loaded {
        animation: fadeIn 0.5s ease-in;
    }
    
    .nav.scroll-down {
        transform: translateY(-100%);
    }
    
    .nav.scroll-up {
        transform: translateY(0);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }
    
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(15, 23, 42, 0.98);
            backdrop-filter: blur(20px);
            padding: 2rem;
            border-bottom: 1px solid var(--border);
            gap: 1rem;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);

// Add custom cursor effect for interactive elements
const interactiveElements = document.querySelectorAll('a, button, .service-card, .case-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.style.cursor = 'pointer';
    });
    el.addEventListener('mouseleave', () => {
        document.body.style.cursor = 'default';
    });
});

// Performance optimization: Debounce scroll and resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Additional scroll logic can be added here
}, 10));

window.addEventListener('resize', debounce(() => {
    // Handle resize events
}, 250));

console.log('🚀 Fabbrica - Site carregado com sucesso!');

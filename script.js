// script.js - Complete fixed version with proper particle initialization

// Loading Screen - Fixed with proper cleanup
window.addEventListener('load', () => {
    setTimeout(() => {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.opacity = '0';
            loading.style.pointerEvents = 'none';
            setTimeout(() => {
                loading.style.display = 'none';
                // Initialize animations after loading
                initAnimations();
            }, 500);
        }
    }, 1000);
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) navLinks.classList.remove('active');
        if (hamburger) {
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        // Handle home link
        if (targetId === '#' || targetId === '#home') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        // Handle other anchor links
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Header background change on scroll
function handleScrollEffects() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 26, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.padding = '5px 0';
            header.style.borderBottom = '1px solid rgba(157, 78, 221, 0.2)';
        } else {
            header.style.background = 'rgba(10, 10, 26, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.padding = '10px 0';
            header.style.borderBottom = '1px solid rgba(157, 78, 221, 0.1)';
        }
    }
    
    // Animate elements on scroll
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight - 100) {
            element.classList.add('visible');
        }
    });
}

// Initialize all animations and effects
function initAnimations() {
    // Initialize scroll effects
    window.addEventListener('scroll', handleScrollEffects);
    
    // Trigger initial animation check
    setTimeout(() => {
        handleScrollEffects();
    }, 100);
    
    // Initialize particle background if canvas exists
    initParticleBackground();
    
    // Initialize card hover effects
    initCardEffects();
    
    // Initialize button effects
    initButtonEffects();
}

// Particle Background System - Fixed complete implementation
function initParticleBackground() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }
    
    // Create particles
    function initParticles() {
        particles = [];
        const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: `rgba(${Math.floor(Math.random() * 50 + 150)}, 
                           ${Math.floor(Math.random() * 50 + 100)}, 
                           ${Math.floor(Math.random() * 100 + 150)}, 
                           ${Math.random() * 0.2 + 0.1})`
            });
        }
    }
    
    // Animate particles
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Boundary check
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.y > canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = canvas.height;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });
        
        // Draw connections between close particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(138, 43, 226, ${0.1 * (1 - distance/100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        animationFrameId = requestAnimationFrame(animateParticles);
    }
    
    // Start animation
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animateParticles();
}

// Card hover effects
function initCardEffects() {
    document.querySelectorAll('.feature-card, .owner-card, .model-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            setTimeout(() => {
                card.style.zIndex = '1';
            }, 300);
        });
    });
}

// Button effects
function initButtonEffects() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mousedown', (e) => {
            button.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = '';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
}

// Feature toggle functionality for models page
function initFeatureToggles() {
    const toggles = [
        'spamdex-toggle',
        'hydrasense-toggle', 
        'chat-toggle'
    ];
    
    toggles.forEach(toggleId => {
        const toggle = document.getElementById(toggleId);
        if (toggle) {
            const featuresId = toggleId.replace('-toggle', '-features');
            const features = document.getElementById(featuresId);
            
            if (features) {
                toggle.addEventListener('click', function() {
                    this.classList.toggle('active');
                    features.classList.toggle('show');
                    
                    // Change icon
                    const icon = this.querySelector('.toggle-icon');
                    if (icon) {
                        icon.style.transform = this.classList.contains('active') 
                            ? 'rotate(180deg)' 
                            : 'rotate(0deg)';
                    }
                });
            }
        }
    });
}

// Initialize feature toggles if on models page
if (window.location.pathname.includes('models.html') || 
    document.querySelector('.model-features')) {
    initFeatureToggles();
}

// Start animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // DOM is ready, but wait for load event for images
    });
} else {
    // DOM is already ready
    setTimeout(initAnimations, 100);
}

// Fallback: If loader is still visible after 3 seconds, force hide it
setTimeout(() => {
    const loading = document.getElementById('loading');
    if (loading && loading.style.display !== 'none') {
        loading.style.display = 'none';
        initAnimations();
    }
}, 3000);

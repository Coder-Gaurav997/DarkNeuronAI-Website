// script.js - Enhanced with animations and effects

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loading = document.getElementById('loading');
        loading.style.opacity = '0';
        loading.style.pointerEvents = 'none';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }, 1000);
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if(hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if(hamburger) {
            const icon = hamburger.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if(targetId === '#' || targetId === '#home') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        if(targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if(window.scrollY > 100) {
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
    
    // Animate elements on scroll
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        if(position.top < window.innerHeight - 100) {
            element.classList.add('visible');
        }
    });
    
    // Parallax effect for hero
    const hero = document.querySelector('.hero');
    if(hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
});

// Particle Background System
const canvas = document.getElementById('particles');
if(canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = `rgba(${Math.floor(Math.random() * 100 + 138)}, 
                             ${Math.floor(Math.random() * 50 + 43)}, 
                             ${Math.floor(Math.random() * 100 + 226)}, 
                             ${Math.random() * 0.2 + 0.1})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if(this.x > canvas.width) this.x = 0;
            else if(this.x < 0) this.x = canvas.width;
            
            if(this.y > canvas.height) this.y = 0;
            else if(this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function initParticles() {
        particles = [];
        const density = window.innerWidth < 768 ? 0.00005 : 0.0001;
        const particleCount = Math.floor(canvas.width * canvas.height * density);
        
        for(let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections
        for(let i = 0; i < particles.length; i++) {
            for(let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if(distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(138, 43, 226, ${0.15 * (1 - distance/100)})`;
                    ctx.lineWidth = 0.3;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        animationId = requestAnimationFrame(animateParticles);
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = document.body.scrollHeight;
        initParticles();
    }

    // Initialize
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animateParticles();
}

// Hover effects for cards
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

// Interactive button effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousedown', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
       

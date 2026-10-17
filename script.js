// ============================================================
// SCOUT PRODUCT CONFIGURATION
// ============================================================
// Set your Scout URL here when ready. Leave "" to keep buttons inactive.
const SCOUT_URL = "https://darkneuronai-scout.onrender.com";


// ============================================================
// MOBILE NAVIGATION
// ============================================================
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');

function closeMenu() {
    navLinks?.classList.remove('active');
    const icon = hamburger?.querySelector('i');
    if (icon) { icon.classList.add('fa-bars'); icon.classList.remove('fa-times'); }
}

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close menu on any nav link click
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
}


// ============================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const id = anchor.getAttribute('href');
        if (id === '#') return e.preventDefault();

        const target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    });
});


// ============================================================
// HEADER BACKGROUND ON SCROLL
// ============================================================
const header = document.querySelector('header');
if (header) {
    const applyHeaderState = () => {
        const scrolled = window.scrollY > 100;
        header.style.background       = scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.78)';
        header.style.backdropFilter   = scrolled ? 'blur(10px)' : 'blur(16px)';
    };
    window.addEventListener('scroll', applyHeaderState, { passive: true });
    applyHeaderState();
}


// ============================================================
// SCOUT POPUP
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const overlay      = document.getElementById('scoutPopup');
    const scoutLink    = document.getElementById('scoutLink');
    const scoutPopupLink = document.getElementById('scoutPopupLink');

    // Inject Scout URL into both buttons
    if (SCOUT_URL) [scoutLink, scoutPopupLink].forEach(el => el?.setAttribute('href', SCOUT_URL));

    if (!overlay) return;

    const open  = () => { overlay.classList.add('active');    document.body.classList.add('popup-open'); };
    const close = () => { overlay.classList.remove('active'); document.body.classList.remove('popup-open'); };

    // Show once per session (remove sessionStorage lines to show on every load)
    if (!sessionStorage.getItem('scoutPopupSeen')) {
        window.addEventListener('load', () => setTimeout(() => {
            open();
            sessionStorage.setItem('scoutPopupSeen', '1');
        }, 400));
    }

    // Close: X button, "Maybe Later", backdrop click, Escape key
    document.getElementById('scoutPopupClose')?.addEventListener('click', close);
    document.getElementById('scoutPopupLater')?.addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) close();
    });
});

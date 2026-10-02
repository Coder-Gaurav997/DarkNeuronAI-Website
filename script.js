// ============================================================
// SCOUT PRODUCT CONFIGURATION
// ============================================================
// Set your Scout URL here when it's ready.
// Leave it empty ("") to keep the buttons inactive for now.
const SCOUT_URL = "https://darkneuronai-scout.onrender.com"; // <-- ADD YOUR SCOUT URL HERE LATER


// ============================================================
// MOBILE NAVIGATION TOGGLE
// ============================================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
}


// ============================================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        // Ignore if it's not an internal anchor (e.g. external URL)
        if (!targetId.startsWith('#')) return;

        // Prevent default jump for all hash links
        e.preventDefault();

        // If the hash is just "#", do nothing
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});


// ============================================================
// HEADER BACKGROUND CHANGE ON SCROLL
// ============================================================
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (!header) return;
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--primary)';
        header.style.backdropFilter = 'none';
    }
});


// ============================================================
// SCOUT POPUP LOGIC
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

    // Grab elements
    const popupOverlay = document.getElementById('scoutPopup');
    const popupClose   = document.getElementById('scoutPopupClose');
    const popupLater   = document.getElementById('scoutPopupLater');
    const scoutLink    = document.getElementById('scoutLink');
    const scoutPopupLink = document.getElementById('scoutPopupLink');

    // ----- Apply Scout URL (if provided) -----
    if (SCOUT_URL) {
        [scoutLink, scoutPopupLink].forEach(link => {
            if (link) link.setAttribute('href', SCOUT_URL);
        });
    }

    // ----- Open / Close functions -----
    function openPopup() {
        if (!popupOverlay) return;
        popupOverlay.classList.add('active');
        document.body.classList.add('popup-open');
    }

    function closePopup() {
        if (!popupOverlay) return;
        popupOverlay.classList.remove('active');
        document.body.classList.remove('popup-open');
    }

    // ----- Show popup on page load (with slight delay for smoothness) -----
    // Wait for the full window load to ensure everything is painted.
    window.addEventListener('load', () => {
        setTimeout(openPopup, 400); // 400ms delay – feels natural
    });

    // ----- Close on X button -----
    if (popupClose) {
        popupClose.addEventListener('click', closePopup);
    }

    // ----- Close on "Maybe Later" button -----
    if (popupLater) {
        popupLater.addEventListener('click', closePopup);
    }

    // ----- Close when clicking on the backdrop (outside the popup box) -----
    if (popupOverlay) {
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                closePopup();
            }
        });
    }

    // ----- Close with Escape key (accessibility) -----
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popupOverlay && popupOverlay.classList.contains('active')) {
            closePopup();
        }
    });

});

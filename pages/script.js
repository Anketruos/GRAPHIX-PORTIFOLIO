/* =============================================
   ASTER TESHOME — GRAPHIX PORTFOLIO
   Global Script
   ============================================= */

// --- Theme toggle (dark default) ---
const html        = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const THEME_KEY   = 'portfolio-theme';

// Load saved preference, fall back to dark
const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
html.setAttribute('data-theme', savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
  });
}

// --- Nav scroll effect ---
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// --- Mobile nav toggle ---
const navToggle = document.getElementById('navToggle');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
    });
  });
}

// --- Fade-in on scroll ---
const fadeEls = document.querySelectorAll('.fade-in');
if (fadeEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  fadeEls.forEach(el => observer.observe(el));
}

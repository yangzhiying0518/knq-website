// KNQ Website — Main Entry Point
import { initAnimations } from './animations.js';
import { initPersonas } from './personas.js';
import { initModal } from './modal.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// ========================================================================
// Navigation: scroll-aware bg, scroll-spy, mobile menu, smooth scroll
// ========================================================================

function initNavigation() {
  const header = document.getElementById('site-header');
  const heroSection = document.getElementById('hero');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-menu-close');

  // Scroll-aware nav background
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        header.classList.remove('nav-scrolled');
      } else {
        header.classList.add('nav-scrolled');
      }
    },
    { threshold: 0, rootMargin: '-72px 0px 0px 0px' }
  );
  if (heroSection) observer.observe(heroSection);

  // Scroll-spy: highlight active nav link
  const sections = document.querySelectorAll('section[id]');
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle('nav-active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.3 }
  );
  sections.forEach((section) => spyObserver.observe(section));

  // Smooth scroll with offset for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        const offset = 80;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      // Close mobile menu if open
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  });

  // Mobile menu
  if (mobileToggle && mobileMenu && mobileClose) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
    mobileClose.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = '';
    });
    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  }
}

// ========================================================================
// Stat counter animation
// ========================================================================

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || '';
          const duration = 1500;
          const start = performance.now();

          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (progress < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
          countObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => countObserver.observe(el));
}

// ========================================================================
// Page load fade-in
// ========================================================================

function initPageLoad() {
  document.body.classList.add('page-loading');
  // Wait for fonts + DOM
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      document.body.classList.remove('page-loading');
      document.body.classList.add('page-loaded');
    });
  } else {
    window.addEventListener('load', () => {
      document.body.classList.remove('page-loading');
      document.body.classList.add('page-loaded');
    });
  }
}

// ========================================================================
// Initialize everything
// ========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initPageLoad();
  initNavigation();
  initCounters();
  initAnimations(gsap, ScrollTrigger);
  initPersonas();
  initModal();
});

// KNQ Website — GSAP ScrollTrigger Animations

export function initAnimations(gsap, ScrollTrigger) {
  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Default animation: fade in + slide up
  const fadeUpElements = document.querySelectorAll('[data-animate="fade-up"]');
  fadeUpElements.forEach((el) => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Stagger children animation
  const staggerGroups = document.querySelectorAll('[data-animate="stagger"]');
  staggerGroups.forEach((group) => {
    const children = group.children;
    gsap.from(children, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: group,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Fade in from left
  const fadeLeftElements = document.querySelectorAll('[data-animate="fade-left"]');
  fadeLeftElements.forEach((el) => {
    gsap.from(el, {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Fade in from right
  const fadeRightElements = document.querySelectorAll('[data-animate="fade-right"]');
  fadeRightElements.forEach((el) => {
    gsap.from(el, {
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Architecture layers build up
  const archLayers = document.querySelectorAll('[data-animate="arch-layer"]');
  archLayers.forEach((layer, i) => {
    gsap.from(layer, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.3,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: layer.parentElement,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Workflow arrow dash animation
  const arrows = document.querySelectorAll('.workflow-arrow');
  arrows.forEach((arrow) => {
    const length = arrow.getTotalLength?.() || 100;
    gsap.fromTo(
      arrow,
      { strokeDasharray: length, strokeDashoffset: length },
      {
        strokeDashoffset: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: arrow.closest('section'),
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // Hero animations (not scroll-triggered, plays on load)
  const heroTimeline = gsap.timeline({ delay: 0.2 });

  const heroLabel = document.querySelector('#hero .section-label');
  const heroH1 = document.querySelector('#hero h1');
  const heroSub = document.querySelector('#hero .hero-subheadline');
  const heroCtas = document.querySelector('#hero .hero-ctas');
  const heroTerminal = document.querySelector('#hero .hero-terminal');
  const heroStats = document.querySelector('#hero .hero-stats');

  if (heroLabel) heroTimeline.from(heroLabel, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' });
  if (heroH1) heroTimeline.from(heroH1, { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');
  if (heroSub) heroTimeline.from(heroSub, { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');
  if (heroCtas) heroTimeline.from(heroCtas, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5');
  if (heroTerminal) heroTimeline.from(heroTerminal, { x: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');
  if (heroStats) heroTimeline.from(heroStats, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');

  // Parameter bars initial animation
  const paramBars = document.querySelectorAll('.param-bar-fill');
  paramBars.forEach((bar) => {
    const targetWidth = bar.style.width;
    bar.style.width = '0%';
    gsap.to(bar, {
      width: targetWidth,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: bar.closest('section'),
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });
  });
}

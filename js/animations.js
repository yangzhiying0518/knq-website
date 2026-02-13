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

  // ========================================================================
  // AI Editing Demo — lightweight scroll-triggered animation
  // ========================================================================

  const editingDemo = document.getElementById('editing-demo');
  if (editingDemo) {
    const demoPrompt = document.getElementById('demo-prompt');
    const demoOutput = document.getElementById('demo-output');
    const demoStats = document.getElementById('demo-stats');
    const demoPromptText = document.getElementById('demo-prompt-text');
    const demoGoBtn = document.getElementById('demo-go-btn');
    const demoClips = document.querySelectorAll('.demo-clip');

    const promptString = 'Best goals and key saves from this match';
    let demoPlayed = false;

    function playDemoSequence() {
      if (demoPlayed) return;
      demoPlayed = true;

      const tl = gsap.timeline();

      // Prompt input fades in
      tl.to(demoPrompt, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });

      // Typing effect
      tl.call(() => {
        let i = 0;
        const timer = setInterval(() => {
          demoPromptText.textContent = promptString.slice(0, i + 1);
          i++;
          if (i >= promptString.length) {
            clearInterval(timer);
            gsap.to(demoGoBtn, { opacity: 1, duration: 0.25 });
          }
        }, 30);
      }, null, '+=0.3');

      // Clips appear (wait for typing to finish)
      tl.to(demoOutput, { opacity: 1, duration: 0.3 }, '+=1.5');
      tl.to(demoClips, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.1,
        ease: 'back.out(1.2)',
      }, '-=0.1');

      // Stats
      tl.to(demoStats, { opacity: 1, duration: 0.3 }, '+=0.2');
    }

    ScrollTrigger.create({
      trigger: editingDemo,
      start: 'top 75%',
      onEnter: playDemoSequence,
    });
  }
}

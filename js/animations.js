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

  // ========================================================================
  // AI Editing Demo — lightweight scroll-triggered animation
  // ========================================================================

  const editingDemo = document.getElementById('editing-demo');
  if (editingDemo) {
    const demoPrompt = document.getElementById('demo-prompt');
    const demoOutput = document.getElementById('demo-output');
    const demoStats = document.getElementById('demo-stats');
    const demoPromptText = document.getElementById('demo-prompt-text');
    const demoPromptCursor = document.getElementById('demo-prompt-cursor');
    const demoGoBtn = document.getElementById('demo-go-btn');
    const marqueeRow1 = editingDemo.querySelector('.marquee-clips-left');
    const marqueeRow2 = editingDemo.querySelector('.marquee-clips-right');
    const marqueeContainers = editingDemo.querySelectorAll('.marquee-container');

    const promptString = 'Highlight all key moments from this match';
    let demoPlayed = false;

    function playDemoSequence() {
      if (demoPlayed) return;
      demoPlayed = true;

      const tl = gsap.timeline();

      // Step 1: Prompt input fades in with slide-up
      tl.to(demoPrompt, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });

      // Step 2: Typing effect at natural pace (45ms/char)
      tl.call(() => {
        let i = 0;
        const timer = setInterval(() => {
          demoPromptText.textContent = promptString.slice(0, i + 1);
          i++;
          if (i >= promptString.length) {
            clearInterval(timer);
            // Hide cursor, show go button with smooth transition
            if (demoPromptCursor) demoPromptCursor.classList.add('hidden');
            gsap.to(demoGoBtn, { opacity: 1, duration: 0.35, ease: 'power2.out' });
          }
        }, 45);
      }, null, '+=0.4');

      // Step 3: Brief pause after typing completes to create "processing" rhythm
      // Typing takes ~1.8s (40 chars × 45ms), so +=2.4s ensures a 0.6s gap after typing ends
      tl.to(demoOutput, { opacity: 1, duration: 0.4, ease: 'power2.out' }, '+=2.4');

      // Step 4: Row 1 slides up and starts scrolling
      tl.fromTo(marqueeContainers[0],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      );
      tl.call(() => { if (marqueeRow1) marqueeRow1.classList.remove('marquee-paused'); });

      // Step 5: Row 2 slides up staggered (0.25s later)
      tl.fromTo(marqueeContainers[1],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.35'
      );
      tl.call(() => { if (marqueeRow2) marqueeRow2.classList.remove('marquee-paused'); });

      // Step 6: Stats fade in
      tl.to(demoStats, { opacity: 1, duration: 0.4, ease: 'power2.out' }, '+=0.4');
    }

    ScrollTrigger.create({
      trigger: editingDemo,
      start: 'top 75%',
      onEnter: playDemoSequence,
    });
  }
}

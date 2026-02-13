// KNQ Website — Persona Switcher + Hero Terminal + AI Typing Effect

// ========================================================================
// Persona Data
// ========================================================================

const personas = [
  {
    name: 'Professional Analyst',
    energy: 45, slang: 5, culture: 60,
    commentary: 'A moment of individual brilliance decides the contest. The composure to drive centrally, the vision to identify the gap, and the technique to execute under immense pressure — this is what separates elite players from the rest. A goal that will be studied in coaching sessions for years to come.',
  },
  {
    name: 'Hype Gen-Z',
    energy: 95, slang: 90, culture: 40,
    commentary: "BRO WHAT DID I JUST WITNESS?! He said 'nah I got this' and absolutely SENT IT top bins! That's DISGUSTING in the best way possible! Someone check on the defender because that man just got turned inside out! GOAT behavior, no cap!",
  },
  {
    name: 'K-Pop Energy',
    energy: 90, slang: 65, culture: 95,
    commentary: "DAEBAK! Like the main character in the final episode, he rises when it matters most! The stadium is his stage and this is the climax of the concert! The fans are screaming like it's an encore — this is the moment that turns a player into a legend, an idol of the beautiful game!",
  },
  {
    name: 'LaLiga Passion',
    energy: 92, slang: 35, culture: 85,
    commentary: "GOLAZO! GOLAZO! GOLAZO! What a magnificent strike! The ball flies like a comet into the far corner — unstoppable, beautiful, PERFECT! This is football at its most dramatic, its most poetic! The stadium erupts and rightfully so — we have just witnessed something truly extraordinary!",
  },
  {
    name: 'Tactical Expert',
    energy: 30, slang: 5, culture: 70,
    commentary: 'Excellent space exploitation. Receives possession at the halfway line, immediately recognizes the high defensive line, and transitions vertically through the left half-space. The shot trajectory at approximately 28 degrees with topspin gives the goalkeeper a save probability under 8%. Textbook transition attack.',
  },
  {
    name: 'Casual Fan',
    energy: 55, slang: 20, culture: 15,
    commentary: "Oh wow, that was actually incredible! Even I can tell that was something really special. He just ran past everyone like they weren't even there and scored the prettiest goal I think I've ever seen. I don't watch football every week but THIS is why people love this sport!",
  },
];

// ========================================================================
// Hero Terminal Auto-Cycle
// ========================================================================

function initHeroTerminal() {
  const terminalText = document.getElementById('terminal-text');
  const terminalBadge = document.getElementById('terminal-badge');
  const terminalDots = document.querySelectorAll('.terminal-cycle-dot');
  if (!terminalText || !terminalBadge) return;

  const heroPersonas = [personas[0], personas[1], personas[2]]; // Pro, Gen-Z, K-Pop
  let currentIndex = 0;
  let typingTimer = null;

  function showPersona(index) {
    const p = heroPersonas[index];
    terminalBadge.textContent = p.name;
    const truncated = p.commentary.slice(0, 60) + '...';

    // Typing effect for terminal
    terminalText.textContent = '';
    let charIndex = 0;
    clearInterval(typingTimer);
    typingTimer = setInterval(() => {
      if (charIndex < truncated.length) {
        terminalText.textContent += truncated[charIndex];
        charIndex++;
      } else {
        clearInterval(typingTimer);
      }
    }, 15);

    // Update dots
    terminalDots.forEach((dot, i) => {
      dot.classList.toggle('bg-accent', i === index);
      dot.classList.toggle('bg-border', i !== index);
    });
  }

  showPersona(0);
  setInterval(() => {
    currentIndex = (currentIndex + 1) % heroPersonas.length;
    showPersona(currentIndex);
  }, 4000);
}

// ========================================================================
// Commentary Section Persona Switcher
// ========================================================================

function initCommentaryPersonas() {
  const tabs = document.querySelectorAll('.persona-tab');
  const outputEl = document.getElementById('commentary-output');
  const cursorEl = document.getElementById('commentary-cursor');
  const barEnergy = document.getElementById('bar-energy');
  const barSlang = document.getElementById('bar-slang');
  const barCulture = document.getElementById('bar-culture');
  const valEnergy = document.getElementById('val-energy');
  const valSlang = document.getElementById('val-slang');
  const valCulture = document.getElementById('val-culture');

  if (!tabs.length || !outputEl) return;

  let activeIndex = 0;
  let typingRAF = null;
  let autoCycleTimer = null;
  let autoCycleInterval = null;
  let userInteracted = false;

  function setActivePersona(index, animate = true) {
    activeIndex = index;
    const p = personas[index];

    // Update tabs
    tabs.forEach((tab, i) => {
      tab.classList.toggle('persona-active', i === index);
      // Reset progress bar
      const progress = tab.querySelector('.persona-progress');
      if (progress) {
        progress.style.animation = 'none';
        progress.offsetHeight; // reflow
        if (i === index && !userInteracted) {
          progress.style.animation = 'progress-fill 5s linear forwards';
        }
      }
    });

    // Update parameter bars
    if (barEnergy) { barEnergy.style.width = p.energy + '%'; }
    if (barSlang) { barSlang.style.width = p.slang + '%'; }
    if (barCulture) { barCulture.style.width = p.culture + '%'; }
    if (valEnergy) valEnergy.textContent = p.energy;
    if (valSlang) valSlang.textContent = p.slang;
    if (valCulture) valCulture.textContent = p.culture;

    // AI Typing effect
    if (animate) {
      typeCommentary(p.commentary);
    } else {
      outputEl.textContent = p.commentary;
      if (cursorEl) cursorEl.classList.add('hidden');
    }
  }

  function typeCommentary(text) {
    // Cancel any existing typing
    if (typingRAF) cancelAnimationFrame(typingRAF);

    // Step 1: fade out
    outputEl.style.opacity = '0';
    outputEl.style.transform = 'translateY(-5px)';

    setTimeout(() => {
      outputEl.textContent = '';
      outputEl.style.opacity = '1';
      outputEl.style.transform = 'translateY(0)';
      if (cursorEl) cursorEl.classList.remove('hidden');

      let charIndex = 0;
      const charsPerFrame = 4; // ~240 chars/sec at 60fps -> ~800ms for 200 chars

      function tick() {
        const end = Math.min(charIndex + charsPerFrame, text.length);
        outputEl.textContent = text.slice(0, end);
        charIndex = end;

        if (charIndex < text.length) {
          typingRAF = requestAnimationFrame(tick);
        } else {
          // Typing complete
          if (cursorEl) cursorEl.classList.add('hidden');
        }
      }
      typingRAF = requestAnimationFrame(tick);
    }, 150);
  }

  // Tab click handlers
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      userInteracted = true;
      clearTimeout(autoCycleTimer);
      clearInterval(autoCycleInterval);
      // Remove all progress animations
      tabs.forEach((t) => {
        const prog = t.querySelector('.persona-progress');
        if (prog) prog.style.animation = 'none';
      });
      setActivePersona(i);
      // Restart auto-cycle after 8s of idle
      autoCycleTimer = setTimeout(() => {
        userInteracted = false;
        startAutoCycle();
      }, 8000);
    });
  });

  // Auto-cycle
  function startAutoCycle() {
    autoCycleInterval = setInterval(() => {
      const next = (activeIndex + 1) % personas.length;
      setActivePersona(next);
    }, 5000);
  }

  // Initial state
  setActivePersona(0, false);

  // Start auto-cycle after 8s
  autoCycleTimer = setTimeout(() => {
    startAutoCycle();
  }, 8000);
}

// ========================================================================
// Export
// ========================================================================

export function initPersonas() {
  initHeroTerminal();
  initCommentaryPersonas();
}

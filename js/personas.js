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
// Export
// ========================================================================

export function initPersonas() {
  initHeroTerminal();
}

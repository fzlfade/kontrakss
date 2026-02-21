// ===== Vibe Coder Sejati — app.js =====

// Scroll reveal animation
const revealElements = () => {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;

  reveals.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 120;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealElements);
window.addEventListener('DOMContentLoaded', revealElements);

// Terminal typing effect
const typeTerminal = () => {
  const lines = document.querySelectorAll('.terminal-line');
  let delay = 0;

  lines.forEach((line, index) => {
    line.style.opacity = '0';
    line.style.transform = 'translateX(-10px)';
    line.style.transition = `all 0.4s ease ${delay}s`;

    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateX(0)';
    }, 100);

    delay += 0.3;
  });
};

// Run terminal animation when it comes into view
const terminalObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        typeTerminal();
        terminalObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const terminalCard = document.querySelector('.terminal-card');
if (terminalCard) {
  terminalObserver.observe(terminalCard);
}

// Staggered card animation
const staggerCards = () => {
  const cards = document.querySelectorAll('.team-card');
  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });
};

window.addEventListener('DOMContentLoaded', staggerCards);

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10, 10, 15, 0.9)';
  } else {
    navbar.style.background = 'rgba(10, 10, 15, 0.7)';
  }
});

// Easter egg: Konami code
let konamiSequence = [];
const konamiCode = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA',
];

document.addEventListener('keydown', (e) => {
  konamiSequence.push(e.code);
  konamiSequence = konamiSequence.slice(-10);

  if (konamiSequence.join(',') === konamiCode.join(',')) {
    document.body.style.animation = 'none';
    document.querySelectorAll('.team-card').forEach((card, i) => {
      card.style.animation = `spin 1s ease ${i * 0.15}s`;
    });

    // Add temporary spin keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(0.8); }
        100% { transform: rotate(360deg) scale(1); }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => style.remove(), 2000);
  }
});

console.log(
  '%c🚀 Vibe Coder Sejati %c— Code with passion, deploy with confidence.',
  'color: #a855f7; font-size: 16px; font-weight: bold;',
  'color: #8b8b9e; font-size: 14px;'
);

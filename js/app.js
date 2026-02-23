// ===== Vibe Coder Sejati — app.js =====
// Premium interactive experience

// ===== Particle Background System =====
class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 150 };
    this.colors = ['#b14eff', '#4d8aff', '#00e5ff', '#ff4da6', '#00ff88'];
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    this.createParticles();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    const count = Math.floor((window.innerWidth * window.innerHeight) / 15000);
    this.particles = [];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((p, i) => {
      // Move
      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap around
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      // Mouse interaction
      if (this.mouse.x !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          p.x -= dx * force * 0.02;
          p.y -= dy * force * 0.02;
        }
      }

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fill();

      // Draw connections
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = p.color;
          this.ctx.globalAlpha = (1 - dist / 120) * 0.08;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    });

    this.ctx.globalAlpha = 1;
    requestAnimationFrame(() => this.animate());
  }
}

// ===== Navbar Scroll Effect =====
const initNavbar = () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Background change
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link tracking
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 200;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    links.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  });
};

// ===== Mobile Menu =====
const initMobileMenu = () => {
  const toggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close on link click
  navLinks.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
};

// ===== Smooth Scroll =====
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
};

// ===== Scroll Reveal =====
const initScrollReveal = () => {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
};

// ===== Terminal Typing Effect =====
const initTerminal = () => {
  const lines = document.querySelectorAll('.terminal-line');
  if (!lines.length) return;

  const terminalCard = document.querySelector('.terminal-card');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          lines.forEach((line, index) => {
            setTimeout(() => {
              line.classList.add('visible');
            }, index * 200);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  if (terminalCard) {
    observer.observe(terminalCard);
  }
};

// ===== Staggered Team Card Animation =====
const initTeamCards = () => {
  const cards = document.querySelectorAll('.team-card');

  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.12}s`;
  });

  // 3D Tilt effect
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
};

// ===== Skill Bars Animation =====
const initSkillBars = () => {
  const skillFills = document.querySelectorAll('.skill-fill');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll('.skill-fill');
          fills.forEach((fill) => {
            const width = fill.getAttribute('data-width');
            fill.style.setProperty('--fill-width', `${width}%`);
            setTimeout(() => fill.classList.add('animated'), 300);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('.team-card').forEach((card) => {
    observer.observe(card);
  });
};

// ===== Stats Counter =====
const initStatsCounter = () => {
  const stats = document.querySelectorAll('.stat-number');
  let animated = false;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out expo
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easedProgress * target);

      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          stats.forEach((stat) => animateCounter(stat));
        }
      });
    },
    { threshold: 0.3 }
  );

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    observer.observe(statsSection);
  }
};

// ===== Tech Items Stagger =====
const initTechItems = () => {
  const items = document.querySelectorAll('.tech-item');

  items.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.08}s`;

    item.addEventListener('mouseenter', () => {
      item.style.transitionDelay = '0s';
    });
  });
};

// ===== Easter Egg: Konami Code =====
const initKonamiCode = () => {
  let sequence = [];
  const code = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA',
  ];

  document.addEventListener('keydown', (e) => {
    sequence.push(e.code);
    sequence = sequence.slice(-10);

    if (sequence.join(',') === code.join(',')) {
      document.querySelectorAll('.team-card').forEach((card, i) => {
        card.style.animation = `spin 1s ease ${i * 0.15}s`;
      });

      const style = document.createElement('style');
      style.textContent = `
        @keyframes spin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(0.8); }
          100% { transform: rotate(360deg) scale(1); }
        }
      `;
      document.head.appendChild(style);
      setTimeout(() => {
        style.remove();
        document.querySelectorAll('.team-card').forEach((card) => {
          card.style.animation = '';
        });
      }, 2000);
    }
  });
};

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
  // Particle background
  new ParticleSystem('particles-canvas');

  // Core features
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initScrollReveal();
  initTerminal();
  initTeamCards();
  initSkillBars();
  initStatsCounter();
  initTechItems();
  initKonamiCode();

  // Console branding
  console.log(
    '%c🚀 Vibe Coder Sejati %c— Code with passion, deploy with confidence.',
    'color: #b14eff; font-size: 16px; font-weight: bold;',
    'color: #9090a8; font-size: 14px;'
  );
});

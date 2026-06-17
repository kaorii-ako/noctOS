/* ═══════════════════════════════════════════════════════
   NOCTOS WEBSITE — LANDING PAGE SCRIPTS
   Particles, scroll animations, nav behavior
   ═══════════════════════════════════════════════════════ */

// ─── Particle System ───
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  
  const PARTICLE_COUNT = 40;
  
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
    particle.style.animationDelay = (Math.random() * 10) + 's';
    particle.style.width = (Math.random() * 2 + 1) + 'px';
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
})();

// ─── Scroll-based Nav ───
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  }, { passive: true });
})();

// ─── Scroll Reveal Animations ───
(function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animation for grid items
        const delay = entry.target.closest('.features-grid, .tech-grid') 
          ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100 
          : 0;
        
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
})();

// ─── Smooth Scroll for Anchor Links ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ─── Terminal Typing Effect Enhancement ───
(function initTerminalEffect() {
  const terminalBody = document.querySelector('.terminal-body');
  if (!terminalBody) return;
  
  // Add cursor blink at the end
  setTimeout(() => {
    const cursor = document.createElement('div');
    cursor.className = 'terminal-line';
    cursor.innerHTML = '<span class="t-prompt">noctos@system</span> <span class="t-path">~</span> <span class="t-char">% </span><span class="t-cmd" style="border-right: 2px solid var(--accent); animation: blink 1s step-end infinite; padding-right: 2px;">_</span>';
    cursor.style.animationDelay = '2.7s';
    terminalBody.appendChild(cursor);
  }, 0);
})();

// ─── Feature Card Hover Effects ───
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.setProperty('--mouse-x', '0%');
    this.style.setProperty('--mouse-y', '0%');
  });
  
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    this.style.setProperty('--mouse-x', x + '%');
    this.style.setProperty('--mouse-y', y + '%');
  });
});

// ─── Console Easter Egg ───
console.log(`
%c◗ NoctOS %cv1.0
%c─────────────────────────
A macOS-inspired Web Operating System
Built with vanilla HTML, CSS, JavaScript
Zero dependencies. Zero frameworks.

→ Launch: http://localhost:3000/os
→ Source: https://github.com/kaorii-ako/noctOS
`, 
  'color: #3b82f6; font-size: 20px; font-weight: bold;',
  'color: #6b7280; font-size: 14px;',
  'color: #9ca3af; font-size: 12px;'
);

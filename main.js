/* ------------------------------------------------------------
   Weatherfoot read, client script.
   Intro splash + scroll reveals.
   ------------------------------------------------------------ */

(function () {
  const STORAGE_KEY = 'ww-read-entered';

  const gate = document.getElementById('gate');
  const site = document.getElementById('site');
  const enterBtn = document.getElementById('gate-enter');

  function enter() {
    gate.classList.add('hidden');
    site.classList.remove('hidden');
    site.setAttribute('aria-hidden', 'false');
    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
    setTimeout(() => { gate.style.display = 'none'; }, 700);
  }

  if (sessionStorage.getItem(STORAGE_KEY) === '1') {
    enter();
  }

  if (enterBtn) enterBtn.addEventListener('click', enter);

  // Staggered reveal on scroll
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Note: .fw-node is intentionally excluded because it uses transform for radial
  // positioning, which an inline reveal transform would clobber.
  const revealTargets = document.querySelectorAll(
    '.section .eyebrow, .section .display-1, .section .lead, .section .body-lg, ' +
    '.cast-card, .prod-feature, .prod-card, .prod-tile, .fw-engine, ' +
    '.split-media, .prod-note, .ask-proof'
  );

  if (!reduceMotion && 'IntersectionObserver' in window) {
    revealTargets.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(22px)';
      el.style.transition = 'opacity 0.85s var(--ease, cubic-bezier(0.4,0,0.2,1)), transform 0.85s var(--ease, cubic-bezier(0.4,0,0.2,1))';
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // stagger siblings within the same reveal group
        const siblings = Array.from(el.parentElement ? el.parentElement.children : [el]);
        const idx = Math.max(0, siblings.indexOf(el));
        el.style.transitionDelay = Math.min(idx * 80, 320) + 'ms';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    revealTargets.forEach(el => io.observe(el));
  }
})();

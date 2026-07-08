/* ------------------------------------------------------------
   Windy Weatherfoot pitch — client script
   Password gate + subtle scroll polish.
   ------------------------------------------------------------ */

(function () {
  const PASSWORD = 'sunpike';
  const STORAGE_KEY = 'ww-pitch-unlocked';

  const gate = document.getElementById('gate');
  const site = document.getElementById('site');
  const form = document.getElementById('gate-form');
  const input = document.getElementById('gate-input');
  const err = document.getElementById('gate-error');

  function unlock() {
    gate.classList.add('hidden');
    site.classList.remove('hidden');
    site.setAttribute('aria-hidden', 'false');
    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
    setTimeout(() => { gate.style.display = 'none'; }, 700);
  }

  if (sessionStorage.getItem(STORAGE_KEY) === '1') {
    unlock();
  } else {
    setTimeout(() => input && input.focus(), 200);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const val = (input.value || '').trim().toLowerCase();
    if (val === PASSWORD) {
      err.textContent = '';
      unlock();
    } else {
      err.textContent = 'Not quite. Try again.';
      input.value = '';
      input.focus();
    }
  });

  // Subtle reveal on scroll for section content
  const revealTargets = document.querySelectorAll('.section .display-1, .section .body-lg, .cast-card, .gap-item, .move, .horizon-year, .figure-full, .figure-full-cream');
  if ('IntersectionObserver' in window) {
    revealTargets.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    revealTargets.forEach(el => io.observe(el));
  }
})();

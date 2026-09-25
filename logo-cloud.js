/* CAMPEX — LOGO CLOUD (wipe)
   Vanilla port of the LogoCloudSwap reference: every INTERVAL ms a horizontal
   clip-path wipe (with blur + fade) runs through each logo in sequence. */

(() => {
  const root = document.querySelector('[data-logo-cloud]');
  if (!root || typeof root.animate !== 'function') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const items = [...root.querySelectorAll('[data-logo-item]')];
  if (!items.length) return;

  const INTERVAL = 3200;
  const STAGGER = 80;
  const WIPE_DURATION = 920;
  const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';

  let timer = 0;
  let isVisible = false;
  let isWaving = false;

  const wipe = (item, index) => {
    const delay = index * STAGGER;
    const clip = item.animate([
      { clipPath: 'inset(0 0% 0 0)', offset: 0, easing: 'ease-in' },
      { clipPath: 'inset(0 100% 0 0)', offset: 0.4, easing: EASE_OUT },
      { clipPath: 'inset(0 0% 0 0)', offset: 1 },
    ], { duration: WIPE_DURATION, delay });

    item.animate([
      { filter: 'blur(0px)', offset: 0 },
      { filter: 'blur(8px)', offset: 0.4 },
      { filter: 'blur(0px)', offset: 1 },
    ], { duration: WIPE_DURATION * 0.9, delay, easing: 'ease-in-out' });

    item.animate([
      { opacity: 1, offset: 0 },
      { opacity: 0.2, offset: 0.4 },
      { opacity: 1, offset: 1 },
    ], { duration: WIPE_DURATION * 0.85, delay, easing: 'ease-in-out' });

    return clip.finished;
  };

  // INTERVAL is measured start-to-start, so a new wave begins every ~3.2s.
  const schedule = (elapsed = 0) => {
    window.clearTimeout(timer);
    if (isVisible) timer = window.setTimeout(wave, Math.max(0, INTERVAL - elapsed));
  };

  const wave = async () => {
    if (!isVisible || isWaving) return;
    isWaving = true;
    const startedAt = performance.now();
    try {
      await Promise.all(items.map(wipe));
    } catch {
      // Animation cancelled (e.g. page hidden); just reschedule.
    }
    isWaving = false;
    schedule(performance.now() - startedAt);
  };

  // Only run while the section is on screen.
  new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
    if (isVisible && !isWaving) schedule();
    else if (!isVisible) window.clearTimeout(timer);
  }, { threshold: 0.2 }).observe(root);
})();

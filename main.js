/* CAMPEX — HOME BASE */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
  const lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
    wheelMultiplier: 0.9,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.reveal-up').forEach((element) => {
    gsap.fromTo(element,
      { y: 42, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 86%',
          once: true,
        },
      }
    );
  });

  gsap.utils.toArray('.reveal-scale').forEach((element) => {
    gsap.fromTo(element,
      { scale: 0.985, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 88%',
          once: true,
        },
      }
    );
  });

  const steps = [...document.querySelectorAll('[data-step]')];
  const stages = [...document.querySelectorAll('[data-stage]')];

  const setActiveStep = (index) => {
    steps.forEach((step, i) => step.classList.toggle('is-active', i === index));
    stages.forEach((stage, i) => stage.classList.toggle('is-active', i === index));
  };

  if (steps.length && stages.length) {
    steps.forEach((step, index) => {
      ScrollTrigger.create({
        trigger: step,
        start: 'top 48%',
        end: 'bottom 48%',
        onEnter: () => setActiveStep(index),
        onEnterBack: () => setActiveStep(index),
      });
    });
  }

  if (!prefersReducedMotion) {
    const hero = document.querySelector('[data-hero]');
    const heroVideo = document.querySelector('.hero-video');
    const heroCopy = document.querySelector('[data-hero-copy]');

    if (hero && heroVideo) {
      gsap.to(heroVideo, {
        scale: 1.025,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    if (hero && heroCopy) {
      gsap.to(heroCopy, {
        opacity: 0.32,
        y: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: '45% top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }
}

const header = document.querySelector('[data-header]');
const hero = document.querySelector('[data-hero]');

const updateHeader = () => {
  const threshold = hero ? hero.offsetHeight - 90 : 18;
  header?.classList.toggle('is-scrolled', window.scrollY > threshold);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('resize', updateHeader);

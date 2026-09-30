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

  // Como funciona: as 4 etapas entram em sequência, da esquerda para a direita.
  const flow = document.querySelector('[data-flow]');
  if (flow && !prefersReducedMotion) {
    gsap.fromTo(flow.querySelectorAll('[data-flow-step]'),
      { x: -18, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: .9,
        ease: 'power3.out',
        stagger: .16,
        scrollTrigger: {
          trigger: flow,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }

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

// Header: dropdowns (clique; hover em desktop), menu mobile e links de Soluções.
const nav = document.querySelector('[data-nav]');
const navToggle = document.querySelector('[data-nav-toggle]');
const menus = [...document.querySelectorAll('[data-menu]')];
const desktopHover = window.matchMedia('(hover: hover) and (min-width: 981px)');

const setMenu = (menu, open) => {
  menu.classList.toggle('is-open', open);
  menu.querySelector('[data-menu-trigger]').setAttribute('aria-expanded', String(open));
};
const closeMenus = (except) => menus.forEach((menu) => { if (menu !== except) setMenu(menu, false); });

const setNavOpen = (open) => {
  if (!nav || !navToggle) return;
  nav.classList.toggle('is-open', open);
  header?.classList.toggle('is-menu-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', window.campexTranslate(open ? 'Fechar menu' : 'Abrir menu'));
  document.documentElement.style.overflow = open ? 'hidden' : '';
  if (!open) closeMenus();
};

menus.forEach((menu) => {
  const trigger = menu.querySelector('[data-menu-trigger]');
  let hoverTimer = 0;

  trigger.addEventListener('click', (event) => {
    // Com mouse em desktop o hover já abriu: o clique mantém aberto. Teclado (detail 0) alterna.
    const isOpen = menu.classList.contains('is-open');
    const open = desktopHover.matches && event.detail > 0 ? true : !isOpen;
    // Em desktop só um dropdown aberto por vez; no menu mobile funcionam como acordeão.
    if (desktopHover.matches || window.innerWidth > 980) closeMenus(menu);
    setMenu(menu, open);
  });

  menu.addEventListener('mouseenter', () => {
    if (!desktopHover.matches) return;
    window.clearTimeout(hoverTimer);
    closeMenus(menu);
    setMenu(menu, true);
  });
  menu.addEventListener('mouseleave', () => {
    if (!desktopHover.matches) return;
    hoverTimer = window.setTimeout(() => setMenu(menu, false), 140);
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('[data-menu]')) {
    if (window.innerWidth > 980) closeMenus();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  const open = menus.find((menu) => menu.classList.contains('is-open'));
  if (open && window.innerWidth > 980) {
    setMenu(open, false);
    open.querySelector('[data-menu-trigger]').focus();
  } else if (nav?.classList.contains('is-open')) {
    setNavOpen(false);
    navToggle.focus();
  }
});

navToggle?.addEventListener('click', () => setNavOpen(!nav.classList.contains('is-open')));

// Qualquer link do menu fecha dropdowns/menu mobile; os de Soluções também abrem a aba certa.
nav?.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const slug = link.dataset.resultsLink;
    if (slug) document.getElementById(`results-tab-${slug}`)?.click();
    closeMenus();
    setNavOpen(false);
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 980 && nav?.classList.contains('is-open')) setNavOpen(false);
});

// "Um sistema. Diferentes resultados." — abas acessíveis, troca de lista com fade rápido.
const resultsTabs = [...document.querySelectorAll('[data-results-tab]')];

if (resultsTabs.length) {
  const FADE_MS = prefersReducedMotion ? 0 : 200;
  const resultsPanels = resultsTabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));
  let fadeTimer = 0;

  const selectResults = (nextTab) => {
    if (nextTab.getAttribute('aria-selected') === 'true') return;
    const nextPanel = document.getElementById(nextTab.getAttribute('aria-controls'));

    resultsTabs.forEach((tab) => {
      const active = tab === nextTab;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    // A new click cancels any switch in progress.
    window.clearTimeout(fadeTimer);
    resultsPanels.forEach((panel) => { if (!panel.hidden) panel.classList.add('is-fading'); });

    fadeTimer = window.setTimeout(() => {
      resultsPanels.forEach((panel) => {
        panel.hidden = panel !== nextPanel;
        panel.classList.remove('is-fading');
      });
      nextPanel.classList.add('is-fading');
      // Force a reflow so the fade-in transition runs.
      void nextPanel.offsetWidth;
      nextPanel.classList.remove('is-fading');
    }, FADE_MS);
  };

  resultsTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectResults(tab));
    tab.addEventListener('keydown', (event) => {
      const last = resultsTabs.length - 1;
      const target = {
        ArrowRight: index === last ? 0 : index + 1,
        ArrowLeft: index === 0 ? last : index - 1,
        Home: 0,
        End: last,
      }[event.key];
      if (target === undefined) return;
      event.preventDefault();
      resultsTabs[target].focus();
      selectResults(resultsTabs[target]);
    });
  });
}

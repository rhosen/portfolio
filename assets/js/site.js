
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Keep year-based experience figures current without manual edits.
  // Dates use year-month because the portfolio presents employment history at month precision.
  const updateExperienceYears = () => {
    const now = new Date();
    const currentMonthIndex = now.getFullYear() * 12 + now.getMonth();

    document.querySelectorAll('[data-years-since]').forEach(node => {
      const match = /^(\d{4})-(\d{2})$/.exec(node.dataset.yearsSince || '');
      if (!match) return;

      const startYear = Number(match[1]);
      const startMonth = Number(match[2]);
      const startMonthIndex = startYear * 12 + (startMonth - 1);
      const elapsedMonths = currentMonthIndex - startMonthIndex;

      if (elapsedMonths < 0) return;
      node.textContent = `${Math.floor(elapsedMonths / 12)}+`;
    });
  };

  updateExperienceYears();

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('#navMenu');
  const navLinks = [...document.querySelectorAll('.nav-link')];

  const closeMenu = () => {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('open');
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navMenu.classList.toggle('open', !isOpen);
    });
  }

  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  // Hero entrance.
  requestAnimationFrame(() => {
    document.body.classList.remove('page-loading');
    document.body.classList.add('page-ready');
  });

  // Active section state.
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setActiveLink = () => {
    const marker = window.scrollY + Math.min(window.innerHeight * 0.42, 300);
    let activeSection = sections[0];

    for (const section of sections) {
      if (section.offsetTop <= marker) activeSection = section;
    }

    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${activeSection.id}`
      );
    });
  };

  setActiveLink();
  window.addEventListener('scroll', setActiveLink, { passive: true });
  window.addEventListener('resize', setActiveLink);

  // Reveal selected components once, not repeatedly.
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealTargets = [
      ...document.querySelectorAll(
        '.section-heading, .experience-item, .project-feature, .technical-core, .technical-row, .education-row, .interest-layout, .contact-list'
      )
    ];

    revealTargets.forEach(node => node.classList.add('reveal-ready'));

    const revealObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -28px 0px'
    });

    revealTargets.forEach(node => revealObserver.observe(node));
  }
})();

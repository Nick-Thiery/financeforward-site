/*
 * The site's only script. Progressive enhancement: the page is complete
 * without it.
 *
 * 1. Header gains a shadow once the page scrolls.
 * 2. The nav marks the section in view with aria-current="location".
 * 3. The mobile menu dialog: focus trap, Esc, focus return, scroll lock.
 * 4. Sections below the fold fade up once as they enter.
 * 5. The mobile feature row's "1 of 3" indicator follows the scroll.
 */

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* 1. Header shadow ------------------------------------------------------ */

function initHeaderShadow(): void {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  if (!header) return;
  const sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.className = 'scroll-sentinel';
  document.body.prepend(sentinel);
  new IntersectionObserver(([entry]) => {
    header.toggleAttribute('data-scrolled', !entry?.isIntersecting);
  }).observe(sentinel);
}

/* 2. Current section ---------------------------------------------------- */

function initCurrentSection(): void {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
  const ids = [...new Set(links.map((link) => link.dataset.navLink ?? ''))];
  // Each observed element and the nav id it stands for. The footer counts as
  // the last section, so the last link stays current at the bottom of the page.
  const targets = new Map<Element, string>();
  for (const id of ids) {
    const section = document.getElementById(id);
    if (section) targets.set(section, id);
  }
  const lastId = ids[ids.length - 1];
  const footer = document.querySelector('footer');
  if (footer && lastId && targets.size > 0) targets.set(footer, lastId);
  if (targets.size === 0) return;

  const visible = new Set<Element>();
  const setCurrent = (id: string | undefined) => {
    for (const link of links) {
      if (link.dataset.navLink === id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  };

  let observer: IntersectionObserver | undefined;
  const observe = () => {
    observer?.disconnect();
    visible.clear();
    const headerHeight = document.querySelector('[data-site-header]')?.clientHeight ?? 0;
    // A band from just under the header to 40% down the viewport: the section
    // crossing it is the one being read.
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        const current = [...targets.keys()].find((target) => visible.has(target));
        setCurrent(current ? targets.get(current) : undefined);
      },
      { rootMargin: `-${headerHeight + 1}px 0px -60% 0px` },
    );
    for (const target of targets.keys()) observer.observe(target);
  };

  observe();
  let resizeTimer: number | undefined;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(observe, 150);
  });
}

/* 3. Mobile menu -------------------------------------------------------- */

function initMobileMenu(): void {
  const dialog = document.querySelector<HTMLDialogElement>('[data-menu]');
  const openButton = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  const closeButton = dialog?.querySelector<HTMLButtonElement>('[data-menu-close]');
  if (!dialog || !openButton || !closeButton) return;

  const root = document.documentElement;
  let returnFocus = true;

  const focusables = () => [
    ...dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
  ];

  const open = () => {
    returnFocus = true;
    dialog.showModal();
    root.classList.add('is-menu-open');
    openButton.setAttribute('aria-expanded', 'true');
    closeButton.focus();
  };

  const close = () => {
    if (!dialog.open) return;
    dialog.close();
  };

  // Runs for every way the dialog closes: Close, Esc, a link, or resizing.
  dialog.addEventListener('close', () => {
    root.classList.remove('is-menu-open');
    openButton.setAttribute('aria-expanded', 'false');
    if (returnFocus) openButton.focus();
  });

  openButton.addEventListener('click', open);
  closeButton.addEventListener('click', close);

  dialog.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const items = focusables();
    const first = items[0];
    const last = items[items.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  // Section links: close first (releasing the scroll lock), then let the
  // browser follow the anchor. Focus goes with the reader, not back to Menu.
  for (const link of dialog.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) {
    link.addEventListener('click', () => {
      returnFocus = false;
      root.classList.remove('is-menu-open');
      close();
    });
  }

  window.matchMedia('(min-width: 1024px)').addEventListener('change', (event) => {
    if (event.matches) close();
  });
}

/* 4. Reveal ------------------------------------------------------------- */

function initReveal(): void {
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;
  const sections = [...document.querySelectorAll<HTMLElement>('[data-reveal-section]')];
  // Only hide sections that start below the fold, so nothing visible flickers.
  const pending = sections.filter(
    (section) => section.getBoundingClientRect().top > window.innerHeight,
  );
  if (pending.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const section = entry.target as HTMLElement;
        section.dataset.reveal = 'done';
        observer.unobserve(section);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );

  for (const section of pending) {
    section.dataset.reveal = 'pending';
    observer.observe(section);
  }
}

/* 5. Feature row position ------------------------------------------------ */

function initFeatureRow(): void {
  const scroller = document.querySelector<HTMLElement>('[data-feature-scroller]');
  const position = document.querySelector<HTMLElement>('[data-feature-position]');
  const dots = [...document.querySelectorAll<HTMLElement>('[data-feature-dot]')];
  if (!scroller || !position) return;
  const cards = [...scroller.querySelectorAll<HTMLElement>('[data-feature]')];
  if (cards.length === 0) return;

  const update = () => {
    const scrollable = scroller.scrollWidth > scroller.clientWidth + 1;
    // Only a scrolling row needs to be a keyboard stop.
    if (scrollable) scroller.setAttribute('tabindex', '0');
    else scroller.removeAttribute('tabindex');

    const start = scroller.getBoundingClientRect().left;
    let index = 0;
    let best = Number.POSITIVE_INFINITY;
    cards.forEach((card, i) => {
      const distance = Math.abs(card.getBoundingClientRect().left - start);
      if (distance < best) {
        best = distance;
        index = i;
      }
    });
    // At the end of the row the last card may not reach the start edge.
    if (scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 2) {
      index = cards.length - 1;
    }
    position.textContent = String(index + 1);
    dots.forEach((dot, i) => dot.toggleAttribute('data-active', i === index));
  };

  let frame = 0;
  const schedule = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(update);
  };
  scroller.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  update();
}

initHeaderShadow();
initCurrentSection();
initMobileMenu();
initReveal();
initFeatureRow();

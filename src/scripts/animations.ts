import { animate, inView, scroll } from 'motion';

const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Reveal saat elemen masuk viewport. Anak dari [data-reveal-group] muncul bergiliran. */
function initReveal() {
  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    group.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el, i) => {
      el.style.setProperty('--reveal-delay', `${Math.min(i * 90, 450)}ms`);
    });
  });

  inView(
    '[data-reveal]',
    (el) => {
      el.classList.add('is-revealed');
    },
    { margin: '0px 0px -10% 0px' },
  );
}

/** Angka berhitung naik: <span data-counter="50">50</span> */
function initCounters() {
  inView('[data-counter]', (el) => {
    const target = Number(el.getAttribute('data-counter'));
    if (!Number.isFinite(target)) return;
    const format = new Intl.NumberFormat(root.lang || 'id');
    animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        el.textContent = format.format(Math.round(value));
      },
    });
  });
}

/** Parallax halus pada latar hero: <div data-parallax> di dalam section. */
function initParallax() {
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const section = el.closest('section') ?? el;
    scroll(animate(el, { transform: ['translateY(0%)', 'translateY(10%)'] }, { ease: 'linear' }), {
      target: section,
      offset: ['start start', 'end start'],
    });
  });
}

if (!reducedMotion) {
  initReveal();
  initCounters();
  initParallax();
}
root.classList.add('anim-ready');

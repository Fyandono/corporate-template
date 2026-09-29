/** Header: latar solid setelah di-scroll, penanda section aktif, dan menu mobile berbasis <dialog>. */
const header = document.querySelector<HTMLElement>('[data-site-header]');

if (header) {
  const update = () => header.toggleAttribute('data-scrolled', window.scrollY > 24);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

/**
 * Scroll-spy: tandai link menu untuk section yang sedang melewati tengah layar
 * (`aria-current="true"`), dan bawa anchor section itu saat pindah bahasa.
 */
const sectionLinks = document.querySelectorAll<HTMLAnchorElement>('[data-section-link]');
const langLinks = document.querySelectorAll<HTMLAnchorElement>('[data-lang-link]');
const sections = [...new Set([...sectionLinks].map((link) => link.dataset.sectionLink!))]
  .map((id) => document.getElementById(id))
  .filter((el): el is HTMLElement => el !== null);

if (sections.length > 0) {
  let active: string | null = null;
  const setActive = (id: string | null) => {
    active = id;
    sectionLinks.forEach((link) => {
      if (link.dataset.sectionLink === id) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    langLinks.forEach((link) => (link.hash = id ?? ''));
  };
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id);
        else if (entry.target.id === active) setActive(null);
      }
    },
    { rootMargin: '-50% 0px -50% 0px' },
  );
  sections.forEach((section) => observer.observe(section));
}

const dialog = document.querySelector<HTMLDialogElement>('[data-mobile-menu]');
const openButton = document.querySelector<HTMLButtonElement>('[data-mobile-menu-open]');

if (dialog && openButton) {
  openButton.addEventListener('click', () => {
    dialog.showModal();
    openButton.setAttribute('aria-expanded', 'true');
  });
  dialog.addEventListener('close', () => {
    openButton.setAttribute('aria-expanded', 'false');
    openButton.focus();
  });
  dialog.querySelectorAll('[data-mobile-menu-close], a').forEach((el) => {
    el.addEventListener('click', () => dialog.close());
  });
  // Tutup saat klik area gelap di luar panel.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}

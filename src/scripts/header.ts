/** Header: latar solid setelah halaman di-scroll, dan menu mobile berbasis <dialog>. */
const header = document.querySelector<HTMLElement>('[data-site-header]');

if (header) {
  const update = () => header.toggleAttribute('data-scrolled', window.scrollY > 24);
  update();
  window.addEventListener('scroll', update, { passive: true });
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

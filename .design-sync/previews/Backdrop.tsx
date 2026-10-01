import { Backdrop, ColumnLines, Container } from 'corporate-template-ui';

// Pengganti foto: gradien "langit senja" (aset repo tidak ikut dikirim ke Claude Design).
const photo = {
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#404040"/><stop offset="0.6" stop-color="#a3a3a3"/><stop offset="1" stop-color="#e5e5e5"/></linearGradient></defs><rect width="1600" height="900" fill="url(#g)"/><path d="M0 700 L500 380 L760 560 L1040 300 L1600 640 V900 H0Z" fill="#262626"/></svg>`,
  )}`,
  alt: '',
  width: 1600,
  height: 900,
};

export const VignetteLeft = () => (
  <section className="relative isolate overflow-hidden bg-primary-950 text-white">
    <Backdrop image={photo} vignette="left" />
    <ColumnLines />
    <Container className="py-32">
      <p className="text-eyebrow font-semibold text-accent-400 uppercase">Foto latar</p>
      <p className="mt-6 max-w-2xl font-serif text-headline font-light">
        Teks di sisi gelap, foto terbuka di sisi seberangnya.
      </p>
    </Container>
  </section>
);

export const VignetteCenter = () => (
  <section className="relative isolate overflow-hidden bg-primary-950 text-white">
    <Backdrop image={photo} vignette="center" />
    <Container className="grid gap-10 py-32 lg:grid-cols-2">
      <p className="font-serif text-headline font-light">Teks di kedua sisi.</p>
      <p className="text-body-lg text-primary-100">
        Foto diredupkan merata sehingga teks kecil tetap terbaca di mana pun.
      </p>
    </Container>
  </section>
);

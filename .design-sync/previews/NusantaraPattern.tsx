import { Container, NusantaraPattern } from 'corporate-template-ui';

export const OnDarkSection = () => (
  <section className="relative isolate overflow-hidden bg-primary-950 text-white">
    <NusantaraPattern fade="right" />
    <Container className="py-24">
      <p className="text-eyebrow font-semibold text-accent-400 uppercase">Motif kawung</p>
      <h2 className="mt-6 max-w-2xl text-headline font-light text-white">
        Warisan geometri Nusantara sebagai latar yang tenang.
      </h2>
    </Container>
  </section>
);

export const OnLightSection = () => (
  <section className="relative isolate overflow-hidden bg-neutral-50">
    <NusantaraPattern tone="light" fade="center" />
    <Container className="py-24">
      <h2 className="max-w-2xl text-headline font-light">Mari berkolaborasi membangun negeri</h2>
    </Container>
  </section>
);

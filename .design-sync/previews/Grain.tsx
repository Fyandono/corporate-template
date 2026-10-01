import { Container, Grain } from 'corporate-template-ui';

export const OnDarkSection = () => (
  <section className="relative isolate overflow-hidden bg-primary-950 text-white">
    <Grain />
    <Container className="py-24">
      <p className="text-eyebrow font-semibold text-accent-400 uppercase">Grain</p>
      <p className="mt-6 max-w-2xl font-serif text-headline font-light">
        Tekstur film halus agar bidang gelap tidak terasa datar.
      </p>
    </Container>
  </section>
);

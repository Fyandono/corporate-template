import { Section, SectionHeading } from 'corporate-template-ui';

export const Tones = () => (
  <div>
    <Section tone="light" spacing="compact">
      <SectionHeading index="01" eyebrow="Light" title="Section berlatar putih" />
    </Section>
    <Section tone="muted" spacing="compact">
      <SectionHeading index="02" eyebrow="Muted" title="Section berlatar abu muda" />
    </Section>
    <Section tone="dark" spacing="compact">
      <SectionHeading tone="dark" index="03" eyebrow="Dark" title="Section sinematik gelap" />
    </Section>
  </div>
);

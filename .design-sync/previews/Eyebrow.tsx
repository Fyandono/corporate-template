import { Eyebrow } from 'corporate-template-ui';

export const Tones = () => (
  <div className="grid gap-6">
    <div className="bg-white p-8">
      <Eyebrow index="01">Tentang Kami</Eyebrow>
    </div>
    <div className="bg-white p-8">
      <Eyebrow tone="strong" rule={false}>
        Dewan Komisaris
      </Eyebrow>
    </div>
    <div className="bg-primary-950 p-8">
      <Eyebrow tone="dark" index="03">
        Visi
      </Eyebrow>
    </div>
  </div>
);

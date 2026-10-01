import { VisionMission } from 'corporate-template-ui';

const photo = (w: number, h: number, alt = '') => ({
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#404040"/><stop offset="1" stop-color="#d4d4d4"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/></svg>`,
  )}`,
  alt,
  width: w,
  height: h,
});

export const Default = () => (
  <VisionMission
    visionTitle="Visi"
    vision="Menjadi perusahaan kelas dunia yang menjadi kebanggaan bangsa."
    missionTitle="Misi"
    mission={[
      'Menyediakan produk dan layanan berkualitas yang memberikan manfaat bagi masyarakat.',
      'Mengelola bisnis secara profesional, efisien, dan berkelanjutan.',
      'Mengembangkan sumber daya manusia yang unggul dan berintegritas.',
    ]}
  />
);

export const WithPhoto = () => (
  <VisionMission
    index="03"
    visionTitle="Visi"
    vision="Menjadi perusahaan kelas dunia yang menjadi kebanggaan bangsa."
    missionTitle="Misi"
    mission={[
      'Menyediakan produk dan layanan berkualitas yang memberikan manfaat bagi masyarakat.',
      'Mengelola bisnis secara profesional, efisien, dan berkelanjutan.',
    ]}
    image={photo(1600, 900)}
  />
);

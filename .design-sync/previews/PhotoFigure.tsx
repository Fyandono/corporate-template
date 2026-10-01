import { PhotoFigure } from 'corporate-template-ui';

const photo = (w: number, h: number) => ({
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#262626"/><stop offset="1" stop-color="#a3a3a3"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/></svg>`,
  )}`,
  alt: 'Gugusan pulau dilihat dari udara',
  width: w,
  height: h,
});

export const Panorama = () => (
  <div className="p-8">
    <PhotoFigure image={photo(2100, 900)} ratio="panorama" caption="Misool, Raja Ampat" />
  </div>
);

export const CardWithLabel = () => (
  <div className="max-w-sm p-8">
    <PhotoFigure image={photo(800, 1000)} ratio="card" caption="Ubud, Bali" label="05" />
  </div>
);

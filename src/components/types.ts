/** Gambar yang sudah dioptimasi, siap dipakai `<img>` di komponen React. */
export type ResponsiveImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  srcSet?: string;
  sizes?: string;
};

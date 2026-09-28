/**
 * Barrel komponen React presentasional. Dipakai untuk sinkronisasi ke Claude Design
 * (lihat .design-sync/); halaman Astro tetap mengimpor file komponen langsung.
 */
export { default as Button, type ButtonProps, type ButtonVariant } from './ui/Button';
export { default as Container, containerClass, type ContainerProps } from './ui/Container';
export { default as ColumnLines } from './ui/ColumnLines';
export { default as Logo, type LogoProps } from './ui/Logo';
export { default as NusantaraPattern, type NusantaraPatternProps } from './ui/NusantaraPattern';
export { default as SectionHeading, type SectionHeadingProps } from './ui/SectionHeading';
export { default as BusinessCard, type BusinessCardProps } from './sections/BusinessCard';
export {
  default as CinematicStatement,
  type CinematicStatementProps,
} from './sections/CinematicStatement';
export { default as CtaBand, type CtaBandProps } from './sections/CtaBand';
export { default as Hero, type HeroProps } from './sections/Hero';
export { default as NewsCard, type NewsCardProps } from './sections/NewsCard';
export { default as PageHero, type PageHeroProps, type Crumb } from './sections/PageHero';
export { default as StatsBand, type StatsBandProps, type Stat } from './sections/StatsBand';
export { default as Footer, type FooterProps } from './layout/Footer';
export type { ResponsiveImage } from './types';

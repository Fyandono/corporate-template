/**
 * Barrel komponen React presentasional. Dipakai untuk sinkronisasi ke Claude Design
 * (lihat .design-sync/); halaman Astro tetap mengimpor file komponen langsung.
 */
export { default as Backdrop, type BackdropProps, type BackdropVignette } from './ui/Backdrop';
export { default as Button, type ButtonProps, type ButtonVariant } from './ui/Button';
export { default as Container, containerClass, type ContainerProps } from './ui/Container';
export { default as ColumnLines, type ColumnLinesProps } from './ui/ColumnLines';
export { default as Eyebrow, type EyebrowProps, type EyebrowTone } from './ui/Eyebrow';
export { default as Grain, type GrainProps } from './ui/Grain';
export { default as Logo, type LogoProps } from './ui/Logo';
export { default as NusantaraPattern, type NusantaraPatternProps } from './ui/NusantaraPattern';
export { default as PersonCard, type PersonCardProps } from './ui/PersonCard';
export {
  default as PhotoFigure,
  type PhotoFigureProps,
  type PhotoFigureRatio,
} from './ui/PhotoFigure';
export {
  default as Section,
  sectionClasses,
  type SectionProps,
  type SectionSpacing,
  type SectionTone,
} from './ui/Section';
export { default as SectionHeading, type SectionHeadingProps } from './ui/SectionHeading';
export { default as AboutIntro, type AboutIntroProps } from './sections/AboutIntro';
export {
  default as BusinessCard,
  type BusinessCardProps,
  type BusinessCardVariant,
} from './sections/BusinessCard';
export {
  default as CinematicStatement,
  type CinematicStatementProps,
} from './sections/CinematicStatement';
export {
  default as BusinessSection,
  type BusinessSectionProps,
  type BusinessLayout,
} from './sections/BusinessSection';
export {
  default as ContactSection,
  type ContactSectionProps,
  type ContactDetail,
} from './sections/ContactSection';
export { default as CtaBand, type CtaBandProps } from './sections/CtaBand';
export { default as Hero, type HeroProps } from './sections/Hero';
export { default as LeaderMessage, type LeaderMessageProps } from './sections/LeaderMessage';
export {
  default as ManagementSection,
  type ManagementSectionProps,
  type ManagementGroup,
} from './sections/ManagementSection';
export { default as NewsCard, type NewsCardProps } from './sections/NewsCard';
export { default as NewsSection, type NewsSectionProps } from './sections/NewsSection';
export { default as PageHero, type PageHeroProps, type Crumb } from './sections/PageHero';
export { default as StatsBand, type StatsBandProps, type Stat } from './sections/StatsBand';
export { default as Timeline, type TimelineProps, type Milestone } from './sections/Timeline';
export { default as ValuesGrid, type ValuesGridProps, type ValueItem } from './sections/ValuesGrid';
export { default as VisionMission, type VisionMissionProps } from './sections/VisionMission';
export { default as Footer, type FooterProps } from './layout/Footer';
export type { ResponsiveImage } from './types';

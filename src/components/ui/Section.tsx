import type { ReactNode } from 'react';
import { cx } from '../cx';
import Container from './Container';

export type SectionTone = 'light' | 'muted' | 'dark';
export type SectionSpacing = 'default' | 'compact' | 'none';

const tones: Record<SectionTone, string> = {
  light: 'bg-white',
  muted: 'bg-neutral-50',
  dark: 'bg-primary-950 text-white',
};

const spacings: Record<SectionSpacing, string> = {
  default: 'py-section md:py-section-lg',
  compact: 'py-section-compact md:py-section-compact-lg',
  none: '',
};

/** Class `<section>` dan container-nya. Dipakai juga oleh Section.astro. */
export function sectionClasses(tone: SectionTone = 'light', spacing: SectionSpacing = 'default') {
  return { section: tones[tone], container: spacings[spacing] };
}

export type SectionProps = {
  children: ReactNode;
  /** Anchor untuk navigasi one-page, mis. "about". */
  id?: string;
  /** id judul section (untuk `aria-labelledby`). */
  labelledBy?: string;
  /** Latar: `light` (putih), `muted` (abu muda), `dark` (sinematik). */
  tone?: SectionTone;
  /** Ritme vertikal dari token `--spacing-section*`. */
  spacing?: SectionSpacing;
  className?: string;
  /** Class tambahan untuk Container di dalamnya, mis. grid. */
  containerClassName?: string;
};

/** Pembungkus section standar: latar + Container + padding vertikal dari token. */
export default function Section({
  children,
  id,
  labelledBy,
  tone,
  spacing,
  className,
  containerClassName,
}: SectionProps) {
  const classes = sectionClasses(tone, spacing);
  return (
    <section id={id} aria-labelledby={labelledBy} className={cx(classes.section, className)}>
      <Container className={cx(classes.container, containerClassName)}>{children}</Container>
    </section>
  );
}

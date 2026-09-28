import type { HTMLAttributes } from 'react';
import { cx } from '../cx';

/** Lebar maksimum & gutter halaman. Dipakai juga oleh Container.astro. */
export const containerClass = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

export type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'section' | 'header' | 'footer';
};

export default function Container({ as: Tag = 'div', className, ...rest }: ContainerProps) {
  return <Tag className={cx(containerClass, className)} {...rest} />;
}

import type { AnchorHTMLAttributes } from 'react';
import { cx } from '../cx';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost-light' | 'accent';

export type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  /** `primary`/`secondary` untuk latar terang; `accent`/`ghost-light` untuk latar gelap. */
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary-900 text-white hover:bg-primary-700',
  secondary: 'border border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white',
  'ghost-light': 'border border-white/40 text-white hover:border-white hover:bg-white/10',
  accent: 'bg-accent-300 text-primary-950 hover:bg-white',
};

/** Link bergaya tombol dengan panah. Situs statis: selalu `<a>`, tidak ada tombol submit. */
export default function Button({ variant = 'primary', className, children, ...rest }: ButtonProps) {
  return (
    <a
      className={cx(
        'group inline-flex min-h-13 items-center justify-center gap-3 rounded-card px-7 text-small font-medium tracking-wide transition-colors duration-200',
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
      <svg
        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 8h10M9 4l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </a>
  );
}

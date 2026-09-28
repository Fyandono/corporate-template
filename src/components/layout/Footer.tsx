import Container from '../ui/Container';
import Logo from '../ui/Logo';

type Link = { label: string; href: string };

export type FooterProps = {
  brandName: string;
  homeHref: string;
  /** Label aksesibel untuk link logo ke beranda. */
  homeLabel: string;
  tagline: string;
  legalName: string;
  addressLines: string[];
  mainNav: Link[];
  mainNavLabel: string;
  followUsLabel: string;
  social: Link[];
  /** Teks tersembunyi untuk link yang membuka tab baru. */
  opensInNewTabLabel: string;
  phone: string;
  phoneLabel: string;
  email: string;
  emailLabel: string;
  /** Baris hak cipta lengkap, mis. "© 2026 PT Contoh (Persero). Hak cipta dilindungi." */
  copyright: string;
  legalNav: Link[];
  /** Jika diisi, tampilkan tombol pengaturan cookie (`data-cookie-settings`). */
  cookieSettingsLabel?: string;
};

export default function Footer(props: FooterProps) {
  return (
    <footer className="bg-primary-950 text-primary-100">
      <Container className="grid gap-12 py-16 md:grid-cols-12 lg:py-20">
        <div className="md:col-span-5">
          <a href={props.homeHref} className="inline-block text-white" aria-label={props.homeLabel}>
            <Logo name={props.brandName} />
          </a>
          <p className="mt-6 max-w-sm text-sm leading-relaxed">{props.tagline}</p>
          <address className="mt-6 text-sm leading-relaxed not-italic">
            <strong className="block font-semibold text-white">{props.legalName}</strong>
            {props.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>

        <nav aria-label={props.mainNavLabel} className="md:col-span-3">
          <ul className="space-y-3 text-sm">
            {props.mainNav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="text-sm font-semibold text-white">{props.followUsLabel}</p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm">
            {props.social.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {item.label}
                  <span className="sr-only"> {props.opensInNewTabLabel}</span>
                </a>
              </li>
            ))}
          </ul>
          <dl className="mt-8 space-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="sr-only">{props.phoneLabel}</dt>
              <dd>
                <a href={`tel:${props.phone.replace(/\s/g, '')}`} className="hover:text-white">
                  {props.phone}
                </a>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="sr-only">{props.emailLabel}</dt>
              <dd>
                <a href={`mailto:${props.email}`} className="hover:text-white">
                  {props.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 text-xs md:flex-row md:items-center md:justify-between">
          <p>{props.copyright}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {props.legalNav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
            {props.cookieSettingsLabel && (
              <li>
                <button
                  type="button"
                  data-cookie-settings
                  className="cursor-pointer hover:text-white"
                >
                  {props.cookieSettingsLabel}
                </button>
              </li>
            )}
          </ul>
        </Container>
      </div>
    </footer>
  );
}

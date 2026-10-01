import type { ResponsiveImage } from '../types';
import { cx } from '../cx';
import Button from '../ui/Button';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

export type ContactDetail = {
  label: string;
  value: string;
  /** Mis. `tel:+62…` atau `mailto:…`. */
  href?: string;
};

export type ContactSectionProps = {
  /** Anchor untuk navigasi one-page. */
  id?: string;
  /** id judul untuk `aria-labelledby`; unik per halaman. Default: `${id}-title`. */
  titleId?: string;
  index?: string;
  eyebrow?: string;
  /** Judul section. Kosongkan di halaman yang sudah punya `PageHero` berjudul sama. */
  title?: string;
  lead?: string;
  officeTitle: string;
  legalName: string;
  addressLines: string[];
  details: ContactDetail[];
  /** Peta statis + link ke layanan peta (tanpa iframe → tanpa cookie pihak ketiga). */
  map: { image: ResponsiveImage; href: string; label: string };
  /** Teks tersembunyi untuk link yang membuka tab baru. */
  opensInNewTabLabel: string;
};

/** Kontak kantor pusat: alamat, telepon/email/jam, dan peta statis. Tanpa form. */
export default function ContactSection({
  id,
  titleId = `${id ?? 'contact'}-title`,
  index,
  eyebrow,
  title,
  lead,
  officeTitle,
  legalName,
  addressLines,
  details,
  map,
  opensInNewTabLabel,
}: ContactSectionProps) {
  const OfficeHeading = title ? 'h3' : 'h2';
  return (
    <Section
      id={id}
      labelledBy={title ? titleId : undefined}
      className={cx(title && 'border-t border-neutral-200')}
      containerClassName="grid gap-12 lg:grid-cols-12"
    >
      <div className="lg:col-span-5">
        {title && (
          <SectionHeading id={titleId} index={index} eyebrow={eyebrow} title={title} lead={lead} />
        )}
        <div data-reveal>
          <OfficeHeading className={cx('font-sans text-title', title && 'mt-12')}>
            {officeTitle}
          </OfficeHeading>
          <address className="mt-4 text-body-lg leading-relaxed text-neutral-600 not-italic">
            <strong className="block text-primary-900">{legalName}</strong>
            {addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>

          <dl className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
            {details.map((detail) => (
              <div key={detail.label} className="grid gap-1 py-5 sm:grid-cols-3">
                <dt className="text-small font-semibold text-neutral-500">{detail.label}</dt>
                <dd className="sm:col-span-2">
                  {detail.href ? (
                    <a href={detail.href} className="break-all text-primary-700 hover:underline">
                      {detail.value}
                    </a>
                  ) : (
                    detail.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className={cx('lg:col-span-6 lg:col-start-7', title && 'lg:pt-16')} data-reveal>
        <a
          href={map.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group block overflow-hidden rounded-card border border-neutral-200"
        >
          <img
            {...map.image}
            loading="lazy"
            decoding="async"
            className="w-full transition-transform duration-700 group-hover:scale-102"
          />
          <span className="sr-only">
            {map.label} {opensInNewTabLabel}
          </span>
        </a>
        <Button
          href={map.href}
          variant="secondary"
          className="mt-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          {map.label}
          <span className="sr-only">{opensInNewTabLabel}</span>
        </Button>
      </div>
    </Section>
  );
}

import mapImage from '../../assets/placeholders/map.svg';
import type { ContactDetail, ContactSectionProps } from '../../components/sections/ContactSection';
import { site } from '../../config/site';
import { localize, t, type Locale, type LocalizedString } from '../../i18n';
import { responsiveImage } from '../image';
import type { SectionData } from './shared';

type Contact = {
  phone: string;
  email: string;
  hours: LocalizedString;
  address: { street: string; city: string; region: string; postalCode: string };
};
type Labels = { phone: string; email: string; hours: string };

/** `+62 21 000 0000` → `tel:+62210000000`. */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

export function contactDetails(contact: Contact, labels: Labels, lang: Locale): ContactDetail[] {
  return [
    { label: labels.phone, value: contact.phone, href: telHref(contact.phone) },
    { label: labels.email, value: contact.email, href: `mailto:${contact.email}` },
    { label: labels.hours, value: localize(contact.hours, lang) },
  ];
}

export function addressLines({ address }: Contact): string[] {
  return [address.street, `${address.city}, ${address.region} ${address.postalCode}`];
}

export async function loadContact(lang: Locale): Promise<SectionData<ContactSectionProps>> {
  const dict = t(lang);
  const { contact } = dict;
  return {
    eyebrow: dict.nav.contact,
    title: contact.title,
    lead: contact.lead,
    officeTitle: contact.office,
    legalName: site.legalName,
    addressLines: addressLines(site.contact),
    details: contactDetails(site.contact, contact, lang),
    map: {
      image: await responsiveImage(mapImage, contact.mapAlt, '(min-width: 1024px) 50vw, 100vw'),
      href: site.contact.mapsUrl,
      label: contact.openMaps,
    },
    opensInNewTabLabel: dict.common.opensInNewTab,
  };
}

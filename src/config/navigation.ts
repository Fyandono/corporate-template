import type { Dictionary } from '../i18n';
import { site, type FeatureKey } from './site';

type NavItem = { key: keyof Dictionary['nav']; path: string; feature?: FeatureKey };

const items: NavItem[] = [
  { key: 'about', path: '/about' },
  { key: 'management', path: '/management' },
  { key: 'business', path: '/business' },
  { key: 'governance', path: '/governance', feature: 'governance' },
  { key: 'sustainability', path: '/sustainability', feature: 'sustainability' },
  { key: 'news', path: '/news', feature: 'news' },
  { key: 'contact', path: '/contact' },
];

export const mainNav = items.filter((item) => !item.feature || site.features[item.feature]);

export const legalNav: NavItem[] = [
  { key: 'privacy', path: '/privacy' },
  { key: 'cookies', path: '/cookies' },
  { key: 'terms', path: '/terms' },
];

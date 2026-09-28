import * as CookieConsent from 'vanilla-cookieconsent';
import cookieConsentCss from 'vanilla-cookieconsent/dist/cookieconsent.css?url';
import { loadAnalytics, revokeAnalytics } from './analytics';

type ConsentStrings = Record<string, string>;

const config = document.getElementById('consent-config');
const measurementId = config?.dataset.gaId;

if (config && measurementId) {
  // CSS banner hanya dimuat bila analytics aktif.
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = cookieConsentCss;
  document.head.appendChild(stylesheet);
  const lang = document.documentElement.lang === 'en' ? 'en' : 'id';
  const s = JSON.parse(config.dataset.strings ?? '{}') as ConsentStrings;
  const cookiesUrl = config.dataset.cookiesUrl ?? '#';
  const cookiesLabel = config.dataset.cookiesLabel ?? '';
  const moreInfo = `${s.moreInfo} <a href="${cookiesUrl}">${cookiesLabel}</a>.`;

  const syncAnalytics = () => {
    if (CookieConsent.acceptedCategory('analytics')) loadAnalytics(measurementId);
    else revokeAnalytics();
  };

  CookieConsent.run({
    revision: 1,
    cookie: { name: 'cc_cookie', expiresAfterDays: 365, sameSite: 'Lax' },
    guiOptions: {
      consentModal: { layout: 'box', position: 'bottom left', equalWeightButtons: true },
      preferencesModal: { layout: 'box', equalWeightButtons: true },
    },
    categories: {
      necessary: { enabled: true, readOnly: true },
      analytics: {
        autoClear: { cookies: [{ name: /^_ga/ }] },
      },
    },
    onConsent: syncAnalytics,
    onChange: syncAnalytics,
    language: {
      default: lang,
      translations: {
        [lang]: {
          consentModal: {
            title: s.title,
            description: `${s.description} ${moreInfo}`,
            acceptAllBtn: s.acceptAll,
            acceptNecessaryBtn: s.rejectAll,
            showPreferencesBtn: s.settings,
          },
          preferencesModal: {
            title: s.preferencesTitle,
            acceptAllBtn: s.acceptAll,
            acceptNecessaryBtn: s.rejectAll,
            savePreferencesBtn: s.save,
            closeIconLabel: s.close,
            sections: [
              {
                title: s.necessaryTitle,
                description: s.necessaryDescription,
                linkedCategory: 'necessary',
              },
              {
                title: s.analyticsTitle,
                description: s.analyticsDescription,
                linkedCategory: 'analytics',
              },
              { description: moreInfo },
            ],
          },
        },
      },
    },
  });

  document.querySelectorAll('[data-cookie-settings]').forEach((button) => {
    button.addEventListener('click', () => CookieConsent.showPreferences());
  });
}

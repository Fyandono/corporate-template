/**
 * Google Analytics 4 (property yang terhubung dengan project Firebase).
 * Hanya dipanggil setelah pengunjung menyetujui kategori `analytics`.
 */
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let loaded = false;

export function loadAnalytics(measurementId: string) {
  if (loaded) {
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    return;
  }
  loaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js membutuhkan objek `arguments`, bukan array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
}

export function revokeAnalytics() {
  if (loaded) window.gtag('consent', 'update', { analytics_storage: 'denied' });
}

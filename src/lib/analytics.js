import { validGoatcounterCode } from '../../site.config.js';

// Counts one page view with GoatCounter's no-JavaScript pixel endpoint, so no
// third-party script runs on the page. No cookies, no fingerprinting, and only
// the referring site's origin (never the full URL) is sent.
// Skipped when: counting is off, the visitor asks not to be tracked (DNT/GPC),
// the browser is automated, or the site is running locally.
export function countVisit() {
  const code = validGoatcounterCode();
  if (!code) return;
  if (navigator.doNotTrack === '1' || navigator.globalPrivacyControl || navigator.webdriver) return;
  if (/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)) return;

  let referrer = '';
  try {
    const ref = document.referrer && new URL(document.referrer);
    if (ref && ref.origin !== location.origin) referrer = ref.origin;
  } catch {
    /* malformed referrer: send none */
  }

  const params = new URLSearchParams({ p: location.pathname, t: document.title, r: referrer, rnd: Math.random().toString(36).slice(2) });
  const pixel = new Image();
  pixel.referrerPolicy = 'no-referrer';
  pixel.src = `https://${code}.goatcounter.com/count?${params}`;
}

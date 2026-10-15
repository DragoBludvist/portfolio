// Site-wide settings that affect security headers as well as the page.
//
// GoatCounter: privacy-friendly, cookieless visit counting (free for personal sites).
// 1. Create an account at https://www.goatcounter.com and pick a site code.
// 2. Put the code below, e.g. 'aakashpremnath'.
// 3. Run `npm run sync:vercel` so the Vercel headers allow it too.
// Leave it empty to turn counting off completely (nothing is loaded or sent).
export const goatcounterCode = '';

// Only lowercase letters, digits and hyphens are accepted, so the code can be
// placed safely into a URL and the Content-Security-Policy.
export function validGoatcounterCode() {
  return /^[a-z0-9-]{1,50}$/.test(goatcounterCode) ? goatcounterCode : '';
}

export const goatcounterOrigin = () => {
  const code = validGoatcounterCode();
  return code ? `https://${code}.goatcounter.com` : '';
};

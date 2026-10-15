import { readFileSync } from 'node:fs';
import { isDeepStrictEqual } from 'node:util';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cspMeta, netlifyHeadersFile, securityHeaders, vercelHeaders } from './security/headers.js';
import { education, profile } from './src/data/profile.js';
import { safeHref } from './src/lib/safeUrl.js';

function securityHeadersPlugin() {
  return {
    name: 'security-headers',
    apply: 'build',
    // Meta CSP is a fallback for hosts that can't send headers (e.g. GitHub Pages).
    // Build-only: the dev server needs an inline script for React Fast Refresh.
    transformIndexHtml() {
      return [{ tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: cspMeta }, injectTo: 'head-prepend' }];
    },
    buildStart() {
      const vercel = JSON.parse(readFileSync(new URL('./vercel.json', import.meta.url), 'utf8'));
      if (!isDeepStrictEqual(vercel.headers, vercelHeaders())) {
        this.error('vercel.json headers are out of sync with security/headers.js. Run `npm run sync:vercel`.');
      }
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: '_headers', source: netlifyHeadersFile() });
    },
  };
}

// JSON.stringify doesn't escape "<", so a value containing "</script>" could
// close the tag early and inject markup. Escape everything HTML could act on,
// plus the two Unicode line separators. Those are built from char codes so the
// source file never contains the raw characters.
const SCRIPT_ESCAPES = {
  '<': '\\u003c',
  '>': '\\u003e',
  '&': '\\u0026',
  [String.fromCharCode(0x2028)]: '\\u2028',
  [String.fromCharCode(0x2029)]: '\\u2029',
};
const UNSAFE_IN_SCRIPT = new RegExp(`[${Object.keys(SCRIPT_ESCAPES).join('')}]`, 'g');

function jsonForScript(value) {
  return JSON.stringify(value, null, 2).replace(UNSAFE_IN_SCRIPT, (ch) => SCRIPT_ESCAPES[ch]);
}

// schema.org Person data for search engines and AI agents, built from profile.js
// so it can't drift from what the page shows.
function jsonLdPlugin() {
  const [city, region] = profile.location.split(',').map((s) => s.trim());
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    address: { '@type': 'PostalAddress', addressLocality: city, addressRegion: region, addressCountry: 'US' },
    alumniOf: education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.school })),
    knowsAbout: profile.focus,
    sameAs: [profile.links.linkedin, profile.links.github].map(safeHref).filter(Boolean),
  };
  return {
    name: 'json-ld',
    transformIndexHtml() {
      return [{ tag: 'script', attrs: { type: 'application/ld+json' }, children: jsonForScript(person), injectTo: 'head' }];
    },
  };
}

export default defineConfig({
  plugins: [react(), securityHeadersPlugin(), jsonLdPlugin()],
  build: {
    sourcemap: false,
    // Never inline assets as data: URIs; the CSP only allows same-origin files.
    assetsInlineLimit: 0,
    // The polyfill uses fetch(), which connect-src 'none' blocks; every target browser supports modulepreload.
    modulePreload: { polyfill: false },
  },
  preview: { headers: securityHeaders },
});

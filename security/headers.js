// Single source of truth for the site's HTTP security headers.
// vite.config.js uses this to emit dist/_headers (Cloudflare Pages, Netlify),
// to serve the same headers from `npm run preview`, and to fail the build
// if vercel.json has drifted from it.

import { goatcounterOrigin } from '../site.config.js';

// Visit counting sends a single image request to GoatCounter, so its origin is
// added to img-src only when a site code is configured in site.config.js.
const analyticsOrigin = goatcounterOrigin();

export const csp = {
  'default-src': ["'none'"],
  'script-src': ["'self'"],
  'style-src': ["'self'"],
  'img-src': ["'self'", ...(analyticsOrigin ? [analyticsOrigin] : [])],
  'font-src': ["'self'"],
  // The site never fetches data and has no web manifest.
  'connect-src': ["'none'"],
  'manifest-src': ["'none'"],
  'base-uri': ["'none'"],
  'form-action': ["'none'"],
  'frame-ancestors': ["'none'"],
  'object-src': ["'none'"],
  'require-trusted-types-for': ["'script'"],
  'trusted-types': ["'none'"],
};

// Directives browsers ignore in a <meta> CSP; they only work as a real header.
const headerOnly = new Set(['frame-ancestors', 'report-uri', 'sandbox']);

const serialize = (entries) =>
  entries.map(([k, v]) => (v.length ? `${k} ${v.join(' ')}` : k)).join('; ');

export const cspHeader = serialize(Object.entries(csp));
export const cspMeta = serialize(Object.entries(csp).filter(([k]) => !headerOnly.has(k)));

export const securityHeaders = {
  'Content-Security-Policy': cspHeader,
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), browsing-topics=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'X-Permitted-Cross-Domain-Policies': 'none',
};

export const cacheRules = [
  { source: '/assets/(.*)', netlify: '/assets/*', headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
];

export function netlifyHeadersFile() {
  const block = (path, headers) =>
    [path, ...Object.entries(headers).map(([k, v]) => `  ${k}: ${v}`)].join('\n');
  return [
    '# Generated from security/headers.js at build time. Do not edit.',
    block('/*', securityHeaders),
    ...cacheRules.map((r) => block(r.netlify, r.headers)),
    '',
  ].join('\n\n');
}

export function vercelHeaders() {
  const toList = (headers) => Object.entries(headers).map(([key, value]) => ({ key, value }));
  return [
    { source: '/(.*)', headers: toList(securityHeaders) },
    ...cacheRules.map((r) => ({ source: r.source, headers: toList(r.headers) })),
  ];
}

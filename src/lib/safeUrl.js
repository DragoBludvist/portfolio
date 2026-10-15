// Allow-list for every href the site renders. Content comes from
// src/data/profile.js, but treat it as untrusted anyway: a typo or a pasted
// `javascript:` / `data:` URL should never become a clickable link.

const EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const ANCHOR = /^#[A-Za-z][\w-]*$/;
const LOCAL_PATH = /^\/(?!\/)[\w\-./]*$/; // same-origin path, not protocol-relative "//"

export function safeHref(value) {
  if (typeof value !== 'string') return null;
  const href = value.trim();
  if (ANCHOR.test(href) || LOCAL_PATH.test(href)) return href;
  if (href.startsWith('mailto:')) return EMAIL.test(href.slice(7)) ? href : null;

  let url;
  try {
    url = new URL(href);
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' || url.username || url.password) return null;
  return url.href;
}

export const isExternal = (href) => href.startsWith('https://');

// Run once at startup so a bad entry is loud in development
// and quietly rendered as plain text in production.
export function auditLinks(hrefs) {
  const bad = hrefs.filter((h) => safeHref(h) === null);
  if (bad.length && import.meta.env.DEV) {
    throw new Error(`Unsafe or malformed link(s) in profile data: ${bad.join(', ')}`);
  }
  return bad;
}

# Security policy

This is a static portfolio site: no backend, no forms, no cookies, no analytics and no third-party requests.

## Reporting a vulnerability

Email **subramanyam.aa@northeastern.edu** with steps to reproduce. Please don't open a public issue for security reports. I'll reply within a few days.

## What's in place

- **Content-Security-Policy** with `default-src 'none'`: same-origin scripts, styles, fonts and images only, no inline script, no network requests (`connect-src 'none'`), and Trusted Types enforced (`require-trusted-types-for 'script'`), which blocks DOM-XSS sinks such as `innerHTML`.
- **Clickjacking**: `frame-ancestors 'none'` and `X-Frame-Options: DENY`.
- **Transport**: HSTS (two years, subdomains).
- **Isolation**: COOP and CORP `same-origin`, strict `Referrer-Policy`, `Permissions-Policy` that denies camera, mic, location and other device APIs.
- **Output encoding**: all content is rendered through React, which escapes text. There is no `dangerouslySetInnerHTML`, `eval` or HTML string building anywhere. The JSON-LD block is generated at build time with `<`, `>` and `&` escaped, so data can't close the script tag.
- **Link validation**: every `href` passes an allow-list (`src/lib/safeUrl.js`): `https:` URLs without embedded credentials, well-formed `mailto:`, same-origin paths and in-page anchors. Anything else (`javascript:`, `data:`, `//host`) renders as plain text. `SafeLink` sets `target` and `rel` itself; callers can't override them.
- **Input handling**: the saved theme in `localStorage` is accepted only if it is exactly `light` or `dark`. The command-menu search box is capped at 60 characters, only filters a fixed list of built-in actions, and is rendered as escaped text. Links opened from it go through the same allow-list and open with `noopener,noreferrer`.
- **Styling under CSP**: interactive effects (cursor spotlight, scroll progress, classifier bars) set CSS custom properties through the CSSOM, which `style-src 'self'` permits, so no inline `style` attributes or `'unsafe-inline'` are needed.
- **Headers stay in sync**: `security/headers.js` is the single source. The build emits `dist/_headers` (Cloudflare Pages, Netlify), injects a `<meta>` CSP fallback (GitHub Pages and other hosts without header support), and fails if `vercel.json` has drifted.
- **Dependencies**: Dependabot plus `npm audit` in CI on every push and pull request. No source maps in production.
- **AI agents**: `/llms.txt` gives assistants a canonical summary and routes hiring and contact questions to email, LinkedIn and GitHub. The site has no AI features, so there is no prompt-injection surface on the site itself.

# Security policy

This is a static portfolio site: no backend, no forms and no cookies. The only optional third-party request is a cookieless GoatCounter visit-count pixel, which is off unless a site code is set in `site.config.js`.

## Reporting a vulnerability

Email **subramanyam.aa@northeastern.edu** with steps to reproduce. Please don't open a public issue for security reports. I'll reply within a few days.

## What's in place

- **Content-Security-Policy** with `default-src 'none'`: same-origin scripts, styles, fonts and images only, no inline script, no network requests (`connect-src 'none'`), and Trusted Types enforced (`require-trusted-types-for 'script'`), which blocks DOM-XSS sinks such as `innerHTML`.
- **Clickjacking**: `frame-ancestors 'none'` and `X-Frame-Options: DENY`.
- **Transport**: HSTS (two years, subdomains).
- **Isolation**: COOP and CORP `same-origin`, strict `Referrer-Policy`, `Permissions-Policy` that denies camera, mic, location and other device APIs. `Access-Control-Allow-Origin` is pinned to the site's own origin (overriding the host's default `*`), so other websites can't read its files with `fetch()`.
- **Output encoding**: all content is rendered through React, which escapes text. There is no `dangerouslySetInnerHTML`, `eval` or HTML string building anywhere. The JSON-LD block is generated at build time with `<`, `>` and `&` escaped, so data can't close the script tag.
- **Link validation**: every `href` passes an allow-list (`src/lib/safeUrl.js`): `https:` URLs without embedded credentials, well-formed `mailto:`, same-origin paths and in-page anchors. Anything else (`javascript:`, `data:`, `//host`) renders as plain text. `SafeLink` sets `target` and `rel` itself; callers can't override them.
- **Input handling**: the only stored value is the "hide Drago" preference in `localStorage`, read as a simple on/off comparison and never rendered. The command-menu search box is capped at 60 characters, only filters a fixed list of built-in actions, and is rendered as escaped text. Links opened from it go through the same allow-list and open with `noopener,noreferrer`.
- **Styling under CSP**: interactive effects (cursor spotlight, scroll progress, classifier bars) set CSS custom properties through the CSSOM, which `style-src 'self'` permits, so no inline `style` attributes or `'unsafe-inline'` are needed.
- **Headers stay in sync**: `security/headers.js` is the single source. The build emits `dist/_headers` (Cloudflare Pages, Netlify), injects a `<meta>` CSP fallback (GitHub Pages and other hosts without header support), and fails if `vercel.json` has drifted.
- **Dependencies**: Dependabot plus `npm audit` in CI on every push and pull request. CI installs with `--ignore-scripts`, so a compromised package can't run install hooks there, the workflow token is read-only, and GitHub Actions are pinned to full commit SHAs (Dependabot keeps them current). No source maps in production.
- **Analytics (optional)**: GoatCounter is called through its no-JavaScript pixel, so no third-party script runs. The site code is validated against `^[a-z0-9-]{1,50}$` before it reaches a URL or the CSP, and only that one origin is added to `img-src`. Only the page path, title and referring origin are sent; DNT/GPC visitors, automated browsers and local development are skipped.
- **AI agents**: `/llms.txt` gives assistants a canonical summary and routes hiring and contact questions to email, LinkedIn and GitHub. The site has no AI features, so there is no prompt-injection surface on the site itself.

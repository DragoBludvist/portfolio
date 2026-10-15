# Aakash Premnath Subramanyam: Portfolio

Personal portfolio site for a cybersecurity engineer, built with **React 19 + Vite**. No UI framework, no trackers, no third-party requests (fonts are self-hosted), and a strict Content-Security-Policy.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs static files to dist/
npm run preview   # serve the built site with production security headers
```

## Design

"Signal over noise", a security-console theme built around the work it shows. Fonts are Space Grotesk (headings), IBM Plex Sans (body) and IBM Plex Mono (labels), all self-hosted.

- **Signal field** (hero): move the cursor, or tap on a phone, and noise fades while real signals link up.
- **Command menu**: `⌘K` / `Ctrl+K` or `/` on desktop, the console button on phones.
- **Triage demo**: a simulated run of the classifier → LLM judge → explanation pipeline over sample alerts.
- **Coverage matrix**: skills laid out like MITRE ATT&CK Navigator, with domain filters.
- Collapsible experience entries, a bento project grid with a cursor spotlight, and a scroll-progress scan line.

Every animation respects `prefers-reduced-motion`. All components are hand-written, with no UI or animation libraries.

## Editing content

Everything on the page comes from [`src/data/profile.js`](src/data/profile.js): bio, experience, projects, skills, certifications and links. To add a GitHub link to a project, fill in its `links` array:

```js
links: [{ label: 'Code', href: 'https://github.com/DragoBludvist/cloud-siem' }],
```

Replace `public/resume.pdf` to update the downloadable resume. To change the photo, copy it in with its metadata (GPS location, device details) stripped:

```bash
node scripts/strip-photo-metadata.mjs ~/Downloads/new-photo.jpg public/profile.jpg
```

## Project structure

```
public/
  llms.txt                 summary + contact routing for AI assistants
  .well-known/security.txt security contact
  profile.jpg              photo in the About section (strip EXIF/GPS first)
  resume.pdf
  theme-init.js            sets light/dark before first paint
security/headers.js        CSP and security headers (single source of truth)
src/
  data/profile.js          all site content
  lib/safeUrl.js           link allow-list
  components/              one file per section
  hooks.js                 scroll reveal, active nav section, theme
  styles.css
vercel.json                Vercel headers (regenerate with npm run sync:vercel)
```

## Deploying (free)

The site is fully static, so any static host works. Build command `npm run build`, output directory `dist`.

| Host | Free URL | Notes |
| --- | --- | --- |
| **Cloudflare Pages** (recommended) | `your-name.pages.dev` | Unlimited bandwidth, applies the generated `_headers` automatically |
| Netlify | `your-name.netlify.app` | Reads `netlify.toml` and `_headers` |
| Vercel | `your-name.vercel.app` | Auto-detects Vite; headers come from `vercel.json` |
| GitLab Pages / Codeberg Pages | `user.gitlab.io` / `user.codeberg.page` | Fully open-source alternatives to GitHub |

### Cloudflare Pages

1. Push this repo to GitHub (or GitLab).
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Pick the repo. Framework preset: **Vite**. Build command `npm run build`, output `dist`.
4. Set the project name to the subdomain you want, e.g. `aakashpremnath` → `https://aakashpremnath.pages.dev`.

Every push to `main` redeploys automatically.

### Custom domain

Add it under the Pages project's **Custom domains** tab. Options:

- Free subdomain for developers: [is-a.dev](https://github.com/is-a-dev/register) (e.g. `aakash.is-a.dev`), registered via a pull request.
- Free domain for a year through the [GitHub Student Developer Pack](https://education.github.com/pack) (check the current registrar offers).
- Paid: a `.com` or `.dev` at cost from Cloudflare Registrar, roughly $10–12 a year.

## Security

See [SECURITY.md](SECURITY.md) for what's in place and how to report an issue. To change a header, edit `security/headers.js`, then run `npm run sync:vercel`.

## License

[MIT](LICENSE)

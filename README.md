# Aakash Premnath Subramanyam: Portfolio

Personal portfolio for a cybersecurity engineer. **Offense informs defense.** Built with React 19 + Vite, hand-written components, no UI libraries, no third-party requests, and a strict Content-Security-Policy.

Designed and built with help from Claude, Anthropic's AI assistant.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs static files to dist/
npm run preview   # serve the built site with production security headers
```

## Design

Calm, recruiter-first: a clean first impression, then the key facts.

- **Colours:** black base, **red** = offense, **blue** = defense, a little **purple** = where they meet (AI security).
- **Fonts:** Space Grotesk (headings), IBM Plex Sans (body), IBM Plex Mono (labels), all self-hosted.
- **Gentle motion:** the name settles in, the "at a glance" rows slide in once, a faint halftone follows the cursor, cards glow on hover, the experience timeline draws as you scroll.
- **Drago:** a pixel-art security sidekick in his own lane at the bottom of the screen. Machines break and he fixes them. The page reserves his lane so he never covers content; visitors can hide him from the footer or the `⌘K` console.
- **Optional extras:** a simulated triage demo and a `⌘K` / `Ctrl+K` command console.
- Everything respects `prefers-reduced-motion`. Desktop is the primary layout; phones get an adapted one.

## Editing content

Everything on the page comes from [`src/data/profile.js`](src/data/profile.js).

### Adding a project (e.g. a red-team project)

Add an object to the `projects` array in `src/data/profile.js`, newest first:

```js
{
  side: 'offense',            // 'offense' (red), 'defense' (blue) or 'ai' (purple)
  kind: 'Personal project',
  name: 'Your project name',
  summary: 'One or two sentences on what it does and what you learned.',
  tools: ['Python', 'Burp Suite'],
  links: [{ label: 'Code', href: 'https://github.com/DragoBludvist/your-repo' }],
},
```

The first project in the list gets the wide card. Links must be `https://` URLs; anything else is shown as plain text.

### Photo and resume

- Replace `public/resume.pdf` to update the resume.
- Change the photo with its metadata (GPS, device) stripped:

```bash
node scripts/strip-photo-metadata.mjs ~/Downloads/new-photo.jpg public/profile.jpg
```

## Visitor counts (GoatCounter)

Counting is **off** until you configure it. It uses [GoatCounter](https://www.goatcounter.com): free for personal sites, open source, no cookies, no cookie banner.

1. Create an account and pick a site code.
2. Set it in [`site.config.js`](site.config.js): `export const goatcounterCode = 'your-code';`
3. Run `npm run sync:vercel` (the CSP now allows that one image request), then commit and deploy.
4. In GoatCounter's settings, turn on **email reports** for a regular summary.

Only page path, title and the referring site's origin are sent. Visitors with Do Not Track or Global Privacy Control enabled are not counted, and local development visits are skipped.

## Project structure

```
public/
  llms.txt                 summary + contact routing for AI assistants
  .well-known/security.txt security contact
  profile.jpg, resume.pdf  personal content (see NOTICE.md)
security/headers.js        CSP and security headers (single source of truth)
site.config.js             GoatCounter site code (off when empty)
src/
  data/profile.js          all site content
  components/              one file per section, plus Drago and the console
  lib/                     link allow-list, analytics
  hooks.js, styles.css
vercel.json                Vercel headers (regenerate with npm run sync:vercel)
design/                    design previews, not part of the build
```

## Deploying (free)

The site is fully static. Build command `npm run build`, output directory `dist`.

| Host | Free URL | Notes |
| --- | --- | --- |
| **Cloudflare Pages** | `your-name.pages.dev` | Unlimited bandwidth, applies the generated `_headers` |
| **Vercel** | `your-name.vercel.app` | Headers come from `vercel.json` |
| Netlify | `your-name.netlify.app` | Reads `netlify.toml` and `_headers` |

## Security

See [SECURITY.md](SECURITY.md). To change a header, edit `security/headers.js`, then run `npm run sync:vercel`.

## License

The **code** is [MIT-licensed](LICENSE). The **personal content** (text about me, photo, resume, the Drago character) is © Aakash Premnath Subramanyam, all rights reserved. See [NOTICE.md](NOTICE.md).

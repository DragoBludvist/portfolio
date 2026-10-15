import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Self-hosted fonts (no third-party requests): Space Grotesk for headings,
// IBM Plex Sans for body text, IBM Plex Mono for console-style labels.
import '@fontsource-variable/space-grotesk';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './styles.css';
import App from './App.jsx';
import { auditLinks } from './lib/safeUrl.js';
import { profile, projects } from './data/profile.js';

auditLinks([
  `mailto:${profile.email}`,
  ...Object.values(profile.links),
  ...projects.flatMap((p) => p.links.map((l) => l.href)),
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { profile, skills } from './data/profile.js';
import { usePrefersReducedMotion, useReveal, useTheme } from './hooks.js';
import { safeHref } from './lib/safeUrl.js';
import About from './components/About.jsx';
import CommandPalette from './components/CommandPalette.jsx';
import Contact from './components/Contact.jsx';
import Education from './components/Education.jsx';
import Experience from './components/Experience.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import Nav, { navItems } from './components/Nav.jsx';
import Projects from './components/Projects.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Skills from './components/Skills.jsx';
import TriageDemo from './components/TriageDemo.jsx';

const marqueeTools = skills.flatMap((g) => g.items.map((s) => s.name)).slice(0, 18);

const isTyping = (el) => el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));

// Opens a vetted URL in a new tab without giving it a handle back to this page.
const openSafe = (href) => {
  const safe = safeHref(href);
  if (safe) window.open(safe, '_blank', 'noopener,noreferrer');
};

export default function App() {
  useReveal();
  const [theme, toggleTheme] = useTheme();
  const reduced = usePrefersReducedMotion();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(0);

  const notify = useCallback((message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2400);
  }, []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      notify('Email copied to clipboard');
    } catch {
      notify(profile.email);
    }
  }, [notify]);

  const goTo = useCallback(
    (id) => document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }),
    [reduced],
  );

  const actions = useMemo(
    () => [
      ...navItems.map(([id, label]) => ({ id: `go-${id}`, group: 'Navigate', label: `Go to ${label}`, keywords: id, run: () => goTo(id) })),
      { id: 'demo', group: 'Actions', label: 'Run the triage demo', keywords: 'alerts soc ai', run: () => goTo('demo') },
      { id: 'copy', group: 'Actions', label: 'Copy email address', keywords: 'contact mail', run: copyEmail },
      { id: 'resume', group: 'Actions', label: 'Open resume (PDF)', keywords: 'cv', run: () => openSafe(profile.links.resume) },
      { id: 'theme', group: 'Actions', label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`, keywords: 'mode dark light', run: toggleTheme },
      { id: 'linkedin', group: 'Links', label: 'LinkedIn', keywords: 'social', run: () => openSafe(profile.links.linkedin) },
      { id: 'github', group: 'Links', label: 'GitHub', keywords: 'code', run: () => openSafe(profile.links.github) },
      { id: 'source', group: 'Links', label: 'Source code for this site', keywords: 'repo', run: () => openSafe(profile.links.source) },
    ],
    [goTo, copyEmail, theme, toggleTheme],
  );

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      } else if (e.key === '/' && !paletteOpen && !isTyping(document.activeElement)) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paletteOpen]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const openPalette = () => setPaletteOpen(true);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      <Nav theme={theme} onToggleTheme={toggleTheme} onOpenPalette={openPalette} />
      <main id="main">
        <Hero onOpenPalette={openPalette} />
        <Marquee items={marqueeTools} label="Tools I work with" />
        <About />
        <TriageDemo />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact onCopyEmail={copyEmail} />
      </main>
      <Footer />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} actions={actions} />
      <div className={`toast ${toast ? 'is-visible' : ''}`} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}

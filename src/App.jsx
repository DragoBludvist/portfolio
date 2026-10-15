import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { profile } from './data/profile.js';
import { usePrefersReducedMotion, useReveal } from './hooks.js';
import { safeHref } from './lib/safeUrl.js';
import CommandPalette from './components/CommandPalette.jsx';
import Contact from './components/Contact.jsx';
import Drago from './components/Drago.jsx';
import Education from './components/Education.jsx';
import Experience from './components/Experience.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Nav, { navItems } from './components/Nav.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import TriageDemo from './components/TriageDemo.jsx';
import WhatIDo from './components/WhatIDo.jsx';

const isTyping = (el) => el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));

// Opens a vetted URL in a new tab without giving it a handle back to this page.
const openSafe = (href) => {
  const safe = safeHref(href);
  if (safe) window.open(safe, '_blank', 'noopener,noreferrer');
};

const readDrago = () => {
  try {
    return localStorage.getItem('drago') !== 'off';
  } catch {
    return true;
  }
};

export default function App() {
  useReveal();
  const reduced = usePrefersReducedMotion();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [lit, setLit] = useState(null);
  const [dragoOn, setDragoOn] = useState(readDrago);
  const toastTimer = useRef(0);
  const litTimer = useRef(0);

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

  const goTo = useCallback((id) => document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }), [reduced]);

  // Hovering a motto word lights its card; clicking also scrolls to it.
  const highlight = useCallback(
    (tone, scroll) => {
      clearTimeout(litTimer.current);
      setLit(tone);
      if (scroll && tone) {
        document.getElementById(`pillar-${tone}`)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
        litTimer.current = setTimeout(() => setLit(null), 1600);
      }
    },
    [reduced],
  );

  const toggleDrago = useCallback(() => {
    setDragoOn((on) => {
      try {
        localStorage.setItem('drago', on ? 'off' : 'on');
      } catch {
        /* storage blocked: the choice lasts for this visit */
      }
      return !on;
    });
  }, []);

  // Drago's lane is reserved space, so content never sits underneath him.
  useEffect(() => {
    document.body.classList.toggle('has-lane', dragoOn);
  }, [dragoOn]);

  const actions = useMemo(
    () => [
      ...navItems.map(([id, label]) => ({ id: `go-${id}`, group: 'Navigate', label: `Go to ${label}`, keywords: id, run: () => goTo(id) })),
      { id: 'go-skills', group: 'Navigate', label: 'Go to Toolbox', keywords: 'skills tools', run: () => goTo('skills') },
      { id: 'go-education', group: 'Navigate', label: 'Go to Education', keywords: 'certifications degree', run: () => goTo('education') },
      { id: 'copy', group: 'Actions', label: 'Copy email address', keywords: 'contact mail', run: copyEmail },
      { id: 'resume', group: 'Actions', label: 'Open resume (PDF)', keywords: 'cv', run: () => openSafe(profile.links.resume) },
      { id: 'drago', group: 'Actions', label: dragoOn ? 'Hide Drago' : 'Show Drago', keywords: 'sidekick mascot', run: toggleDrago },
      { id: 'linkedin', group: 'Links', label: 'LinkedIn', keywords: 'social', run: () => openSafe(profile.links.linkedin) },
      { id: 'github', group: 'Links', label: 'GitHub', keywords: 'code', run: () => openSafe(profile.links.github) },
      { id: 'source', group: 'Links', label: 'Source code for this site', keywords: 'repo', run: () => openSafe(profile.links.source) },
    ],
    [goTo, copyEmail, dragoOn, toggleDrago],
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

  useEffect(
    () => () => {
      clearTimeout(toastTimer.current);
      clearTimeout(litTimer.current);
    },
    [],
  );

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav onCopyEmail={copyEmail} />
      <main id="main">
        <Hero onHighlight={highlight} />
        <WhatIDo lit={lit} />
        <Experience />
        <Projects />
        <TriageDemo />
        <Skills />
        <Education />
        <Contact onCopyEmail={copyEmail} />
      </main>
      <Footer dragoOn={dragoOn} onToggleDrago={toggleDrago} />
      {dragoOn && <Drago />}
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} actions={actions} />
      <div className={`toast ${toast ? 'is-visible' : ''}`} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}

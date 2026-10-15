import { useEffect, useState } from 'react';
import { profile } from '../data/profile.js';
import { modKey, useActiveSection, useMediaQuery } from '../hooks.js';
import { CloseIcon, MenuIcon, MoonIcon, ShieldIcon, SunIcon, TerminalIcon } from './Icons.jsx';
import SafeLink from './SafeLink.jsx';

export const navItems = [
  ['about', 'About'],
  ['demo', 'Demo'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['skills', 'Skills'],
  ['education', 'Education'],
  ['contact', 'Contact'],
];
const ids = navItems.map(([id]) => id);

export default function Nav({ theme, onToggleTheme, onOpenPalette }) {
  const active = useActiveSection(ids);
  const canHover = useMediaQuery('(hover: hover)');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.classList.add('no-scroll');
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    // While the menu is open the bar drops its backdrop blur: a backdrop-filter
    // would become the containing block for the fixed menu and collapse it.
    <header className={`nav ${open ? 'nav--open' : scrolled ? 'nav--solid' : ''}`}>
      <div className="nav-inner">
        <a href="#top" className="brand" aria-label={`${profile.name}, back to top`} onClick={close}>
          <span className="brand-mark">
            <ShieldIcon />
          </span>
          <span className="brand-name">
            {profile.shortName}
            <span className="brand-sub">security engineer</span>
          </span>
        </a>

        <nav id="site-menu" className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Sections">
          {navItems.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''} aria-current={active === id ? 'true' : undefined} onClick={close}>
              {label}
            </a>
          ))}
          <SafeLink href={profile.links.resume} newTab className="nav-cta" onClick={close}>
            Resume
          </SafeLink>
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="icon-btn console-btn"
            onClick={() => {
              close();
              onOpenPalette();
            }}
            aria-label="Open command menu"
          >
            <TerminalIcon />
            {canHover && <kbd>{modKey()} K</kbd>}
          </button>
          <button type="button" className="icon-btn" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button type="button" className="icon-btn menu-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="site-menu" aria-label="Menu">
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}

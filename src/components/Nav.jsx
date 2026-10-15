import { useEffect, useState } from 'react';
import { profile } from '../data/profile.js';
import { useActiveSection } from '../hooks.js';
import { CloseIcon, MenuIcon } from './Icons.jsx';
import SafeLink from './SafeLink.jsx';

export const navItems = [
  ['what', 'What I do'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['demo', 'Demo'],
  ['contact', 'Contact'],
];
const ids = navItems.map(([id]) => id);

export default function Nav({ onCopyEmail }) {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);

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
    // The open menu drops the bar's backdrop blur: a backdrop-filter would become
    // the containing block for the fixed menu and collapse it.
    <header className={`nav ${open ? 'nav--open' : ''}`}>
      <div className="wrap nav-inner">
        <a href="#top" className="brand" onClick={close}>
          {profile.displayName} <span>Subramanyam</span>
        </a>

        <nav id="site-menu" className={`links ${open ? 'is-open' : ''}`} aria-label="Sections">
          {navItems.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''} aria-current={active === id ? 'true' : undefined} onClick={close}>
              {label}
            </a>
          ))}
          <SafeLink href={profile.links.resume} newTab className="menu-only" onClick={close}>
            Resume (PDF)
          </SafeLink>
        </nav>

        <div className="nav-cta">
          <SafeLink className="btn btn--sm desktop-only" href={profile.links.resume} newTab>
            Resume
          </SafeLink>
          <button type="button" className="btn btn--sm btn--solid" onClick={onCopyEmail}>
            Copy email
          </button>
          <button type="button" className="icon-btn menu-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="site-menu" aria-label="Menu">
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}

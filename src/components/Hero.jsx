import { focusAreas, profile } from '../data/profile.js';
import { modKey, useMediaQuery } from '../hooks.js';
import { ArrowIcon, PinIcon, TerminalIcon } from './Icons.jsx';
import SafeLink from './SafeLink.jsx';
import ScrambleText from './ScrambleText.jsx';
import SignalField from './SignalField.jsx';

export default function Hero({ onOpenPalette }) {
  const canHover = useMediaQuery('(hover: hover)');

  return (
    <section id="top" className="hero">
      <SignalField />
      <div className="hero-inner">
        <p className="status-line">
          <abbr className="tlp" title="Traffic Light Protocol: public, no restrictions on sharing">
            TLP:CLEAR
          </abbr>
          <span className="status-dot" aria-hidden="true" />
          <span>{profile.availability}</span>
        </p>

        <h1 className="hero-name">{profile.name}</h1>
        <p className="hero-role">
          <ScrambleText text={`> ${profile.role}`} />
          <span className="cursor" aria-hidden="true" />
        </p>
        <p className="hero-summary">{profile.summary}</p>

        <div className="hero-actions">
          <a className="btn btn--primary" href="#demo">
            Try the triage demo
          </a>
          <SafeLink className="btn" href={profile.links.resume} newTab>
            Resume <ArrowIcon />
          </SafeLink>
          <button type="button" className="btn btn--ghost" onClick={onOpenPalette}>
            <TerminalIcon /> Console
            {canHover && <kbd>{modKey()} K</kbd>}
          </button>
        </div>

        <p className="hero-meta">
          <span>
            <PinIcon /> {profile.location}
          </span>
          <span className="hero-hint">{canHover ? 'Move your cursor over the field: noise fades, signal links up.' : 'Tap the field: noise fades, signal links up.'}</span>
        </p>
      </div>

      <ul className="focus-areas" aria-label="What I work on">
        {focusAreas.map((f, i) => (
          <li key={f.title}>
            <span className="focus-index" aria-hidden="true">
              0{i + 1}
            </span>
            <strong>{f.title}</strong>
            <span>{f.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

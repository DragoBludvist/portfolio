import { useEffect, useRef } from 'react';
import { glance, profile } from '../data/profile.js';
import SafeLink from './SafeLink.jsx';

const MOTTO_TONES = ['offense', 'ai', 'defense'];

// Calm first impression: one name, one line, and the facts a recruiter checks
// first in the "at a glance" card. The only motion is the name settling in,
// the glance rows sliding in once, and a faint halftone that follows the cursor.
export default function Hero({ onHighlight }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || !window.matchMedia('(hover: hover)').matches) return;
    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', `${e.clientX - r.left}px`);
      hero.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    hero.addEventListener('pointermove', onMove);
    return () => hero.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <section id="top" className="hero" ref={heroRef}>
      <div className="halftone" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div>
          <h1 className="hero-name">
            {profile.displayName}
            <span className="sr-only"> Subramanyam</span>
          </h1>
          <p className="hero-role reveal">{profile.roleLine}</p>
          <p className="motto reveal">
            {profile.motto.map((word, i) => (
              <button
                key={word}
                type="button"
                className={`motto-${MOTTO_TONES[i]}`}
                onMouseEnter={() => onHighlight(MOTTO_TONES[i], false)}
                onMouseLeave={() => onHighlight(null, false)}
                onFocus={() => onHighlight(MOTTO_TONES[i], false)}
                onBlur={() => onHighlight(null, false)}
                onClick={() => onHighlight(MOTTO_TONES[i], true)}
              >
                {word}
              </button>
            ))}
          </p>
          <p className="hero-lead reveal">{profile.lead}</p>
          <div className="actions reveal">
            <SafeLink className="btn btn--solid" href={profile.links.resume} newTab>
              Download resume
            </SafeLink>
            <a className="btn" href="#contact">
              Get in touch
            </a>
          </div>
        </div>

        <aside className="glance" aria-label="At a glance">
          <div className="glance-head">
            <img src={profile.photo.src} alt="" width="56" height="56" decoding="async" />
            <p>
              <b>{profile.displayName}</b>
              Security engineer · {profile.location}
            </p>
          </div>
          <dl>
            {glance.map((row) => (
              <div className="glance-row" key={row.label}>
                <dt>{row.label}</dt>
                <dd>
                  {row.value}
                  {row.note && <span> · {row.note}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}

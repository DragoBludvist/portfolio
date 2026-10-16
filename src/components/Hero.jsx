import { useEffect, useRef } from 'react';
import { badge, profile } from '../data/profile.js';
import SafeLink from './SafeLink.jsx';

const MOTTO_TONES = ['offense', 'ai', 'defense'];

// Calm first impression: one name, one line, and the access badge with the
// facts a recruiter checks first. The only motion is the name settling in, the
// badge sliding in once, and a faint halftone that follows the cursor.
export default function Hero() {
  const heroRef = useRef(null);
  const photoRef = useRef(null);

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

  // Native <dialog>: traps focus, closes on Esc, and returns focus to the photo button.
  const openPhoto = () => photoRef.current?.showModal();
  const closePhoto = () => photoRef.current?.close();

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
              <span key={word} className={`motto-${MOTTO_TONES[i]}`}>
                {word}
              </span>
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

        <aside className="idcard" aria-label="Access badge">
          <div className="idcard-top">
            <span>Access badge</span>
            <abbr className="idcard-tlp" title="Traffic Light Protocol: public, free to share">
              TLP:CLEAR
            </abbr>
          </div>
          <div className="idcard-id">
            <button type="button" className="idcard-photo" onClick={openPhoto} aria-label="View full photo">
              <img src={profile.photo.src} alt="" width="96" height="116" decoding="async" />
            </button>
            <div>
              <p className="idcard-name">{profile.name}</p>
              <p className="idcard-role">
                {badge.role} · {profile.location}
              </p>
              <span className="idcard-status">{badge.status}</span>
            </div>
          </div>
          <dl className="idcard-fields">
            {badge.fields.map((f) => (
              <div key={f.label} className={f.full ? 'is-full' : ''}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="idcard-code" aria-hidden="true" />
        </aside>
      </div>

      <dialog
        ref={photoRef}
        className="photo-viewer"
        aria-label={profile.photo.alt}
        // a click on the dimmed backdrop lands on the dialog itself, so it closes the viewer
        onClick={(e) => e.target === e.currentTarget && closePhoto()}
      >
        <img src={profile.photo.src} alt={profile.photo.alt} />
        <button type="button" className="photo-close" onClick={closePhoto} aria-label="Close photo">
          ×
        </button>
      </dialog>
    </section>
  );
}

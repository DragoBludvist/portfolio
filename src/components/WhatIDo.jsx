import { pillars } from '../data/profile.js';
import { useSpotlight } from '../hooks.js';
import Section from './Section.jsx';

// Three cards: offense (red), defense (blue), AI security (purple).
export default function WhatIDo() {
  const gridRef = useSpotlight('.pillar');
  return (
    <Section id="what" kicker="What I do" title="Both sides of security, and the AI in between">
      <div className="pillars" ref={gridRef}>
        {pillars.map((p) => (
          <article key={p.id} className={`pillar tone-${p.id} reveal`}>
            <p className="pillar-tag">{p.tag}</p>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
            <p className="pillar-proof">{p.proof}</p>
            {p.cta && (
              <a className="pillar-cta" href={p.cta.href}>
                {p.cta.label}
              </a>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}

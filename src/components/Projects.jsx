import { projects } from '../data/profile.js';
import { useSpotlight } from '../hooks.js';
import { ArrowIcon } from './Icons.jsx';
import SafeLink from './SafeLink.jsx';
import Section from './Section.jsx';

// Bento grid: the featured project takes the large tile. On devices with a
// mouse, a soft glow follows the cursor across the cards.
export default function Projects() {
  const gridRef = useSpotlight('.project');

  return (
    <Section id="projects" index="04" title="Projects">
      <div className="projects" ref={gridRef}>
        {projects.map((p, i) => (
          <article key={p.name} className={`card project ${i === 0 ? 'project--featured' : ''}`}>
            <p className="project-kind">{p.kind}</p>
            <h3>{p.name}</h3>
            <p className="project-desc">{p.description}</p>
            <ul className="highlights">
              {p.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <ul className="tags" aria-label="Stack">
              {p.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            {p.links.length > 0 && (
              <div className="project-links">
                {p.links.map((l) => (
                  <SafeLink key={l.href} href={l.href}>
                    {l.label} <ArrowIcon />
                  </SafeLink>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}

import { projects } from '../data/profile.js';
import { useSpotlight } from '../hooks.js';
import { ArrowIcon } from './Icons.jsx';
import SafeLink from './SafeLink.jsx';
import Section from './Section.jsx';

const SIDE_LABEL = { offense: 'Offense', defense: 'Defense', ai: 'AI security' };

// Each project's colour comes from its `side` in profile.js, so adding a new
// red-team project is just a new entry in the data file.
export default function Projects() {
  const gridRef = useSpotlight('.project');
  return (
    <Section id="projects" kicker="Projects" title="Selected work">
      <div className="projects" ref={gridRef}>
        {projects.map((p) => (
          <article key={p.name} className={`project tone-${p.side} reveal`}>
            <p className="project-kind">
              <span>{SIDE_LABEL[p.side] ?? p.side}</span> · {p.kind}
            </p>
            <h3>{p.name}</h3>
            <p className="project-summary">{p.summary}</p>
            <p className="project-tools">{p.tools.join(' · ')}</p>
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

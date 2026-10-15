import { skills } from '../data/profile.js';
import Section from './Section.jsx';

// Plain, scannable groups: the keywords recruiters search for.
export default function Skills() {
  return (
    <Section id="skills" kicker="Toolbox" title="What I work with">
      <div className="toolbox">
        {skills.map((g) => (
          <div key={g.group} className="toolbox-group reveal">
            <h3>{g.group}</h3>
            <p>{g.items.join(' · ')}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

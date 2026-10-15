import { useState } from 'react';
import { skillDomains, skills } from '../data/profile.js';
import Section from './Section.jsx';

// Coverage matrix in the style of MITRE ATT&CK Navigator: columns are skill
// groups, and the domain filters highlight matching tiles across every column.
export default function Skills() {
  const [domain, setDomain] = useState('all');
  const filters = [{ id: 'all', label: 'All' }, ...skillDomains];

  return (
    <Section id="skills" index="05" title="Coverage matrix">
      <div className="matrix-filters" role="group" aria-label="Highlight skills by domain">
        {filters.map((f) => (
          <button key={f.id} type="button" className={`chip ${domain === f.id ? 'is-active' : ''}`} aria-pressed={domain === f.id} onClick={() => setDomain(f.id)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="matrix">
        {skills.map((col) => (
          <div key={col.group} className="matrix-col">
            <h3>
              {col.group}
              <span>{col.items.length}</span>
            </h3>
            <ul>
              {col.items.map((s) => {
                const match = domain === 'all' || s.domains.includes(domain);
                return (
                  <li key={s.name} className={`tile ${match ? 'is-match' : 'is-dim'} ${domain !== 'all' && match ? 'is-hit' : ''}`}>
                    {s.name}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

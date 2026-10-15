import { certifications, education } from '../data/profile.js';
import Section from './Section.jsx';

export default function Education() {
  return (
    <Section id="education" kicker="Education" title="Training & certifications">
      <div className="edu">
        <ul className="edu-list">
          {education.map((e) => (
            <li key={e.school} className="reveal">
              <p className="edu-when">{e.period}</p>
              <h3>{e.degree}</h3>
              <p>
                {e.school} <span>· {e.detail}</span>
              </p>
            </li>
          ))}
        </ul>
        <ul className="cert-list reveal">
          {certifications.map((c) => (
            <li key={c.name}>
              <span>{c.name}</span>
              {c.status && <span className="badge">{c.status}</span>}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

import { certifications, coursework, education } from '../data/profile.js';
import Section from './Section.jsx';

export default function Education() {
  return (
    <Section id="education" index="06" title="Education & certifications">
      <div className="edu-grid">
        <div className="edu-list">
          {education.map((e) => (
            <div key={e.school} className="card edu">
              <p className="edu-when">{e.period}</p>
              <h3>{e.degree}</h3>
              <p>
                {e.school}
                <span className="muted"> · {e.detail}</span>
              </p>
              <p className="muted small">{e.location}</p>
            </div>
          ))}
          <div className="coursework">
            <h3>Relevant coursework</h3>
            <ul className="tags">
              {coursework.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="card certs">
          <h3>Certifications</h3>
          <ul>
            {certifications.map((c) => (
              <li key={c.name}>
                <span>{c.name}</span>
                {c.status && <span className="badge">{c.status}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

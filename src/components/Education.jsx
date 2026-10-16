import { certifications, education } from '../data/profile.js';
import SafeLink from './SafeLink.jsx';
import Section from './Section.jsx';

export default function Education() {
  return (
    <Section id="education" title="Education">
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
              {c.href ? (
                <SafeLink className="cert-link" href={c.href} newTab aria-label={`${c.name} (opens the certificate PDF)`}>
                  {c.name} <span aria-hidden="true">↗</span>
                </SafeLink>
              ) : (
                <span>{c.name}</span>
              )}
              {c.status && <span className="badge">{c.status}</span>}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

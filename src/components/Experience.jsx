import { useState } from 'react';
import { experience } from '../data/profile.js';
import { ChevronIcon } from './Icons.jsx';
import Section from './Section.jsx';

// Each role is a collapsible "case file". The most recent one starts open.
export default function Experience() {
  const [open, setOpen] = useState(experience[0]?.company ?? null);

  return (
    <Section id="experience" index="03" title="Experience">
      <ol className="timeline">
        {experience.map((job, i) => {
          const isOpen = open === job.company;
          const panelId = `job-panel-${i}`;
          return (
            <li key={job.company} className={`job ${isOpen ? 'is-open' : ''}`}>
              <h3 className="job-heading">
                <button type="button" className="job-toggle" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen(isOpen ? null : job.company)}>
                  <span className="job-id" aria-hidden="true">
                    case-{String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="job-main">
                    <span className="job-company">{job.company}</span>
                    <span className="job-title">{job.title}</span>
                  </span>
                  <span className="job-when">
                    {job.period}
                    <span>{job.location}</span>
                  </span>
                  <span className="job-chevron">
                    <ChevronIcon />
                  </span>
                </button>
              </h3>
              <div id={panelId} className="job-body" hidden={!isOpen}>
                <ul className="bullets">
                  {job.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
                <ul className="tags" aria-label="Tools">
                  {job.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

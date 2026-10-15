import { useEffect, useRef } from 'react';
import { experience } from '../data/profile.js';
import Section from './Section.jsx';

// The timeline line draws itself as you scroll through the section.
export default function Experience() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.7 - r.top) / r.height));
      el.style.setProperty('--p', p.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <Section id="experience" kicker="Experience" title="Where I've done it">
      <ol className="jobs" ref={ref}>
        <li className="jobs-line" aria-hidden="true" />
        {experience.map((job) => (
          <li key={job.company} className="job reveal">
            <p className="job-when">
              {job.period}
              <br />
              {job.location}
            </p>
            <div>
              <h3>{job.company}</h3>
              <p className="job-title">{job.title}</p>
              <ul>
                {job.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

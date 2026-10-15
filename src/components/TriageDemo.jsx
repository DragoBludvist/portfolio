import { useEffect, useRef, useState } from 'react';
import { demoAlerts } from '../data/profile.js';
import { usePrefersReducedMotion } from '../hooks.js';

const VERDICT = {
  escalate: { label: 'Escalate', tone: 'offense' },
  benign: { label: 'Benign', tone: 'defense' },
  review: { label: 'Analyst review', tone: 'ai' },
};
const STEPS = ['Classifying…', 'Judging…'];

// Optional, simulated mini-run of the triage idea: each sample alert is
// classified, double-checked by the judge, then given a verdict.
export default function TriageDemo() {
  const reduced = usePrefersReducedMotion();
  // status per alert: 'queued' | 0 | 1 (index into STEPS) | 'done'
  const [status, setStatus] = useState(() => demoAlerts.map(() => 'queued'));
  const [running, setRunning] = useState(false);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const finished = status.every((s) => s === 'done');

  const run = () => {
    if (running) return;
    if (finished) {
      setStatus(demoAlerts.map(() => 'queued'));
      return;
    }
    setRunning(true);
    const tick = reduced ? 0 : 480;
    let t = 0;
    demoAlerts.forEach((_, i) => {
      [0, 1, 'done'].forEach((s) => {
        timers.current.push(setTimeout(() => setStatus((prev) => prev.map((v, j) => (j === i ? s : v))), (t += tick)));
      });
    });
    timers.current.push(setTimeout(() => setRunning(false), t));
  };

  return (
    <section id="demo" className="section" aria-labelledby="demo-title">
      <div className="wrap demo">
        <div className="reveal">
          <p className="kicker">Optional · simulated</p>
          <h2 id="demo-title" className="h2 demo-title">
            See the triage idea in ten seconds
          </h2>
          <p className="demo-lead">
            Sample alerts, made up for this demo. Each one gets a verdict from the classifier and the judge, and disagreements go to a human.
          </p>
          <button type="button" className="btn btn--solid" onClick={run} disabled={running}>
            {running ? 'Triaging…' : finished ? 'Reset' : 'Run triage'}
          </button>
        </div>
        <ul className="alerts reveal">
          {demoAlerts.map((a, i) => {
            const s = status[i];
            const v = VERDICT[a.verdict];
            return (
              <li key={a.id} className={typeof s === 'number' ? 'is-working' : ''}>
                <span>
                  {a.rule}
                  <small>
                    {a.technique} · {a.tactic}
                  </small>
                </span>
                <span className={`verdict ${s === 'done' ? `tone-${v.tone}` : ''}`}>{s === 'done' ? v.label : typeof s === 'number' ? STEPS[s] : 'Queued'}</span>
              </li>
            );
          })}
        </ul>
        <p className="sr-only" role="status">
          {finished ? 'Triage complete.' : ''}
        </p>
      </div>
    </section>
  );
}

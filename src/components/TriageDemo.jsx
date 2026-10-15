import { useEffect, useState } from 'react';
import { triageSamples } from '../data/profile.js';
import { usePrefersReducedMotion } from '../hooks.js';
import Section from './Section.jsx';

const STAGES = ['Classify', 'Judge', 'Explain'];
const VERDICTS = {
  escalate: { label: 'Escalate', tone: 'alert' },
  benign: { label: 'Benign', tone: 'ok' },
  review: { label: 'Analyst review', tone: 'warn' },
};
const STEP_MS = 380;

// A hands-on, simulated version of the triage pipeline built at Navitas:
// classifier → LLM judge → explanation, run over sample alerts.
export default function TriageDemo() {
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(-1); // global step: alertIndex * 3 + stageIndex
  const [running, setRunning] = useState(false);
  const [selected, setSelected] = useState(triageSamples[0].id);
  const total = triageSamples.length * STAGES.length;

  useEffect(() => {
    if (!running) return;
    if (step >= total - 1) {
      setRunning(false);
      return;
    }
    const t = setTimeout(() => setStep((s) => s + 1), reduced ? 0 : STEP_MS);
    return () => clearTimeout(t);
  }, [running, step, total, reduced]);

  // Follow the alert being processed while the run is going.
  useEffect(() => {
    if (running && step >= 0) setSelected(triageSamples[Math.floor(step / STAGES.length)].id);
  }, [running, step]);

  const stagesDone = (i) => Math.max(0, Math.min(STAGES.length, step - i * STAGES.length + 1));
  const start = () => {
    setStep(-1);
    setRunning(true);
  };
  const reset = () => {
    setRunning(false);
    setStep(-1);
    setSelected(triageSamples[0].id);
  };

  const finished = step >= total - 1;
  const index = triageSamples.findIndex((a) => a.id === selected);
  const alert = triageSamples[index];
  const done = stagesDone(index);
  const verdict = VERDICTS[alert.verdict];

  return (
    <Section id="demo" index="02" title="Try the triage pipeline" kicker="interactive · simulated">
      <p className="section-lead">
        This is a simplified, simulated version of the alert-triage system I built. Run it over sample alerts and watch each one go through the
        classifier, the LLM judge and the analyst explanation.
      </p>

      <div className="triage">
        <div className="triage-queue">
          <div className="triage-toolbar">
            <p className="mono-label">
              queue · <span>{triageSamples.length} sample alerts</span>
            </p>
            <div className="triage-actions">
              {finished || running ? (
                <button type="button" className="btn btn--sm" onClick={reset} disabled={running}>
                  Reset
                </button>
              ) : null}
              <button type="button" className="btn btn--sm btn--primary" onClick={start} disabled={running}>
                {running ? 'Triaging…' : finished ? 'Run again' : 'Run triage'}
              </button>
            </div>
          </div>

          <ul className="triage-list">
            {triageSamples.map((a, i) => {
              const d = stagesDone(i);
              const v = VERDICTS[a.verdict];
              const state = d === 0 ? 'queued' : d < STAGES.length ? 'working' : 'done';
              return (
                <li key={a.id}>
                  <button
                    type="button"
                    className={`triage-row is-${state} ${selected === a.id ? 'is-selected' : ''}`}
                    onClick={() => setSelected(a.id)}
                    aria-pressed={selected === a.id}
                  >
                    <span className="triage-rule">{a.rule}</span>
                    <span className="triage-meta">
                      {a.host} · {a.technique}
                    </span>
                    <span className="triage-status">
                      {state === 'done' ? (
                        <span className={`pill pill--${v.tone}`}>{v.label}</span>
                      ) : (
                        <span className="pill pill--muted">{state === 'working' ? STAGES[d] + '…' : 'Queued'}</span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <article className="triage-detail" aria-label="Selected alert">
          <header>
            <p className="mono-label">
              {alert.tactic} · {alert.technique}
            </p>
            <h3>{alert.rule}</h3>
            <p className="muted small">host {alert.host}</p>
          </header>

          <ol className="pipeline">
            {STAGES.map((s, i) => (
              <li key={s} className={i < done ? 'is-done' : i === done && running ? 'is-active' : ''}>
                <span className="pipeline-dot" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ol>

          {done === 0 ? (
            <p className="triage-placeholder">Press “Run triage” to process the queue, or pick any alert after the run.</p>
          ) : (
            <div className="triage-findings">
              <div className="finding">
                <p className="mono-label">SecureBERT classifier</p>
                <div className="lean" role="img" aria-label={alert.lean > 0.5 ? 'Leans threat' : 'Leans benign'}>
                  <span className="lean-bar" data-lean={alert.lean > 0.5 ? 'threat' : 'benign'} ref={(el) => el?.style.setProperty('--lean', String(alert.lean))} />
                </div>
                <p className="small">{alert.lean > 0.5 ? 'Leans threat' : 'Leans benign'}</p>
              </div>
              {done >= 2 && (
                <div className="finding">
                  <p className="mono-label">Foundation-Sec judge</p>
                  <p className="small">{alert.judge === 'agrees' ? 'Agrees with the classifier' : 'Disagrees with the classifier'}</p>
                </div>
              )}
              {done >= 3 && (
                <>
                  <div className="finding finding--wide">
                    <p className="mono-label">Explanation for the analyst</p>
                    <p>{alert.explanation}</p>
                  </div>
                  <p className="triage-verdict" role="status">
                    Verdict <span className={`pill pill--${verdict.tone}`}>{verdict.label}</span>
                  </p>
                </>
              )}
            </div>
          )}
        </article>
      </div>
    </Section>
  );
}

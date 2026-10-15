import { profile } from '../data/profile.js';
import SafeLink from './SafeLink.jsx';

export default function Contact({ onCopyEmail }) {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="wrap contact reveal">
        <div>
          <p className="kicker">Contact</p>
          <h2 id="contact-title" className="h2 contact-title">
            Let's build something secure.
          </h2>
          <p className="contact-lead">Open to full-time roles in security operations, detection engineering and AI security.</p>
        </div>
        <div className="actions">
          <button type="button" className="btn btn--solid" onClick={onCopyEmail}>
            Copy email
          </button>
          <SafeLink className="btn" href={profile.links.linkedin}>
            LinkedIn ↗
          </SafeLink>
          <SafeLink className="btn" href={profile.links.github}>
            GitHub ↗
          </SafeLink>
        </div>
      </div>
    </section>
  );
}

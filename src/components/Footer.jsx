import { validGoatcounterCode } from '../../site.config.js';
import { profile } from '../data/profile.js';
import { modKey } from '../hooks.js';
import SafeLink from './SafeLink.jsx';

export default function Footer({ dragoOn, onToggleDrago }) {
  const counting = Boolean(validGoatcounterCode());
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p className="footer-meta">
          <span>
            Site code is <SafeLink href={`${profile.links.source}/blob/main/LICENSE`}>MIT-licensed</SafeLink>; text, photos and resume are not.
          </span>
          <span>{counting ? 'Visits counted privately, no cookies.' : 'No trackers, no cookies.'}</span>
          <span>Built with help from Claude.</span>
          <span>
            Press <kbd>{modKey()} K</kbd> for the console.
          </span>
          <button type="button" className="link-btn" onClick={onToggleDrago} aria-pressed={!dragoOn}>
            {dragoOn ? 'Hide Drago' : 'Show Drago'}
          </button>
        </p>
      </div>
    </footer>
  );
}

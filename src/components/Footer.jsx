import { profile } from '../data/profile.js';
import SafeLink from './SafeLink.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
      <p className="footer-meta">
        <span>No trackers · strict CSP · open source</span>
        <SafeLink href={profile.links.source}>Source on GitHub</SafeLink>
      </p>
    </footer>
  );
}

import { profile } from '../data/profile.js';
import { CopyIcon, FileIcon, GitHubIcon, LinkedInIcon, MailIcon } from './Icons.jsx';
import SafeLink from './SafeLink.jsx';
import Section from './Section.jsx';

export default function Contact({ onCopyEmail }) {
  const links = [
    { href: `mailto:${profile.email}`, label: 'Email', detail: profile.email, Icon: MailIcon },
    { href: profile.links.linkedin, label: 'LinkedIn', detail: 'in/aakashpremnaths', Icon: LinkedInIcon },
    { href: profile.links.github, label: 'GitHub', detail: profile.links.github.replace('https://github.com/', '@'), Icon: GitHubIcon },
    { href: profile.links.resume, label: 'Resume', detail: 'PDF', Icon: FileIcon, newTab: true },
  ];

  return (
    <Section id="contact" index="07" title="Open a channel">
      <div className="contact">
        <div>
          <p className="contact-lead">
            I'm looking for full-time roles in security operations, detection engineering and AI security. Email is the fastest way to reach me.
          </p>
          <button type="button" className="btn btn--primary contact-copy" onClick={onCopyEmail}>
            <CopyIcon /> Copy email address
          </button>
        </div>
        <ul className="contact-links">
          {links.map(({ href, label, detail, Icon, newTab }) => (
            <li key={label}>
              <SafeLink href={href} newTab={newTab}>
                <Icon />
                <span className="contact-label">{label}</span>
                <span className="contact-detail">{detail}</span>
              </SafeLink>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

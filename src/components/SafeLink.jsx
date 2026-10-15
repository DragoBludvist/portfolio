import { isExternal, safeHref } from '../lib/safeUrl.js';

// Every link on the site goes through here. Unsafe URLs render as plain text,
// external ones open in a new tab without leaking window.opener or the referrer.
// target and rel are decided here only; callers can't pass or override them.
export default function SafeLink({ href, newTab, children, target: _target, rel: _rel, ...rest }) {
  const safe = safeHref(href);
  if (!safe) return <span {...rest}>{children}</span>;

  const external = isExternal(safe);
  const tabProps = external || newTab ? { target: '_blank', rel: external ? 'noopener noreferrer' : 'noopener' } : {};
  return (
    <a {...rest} href={safe} {...tabProps}>
      {children}
    </a>
  );
}

import { useEffect, useRef, useState } from 'react';

// Tracks a CSS media query, e.g. useMediaQuery('(hover: hover)').
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

// Fades sections in as they scroll into view. CSS skips the animation
// entirely when the user prefers reduced motion.
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// Returns the id of the section currently under the nav bar.
export function useActiveSection(ids) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

export function useTheme() {
  const [theme, setTheme] = useState(() => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'));
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#09070f' : '#f7f6fb');
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* storage blocked; theme still applies for this visit */
    }
  }, [theme]);
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))];
}

// Cursor-following glow for cards. Writes --mx/--my on each child card through
// the CSSOM (allowed under the strict CSP, unlike inline style attributes).
export function useSpotlight(selector) {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || !window.matchMedia('(hover: hover)').matches) return;
    const onMove = (e) => {
      for (const card of root.querySelectorAll(selector)) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
    };
    root.addEventListener('pointermove', onMove);
    return () => root.removeEventListener('pointermove', onMove);
  }, [selector]);
  return ref;
}

// "Cmd" on Apple devices, "Ctrl" elsewhere, for the shortcut hint.
export const modKey = () => (/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent) ? '⌘' : 'Ctrl');

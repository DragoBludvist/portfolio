import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks.js';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+/<>';

// "Decrypts" text from random glyphs, left to right. Screen readers get the
// real text straight away; the animation is hidden from them.
export default function ScrambleText({ text, className = '', duration = 1100, delay = 150 }) {
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = useState(reduced ? text : '');

  useEffect(() => {
    if (reduced) {
      setShown(text);
      return;
    }
    let frame = 0;
    let begin = 0;
    const tick = (now) => {
      if (!begin) begin = now + delay;
      const p = Math.max(0, Math.min(1, (now - begin) / duration));
      const revealed = Math.floor(p * text.length);
      let out = '';
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        out += i < revealed || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      setShown(out);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, reduced, duration, delay]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{shown || ' '}</span>
    </span>
  );
}

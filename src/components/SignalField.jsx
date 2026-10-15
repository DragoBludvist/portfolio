import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks.js';

// Hero background: a field of faint "events". Inside the cursor's lens (or
// under a finger on touch screens) noise fades out and the few real signals
// light up and link together, the same idea as alert triage.
const LENS = 150;

export default function SignalField() {
  const canvasRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let points = [];
    let raf = 0;
    let visible = true;
    const pointer = { x: 0, y: 0, active: false };
    let colors = readColors();

    function readColors() {
      const cs = getComputedStyle(document.documentElement);
      return {
        dot: cs.getPropertyValue('--field-dot').trim() || '#3d3557',
        signal: cs.getPropertyValue('--accent').trim() || '#a78bfa',
        alert: cs.getPropertyValue('--danger').trim() || '#f472b6',
      };
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Fewer points on small screens keeps phones cool and smooth.
      const count = Math.min(w < 640 ? 90 : 200, Math.floor((w * h) / 3200));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.1 + 0.7,
        kind: Math.random() < 0.06 ? 'alert' : Math.random() < 0.12 ? 'signal' : 'noise',
      }));
      draw();
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const lit = [];
      for (const p of points) {
        const inLens = pointer.active && Math.hypot(p.x - pointer.x, p.y - pointer.y) < LENS;
        const isSignal = p.kind !== 'noise';
        if (inLens && isSignal) lit.push(p);
        ctx.globalAlpha = inLens ? (isSignal ? 1 : 0.08) : isSignal ? 0.55 : 0.32;
        ctx.fillStyle = inLens && isSignal ? (p.kind === 'alert' ? colors.alert : colors.signal) : colors.dot;
        ctx.beginPath();
        ctx.arc(p.x, p.y, inLens && isSignal ? p.r + 1.6 : p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.strokeStyle = colors.signal;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.45;
      for (let i = 0; i < lit.length; i++) {
        for (let j = i + 1; j < lit.length; j++) {
          ctx.beginPath();
          ctx.moveTo(lit[i].x, lit[i].y);
          ctx.lineTo(lit[j].x, lit[j].y);
          ctx.stroke();
        }
      }
      if (pointer.active) {
        ctx.globalAlpha = 0.2;
        ctx.setLineDash([3, 6]);
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, LENS, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.globalAlpha = 1;
    }

    function tick() {
      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x += w;
        if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h;
        if (p.y > h) p.y -= h;
      }
      draw();
      raf = requestAnimationFrame(tick);
    }

    const start = () => {
      if (!reduced && visible && !document.hidden && !raf) raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // With reduced motion the field stays still and only redraws when the lens moves.
    let pending = 0;
    const redraw = () => {
      if (raf || pending) return;
      pending = requestAnimationFrame(() => {
        pending = 0;
        draw();
      });
    };

    const host = canvas.parentElement;
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
      redraw();
    };
    const onLeave = (e) => {
      // On touch screens the lens stays where you tapped; scrolling cancels the
      // pointer, and hiding the lens then would make it flash and vanish.
      if (e.pointerType === 'touch') return;
      pointer.active = false;
      redraw();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visible ? start() : stop();
    });
    io.observe(canvas);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);
    // Re-read colours when the theme flips.
    const mo = new MutationObserver(() => {
      colors = readColors();
      redraw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerdown', onMove);
    host.addEventListener('pointerleave', onLeave);
    host.addEventListener('pointercancel', onLeave);

    resize();
    start();

    return () => {
      stop();
      cancelAnimationFrame(pending);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerdown', onMove);
      host.removeEventListener('pointerleave', onLeave);
      host.removeEventListener('pointercancel', onLeave);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="signal-field" aria-hidden="true" />;
}

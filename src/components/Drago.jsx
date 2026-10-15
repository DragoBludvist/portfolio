import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks.js';

// Drago, the pixel security sidekick. He lives in a thin "server room" lane at
// the bottom of the screen. The page reserves that space (body.has-lane), so he
// never covers content. Every few seconds a machine starts blinking red and he
// runs over to fix it; now and then he squashes a bug. Decorative only: hidden
// from screen readers, and he just stands guard when reduced motion is on.

const PAL = {
  K: '#0a0a0d', R: '#e3202f', r: '#9e1420', B: '#3b78ff', W: '#f2f0eb', P: '#8b5cf6', p: '#6a3fd6',
  Y: '#f5c542', M: '#8f8e99', m: '#5b5a66', L: '#26252e',
};
const fix = (rows, w) => rows.map((r) => r.padEnd(w, '.').slice(0, w));

// Red-and-blue hero suit, white-eyed mask, gold padlock emblem.
const BODY = fix(
  [
    '......KKKK',
    '.....KRRRRK',
    '....KRRRRRRK',
    '....KRRRRRRK',
    '....KWWRRWWK',
    '....KRRRRRRK',
    '.....KRRRRK',
    '....KBBRRBBK',
    '...KBBRYYRBBK',
    '...KRKBBBBKRK',
    '....KKBBBBKK',
    '.....KRRRRK',
  ],
  13,
);
const LEGS = {
  a: fix(['.....KRKKRK', '....KRK..KRK', '...KBBK..KBBK', '...KKK....KKK'], 13),
  b: fix(['.....KRRRRK', '.....KRKKRK', '....KBBKKBBK', '....KKK..KKK'], 13),
};
const CAPE = {
  a: ['...pP', '..pPP', '.pPP.', 'pPP..', 'PP...', 'P....'],
  b: ['...pP', '..pPP', '..pPP', '.pPP.', '.pP..', 'pP...'],
  still: ['...pP', '...PP', '...PP', '..pP.', '..PP.', '..P..'],
};
const PROPS = {
  scan: { x: 11, y: 5, rows: ['..MM..', '.MWWM.', '.MWWM.', '..MM..', '.K....', 'K.....'] },
  lock: { x: 12, y: 5, rows: ['.MM..', 'M..M.', 'YYYY.', 'YKYY.', 'YYYY.'] },
  patch: { x: 12, y: 5, rows: ['M.M', 'MMM', '.M.', '.M.', '.M.'] },
  shield: { x: 12, y: 6, rows: ['BBBB', 'BWWB', 'BWWB', '.BB.'] },
  wave: { x: 11, y: 6, rows: ['R.', 'R.', 'R.'] },
};
const BUG = [
  ['K.K.K', '.rRr.', 'KRRRK'],
  ['.K.K.', 'KRRRK', '.rRr.'],
];
// "E" is a status light and "D" a screen; both change colour with the machine's status.
const MACHINES = [
  {
    kind: 'server', at: 0.16, mobileAt: 0.22,
    rows: ['KKKKKKKKKK', 'KMMMMMMMMK', 'KMLLLLMEMK', 'KMMMMMMMMK', 'KMLLLLMEMK', 'KMMMMMMMMK', 'KMLLLLMEMK', 'KMMMMMMMMK', 'KMLLLLMEMK', 'KKKKKKKKKK', '.K......K.'],
    fix: { prop: 'patch', say: 'patching server…', done: 'server patched ✓' },
  },
  {
    kind: 'pc', at: 0.42, mobileAt: 0.74,
    rows: ['KKKKKKKKKKKK', 'KDDDDDDDDDDK', 'KDDDDDDDDDDK', 'KDDDDDDDDDDK', 'KDDDDDDDDDDK', 'KDDDDDDDDDDK', 'KKKKKKKKKKKK', '.....KK.....', '....KMMK....', '..KKKKKKKK..'],
    fix: { prop: 'scan', say: 'removing malware…', done: 'malware removed ✓' },
  },
  {
    kind: 'firewall', at: 0.66, desktopOnly: true,
    rows: ['..K......K..', '..K......K..', '..K......K..', 'KKKKKKKKKKKK', 'KMEMMEMMEMMK', 'KMMMMMMMMMMK', 'KKKKKKKKKKKK'],
    fix: { prop: 'shield', say: 'blocking intrusion…', done: 'intrusion blocked ✓' },
  },
  {
    kind: 'vault', at: 0.88, desktopOnly: true,
    rows: ['KKKKKKKKKK', 'KMMMMMMMMK', 'KMmmmmmmMK', 'KMmMMMMmMK', 'KMmMEEMmMK', 'KMmMMMMmMK', 'KMmmmmmmMK', 'KMMMMMMMMK', 'KKKKKKKKKK'],
    fix: { prop: 'lock', say: 'rotating keys…', done: 'keys rotated ✓' },
  },
];
const GW = 18;
const GH = 16;

export default function Drago() {
  const laneRef = useRef(null);
  const dragoRef = useRef(null);
  const canvasRef = useRef(null);
  const bubbleRef = useRef(null);
  const bugRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const lane = laneRef.current;
    const el = dragoRef.current;
    const canvas = canvasRef.current;
    const bubble = bubbleRef.current;
    const bugEl = bugRef.current;
    const ctx = canvas?.getContext('2d');
    const bctx = bugEl?.getContext('2d');
    if (!lane || !ctx || !bctx) return;

    const small = window.matchMedia('(max-width: 900px)').matches;
    const S = small ? 2 : 3; // size of one pixel-art pixel
    canvas.width = GW * S;
    canvas.height = GH * S;
    bugEl.width = 5 * S;
    bugEl.height = 3 * S;

    const paint = (c, rows, ox, oy, extra = {}) =>
      rows.forEach((row, y) =>
        [...row].forEach((ch, x) => {
          const color = extra[ch] || PAL[ch];
          if (ch === '.' || !color) return;
          c.fillStyle = color;
          c.fillRect((ox + x) * S, (oy + y) * S, S, S);
        }),
      );

    // Build the machines for this screen size.
    const machines = MACHINES.filter((m) => !(small && m.desktopOnly)).map((m) => {
      const wrap = document.createElement('div');
      wrap.className = 'machine';
      const mc = document.createElement('canvas');
      mc.width = m.rows[0].length * S;
      mc.height = m.rows.length * S;
      wrap.appendChild(mc);
      lane.insertBefore(wrap, el);
      return { ...m, at: small ? m.mobileAt : m.at, w: m.rows[0].length, wrap, canvas: mc, ctx: mc.getContext('2d'), status: 'ok', x: 0 };
    });
    const drawMachine = (m, blink) => {
      m.ctx.clearRect(0, 0, m.canvas.width, m.canvas.height);
      const alert = m.status === 'alert';
      paint(m.ctx, m.rows, 0, 0, {
        E: alert ? (blink ? '#e3202f' : '#4a0d14') : '#38d39f',
        D: alert ? (blink ? '#5a1420' : '#2a0a10') : '#13283f',
      });
    };
    const layout = () => {
      const w = lane.clientWidth;
      machines.forEach((m) => {
        m.x = Math.round(w * m.at - (m.w * S) / 2);
        m.wrap.style.setProperty('transform', `translateX(${m.x}px)`);
        drawMachine(m, true);
      });
    };
    layout();
    window.addEventListener('resize', layout);

    const drawDrago = (legs, prop, cape) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      paint(ctx, CAPE[cape], 0, 7); // cape first, behind the body
      paint(ctx, BODY, 0, 0);
      paint(ctx, LEGS[legs], 0, 12);
      if (prop) paint(ctx, PROPS[prop].rows, PROPS[prop].x, PROPS[prop].y);
    };
    const drawBug = (f) => {
      bctx.clearRect(0, 0, bugEl.width, bugEl.height);
      paint(bctx, BUG[f], 0, 0);
    };

    let bubbleTimer = 0;
    const say = (text, ms = 1800) => {
      bubble.textContent = text;
      bubble.classList.add('is-on');
      clearTimeout(bubbleTimer);
      bubbleTimer = setTimeout(() => bubble.classList.remove('is-on'), ms);
    };

    const spriteW = GW * S;
    const maxX = () => Math.max(0, lane.clientWidth - spriteW);
    const speed = small ? 36 : 52;
    const st = { x: 30, dir: 1, mode: 'patrol', target: 120, until: 0, legs: 'a', lastStep: 0, prop: null, job: null, bugX: 0, nextAlert: performance.now() + 3000 };

    const place = () => {
      el.classList.toggle('is-flipped', st.dir < 0);
      el.classList.toggle('bubble-left', st.x > lane.clientWidth - 260);
      el.style.setProperty('transform', `translateX(${st.x}px)`);
    };
    const patrol = () => {
      st.mode = 'patrol';
      st.prop = null;
      st.target = 16 + Math.random() * Math.max(40, maxX() - 32);
    };
    const goFix = (m) => {
      st.job = m;
      st.mode = 'toFix';
      // stand beside the machine on whichever side has room, facing it
      const left = m.x - spriteW + 6 * S;
      st.target = left > 4 ? left : m.x + m.w * S - 4 * S;
      say('on it!', 900);
    };
    const spawnBug = () => {
      const from = machines[(Math.random() * machines.length) | 0];
      st.bugX = Math.max(0, Math.min(maxX(), from.x + from.w * S + 8));
      bugEl.hidden = false;
      bugEl.style.setProperty('transform', `translateX(${st.bugX + 5 * S}px)`);
      st.mode = 'chase';
      st.target = st.bugX;
    };

    const onClick = () => {
      if (st.mode === 'fixing') return say('busy fixing!', 1200);
      st.mode = 'greet';
      st.prop = 'wave';
      st.until = performance.now() + 1800;
      say("hi, I'm Drago. I keep this site safe.", 2200);
      if (reduced) drawDrago('b', 'wave', 'still');
    };
    el.addEventListener('click', onClick);

    let raf = 0;
    const cleanup = () => {
      cancelAnimationFrame(raf);
      clearTimeout(bubbleTimer);
      window.removeEventListener('resize', layout);
      el.removeEventListener('click', onClick);
      machines.forEach((m) => m.wrap.remove());
    };

    if (reduced) {
      // Reduced motion: Drago stands guard beside the first machine; nothing moves.
      st.x = Math.min(maxX(), machines[0].x + machines[0].w * S + 6);
      place();
      drawDrago('b', 'shield', 'still');
      return cleanup;
    }

    let last = performance.now();
    let lastBlink = 0;
    let blink = true;
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (document.hidden) return;

      // machines blink while they need help
      if (now - lastBlink > 280) {
        blink = !blink;
        lastBlink = now;
        machines.forEach((m) => m.status === 'alert' && drawMachine(m, blink));
      }

      // every few seconds, something breaks
      if (now > st.nextAlert && (st.mode === 'patrol' || st.mode === 'idle')) {
        const healthy = machines.filter((m) => m.status === 'ok');
        if (healthy.length) {
          const m = healthy[(Math.random() * healthy.length) | 0];
          m.status = 'alert';
          drawMachine(m, true);
          goFix(m);
        }
        st.nextAlert = now + 6000 + Math.random() * 5000;
      }

      if (st.mode === 'patrol' || st.mode === 'toFix' || st.mode === 'chase') {
        const d = st.target - st.x;
        if (Math.abs(d) > 0.5) st.dir = d > 0 ? 1 : -1;
        st.x += Math.sign(d) * Math.min(Math.abs(d), speed * (st.mode === 'patrol' ? 0.7 : 1.15) * dt);
        if (now - st.lastStep > (st.mode === 'patrol' ? 200 : 140)) {
          st.legs = st.legs === 'a' ? 'b' : 'a';
          st.lastStep = now;
        }
        drawDrago(st.legs, null, st.legs);
        if (st.mode === 'chase') drawBug(((now / 150) | 0) % 2);
        if (Math.abs(d) <= 0.5) {
          if (st.mode === 'toFix') {
            st.dir = st.job.x > st.x ? 1 : -1;
            st.mode = 'fixing';
            st.prop = st.job.fix.prop;
            st.until = now + 2600;
            say(st.job.fix.say, 2500);
          } else if (st.mode === 'chase') {
            el.classList.remove('is-hopping');
            void el.offsetWidth; // restart the hop animation
            el.classList.add('is-hopping');
            bugEl.hidden = true;
            say('bug squashed', 1400);
            st.mode = 'idle';
            st.until = now + 1200;
          } else {
            st.mode = 'idle';
            st.until = now + 900 + Math.random() * 1600;
          }
        }
      } else {
        drawDrago('b', st.prop, 'still');
        if (now > st.until) {
          if (st.mode === 'fixing') {
            st.job.status = 'ok';
            drawMachine(st.job, true);
            say(st.job.fix.done, 1500);
            st.job = null;
          }
          // a click can interrupt a job or a chase; pick it back up afterwards
          if (st.job) goFix(st.job);
          else if (!bugEl.hidden) {
            st.mode = 'chase';
            st.target = st.bugX;
          } else if (Math.random() < 0.18) spawnBug();
          else patrol();
        }
      }
      place();
    };
    patrol();
    drawDrago('a', null, 'a');
    raf = requestAnimationFrame(loop);
    return cleanup;
  }, [reduced]);

  return (
    <div className="lane" ref={laneRef} aria-hidden="true">
      <span className="lane-label">server room · on patrol</span>
      <canvas className="bug" ref={bugRef} hidden />
      <div className="drago" ref={dragoRef} title="Drago, the security sidekick">
        <span className="bubble" ref={bubbleRef} />
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

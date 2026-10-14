'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// Fixed deep-space backdrop: twinkling parallax stars, a distant black hole
// and an occasional shooting star. One canvas, paused when the tab is hidden.

const HIDDEN_ON = ['/dashboard', '/login', '/register'];

const rand = (min, max) => min + Math.random() * (max - min);

function createStars(w, h) {
  const count = Math.min(520, Math.round((w * h) / 2600));
  return Array.from({ length: count }, () => {
    const depth = Math.random(); // 0 = far, 1 = near
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.25 + depth * 1.05,
      depth,
      alpha: 0.25 + Math.random() * 0.6,
      speed: rand(0.4, 1.6),
      phase: Math.random() * Math.PI * 2,
      // a few stars carry a faint blue or warm tint
      tint: Math.random() < 0.12 ? (Math.random() < 0.5 ? '170,200,255' : '255,220,180') : '255,255,255',
    };
  });
}

function drawBlackHole(ctx, x, y, r, t) {
  // Soft gravitational-lensing halo
  const halo = ctx.createRadialGradient(x, y, r * 0.8, x, y, r * 9);
  halo.addColorStop(0, 'rgba(255,170,90,0.08)');
  halo.addColorStop(0.35, 'rgba(120,90,200,0.05)');
  halo.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(x, y, r * 9, 0, Math.PI * 2);
  ctx.fill();

  const tilt = -0.32;
  const disk = (from, to) => {
    const segments = 60;
    for (let i = 0; i < segments; i++) {
      const a0 = from + ((to - from) * i) / segments;
      const a1 = from + ((to - from) * (i + 1)) / segments;
      // Doppler beaming: the approaching side of the disk glows brighter
      const beam = 0.45 + 0.55 * (0.5 + 0.5 * Math.cos(a0 + t * 0.25));
      const flicker = 0.9 + 0.1 * Math.sin(a0 * 6 - t * 1.4);
      for (const [rx, width, color, k] of [
        [r * 2.6, r * 0.7, '255,150,70', 0.12],
        [r * 2.1, r * 0.35, '255,200,140', 0.35],
        [r * 1.7, r * 0.16, '255,240,220', 0.6],
      ]) {
        ctx.strokeStyle = `rgba(${color},${k * beam * flicker})`;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.ellipse(x, y, rx, rx * 0.26, tilt, a0, a1);
        ctx.stroke();
      }
    }
  };

  // Back half of the disk (behind the hole)
  disk(Math.PI, Math.PI * 2);

  // Lensed light bent over the top: the photon ring
  const ring = ctx.createRadialGradient(x, y, r * 0.95, x, y, r * 1.6);
  ring.addColorStop(0, 'rgba(255,235,210,0.9)');
  ring.addColorStop(0.25, 'rgba(255,180,110,0.45)');
  ring.addColorStop(1, 'rgba(255,140,60,0)');
  ctx.fillStyle = ring;
  ctx.beginPath();
  ctx.arc(x, y, r * 1.6, 0, Math.PI * 2);
  ctx.fill();

  // Event horizon
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();

  // Front half of the disk (in front of the hole)
  disk(0, Math.PI);
}

// ---------- Deep sky: drawn once per resize into an offscreen canvas ----------

const CONSTELLATIONS = [
  {
    name: 'ORION',
    // x, y in a unit box; first index pairs are line segments
    stars: [[0.02, 0.05], [0.58, 0.1], [0.3, -0.12], [0.22, 0.47], [0.31, 0.44], [0.4, 0.41], [0.12, 0.95], [0.64, 0.9]],
    lines: [[0, 1], [2, 0], [2, 1], [0, 3], [1, 5], [3, 4], [4, 5], [3, 6], [5, 7]],
    bright: [0, 7],
  },
  {
    name: 'URSA MAJOR',
    stars: [[0, 0.1], [0.18, 0.04], [0.33, 0.12], [0.47, 0.2], [0.5, 0.42], [0.76, 0.47], [0.79, 0.22]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]],
    bright: [3],
  },
  {
    name: 'CASSIOPEIA',
    stars: [[0, 0.2], [0.22, 0.48], [0.42, 0.26], [0.62, 0.52], [0.84, 0.14]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
    bright: [2],
  },
];

function placeConstellations(w, h, mobile) {
  const s = (base) => Math.min(base, w * (mobile ? 0.38 : 0.14));
  const layout = mobile
    ? [[0.06, 0.58, s(150)], [0.5, 0.78, s(130)], [0.36, 0.06, s(110)]]
    : [[0.04, 0.5, s(190)], [0.6, 0.7, s(170)], [0.34, 0.08, s(130)]];
  return CONSTELLATIONS.map((c, i) => {
    const [ox, oy, size] = layout[i];
    return {
      ...c,
      points: c.stars.map(([x, y]) => [w * ox + x * size, h * oy + y * size]),
      labelAt: [w * ox, h * oy + size * 1.08],
    };
  });
}

function glowDot(ctx, x, y, r, color, alpha) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
  g.addColorStop(0, `rgba(${color},${alpha})`);
  g.addColorStop(0.25, `rgba(${color},${alpha * 0.35})`);
  g.addColorStop(1, `rgba(${color},0)`);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r * 4, 0, Math.PI * 2);
  ctx.fill();
}

function drawMilkyWay(ctx, w, h) {
  // A soft diagonal band with a dense dusting of tiny stars
  const x0 = -w * 0.1, y0 = h * 1.05, x1 = w * 1.1, y1 = -h * 0.15;
  const len = Math.hypot(x1 - x0, y1 - y0);
  const nx = -(y1 - y0) / len, ny = (x1 - x0) / len; // normal
  const band = Math.min(w, h) * 0.22;

  ctx.save();
  ctx.translate((x0 + x1) / 2, (y0 + y1) / 2);
  ctx.rotate(Math.atan2(y1 - y0, x1 - x0));
  const glow = ctx.createLinearGradient(0, -band, 0, band);
  glow.addColorStop(0, 'rgba(120,110,200,0)');
  glow.addColorStop(0.5, 'rgba(150,140,220,0.045)');
  glow.addColorStop(1, 'rgba(120,110,200,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(-len / 2, -band, len, band * 2);
  ctx.restore();

  const count = Math.round(len * 1.6);
  for (let i = 0; i < count; i++) {
    const t = Math.random();
    // approx. gaussian spread across the band
    const off = (Math.random() + Math.random() + Math.random() - 1.5) * band * 0.9;
    const x = x0 + (x1 - x0) * t + nx * off;
    const y = y0 + (y1 - y0) * t + ny * off;
    ctx.fillStyle = `rgba(${Math.random() < 0.3 ? '200,190,255' : '255,255,255'},${0.08 + Math.random() * 0.25})`;
    ctx.fillRect(x, y, Math.random() < 0.9 ? 0.6 : 1, Math.random() < 0.9 ? 0.6 : 1);
  }
}

function drawSpiralGalaxy(ctx, cx, cy, size, tilt, squash) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(tilt);
  ctx.scale(1, squash);
  const core = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.45);
  core.addColorStop(0, 'rgba(255,240,220,0.55)');
  core.addColorStop(0.3, 'rgba(220,200,255,0.18)');
  core.addColorStop(1, 'rgba(160,150,255,0)');
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.45, 0, Math.PI * 2);
  ctx.fill();
  // two logarithmic spiral arms made of tiny dots
  for (let arm = 0; arm < 2; arm++) {
    for (let i = 0; i < 260; i++) {
      const th = (i / 260) * Math.PI * 3.2;
      const r = size * 0.08 * Math.exp(0.32 * th);
      if (r > size) break;
      const a = th + arm * Math.PI + (Math.random() - 0.5) * 0.35;
      const x = Math.cos(a) * r + (Math.random() - 0.5) * size * 0.06;
      const y = Math.sin(a) * r + (Math.random() - 0.5) * size * 0.06;
      ctx.fillStyle = `rgba(${Math.random() < 0.5 ? '190,200,255' : '255,225,235'},${0.12 + Math.random() * 0.22})`;
      ctx.fillRect(x, y, 0.8, 0.8);
    }
  }
  ctx.restore();
}

function drawCluster(ctx, cx, cy, size) {
  const members = [[0, 0], [0.5, -0.2], [0.9, 0.15], [0.35, 0.45], [-0.3, 0.35], [0.7, 0.7], [-0.15, -0.4]];
  for (const [x, y] of members) {
    glowDot(ctx, cx + x * size, cy + y * size, 0.9, '190,215,255', 0.85);
  }
  const haze = ctx.createRadialGradient(cx + size * 0.3, cy + size * 0.2, 0, cx + size * 0.3, cy + size * 0.2, size * 1.6);
  haze.addColorStop(0, 'rgba(140,170,255,0.08)');
  haze.addColorStop(1, 'rgba(140,170,255,0)');
  ctx.fillStyle = haze;
  ctx.fillRect(cx - size * 2, cy - size * 2, size * 4.5, size * 4.5);
}

function drawPlanet(ctx, x, y, r) {
  const body = ctx.createRadialGradient(x - r * 0.4, y - r * 0.4, r * 0.1, x, y, r);
  body.addColorStop(0, 'rgba(150,200,255,0.9)');
  body.addColorStop(0.6, 'rgba(60,100,170,0.75)');
  body.addColorStop(1, 'rgba(10,20,40,0.9)');
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  const atmo = ctx.createRadialGradient(x, y, r, x, y, r * 2.2);
  atmo.addColorStop(0, 'rgba(120,180,255,0.18)');
  atmo.addColorStop(1, 'rgba(120,180,255,0)');
  ctx.fillStyle = atmo;
  ctx.beginPath();
  ctx.arc(x, y, r * 2.2, 0, Math.PI * 2);
  ctx.fill();
}

function buildDeepSky(w, h, dpr, constellations, mobile) {
  const off = document.createElement('canvas');
  off.width = w * dpr;
  off.height = h * dpr;
  const c = off.getContext('2d');
  c.setTransform(dpr, 0, 0, dpr, 0, 0);

  drawMilkyWay(c, w, h);
  drawSpiralGalaxy(c, w * (mobile ? 0.82 : 0.8), h * (mobile ? 0.46 : 0.58), mobile ? 34 : 52, -0.5, 0.42);
  drawSpiralGalaxy(c, w * 0.18, h * 0.86, mobile ? 14 : 20, 0.9, 0.3); // a smaller, more distant one
  drawCluster(c, w * (mobile ? 0.66 : 0.47), h * (mobile ? 0.3 : 0.9), mobile ? 7 : 9);
  drawCluster(c, w * 0.94, h * 0.38, 6);
  drawPlanet(c, w * (mobile ? 0.12 : 0.22), h * (mobile ? 0.36 : 0.3), mobile ? 2.6 : 3.4);

  // constellation stars (lines are animated separately)
  for (const con of constellations) {
    con.points.forEach(([x, y], i) => {
      const bright = con.bright.includes(i);
      glowDot(c, x, y, bright ? 1.25 : 0.95, bright ? '255,225,200' : '220,230,255', bright ? 0.95 : 0.8);
    });
    c.font = '500 9px ui-monospace, monospace';
    c.fillStyle = 'rgba(160,190,255,0.22)';
    c.fillText(con.name.split('').join(' '), con.labelAt[0], con.labelAt[1]);
  }
  return off;
}

export default function CosmicBackground() {
  const canvasRef = useRef(null);
  const pathname = usePathname();
  const hidden = HIDDEN_ON.some((p) => pathname?.startsWith(p));

  useEffect(() => {
    if (hidden) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w, h, dpr, stars, deepSky, constellations;
    let raf = 0;
    let meteor = null;
    let nextMeteorAt = performance.now() + rand(2500, 5000);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = createStars(w, h);
      constellations = placeConstellations(w, h, w < 768);
      deepSky = buildDeepSky(w, h, dpr, constellations, w < 768);
    };

    const spawnMeteor = () => {
      // Streak from the upper area travelling down-left, like a real shooting star
      const angle = rand(Math.PI * 0.78, Math.PI * 0.86);
      const speed = rand(900, 1300);
      meteor = {
        x: rand(w * 0.35, w * 1.05),
        y: rand(-20, h * 0.35),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: rand(140, 260),
        life: 0,
        ttl: rand(0.7, 1.1),
      };
    };

    const draw = (now, dt) => {
      const t = now / 1000;
      const scroll = window.scrollY || 0;
      ctx.clearRect(0, 0, w, h);

      // Deep sky layer drifts very slightly with scroll (it's the farthest away)
      const deepShift = -Math.min(scroll * 0.012, h * 0.08);
      ctx.drawImage(deepSky, 0, deepShift, w, h);

      // Constellation lines gently fade in and out
      ctx.lineWidth = 0.6;
      constellations.forEach((con, ci) => {
        const breathe = reduceMotion ? 0.12 : 0.07 + 0.07 * (0.5 + 0.5 * Math.sin(t * 0.35 + ci * 2.1));
        ctx.strokeStyle = `rgba(170,200,255,${breathe})`;
        ctx.beginPath();
        for (const [a, b] of con.lines) {
          ctx.moveTo(con.points[a][0], con.points[a][1] + deepShift);
          ctx.lineTo(con.points[b][0], con.points[b][1] + deepShift);
        }
        ctx.stroke();
      });

      // Stars with gentle twinkle and depth parallax
      for (const s of stars) {
        const y = (((s.y - scroll * (0.02 + s.depth * 0.06)) % h) + h) % h;
        const tw = reduceMotion ? 1 : 0.65 + 0.35 * Math.sin(t * s.speed + s.phase);
        ctx.fillStyle = `rgba(${s.tint},${s.alpha * tw})`;
        ctx.beginPath();
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Distant black hole: small and faint so it reads as very far away
      const mobile = w < 768;
      const bhR = Math.max(3.5, Math.min(6.5, w * 0.0045));
      ctx.save();
      ctx.globalAlpha = 0.7;
      drawBlackHole(ctx, w * (mobile ? 0.84 : 0.9), h * (mobile ? 0.11 : 0.13) - scroll * 0.01, bhR, reduceMotion ? 0 : t);
      ctx.restore();

      if (reduceMotion) return;

      // Occasional shooting star
      if (!meteor && now >= nextMeteorAt) spawnMeteor();
      if (meteor) {
        meteor.life += dt;
        meteor.x += meteor.vx * dt;
        meteor.y += meteor.vy * dt;
        const p = meteor.life / meteor.ttl;
        const fade = p < 0.15 ? p / 0.15 : Math.max(0, 1 - (p - 0.15) / 0.85);
        const mag = Math.hypot(meteor.vx, meteor.vy);
        const tx = meteor.x - (meteor.vx / mag) * meteor.len;
        const ty = meteor.y - (meteor.vy / mag) * meteor.len;
        const grad = ctx.createLinearGradient(meteor.x, meteor.y, tx, ty);
        grad.addColorStop(0, `rgba(255,255,255,${0.95 * fade})`);
        grad.addColorStop(0.2, `rgba(180,230,255,${0.45 * fade})`);
        grad.addColorStop(1, 'rgba(180,230,255,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        const glow = ctx.createRadialGradient(meteor.x, meteor.y, 0, meteor.x, meteor.y, 6);
        glow.addColorStop(0, `rgba(255,255,255,${fade})`);
        glow.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, 6, 0, Math.PI * 2);
        ctx.fill();
        if (p >= 1) {
          meteor = null;
          nextMeteorAt = now + rand(8000, 18000);
        }
      }
    };

    let last = performance.now();
    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      draw(now, dt);
      raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduceMotion) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    resize();
    if (reduceMotion) {
      draw(performance.now(), 0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onResize = () => {
      // Mobile browsers resize the viewport while scrolling (URL bar); ignore
      // small height changes so the sky doesn't re-randomise.
      if (window.innerWidth === w && Math.abs(window.innerHeight - h) < 160) return;
      resize();
      if (reduceMotion) draw(performance.now(), 0);
    };
    const onScroll = () => reduceMotion && draw(performance.now(), 0);

    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <div aria-hidden="true" className="cosmos fixed inset-0 -z-10 pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}

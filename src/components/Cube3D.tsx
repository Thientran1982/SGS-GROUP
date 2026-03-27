
import React, { useEffect, useRef, useCallback } from 'react';
import { Language } from '../types';

interface Cube3DProps {
  onInteract?: () => void;
  language: Language;
}

const Cube3D: React.FC<Cube3DProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const S = 600;
    canvas.width = S;
    canvas.height = S;
    const cx = S / 2;
    const cy = S / 2;
    const R = 138;

    // ─── ORBITAL RINGS ───────────────────────────────────────────
    // tiltDeg: inclination from horizontal (0=flat line, 90=full circle)
    const rings = [
      { tiltDeg: 22,  speed:  0.38, orbitR: R + 68, color: [6, 182, 212]  as [number,number,number], phase: 0   },
      { tiltDeg: 74,  speed: -0.27, orbitR: R + 90, color: [99, 102, 241] as [number,number,number], phase: 2.1 },
      { tiltDeg: 50,  speed:  0.54, orbitR: R + 50, color: [34, 211, 238] as [number,number,number], phase: 4.3 },
    ];

    // ─── FLOATING DATA NODES ──────────────────────────────────────
    const nodeLabels = ['AI', '99.9%', 'ML', 'v8.0', 'RPA', '+78%', 'API', 'GPU'];
    const nodes = Array.from({ length: 8 }, (_, i) => ({
      angle:       (i / 8) * Math.PI * 2,
      dist:         R + 100 + (i % 3) * 22,
      speed:        0.12 + (i % 4) * 0.04,
      orbitB:       0.52 + (i % 3) * 0.12,
      fadeOffset:   Math.random() * Math.PI * 2,
      label:        nodeLabels[i],
    }));

    // ─── AMBIENT PARTICLES ────────────────────────────────────────
    const particles = Array.from({ length: 60 }, () => ({
      x:     Math.random() * S,
      y:     Math.random() * S,
      vx:    (Math.random() - 0.5) * 0.28,
      vy:    (Math.random() - 0.5) * 0.28,
      r:     Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.32 + 0.05,
    }));

    // ─── PULSE WAVES ─────────────────────────────────────────────
    const pulses: { r: number; alpha: number }[] = [];
    let pulseTimer = 0;

    let t = 0;

    // ── Ambient glow around orb ───────────────────────────────────
    const drawAmbientGlow = () => {
      const g = ctx.createRadialGradient(cx, cy, R * 0.55, cx, cy, R * 2.6);
      g.addColorStop(0,   'rgba(6,182,212,0.13)');
      g.addColorStop(0.5, 'rgba(6,182,212,0.04)');
      g.addColorStop(1,   'rgba(6,182,212,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, R * 2.6, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    };

    // ── Ambient particle field ────────────────────────────────────
    const drawParticles = () => {
      particles.forEach(p => {
        p.x = (p.x + p.vx + S) % S;
        p.y = (p.y + p.vy + S) % S;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6,182,212,${p.alpha})`;
        ctx.fill();
      });
    };

    // ── Expanding pulse rings ─────────────────────────────────────
    const drawPulses = () => {
      pulseTimer += 0.016;
      if (pulseTimer > 3.2) {
        pulses.push({ r: R + 6, alpha: 0.48 });
        pulseTimer = 0;
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].r    += 1.1;
        pulses[i].alpha *= 0.971;
        if (pulses[i].alpha < 0.008) { pulses.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(cx, cy, pulses[i].r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6,182,212,${pulses[i].alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    };

    // ── Glass orb — the centrepiece ───────────────────────────────
    const drawOrb = (mx: number, my: number) => {
      // Subtle parallax shift based on mouse position
      const ox = (mx - 0.5) * 12;
      const oy = (my - 0.5) * 8;
      const px = cx + ox * 0.5;
      const py = cy + oy * 0.5;

      // ── Chromatic aberration (RGB fringe at sphere edge) ──────
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const caData: [number, string, string][] = [
        [ 3, 'rgba(255,40,40,0.12)', 'rgba(255,0,0,0)'],
        [-3, 'rgba(40,40,255,0.12)', 'rgba(0,0,255,0)'],
      ];
      caData.forEach(([d, c1, c2]) => {
        const gca = ctx.createRadialGradient(px - R * 0.3 + d, py - R * 0.35, R * 0.06, px + d, py, R + 5);
        gca.addColorStop(0,    'rgba(0,0,0,0)');
        gca.addColorStop(0.74, 'rgba(0,0,0,0)');
        gca.addColorStop(0.88, c1);
        gca.addColorStop(1,    c2);
        ctx.beginPath();
        ctx.arc(px + d, py, R + 5, 0, Math.PI * 2);
        ctx.fillStyle = gca;
        ctx.fill();
      });
      ctx.restore();

      // ── Clipped interior ──────────────────────────────────────
      ctx.save();
      ctx.beginPath();
      ctx.arc(px, py, R, 0, Math.PI * 2);
      ctx.clip();

      // Main body: deep glass
      const body = ctx.createRadialGradient(px - R * 0.32, py - R * 0.38, R * 0.03, px, py, R);
      body.addColorStop(0,    'rgba(185,248,255,0.62)');
      body.addColorStop(0.14, 'rgba(75,215,245,0.30)');
      body.addColorStop(0.40, 'rgba(10,44,88,0.56)');
      body.addColorStop(0.76, 'rgba(3,12,36,0.84)');
      body.addColorStop(1,    'rgba(0,3,14,0.97)');
      ctx.fillStyle = body;
      ctx.fillRect(px - R - 6, py - R - 6, (R + 6) * 2, (R + 6) * 2);

      // Iridescent inner glow — hue slowly shifts cyan → indigo
      const hue = (Math.sin(t * 0.45) + 1) * 0.5;
      const ir = Math.round(6  + hue * 48);
      const ig = Math.round(182 - hue * 78);
      const ib = Math.round(212 + hue * 28);
      const innerGlow = ctx.createRadialGradient(px, py, 0, px, py, R * 0.78);
      innerGlow.addColorStop(0,   `rgba(${ir},${ig},${ib},0.22)`);
      innerGlow.addColorStop(0.55, `rgba(${ir},${ig},${ib},0.08)`);
      innerGlow.addColorStop(1,    'rgba(0,0,0,0)');
      ctx.fillStyle = innerGlow;
      ctx.fillRect(px - R - 6, py - R - 6, (R + 6) * 2, (R + 6) * 2);

      // Surface grid — latitude & longitude lines
      ctx.globalAlpha = 0.07;
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 0.75;

      // Latitude rings (horizontal ellipses)
      for (let lat = -60; lat <= 60; lat += 30) {
        const yr  = py + R * Math.sin(lat * Math.PI / 180);
        const xr  = R  * Math.cos(lat * Math.PI / 180);
        ctx.beginPath();
        ctx.ellipse(px, yr, xr, xr * 0.11, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      // Longitude arcs (rotating — creates sense of sphere spin)
      for (let i = 0; i < 5; i++) {
        const lng = t * 0.14 + i * (Math.PI / 5);
        const ew  = R * Math.abs(Math.cos(lng));
        ctx.beginPath();
        ctx.ellipse(px, py, ew, R, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.restore(); // end clip

      // ── Rim light — cyan halo at sphere edge ──────────────────
      const rim = ctx.createRadialGradient(px, py, R * 0.58, px, py, R * 1.02);
      rim.addColorStop(0,    'rgba(6,182,212,0)');
      rim.addColorStop(0.68, 'rgba(6,182,212,0)');
      rim.addColorStop(0.82, 'rgba(6,182,212,0.22)');
      rim.addColorStop(0.93, 'rgba(34,211,238,0.40)');
      rim.addColorStop(1,    'rgba(6,182,212,0)');
      ctx.beginPath();
      ctx.arc(px, py, R, 0, Math.PI * 2);
      ctx.fillStyle = rim;
      ctx.fill();

      // ── Primary specular — bright white spot top-left ─────────
      const spec = ctx.createRadialGradient(
        px - R * 0.42, py - R * 0.45, 0,
        px - R * 0.27, py - R * 0.30, R * 0.55
      );
      spec.addColorStop(0,    'rgba(255,255,255,0.94)');
      spec.addColorStop(0.22, 'rgba(215,250,255,0.60)');
      spec.addColorStop(0.60, 'rgba(145,225,255,0.12)');
      spec.addColorStop(1,    'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(px, py, R, 0, Math.PI * 2);
      ctx.fillStyle = spec;
      ctx.fill();

      // ── Secondary specular — cyan tint bottom-right ───────────
      const spec2 = ctx.createRadialGradient(
        px + R * 0.5, py + R * 0.5, 0,
        px + R * 0.38, py + R * 0.38, R * 0.30
      );
      spec2.addColorStop(0, 'rgba(6,182,212,0.32)');
      spec2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(px, py, R, 0, Math.PI * 2);
      ctx.fillStyle = spec2;
      ctx.fill();
    };

    // ── Orbital ring + comet trail ────────────────────────────────
    // inFront=false → draw "behind" (before orb), inFront=true → "in front" (after orb)
    const drawRing = (ring: typeof rings[0], time: number, inFront: boolean) => {
      const { tiltDeg, speed, orbitR, color, phase } = ring;
      const b    = orbitR * Math.sin(tiltDeg * Math.PI / 180); // semi-minor axis
      const a    = orbitR;
      const angle = time * speed + phase;
      const TRAIL = 30;

      // Full dashed orbit path drawn once (before orb pass)
      if (!inFront) {
        ctx.save();
        ctx.setLineDash([5, 13]);
        ctx.beginPath();
        ctx.ellipse(cx, cy, a, b, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},0.16)`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }

      // Comet trail — only draw segments that match current depth pass
      for (let i = TRAIL; i >= 0; i--) {
        const ta  = angle - i * 0.10;
        const tx  = cx + a * Math.cos(ta);
        const ty  = cy + b * Math.sin(ta);
        const isFront = ty >= cy; // lower-half of ellipse = closer to viewer
        if (isFront !== inFront) continue;

        const progress = 1 - i / TRAIL;
        ctx.beginPath();
        ctx.arc(tx, ty, progress * 4.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${progress * 0.88})`;
        ctx.fill();
      }

      // Particle head
      const hx = cx + a * Math.cos(angle);
      const hy = cy + b * Math.sin(angle);
      if ((hy >= cy) === inFront) {
        ctx.save();
        ctx.shadowColor = `rgb(${color[0]},${color[1]},${color[2]})`;
        ctx.shadowBlur  = 22;
        ctx.beginPath();
        ctx.arc(hx, hy, 7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},1)`;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.restore();
      }
    };

    // ── Floating data nodes ───────────────────────────────────────
    const drawNodes = (time: number) => {
      nodes.forEach((node, i) => {
        node.angle += node.speed * 0.009;
        const alpha = 0.55 + 0.45 * Math.sin(time * 1.1 + node.fadeOffset);
        const nx = cx + node.dist * Math.cos(node.angle);
        const ny = cy + node.dist * node.orbitB * Math.sin(node.angle);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(nx, ny);

        // Slowly rotating diamond marker
        const rot = time * 0.28 + i * 0.85;
        ctx.rotate(rot);
        const s = 5.5;
        ctx.beginPath();
        ctx.moveTo(0, -s * 1.3);
        ctx.lineTo(s, 0);
        ctx.lineTo(0, s * 1.3);
        ctx.lineTo(-s, 0);
        ctx.closePath();
        ctx.strokeStyle = 'rgba(6,182,212,0.95)';
        ctx.fillStyle   = 'rgba(6,182,212,0.14)';
        ctx.lineWidth   = 1.2;
        ctx.stroke();
        ctx.fill();
        ctx.rotate(-rot);

        // Monospace label below diamond
        ctx.font      = 'bold 9px JetBrains Mono, monospace';
        ctx.fillStyle = 'rgba(34,211,238,0.95)';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, 0, s * 1.3 + 15);

        // Faint connection line to orb center
        ctx.globalAlpha = alpha * 0.13;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-nx + cx, -ny + cy);
        ctx.strokeStyle = 'rgba(6,182,212,0.6)';
        ctx.lineWidth   = 0.6;
        ctx.stroke();

        ctx.restore();
      });
    };

    // ─── MAIN ANIMATION LOOP ──────────────────────────────────────
    const animate = (ts: number) => {
      ctx.clearRect(0, 0, S, S);
      t = ts * 0.001;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Z-order:
      // 1. ambient layer
      drawAmbientGlow();
      drawParticles();
      drawPulses();

      // 2. ring segments behind sphere
      rings.forEach(r => drawRing(r, t, false));

      // 3. glass orb (covers behind-sphere ring segments)
      drawOrb(mx, my);

      // 4. ring segments + nodes in front
      rings.forEach(r => drawRing(r, t, true));
      drawNodes(t);

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top)  / rect.height,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: 0.5, y: 0.5 };
  }, []);

  return (
    <div
      className="w-full h-full min-h-[280px] flex items-center justify-center relative select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[520px] max-h-[520px] object-contain"
        style={{ filter: 'drop-shadow(0 0 50px rgba(6,182,212,0.28))' }}
      />
    </div>
  );
};

export default Cube3D;

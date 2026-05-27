import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

/* ---------- Aurora background ---------- */
export function AuroraBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-aurora opacity-80" />
      <div className="absolute inset-0 grid-bg opacity-40 animate-grid" />
      <div className="absolute inset-0 noise opacity-[0.04] mix-blend-overlay" />
      <div className="absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-[oklch(0.62_0.23_295/0.25)] blur-3xl animate-float" />
      <div className="absolute -bottom-40 -right-40 h-[42rem] w-[42rem] rounded-full bg-[oklch(0.72_0.18_230/0.25)] blur-3xl animate-float [animation-delay:-4s]" />
    </div>
  );
}

/* ---------- Animated particle field (SVG, lightweight) ---------- */
export function ParticleField() {
  const dots = Array.from({ length: 40 });
  return (
    <svg className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="pg" cx="50%" cy="50%">
          <stop offset="0%" stopColor="oklch(0.88 0.16 200)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="oklch(0.88 0.16 200)" stopOpacity="0" />
        </radialGradient>
      </defs>
      {dots.map((_, i) => {
        const cx = (i * 137.5) % 100;
        const cy = (i * 53.7) % 100;
        const r = 0.8 + ((i * 13) % 5) * 0.25;
        const d = 6 + (i % 8);
        return (
          <circle
            key={i}
            cx={`${cx}%`}
            cy={`${cy}%`}
            r={r}
            fill="url(#pg)"
          >
            <animate attributeName="opacity" values="0.2;1;0.2" dur={`${d}s`} repeatCount="indefinite" />
            <animate attributeName="cy" values={`${cy}%;${(cy + 5) % 100}%;${cy}%`} dur={`${d * 1.5}s`} repeatCount="indefinite" />
          </circle>
        );
      })}
    </svg>
  );
}

/* ---------- Cursor spotlight ---------- */
export function CursorSpotlight() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.5 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);
  const bg = useTransform([sx, sy], ([vx, vy]) =>
    `radial-gradient(400px circle at ${vx}px ${vy}px, oklch(0.72 0.18 230 / 0.18), transparent 60%)`);
  return <motion.div aria-hidden className="pointer-events-none fixed inset-0 z-30" style={{ background: bg as unknown as string }} />;
}

/* ---------- Neural mesh hero canvas (SVG, no three.js) ---------- */
export function NeuralMesh() {
  const ref = useRef<SVGSVGElement>(null);
  const nodes = Array.from({ length: 28 }, (_, i) => ({
    x: 6 + ((i * 73) % 88),
    y: 6 + ((i * 47) % 88),
  }));
  return (
    <svg ref={ref} viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="line" x1="0" x2="1">
          <stop offset="0%" stopColor="oklch(0.72 0.18 230)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="oklch(0.62 0.23 295)" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {nodes.map((n, i) =>
        nodes.slice(i + 1).map((m, j) => {
          const dist = Math.hypot(n.x - m.x, n.y - m.y);
          if (dist > 22) return null;
          return (
            <line
              key={`${i}-${j}`}
              x1={n.x} y1={n.y} x2={m.x} y2={m.y}
              stroke="url(#line)" strokeWidth={0.08} opacity={1 - dist / 22}
            >
              <animate attributeName="opacity" values={`${1 - dist / 22};0.1;${1 - dist / 22}`} dur={`${4 + (i % 5)}s`} repeatCount="indefinite" />
            </line>
          );
        })
      )}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={0.5} fill="oklch(0.88 0.16 200)">
          <animate attributeName="r" values="0.3;0.9;0.3" dur={`${3 + (i % 4)}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

/* ---------- Animated counter ---------- */
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let raf = 0; const start = performance.now(); const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(to * eased).toString() + suffix;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { raf = requestAnimationFrame(tick); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ---------- Magnetic button wrapper ---------- */
export function Magnetic({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

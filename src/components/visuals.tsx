import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/* ---------- Lenis smooth scroll ---------- */
export function SmoothScroll() {
  const lenisRef = useRef<import("lenis").default | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    let raf = 0;
    let cancelled = false;
    (async () => {
      const Lenis = (await import("lenis")).default;
      if (cancelled) return;
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenisRef.current = lenis;
      const loop = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    })();
    return () => { cancelled = true; cancelAnimationFrame(raf); lenisRef.current?.destroy(); lenisRef.current = null; };
  }, []);

  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/* ---------- Custom cursor with magnetic blob ---------- */
export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const bx = useSpring(x, { stiffness: 80, damping: 18, mass: 0.6 });
  const by = useSpring(y, { stiffness: 80, damping: 18, mass: 0.6 });
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      if (!visible) setVisible(true);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest?.("a, button, [data-cursor='hover']"));
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y, visible]);

  return (
    <>
      <motion.div aria-hidden className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference hidden md:block"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}>
        <div className={`rounded-full bg-white transition-all duration-300 ${hover ? "h-3 w-3" : "h-2 w-2"}`} />
      </motion.div>
      <motion.div aria-hidden className="pointer-events-none fixed top-0 left-0 z-[99] hidden md:block"
        style={{ x: bx, y: by, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}>
        <div className={`rounded-full border border-electric/60 transition-all duration-300 ${hover ? "h-14 w-14 bg-electric/10" : "h-8 w-8"}`} />
      </motion.div>
    </>
  );
}

/* ---------- Aurora background ---------- */
export function AuroraBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-aurora opacity-80" />
      <div className="absolute inset-0 grid-bg opacity-40 animate-grid" />
      <div className="absolute inset-0 noise opacity-[0.04] mix-blend-overlay" />
      <motion.div animate={{ x: [0, 60, -40, 0], y: [0, -40, 30, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-[oklch(0.62_0.23_295/0.25)] blur-3xl" />
      <motion.div animate={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0] }} transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 -right-40 h-[42rem] w-[42rem] rounded-full bg-[oklch(0.72_0.18_230/0.25)] blur-3xl" />
      <motion.div animate={{ x: [0, 40, -30, 0], y: [0, 20, -40, 0] }} transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.88_0.16_200/0.18)] blur-3xl" />
    </div>
  );
}

/* ---------- Particle field ---------- */
export function ParticleField() {
  const dots = Array.from({ length: 50 });
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
          <circle key={i} cx={`${cx}%`} cy={`${cy}%`} r={r} fill="url(#pg)">
            <animate attributeName="opacity" values="0.2;1;0.2" dur={`${d}s`} repeatCount="indefinite" />
            <animate attributeName="cy" values={`${cy}%;${(cy + 8) % 100}%;${cy}%`} dur={`${d * 1.5}s`} repeatCount="indefinite" />
          </circle>
        );
      })}
    </svg>
  );
}

/* ---------- Cursor spotlight (keeps the global glow) ---------- */
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
    `radial-gradient(500px circle at ${vx}px ${vy}px, oklch(0.72 0.18 230 / 0.15), transparent 60%)`);
  return <motion.div aria-hidden className="pointer-events-none fixed inset-0 z-30" style={{ background: bg as unknown as string }} />;
}

/* ---------- Neural mesh hero canvas ---------- */
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
            <line key={`${i}-${j}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y}
              stroke="url(#line)" strokeWidth={0.08} opacity={1 - dist / 22}>
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
    let raf = 0; let started = false;
    const start = (t0: number) => {
      const dur = 1800;
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(to * eased).toString() + suffix;
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started) { started = true; start(performance.now()); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ---------- Magnetic button wrapper ---------- */
export function Magnetic({ children, className = "", strength = 0.3 }: { children: React.ReactNode; className?: string; strength?: number }) {
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
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Split-text reveal (word-by-word with mask) ---------- */
export function RevealText({
  text,
  className = "",
  el: El = "h2",
  delay = 0,
  stagger = 0.06,
}: {
  text: string;
  className?: string;
  el?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const words = text.split(" ");
  const Tag = El as React.ElementType;
  return (
    <Tag ref={ref as React.RefObject<never>} className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: delay + i * stagger, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ---------- Character scramble effect ---------- */
export function Scramble({ text, className = "" }: { text: string; className?: string }) {
  const [out, setOut] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#@*";
    let raf = 0;
    const run = () => {
      let frame = 0;
      const total = 28;
      const animate = () => {
        const o = text.split("").map((c, i) => {
          if (c === " ") return " ";
          if (frame > total * 0.6 && i / text.length < frame / total) return c;
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("");
        setOut(o);
        frame++;
        if (frame <= total) raf = requestAnimationFrame(animate);
        else setOut(text);
      };
      animate();
    };
    const io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) { run(); io.disconnect(); }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [text]);
  return <span ref={ref} className={className}>{out}</span>;
}

/* ---------- Parallax wrapper ---------- */
export function Parallax({ children, speed = 0.3, className = "" }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}px`, `${-speed * 100}px`]);
  return <motion.div ref={ref} style={{ y }} className={className}>{children}</motion.div>;
}

/* ---------- 3D tilt card ---------- */
export function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0); const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });
  return (
    <motion.div
      ref={ref}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", transformPerspective: 1000 }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * 12); rx.set(-py * 12);
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Marquee row (CSS-driven) ---------- */
export function Marquee({ children, reverse = false, speed = 40 }: { children: React.ReactNode; reverse?: boolean; speed?: number }) {
  return (
    <div className="overflow-hidden mask-fade-x">
      <div className="flex gap-12 whitespace-nowrap" style={{ animation: `marquee ${speed}s linear infinite`, animationDirection: reverse ? "reverse" : "normal" }}>
        {children}
        {children}
      </div>
    </div>
  );
}

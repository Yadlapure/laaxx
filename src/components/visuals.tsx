// src/components/visuals.tsx
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";
import { useEffect, useRef, useState, memo } from "react";
import { useRouterState } from "@tanstack/react-router";

/* ============================================================
 * Reduced-motion helper — used by everything below
 * ============================================================ */
function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function isTouch() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(hover: none)").matches;
}

/* ============================================================
 * SmoothScroll (Lenis) — FIXED
 * Only active on desktop. Destroyed on route change. Skips
 * frames when tab is hidden. Respects reduced motion.
 * ============================================================ */
export function SmoothScroll() {
  const lenisRef = useRef<import("lenis").default | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (prefersReducedMotion() || isTouch()) return; // native scroll on mobile
    let raf = 0;
    let cancelled = false;
    let hidden = false;

    (async () => {
      const Lenis = (await import("lenis")).default;
      if (cancelled) return;
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false, // ← important: don't hijack touch
      });
      lenisRef.current = lenis;
      const loop = (time: number) => {
        if (!hidden) lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      const onVis = () => {
        hidden = document.hidden;
      };
      document.addEventListener("visibilitychange", onVis);
      (lenis as unknown as { _onVis?: () => void })._onVis = () =>
        document.removeEventListener("visibilitychange", onVis);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/* ============================================================
 * CustomCursor — FIXED
 * No React state for visibility/hover (uses data-attr + CSS).
 * Disabled on touch / reduced motion.
 * ============================================================ */
export const CustomCursor = memo(function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const bx = useSpring(x, { stiffness: 80, damping: 18, mass: 0.6 });
  const by = useSpring(y, { stiffness: 80, damping: 18, mass: 0.6 });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTouch()) return;
    let lastHover: Element | null = null;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      // Toggle hover class only when target changes (not every frame)
      const hoverEl = (e.target as Element)?.closest?.("a, button, [data-cursor='hover']") ?? null;
      if (hoverEl !== lastHover) {
        lastHover = hoverEl;
        const active = !!hoverEl;
        if (dotRef.current) dotRef.current.dataset.hover = String(active);
        if (ringRef.current) ringRef.current.dataset.hover = String(active);
      }
    };
    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };
    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerenter", onEnter);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerenter", onEnter);
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference hidden md:block"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      >
        <div
          ref={dotRef}
          data-hover="false"
          className="rounded-full bg-white transition-all duration-300 data-[hover=true]:h-3 data-[hover=true]:w-3 h-2 w-2"
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[99] hidden md:block"
        style={{ x: bx, y: by, translateX: "-50%", translateY: "-50%" }}
      >
        <div
          ref={ringRef}
          data-hover="false"
          className="rounded-full border border-electric/60 transition-all duration-300 data-[hover=true]:h-14 data-[hover=true]:w-14 data-[hover=true]:bg-electric/10 h-8 w-8"
        />
      </motion.div>
    </>
  );
});

/* ============================================================
 * AuroraBackground — FIXED
 * Static gradient blobs (no blur filter, no motion).
 * The visual is nearly identical but ~zero runtime cost.
 * ============================================================ */
export const AuroraBackground = memo(function AuroraBackground({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Pre-blurred gradient blobs — rendered as radial gradients, NOT filter:blur */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(40% 40% at 15% 20%, oklch(0.62 0.23 295 / 0.35), transparent 70%)",
            "radial-gradient(45% 45% at 85% 80%, oklch(0.72 0.18 230 / 0.32), transparent 70%)",
            "radial-gradient(30% 30% at 55% 55%, oklch(0.88 0.16 200 / 0.22), transparent 70%)",
          ].join(","),
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 noise opacity-[0.04] mix-blend-overlay" />
    </div>
  );
});

/* ============================================================
 * ParticleField — FIXED
 * Canvas. Single rAF. Pauses off-screen / hidden tab.
 * ============================================================ */
export const ParticleField = memo(function ParticleField({ count = 60 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = prefersReducedMotion();
    const isMobile = window.innerWidth < 768;
    const N = isMobile ? Math.min(count, 35) : count;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0,
      h = 0;

    const particles = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      r: 0.6 + Math.random() * 1.4,
      phase: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    let running = true;
    let last = performance.now();

    const draw = (t: number) => {
      const dt = Math.min(50, t - last);
      last = t;
      ctx.clearRect(0, 0, w, h);
      const time = t * 0.001;
      for (const p of particles) {
        p.x += p.vx * dt * 0.06;
        p.y += p.vy * dt * 0.06;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        const twinkle = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(time + p.phase));
        ctx.fillStyle = `rgba(150, 210, 255, ${twinkle * 0.55})`;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (running) raf = requestAnimationFrame(draw);
    };

    if (reduce) {
      // static render
      for (const p of particles) {
        ctx.fillStyle = "rgba(150, 210, 255, 0.35)";
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      raf = requestAnimationFrame(draw);
    }

    const onVis = () => {
      running = !document.hidden;
      if (running && !reduce) {
        last = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    const io = new IntersectionObserver(
      ([e]) => {
        running = e.isIntersecting && !document.hidden;
        if (running && !reduce) {
          last = performance.now();
          raf = requestAnimationFrame(draw);
        }
      },
      { threshold: 0.01 },
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
});

/* ============================================================
 * CursorSpotlight — FIXED
 * Was recomputing `radial-gradient` string every spring frame
 * → full-viewport style recalc. Now: fixed-size div, GPU translate.
 * Disabled on touch.
 * ============================================================ */
export const CursorSpotlight = memo(function CursorSpotlight() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (isTouch()) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 hidden md:block">
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 h-[1000px] w-[1000px] rounded-full"
        style={{
          x: sx,
          y: sy,
          background: "radial-gradient(circle, oklch(0.72 0.18 230 / 0.15) 0%, transparent 60%)",
          willChange: "transform",
        }}
      />
    </div>
  );
});

/* ============================================================
 * NeuralMesh — FIXED
 * Same look, but: canvas + rAF + pause off-screen.
 * No SMIL, no per-line animation overhead.
 * ============================================================ */
export const NeuralMesh = memo(function NeuralMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = prefersReducedMotion();
    const isMobile = window.innerWidth < 768;
    const N = isMobile ? 16 : 28;
    const MAX_DIST = 22;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0,
      h = 0;

    const nodes = Array.from({ length: N }, (_, i) => ({
      x: 6 + ((i * 73) % 88),
      y: 6 + ((i * 47) % 88),
      phase: Math.random() * Math.PI * 2,
      speed: 3 + (i % 4),
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    let running = true;

    const draw = (t: number) => {
      const time = t * 0.001;
      ctx.clearRect(0, 0, w, h);

      // Precompute screen positions
      const pts = nodes.map((n) => ({
        px: (n.x / 100) * w,
        py: (n.y / 100) * h,
      }));

      // Lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].px - pts[j].px;
          const dy = pts[i].py - pts[j].py;
          const dist = Math.hypot(dx, dy) / (w / 100);
          if (dist > MAX_DIST) continue;
          const baseOp = 1 - dist / MAX_DIST;
          const pulse = 0.5 + 0.5 * Math.sin(time * 0.6 + nodes[i].phase);
          const op = baseOp * (0.35 + pulse * 0.5);
          const grad = ctx.createLinearGradient(pts[i].px, pts[i].py, pts[j].px, pts[j].py);
          grad.addColorStop(0, `rgba(120, 160, 255, ${op})`);
          grad.addColorStop(1, `rgba(190, 130, 255, ${op})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(pts[i].px, pts[i].py);
          ctx.lineTo(pts[j].px, pts[j].py);
          ctx.stroke();
        }
      }

      // Nodes
      for (let i = 0; i < pts.length; i++) {
        const pulse = 0.5 + 0.5 * Math.sin(time * 2 + nodes[i].phase);
        const r = 1.5 + pulse * 1.5;
        ctx.fillStyle = `rgba(180, 230, 255, ${0.6 + pulse * 0.4})`;
        ctx.beginPath();
        ctx.arc(pts[i].px, pts[i].py, r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (running) raf = requestAnimationFrame(draw);
    };

    if (reduce) {
      // Draw once, static
      requestAnimationFrame((t) => {
        running = false;
        draw(t);
      });
    } else {
      raf = requestAnimationFrame(draw);
    }

    const onVis = () => {
      running = !document.hidden;
      if (running && !reduce) raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVis);

    const io = new IntersectionObserver(
      ([e]) => {
        running = e.isIntersecting && !document.hidden;
        if (running && !reduce) raf = requestAnimationFrame(draw);
      },
      { threshold: 0.01 },
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
});

/* ============================================================
 * Counter — already good, kept as-is (rAF + IO)
 * ============================================================ */
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let started = false;
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
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          start(performance.now());
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ============================================================
 * Magnetic — FIXED
 * Direct style writes via rAF, no React state, disabled on touch.
 * ============================================================ */
export function Magnetic({
  children,
  className = "",
  strength = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isTouch() || prefersReducedMotion()) return;

    const tick = () => {
      el.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0)`;
      raf.current = 0;
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.current.x = (e.clientX - (r.left + r.width / 2)) * strength;
      target.current.y = (e.clientY - (r.top + r.height / 2)) * strength;
      if (!raf.current) raf.current = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      target.current.x = 0;
      target.current.y = 0;
      if (!raf.current) raf.current = requestAnimationFrame(tick);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: "transform", transition: "transform 0.2s ease-out" }}
    >
      {children}
    </div>
  );
}

/* ============================================================
 * RevealText — kept mostly as-is, but disabled on reduced motion
 * ============================================================ */
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
  const reduced = prefersReducedMotion();

  if (reduced) {
    return (
      <Tag ref={ref as React.RefObject<never>} className={className}>
        {text}
      </Tag>
    );
  }

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

/* ============================================================
 * Scramble — FIXED
 * Was setState on every frame. Now: direct textContent writes.
 * ============================================================ */
export function Scramble({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.textContent = text;
      return;
    }

    el.textContent = text;
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#@*";
    let raf = 0;

    const run = () => {
      let frame = 0;
      const total = 28;
      const animate = () => {
        const out = text
          .split("")
          .map((c, i) => {
            if (c === " ") return " ";
            if (frame > total * 0.6 && i / text.length < frame / total) return c;
            return chars[(Math.random() * chars.length) | 0];
          })
          .join("");
        el.textContent = out;
        frame++;
        if (frame <= total) raf = requestAnimationFrame(animate);
        else el.textContent = text;
      };
      animate();
    };

    const io = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [text]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}

/* ============================================================
 * Parallax — unchanged (scroll-linked, cheap enough)
 * ============================================================ */
export function Parallax({
  children,
  speed = 0.3,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}px`, `${-speed * 100}px`]);
  return (
    <motion.div ref={ref} style={{ y, willChange: "transform" }} className={className}>
      {children}
    </motion.div>
  );
}

/* ============================================================
 * TiltCard — FIXED
 * Direct style transform. No spring (springs = React re-render per frame).
 * Disabled on touch / reduced motion.
 * ============================================================ */
export function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const target = useRef({ rx: 0, ry: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isTouch() || prefersReducedMotion()) return;

    const tick = () => {
      el.style.transform = `perspective(1000px) rotateX(${target.current.rx}deg) rotateY(${target.current.ry}deg)`;
      raf.current = 0;
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      target.current.ry = px * 12;
      target.current.rx = -py * 12;
      if (!raf.current) raf.current = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      target.current.rx = 0;
      target.current.ry = 0;
      if (!raf.current) raf.current = requestAnimationFrame(tick);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: "transform", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

/* ============================================================
 * Marquee — CSS animation + GPU-friendly
 * ============================================================ */
export function Marquee({
  children,
  reverse = false,
  speed = 40,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  speed?: number;
}) {
  return (
    <div className="overflow-hidden mask-fade-x">
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

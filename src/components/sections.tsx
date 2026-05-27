import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { AuroraBackground, Counter, Magnetic, NeuralMesh, ParticleField } from "@/components/visuals";
import { CASES, INDUSTRIES, KEYWORDS, SERVICES, STATS, TESTIMONIALS, TIMELINE, WHY, COMPANY } from "@/lib/content";

/* ============ HERO ============ */
export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-32 pb-24">
      <AuroraBackground />
      <div className="absolute inset-0 opacity-60"><NeuralMesh /></div>
      <ParticleField />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-widest text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow shadow-glow animate-pulse-glow" />
          AI-First Enterprise Consulting
        </motion.div>

        <h1 className="mt-8 max-w-5xl text-balance font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] font-semibold">
          {"Engineering the Future of".split(" ").map((w, i) => (
            <motion.span key={i} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              className="inline-block mr-3">{w}</motion.span>
          ))}
          <motion.span initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.7 }}
            className="inline-block text-gradient">Enterprise Transformation</motion.span>
        </h1>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground">
          AI, Cloud, Cybersecurity and Digital Innovation — built for modern enterprises by senior engineers and consultants.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <Link to="/services" className="group inline-flex items-center gap-2 rounded-full bg-cta px-7 py-4 font-medium text-primary-foreground shadow-glow hover:shadow-glow-neon transition-shadow">
              Explore Services
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Magnetic>
          <Magnetic>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full glass px-7 py-4 font-medium hover:border-electric/40">
              Schedule Consultation
            </Link>
          </Magnetic>
        </motion.div>

        {/* Rotating keywords marquee */}
        <div className="mt-20 mask-fade-x overflow-hidden">
          <div className="flex gap-12 animate-marquee whitespace-nowrap text-3xl md:text-5xl font-display font-light text-muted-foreground/70">
            {[...KEYWORDS, ...KEYWORDS, ...KEYWORDS].map((k, i) => (
              <span key={i} className="flex items-center gap-12">
                {k}
                <span className="text-electric">◆</span>
              </span>
            ))}
          </div>
        </div>

        {/* scroll indicator */}
        <div className="mt-16 flex justify-center">
          <div className="flex h-10 w-6 justify-center rounded-full border border-white/20 p-1">
            <motion.div className="h-2 w-1 rounded-full bg-electric" animate={{ y: [0, 14, 0] }} transition={{ duration: 1.8, repeat: Infinity }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ STATS ============ */
export function StatsSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 grid gap-8 md:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            className="glass-strong rounded-2xl p-8 relative overflow-hidden group">
            <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition pointer-events-none rounded-2xl"
              style={{ background: "radial-gradient(400px circle at 50% 0%, oklch(0.72 0.18 230 / 0.25), transparent 60%)" }} />
            <div className="text-5xl md:text-6xl font-display font-semibold text-gradient">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-3 text-sm text-muted-foreground uppercase tracking-widest">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============ SERVICES ============ */
const IconSquare = ({ name }: { name: string }) => (
  <div className="relative h-12 w-12 rounded-xl glass grid place-items-center text-electric overflow-hidden">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {name === "code" && <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>}
      {name === "layers" && <><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>}
      {name === "brain" && <><path d="M9 3a3 3 0 0 0-3 3v0a3 3 0 0 0-3 3v3a3 3 0 0 0 3 3v0a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3Z"/><path d="M15 3a3 3 0 0 1 3 3v0a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3v0a3 3 0 0 1-3 3h0a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z"/></>}
      {name === "cloud" && <path d="M17.5 19a4.5 4.5 0 1 0-1.6-8.7A6 6 0 0 0 4 12.5 4.5 4.5 0 0 0 6.5 19h11Z"/>}
      {name === "users" && <><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>}
      {name === "server" && <><rect x="2" y="3" width="20" height="8" rx="2"/><rect x="2" y="13" width="20" height="8" rx="2"/><line x1="6" y1="7" x2="6" y2="7"/><line x1="6" y1="17" x2="6" y2="17"/></>}
      {name === "network" && <><circle cx="12" cy="12" r="2"/><circle cx="4" cy="6" r="2"/><circle cx="20" cy="6" r="2"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><path d="M6 6l5 5M18 6l-5 5M6 18l5-5M18 18l-5-5"/></>}
      {name === "shield" && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>}
    </svg>
    <div className="absolute inset-0 bg-gradient-to-br from-electric/20 to-neon/20 opacity-0 group-hover:opacity-100 transition" />
  </div>
);

export function ServicesSection() {
  return (
    <section id="services" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow="Services" title={<>End-to-end services for the <span className="text-gradient">AI-native enterprise</span>.</>}
          sub="From software engineering to cyber resilience — eight practices, one delivery model." />
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <motion.div key={s.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.06 }}
              whileHover={{ y: -6, rotateX: 4, rotateY: -4 }} style={{ transformStyle: "preserve-3d" }}
              className="group relative glass-strong rounded-2xl p-6 overflow-hidden">
              <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition"
                style={{ background: "linear-gradient(135deg, oklch(0.72 0.18 230 / 0.25), oklch(0.62 0.23 295 / 0.25))", mask: "linear-gradient(black, black) content-box, linear-gradient(black, black)", padding: 1 }} />
              <IconSquare name={s.icon} />
              <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm text-electric opacity-0 group-hover:opacity-100 transition">
                Learn more <span>→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ INDUSTRIES ============ */
export function IndustriesSection() {
  return (
    <section id="industries" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow="Industries" title={<>Deep expertise across <span className="text-gradient">11 industries</span>.</>}
          sub="Industry playbooks, not generic templates — built by senior practitioners." />
      </div>
      <div className="mt-16 overflow-hidden mask-fade-x">
        <div className="flex gap-6 animate-marquee">
          {[...INDUSTRIES, ...INDUSTRIES].map((ind, i) => (
            <div key={i} className="group relative w-[22rem] shrink-0 glass-strong rounded-2xl p-8 overflow-hidden">
              <div className="absolute inset-0 opacity-30 grid-bg" />
              <div className="absolute -inset-20 opacity-0 group-hover:opacity-100 transition"
                style={{ background: "radial-gradient(300px circle at 50% 50%, oklch(0.62 0.23 295 / 0.25), transparent 70%)" }} />
              <div className="relative">
                <div className="text-xs uppercase tracking-widest text-electric">{`0${(i % INDUSTRIES.length) + 1}`.slice(-2)}</div>
                <h3 className="mt-3 font-display text-2xl font-semibold">{ind.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{ind.blurb}</p>
                <div className="mt-8 h-px w-full bg-gradient-to-r from-electric via-neon to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ AI INNOVATION ============ */
export function AISection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-aurora opacity-60" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6 grid gap-16 lg:grid-cols-2 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse-glow" /> AI & Innovation
          </div>
          <h2 className="mt-6 font-display text-4xl md:text-6xl font-semibold leading-[1] text-balance">
            AI-Powered Transformation at <span className="text-gradient">Enterprise Scale</span>.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg">
            From generative copilots to autonomous operations — we engineer AI systems that are safe, governed and measurably valuable.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-3">
            {["Generative AI", "Data Engineering", "Predictive Analytics", "AI Automation", "Enterprise Intelligence", "MLOps"].map((t) => (
              <div key={t} className="glass rounded-xl px-4 py-3 text-sm flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow" /> {t}
              </div>
            ))}
          </div>
        </div>

        {/* Floating AI dashboard mock */}
        <div className="relative">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative glass-strong rounded-3xl p-6 shadow-glow-neon">
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
              </div>
              <div className="text-xs text-muted-foreground">laaxx.ai / live</div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {["Inference", "Tokens/s", "Accuracy"].map((l, i) => (
                <div key={l} className="glass rounded-xl p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{l}</div>
                  <div className="mt-1 text-xl font-display font-semibold text-gradient">{[ "12.4ms","87k","99.2%"][i]}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl glass p-4">
              <svg viewBox="0 0 300 80" className="w-full h-20">
                <defs>
                  <linearGradient id="ln" x1="0" x2="1"><stop offset="0%" stopColor="oklch(0.72 0.18 230)"/><stop offset="100%" stopColor="oklch(0.62 0.23 295)"/></linearGradient>
                  <linearGradient id="fl" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="oklch(0.72 0.18 230 / 0.4)"/><stop offset="100%" stopColor="oklch(0.72 0.18 230 / 0)"/></linearGradient>
                </defs>
                <path d="M0 60 L20 50 L40 55 L60 35 L80 42 L100 25 L120 30 L140 18 L160 22 L180 12 L200 20 L220 8 L240 14 L260 6 L280 12 L300 4 L300 80 L0 80 Z" fill="url(#fl)"/>
                <path d="M0 60 L20 50 L40 55 L60 35 L80 42 L100 25 L120 30 L140 18 L160 22 L180 12 L200 20 L220 8 L240 14 L260 6 L280 12 L300 4" fill="none" stroke="url(#ln)" strokeWidth="2"/>
              </svg>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="glass rounded-lg p-3"><div className="text-muted-foreground">Cost / 1k req</div><div className="text-electric mt-1 font-medium">$0.0042 ↓ 38%</div></div>
              <div className="glass rounded-lg p-3"><div className="text-muted-foreground">SLA</div><div className="text-cyan-glow mt-1 font-medium">99.99%</div></div>
            </div>
          </motion.div>
          <div className="absolute -z-10 inset-0 bg-cta blur-3xl opacity-30 rounded-3xl" />
        </div>
      </div>
    </section>
  );
}

/* ============ TIMELINE ============ */
export function TimelineSection() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow="Methodology" title={<>The transformation journey, <span className="text-gradient">end-to-end</span>.</>}
          sub="Six phases. One outcome. Measured in business value, not deliverables." />
        <div className="relative mt-20 mx-auto max-w-3xl">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-electric to-transparent" />
          {TIMELINE.map((t, i) => (
            <motion.div key={t.step} initial={{ opacity: 0, x: i % 2 ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className={`relative mb-16 grid grid-cols-2 gap-8 ${i % 2 ? "" : ""}`}>
              <div className={`${i % 2 ? "col-start-2 text-left" : "text-right"}`}>
                <div className="glass-strong rounded-2xl p-6 inline-block max-w-sm">
                  <div className="text-xs uppercase tracking-widest text-electric">Phase {i + 1}</div>
                  <h3 className="mt-2 font-display text-2xl font-semibold">{t.step}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t.text}</p>
                </div>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-6 h-4 w-4 rounded-full bg-cta shadow-glow-neon" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ CASES ============ */
export function CasesSection() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow="Case Studies" title={<>Outcomes engineered with <span className="text-gradient">Fortune-scale</span> clients.</>}
          sub="Selected work across AI, cloud, security and automation." />
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {CASES.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="group relative h-80 overflow-hidden rounded-3xl glass-strong">
              <div className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-40 group-hover:opacity-70 transition-opacity duration-700`} />
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute inset-0 noise opacity-[0.05]" />
              <div className="relative h-full p-8 flex flex-col justify-between">
                <div className="text-xs uppercase tracking-widest glass inline-flex items-center self-start rounded-full px-3 py-1">{c.tag}</div>
                <div>
                  <h3 className="font-display text-3xl font-semibold max-w-md">{c.title}</h3>
                  <div className="mt-4 flex items-end justify-between">
                    <div className="text-5xl font-display font-bold text-gradient">{c.metric}</div>
                    <span className="inline-flex items-center gap-2 text-sm opacity-80 group-hover:translate-x-1 transition-transform">Read case →</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ WHY ============ */
export function WhySection() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow="Why LAAXX" title={<>Built differently. <span className="text-gradient">Delivered seriously</span>.</>}
          sub="Six commitments we make to every enterprise client." />
        <div className="mt-16 grid gap-px md:grid-cols-3 bg-white/5 rounded-3xl overflow-hidden">
          {WHY.map((w, i) => (
            <div key={i} className="bg-background/80 backdrop-blur p-8 hover:bg-white/[0.03] transition group relative">
              <div className="text-electric text-sm font-mono">0{i + 1}</div>
              <h3 className="mt-3 font-display text-xl font-semibold">{w.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{w.text}</p>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-cta transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ TESTIMONIALS ============ */
export function TestimonialsSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow="Testimonials" title={<>Trusted by leaders <span className="text-gradient">building the future</span>.</>}
          sub="Voices from CIOs, CTOs and Chief Digital Officers we work with." />
      </div>
      <div className="mt-16 mask-fade-x overflow-hidden">
        <div className="flex gap-6 animate-marquee">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div key={i} className="w-[28rem] shrink-0 glass-strong rounded-2xl p-8">
              <div className="text-electric text-3xl font-display leading-none">"</div>
              <p className="mt-3 text-lg leading-relaxed">{t.quote}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-cta shadow-glow" />
                <div className="text-sm text-muted-foreground">{t.who}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ CTA ============ */
export function CTASection() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-12 md:p-20 text-center">
          <div className="absolute inset-0 bg-aurora opacity-70" />
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-6xl font-semibold text-balance">
              Start your <span className="text-gradient">digital transformation</span>.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
              Talk to a senior practitioner. No slideware — a 30 minute working session on your highest-value opportunity.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Magnetic>
                <Link to="/contact" className="rounded-full bg-cta px-8 py-4 font-medium text-primary-foreground shadow-glow-neon">Schedule Consultation</Link>
              </Magnetic>
              <Magnetic>
                <Link to="/services" className="rounded-full glass px-8 py-4 font-medium">Explore Services</Link>
              </Magnetic>
            </div>
            <div className="mt-12 text-xs text-muted-foreground">
              {COMPANY.legal} • CIN {COMPANY.cin}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ shared ============ */
function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub: string }) {
  return (
    <div className="max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse-glow" /> {eyebrow}
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.02] text-balance">
        {title}
      </motion.h2>
      <p className="mt-5 text-lg text-muted-foreground max-w-xl">{sub}</p>
    </div>
  );
}

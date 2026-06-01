import { createFileRoute } from "@tanstack/react-router";
import { AuroraBackground } from "@/components/visuals";
import { COMPANY, SERVICES } from "@/lib/content";
import { motion } from "framer-motion";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — LAAXX Consulting" },
      { name: "description", content: "Start your digital transformation with LAAXX Consulting. Talk to a senior practitioner." },
      { property: "og:title", content: "Contact — LAAXX Consulting" },
      { property: "og:description", content: "Start your digital transformation." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Page,
});

function Page() {
  return (
    <section className="relative pt-40 pb-32 overflow-hidden">
      <AuroraBackground />
      <div className="relative mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-2 items-start">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse-glow" /> Contact
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-semibold leading-[0.95] text-balance">
            Start your <span className="text-gradient">digital transformation</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg">
            Tell us about your ambition. We'll come back within one business day with a senior practitioner.
          </p>

          {/* Animated globe placeholder */}
          <div className="mt-12 relative h-80 glass-strong rounded-3xl overflow-hidden grid place-items-center">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="relative h-56 w-56 rounded-full border border-electric/30">
              <div className="absolute inset-4 rounded-full border border-neon/30" />
              <div className="absolute inset-8 rounded-full border border-cyan-glow/30" />
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <span key={deg} className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric shadow-glow"
                  style={{ transform: `rotate(${deg}deg) translateX(7rem)` }} />
              ))}
            </motion.div>
            <div className="absolute bottom-6 left-6 text-xs text-muted-foreground">Bengaluru</div>
          </div>

          <div className="mt-8 text-sm text-muted-foreground space-y-1">
            <div>{COMPANY.legal}</div>
            <div>{COMPANY.address}</div>
            <div>CIN: <span className="font-mono">{COMPANY.cin}</span></div>
            <div><a className="text-electric" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> · {COMPANY.phone}</div>
          </div>
        </div>

        <form className="glass-strong rounded-3xl p-8 space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Thanks — we'll be in touch."); }}>
          <Field label="Name"><input required className="input" placeholder="Jane Doe" /></Field>
          <Field label="Work email"><input required type="email" className="input" placeholder="jane@enterprise.com" /></Field>
          <Field label="Company"><input required className="input" placeholder="Acme Corp" /></Field>
          <Field label="Service interest">
            <select className="input">
              <option>Select a service…</option>
              {SERVICES.map((s) => <option key={s.slug}>{s.title}</option>)}
            </select>
          </Field>
          <Field label="Message"><textarea rows={5} className="input resize-none" placeholder="Briefly describe your ambition…" /></Field>
          <button className="w-full rounded-full bg-cta py-4 font-medium text-primary-foreground shadow-glow-neon hover:shadow-glow transition">
            Start Your Digital Transformation →
          </button>
          <style>{`.input { width:100%; background: oklch(1 0 0 / 0.04); border:1px solid oklch(1 0 0 / 0.08); border-radius: 14px; padding: 14px 16px; outline:none; transition: border-color .2s, box-shadow .2s; color: inherit; }
          .input:focus { border-color: oklch(0.72 0.18 230 / 0.6); box-shadow: 0 0 0 4px oklch(0.72 0.18 230 / 0.15); }
          .input::placeholder { color: oklch(0.7 0.02 250 / 0.5); }
          select.input option { background: #0a0f1d; }`}</style>
        </form>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{label}</div>
      {children}
    </label>
  );
}

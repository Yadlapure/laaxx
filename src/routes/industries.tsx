import { createFileRoute, Link } from "@tanstack/react-router";
import { AuroraBackground } from "@/components/visuals";
import { INDUSTRIES } from "@/lib/content";
import { motion } from "framer-motion";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — LAAXX Consulting" },
      { name: "description", content: "Deep expertise across automotive, telecom, banking, insurance, transportation, energy, manufacturing, utilities, government, retail and healthcare." },
      { property: "og:title", content: "Industries — LAAXX Consulting" },
      { property: "og:description", content: "Industry playbooks built by senior practitioners." },
      { property: "og:url", content: "/industries" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="relative pt-40 pb-20 overflow-hidden">
        <AuroraBackground />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse-glow" /> Industries
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-semibold leading-[0.95] max-w-4xl text-balance">
            Deep expertise. <span className="text-gradient">Eleven industries</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Industry-specific playbooks, talent and accelerators — not generic templates.
          </p>
        </div>
      </section>

      <section className="relative pb-32">
        <div className="mx-auto max-w-7xl px-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, i) => (
            <motion.div key={ind.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.06 }}
              className="group relative glass-strong rounded-2xl p-8 overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute -inset-20 opacity-0 group-hover:opacity-100 transition"
                style={{ background: "radial-gradient(300px circle at 50% 50%, oklch(0.72 0.18 230 / 0.25), transparent 70%)" }} />
              <div className="relative">
                <div className="text-electric text-xs uppercase tracking-widest">{`0${i + 1}`.slice(-2)}</div>
                <h3 className="mt-3 font-display text-2xl font-semibold">{ind.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{ind.blurb}</p>
                <Link to="/contact" className="mt-6 inline-flex items-center gap-2 text-electric text-sm">Talk to us →</Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

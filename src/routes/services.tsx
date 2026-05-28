import { createFileRoute, Link } from "@tanstack/react-router";
import { AuroraBackground } from "@/components/visuals";
import { SERVICES } from "@/lib/content";
import { motion } from "framer-motion";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — LAAXX Consulting" },
      { name: "description", content: "Eight enterprise practices: Software, Enterprise Apps, AI & Data, Cloud, Digital Workplace, Core Enterprise & zCloud, Networks, Cyber Resilience." },
      { property: "og:title", content: "Services — LAAXX Consulting" },
      { property: "og:description", content: "Eight enterprise practices, one AI-first delivery model." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
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
            <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse-glow" /> Services
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-semibold leading-[0.95] max-w-4xl text-balance">
            Eight practices, <span className="text-gradient">one delivery model</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Senior practitioners. AI-first delivery. Outcome-bound engagements across the full enterprise stack.
          </p>
        </div>
      </section>

      <section className="relative pb-32">
        <div className="mx-auto max-w-7xl px-6 grid gap-px md:grid-cols-2 bg-white/5 rounded-3xl overflow-hidden">
          {SERVICES.map((s, i) => (
            <motion.div key={s.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 2) * 0.06 }}
              className="bg-background/80 p-10 group relative">
              <div className="text-electric font-mono text-sm">{`0${i + 1}`.slice(-2)}</div>
              <h2 className="mt-3 font-display text-3xl font-semibold">{s.title}</h2>
              <p className="mt-3 text-muted-foreground max-w-md">{s.desc}</p>
              <ul className="mt-6 grid gap-2 text-sm">
                <li className="flex gap-2"><span className="text-electric">◆</span> Enterprise use cases & reference architectures</li>
                <li className="flex gap-2"><span className="text-electric">◆</span> Transformation journey & adoption</li>
                <li className="flex gap-2"><span className="text-electric">◆</span> Technology stack & integrations</li>
                <li className="flex gap-2"><span className="text-electric">◆</span> Measured outcomes & KPIs</li>
              </ul>
              <Link to="/contact" className="mt-8 inline-flex items-center gap-2 text-electric text-sm">Discuss this practice →</Link>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-cta transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

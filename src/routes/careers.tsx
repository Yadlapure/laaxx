import { createFileRoute } from "@tanstack/react-router";
import { AuroraBackground } from "@/components/visuals";

const ROLES = [
  { title: "Principal AI Engineer", loc: "Bengaluru / Remote", team: "AI & Data" },
  { title: "Cloud Architect — Multi-Cloud", loc: "Hybrid", team: "Cloud" },
  { title: "Cybersecurity Lead — Zero Trust", loc: "Bengaluru", team: "Cyber Resilience" },
  { title: "Engagement Director — BFSI", loc: "Mumbai", team: "Banking" },
  { title: "Senior SAP Consultant", loc: "Remote", team: "Enterprise Apps" },
  { title: "Staff Platform Engineer", loc: "Bengaluru", team: "Software Services" },
];

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — LAAXX Consulting" },
      { name: "description", content: "Join LAAXX. Build the future of enterprise AI, cloud and security with senior practitioners." },
      { property: "og:title", content: "Careers — LAAXX Consulting" },
      { property: "og:description", content: "Build the future with us." },
      { property: "og:url", content: "/careers" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
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
            <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse-glow" /> Careers
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-semibold leading-[0.95] max-w-4xl text-balance">
            Build the <span className="text-gradient">future</span> with us.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            We hire senior engineers and consultants who want to ship enterprise-grade AI — and own outcomes end to end.
          </p>
        </div>
      </section>

      <section className="relative pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-3">
            {ROLES.map((r, i) => (
              <a key={i} href="#" className="group flex flex-wrap items-center justify-between gap-4 glass-strong rounded-2xl px-8 py-6 hover:border-electric/40 transition">
                <div>
                  <div className="text-electric text-xs uppercase tracking-widest">{r.team}</div>
                  <div className="mt-1 font-display text-2xl font-semibold">{r.title}</div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-sm text-muted-foreground">{r.loc}</span>
                  <span className="rounded-full glass px-5 py-2 text-sm group-hover:bg-cta group-hover:text-primary-foreground transition">Apply →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

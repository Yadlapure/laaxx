import { createFileRoute, Link } from "@tanstack/react-router";
import { AuroraBackground } from "@/components/visuals";
import { COMPANY, WHY } from "@/lib/content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — LAAXX Consulting" },
      { name: "description", content: "LAAXX Consulting Pvt Ltd — AI-first enterprise consulting and engineering for Fortune-scale organizations." },
      { property: "og:title", content: "About — LAAXX Consulting" },
      { property: "og:description", content: "AI-first enterprise consulting and engineering." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
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
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow animate-pulse-glow" /> About
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-semibold leading-[0.95] max-w-4xl text-balance">
            We engineer the <span className="text-gradient">future of work</span> for global enterprises.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {COMPANY.legal} is a senior-led consulting and engineering firm focused exclusively on AI-native enterprise transformation.
          </p>
        </div>
      </section>

      <section className="relative pb-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-px md:grid-cols-3 bg-white/5 rounded-3xl overflow-hidden">
          {WHY.map((w, i) => (
            <div key={i} className="bg-background/80 p-8">
              <div className="text-electric text-sm font-mono">0{i + 1}</div>
              <h3 className="mt-3 font-display text-xl font-semibold">{w.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative pb-32">
        <div className="mx-auto max-w-7xl px-6 grid gap-8 md:grid-cols-2">
          <div className="glass-strong rounded-2xl p-8">
            <h3 className="font-display text-2xl font-semibold">Registered office</h3>
            <p className="mt-3 text-muted-foreground">{COMPANY.address}</p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div><div className="text-muted-foreground text-xs uppercase tracking-widest">Entity</div><div className="mt-1">{COMPANY.legal}</div></div>
              <div><div className="text-muted-foreground text-xs uppercase tracking-widest">CIN</div><div className="mt-1 font-mono">{COMPANY.cin}</div></div>
              <div><div className="text-muted-foreground text-xs uppercase tracking-widest">Email</div><div className="mt-1">{COMPANY.email}</div></div>
              <div><div className="text-muted-foreground text-xs uppercase tracking-widest">Phone</div><div className="mt-1">{COMPANY.phone}</div></div>
            </div>
          </div>
          <div className="glass-strong rounded-2xl p-8">
            <h3 className="font-display text-2xl font-semibold">Work with us</h3>
            <p className="mt-3 text-muted-foreground">From strategy to scale, we partner with leaders building the next decade of their business.</p>
            <div className="mt-6 flex gap-3">
              <Link to="/contact" className="rounded-full bg-cta px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow">Contact us</Link>
              <Link to="/careers" className="rounded-full glass px-6 py-3 text-sm font-medium">Careers</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

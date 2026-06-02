import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { COMPANY } from "@/lib/content";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/about", label: "About" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 8);
    onS(); window.addEventListener("scroll", onS);
    return () => window.removeEventListener("scroll", onS);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 overflow-x-clip transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className={`flex min-w-0 items-center justify-between rounded-2xl px-4 py-3 transition-all sm:px-5 ${scrolled ? "glass-strong shadow-glow" : ""}`}>
          <Link to="/" className="group flex min-w-0 items-center gap-2">
            <div className="relative h-8 w-8 rounded-lg bg-cta shadow-glow grid place-items-center font-display font-bold text-primary-foreground text-sm">
              L
              <div className="absolute inset-0 rounded-lg bg-cta blur-md opacity-50 group-hover:opacity-80 transition" />
            </div>
            <span className="truncate font-display text-lg font-semibold tracking-tight">LAAXX<span className="text-electric">.</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to}
                className="relative px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                activeProps={{ className: "text-foreground" }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <Link to="/contact" className="hidden md:inline-flex items-center gap-2 rounded-full bg-cta px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow hover:shadow-glow-neon transition-shadow">
            Schedule Consultation
            <span aria-hidden>→</span>
          </Link>
          <button onClick={() => setOpen(!open)} className="md:hidden rounded-md p-2 glass" aria-label="Menu">
            <div className="space-y-1.5"><span className="block h-0.5 w-5 bg-foreground" /><span className="block h-0.5 w-5 bg-foreground" /></div>
          </button>
        </div>
        {open && (
          <div className="mt-2 w-full max-w-full overflow-hidden rounded-2xl p-4 glass-strong animate-in fade-in slide-in-from-top-2 md:hidden">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 hover:bg-white/5">{n.label}</Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-white/5">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-electric to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-cta shadow-glow grid place-items-center font-display font-bold text-primary-foreground text-sm">L</div>
            <span className="font-display font-semibold text-lg">{COMPANY.name}</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            {COMPANY.tagline}. AI, Cloud, Cybersecurity and Digital Engineering for the modern enterprise.
          </p>
          <form className="mt-6 flex max-w-md gap-2">
            <input type="email" placeholder="Work email" className="flex-1 rounded-full glass px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-electric" />
            <button type="button" className="rounded-full bg-cta px-5 text-sm font-medium text-primary-foreground shadow-glow">Subscribe</button>
          </form>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Company</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-electric">About</Link></li>
            <li><Link to="/services" className="hover:text-electric">Services</Link></li>
            <li><Link to="/industries" className="hover:text-electric">Industries</Link></li>
            <li><Link to="/careers" className="hover:text-electric">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-electric">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Registered</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>{COMPANY.legal}</li>
            <li>CIN: {COMPANY.cin}</li>
            <li>{COMPANY.address}</li>
            <li className="pt-2"><a href={`mailto:${COMPANY.email}`} className="hover:text-electric">{COMPANY.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {COMPANY.legal}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-electric">Privacy</a>
            <a href="#" className="hover:text-electric">Terms</a>
            <a href="#" className="hover:text-electric">Security</a>
            <a href="#" className="hover:text-electric">ISO 27001</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onS = () => {
      const h = document.documentElement;
      const s = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setP(Math.min(1, Math.max(0, s)));
    };
    onS(); window.addEventListener("scroll", onS);
    return () => window.removeEventListener("scroll", onS);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent">
      <div className="h-full bg-cta shadow-glow transition-[width] duration-150" style={{ width: `${p * 100}%` }} />
    </div>
  );
}

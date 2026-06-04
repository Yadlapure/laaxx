import { createFileRoute, Link } from "@tanstack/react-router";
import { COMPANY } from "@/lib/content";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: `Terms & Conditions — ${COMPANY.name}` },
      { name: "description", content: `Terms and conditions for using ${COMPANY.legal} website and services.` },
      { property: "og:title", content: `Terms & Conditions — ${COMPANY.name}` },
      { property: "og:description", content: `Terms and conditions for using ${COMPANY.legal} website and services.` },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="relative pt-40 pb-12 overflow-hidden">
        <div className="relative mx-auto max-w-4xl px-6">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow animate-pulse-glow" /> Legal
          </div>
          <h1 className="mt-6 font-display text-4xl md:text-5xl font-semibold leading-[0.95] max-w-3xl text-balance">
            Terms & <span className="text-gradient">Conditions</span>
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
      </section>

      <section className="relative pb-32">
        <div className="mx-auto max-w-4xl px-6 space-y-12 text-sm leading-relaxed text-muted-foreground">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">1. Introduction</h2>
            <p className="mt-3">
              Welcome to {COMPANY.legal} (“we,” “our,” or “us”). These Terms & Conditions (“Terms”) govern your access to and use of our website, services, and any related content (collectively, the “Services”). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree, please do not use our Services.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">2. Use of Services</h2>
            <p className="mt-3">
              You may use our Services only for lawful purposes and in accordance with these Terms. You agree not to use our Services in any way that could disable, overburden, damage, or impair the site or interfere with any other party’s use of the Services.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">3. Intellectual Property</h2>
            <p className="mt-3">
              All content, trademarks, logos, and intellectual property displayed on our Services are the property of {COMPANY.legal} or its licensors. You may not reproduce, distribute, modify, or create derivative works of any materials without our prior written consent.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">4. Disclaimer of Warranties</h2>
            <p className="mt-3">
              Our Services are provided on an “as is” and “as available” basis without warranties of any kind, either express or implied. We do not warrant that the Services will be uninterrupted, secure, or error-free.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">5. Limitation of Liability</h2>
            <p className="mt-3">
              To the fullest extent permitted by applicable law, {COMPANY.legal} shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Services.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">6. Indemnification</h2>
            <p className="mt-3">
              You agree to indemnify and hold harmless {COMPANY.legal} and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, or expenses arising out of your use of the Services or violation of these Terms.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">7. Governing Law</h2>
            <p className="mt-3">
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">8. Changes to Terms</h2>
            <p className="mt-3">
              We may revise these Terms from time to time. The most current version will always be posted on this page. By continuing to use our Services after changes become effective, you agree to be bound by the revised Terms.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">9. Contact</h2>
            <p className="mt-3">
              If you have any questions about these Terms, please contact us at{" "}
              <a href={`mailto:${COMPANY.email}`} className="text-electric hover:underline">{COMPANY.email}</a>.
            </p>
          </div>

          <div className="pt-6 border-t border-white/5">
            <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-cta px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

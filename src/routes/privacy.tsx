import { createFileRoute, Link } from "@tanstack/react-router";
import { COMPANY } from "@/lib/content";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: `Privacy Policy — ${COMPANY.name}` },
      { name: "description", content: `Privacy policy for ${COMPANY.legal}. How we collect, use, and protect your personal information.` },
      { property: "og:title", content: `Privacy Policy — ${COMPANY.name}` },
      { property: "og:description", content: `Privacy policy for ${COMPANY.legal}. How we collect, use, and protect your personal information.` },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
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
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
      </section>

      <section className="relative pb-32">
        <div className="mx-auto max-w-4xl px-6 space-y-12 text-sm leading-relaxed text-muted-foreground">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">1. Introduction</h2>
            <p className="mt-3">
              {COMPANY.legal} (“we,” “our,” or “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website or use our services.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">2. Information We Collect</h2>
            <p className="mt-3">
              We may collect personal information that you voluntarily provide to us, such as your name, email address, phone number, and company details when you contact us or subscribe to our communications. We may also collect non-personal information such as browser type, device information, and usage data through cookies and analytics tools.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">3. How We Use Your Information</h2>
            <p className="mt-3">
              We use the information we collect to respond to your inquiries, provide our services, improve our website, send you relevant communications, and comply with legal obligations. We do not sell your personal information to third parties.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">4. Sharing of Information</h2>
            <p className="mt-3">
              We may share your information with trusted service providers who assist us in operating our website and delivering our services, subject to confidentiality obligations. We may also disclose information if required by law or to protect our rights and safety.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">5. Data Security</h2>
            <p className="mt-3">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is completely secure.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">6. Your Rights</h2>
            <p className="mt-3">
              You have the right to access, correct, update, or delete your personal information. To exercise these rights, please contact us at{" "}
              <a href={`mailto:${COMPANY.email}`} className="text-electric hover:underline">{COMPANY.email}</a>.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">7. Cookies</h2>
            <p className="mt-3">
              Our website may use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and understand user behavior. You can control cookies through your browser settings.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">8. Third-Party Links</h2>
            <p className="mt-3">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review their privacy policies.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">9. Changes to This Policy</h2>
            <p className="mt-3">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">10. Contact Us</h2>
            <p className="mt-3">
              If you have any questions or concerns about this Privacy Policy, please contact us at{" "}
              <a href={`mailto:${COMPANY.email}`} className="text-electric hover:underline">{COMPANY.email}</a>{" "}
              or write to us at {COMPANY.address}.
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

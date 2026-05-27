import { createFileRoute } from "@tanstack/react-router";
import { AISection, CTASection, CasesSection, Hero, IndustriesSection, ServicesSection, StatsSection, TestimonialsSection, TimelineSection, WhySection } from "@/components/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LAAXX Consulting — AI, Cloud, Cyber & Digital Engineering" },
      { name: "description", content: "LAAXX Consulting helps enterprises transform with AI, Cloud, Cybersecurity and Digital Engineering. Senior practitioners, AI-first delivery." },
      { property: "og:title", content: "LAAXX Consulting" },
      { property: "og:description", content: "Engineering the future of enterprise transformation." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <StatsSection />
      <ServicesSection />
      <IndustriesSection />
      <AISection />
      <TimelineSection />
      <CasesSection />
      <WhySection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}

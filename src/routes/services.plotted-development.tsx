import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import projectValley from "@/assets/project-valley.jpg";
import projectKr from "@/assets/project-kr.jpg";
import heroVilla from "@/assets/hero-villa.jpg";

const TITLE = "Plotted Development";
const TAGLINE = "Master-planned residential plots ready to build your dream on.";

export const Route = createFileRoute("/services/plotted-development")({
  head: () => ({
    meta: [
      { title: `${TITLE} | Vinra Group` },
      { name: "description", content: TAGLINE },
      { property: "og:title", content: `${TITLE} | Vinra Group` },
      { property: "og:description", content: TAGLINE },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ServicePageLayout
      slug="plotted-development"
      title={TITLE}
      tagline={TAGLINE}
      intro="We create thoughtfully master-planned plotted communities with clear titles, approved layouts, and world-class infrastructure — giving you the freedom to design and build your own home on a foundation of trust."
      heroImg={projectValley}
      gallery={[projectValley, projectKr, heroVilla]}
      features={[
        "DTCP / RERA approved layouts",
        "Clear titles & khata guarantee",
        "Wide black-top roads with street lighting",
        "Underground utilities & drainage",
        "Landscaped parks and open spaces",
        "Gated community with 24×7 security",
      ]}
      process={[
        { step: "Land Acquisition", detail: "Sourcing prime, dispute-free parcels with strong appreciation potential." },
        { step: "Approvals & Zoning", detail: "End-to-end statutory approvals from local planning authorities." },
        { step: "Master Planning", detail: "Layouts designed around light, air, mobility and community life." },
        { step: "Infrastructure Delivery", detail: "Roads, drainage, utilities and landscaping built to spec." },
      ]}
    />
  );
}

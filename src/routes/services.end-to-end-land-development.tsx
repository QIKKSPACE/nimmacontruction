import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import projectValley from "@/assets/project-valley.jpg";
import construction1 from "@/assets/construction-1.jpg";
import heroVilla from "@/assets/hero-villa.jpg";

const TITLE = "End-to-End Land Development";
const TAGLINE = "One accountable partner, from raw land to a fully serviced community.";

export const Route = createFileRoute("/services/end-to-end-land-development")({
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
      slug="end-to-end-land-development"
      title={TITLE}
      tagline={TAGLINE}
      intro="Combine every capability we offer into a single, turnkey engagement. From acquisition and approvals to infrastructure and handover, we take a raw parcel and deliver a fully serviced, sale-ready community."
      heroImg={projectValley}
      gallery={[projectValley, construction1, heroVilla]}
      features={[
        "Land sourcing & due diligence",
        "Statutory approvals & liaisoning",
        "Master planning & architecture",
        "Full civil & MEP infrastructure",
        "Landscape & amenity build-out",
        "Marketing, sales & handover support",
      ]}
      process={[
        { step: "Feasibility", detail: "Technical, legal and financial feasibility of the parcel." },
        { step: "Approvals", detail: "DTCP, RERA and local body sanctions." },
        { step: "Execution", detail: "Infrastructure, landscape and amenity construction." },
        { step: "Handover & Support", detail: "Sale, registration and post-handover management." },
      ]}
    />
  );
}

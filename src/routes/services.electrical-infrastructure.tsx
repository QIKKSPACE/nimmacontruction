import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import heroVilla from "@/assets/hero-villa.jpg";
import projectValley from "@/assets/project-valley.jpg";
import interior2 from "@/assets/interior-2.jpg";

const TITLE = "Electrical Infrastructure";
const TAGLINE = "Power that is safe, coded and future-ready.";

export const Route = createFileRoute("/services/electrical-infrastructure")({
  head: () => ({
    meta: [
      { title: `${TITLE} | Nimma Metro` },
      { name: "description", content: TAGLINE },
      { property: "og:title", content: `${TITLE} | Nimma Metro` },
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
      slug="electrical-infrastructure"
      title={TITLE}
      tagline={TAGLINE}
      intro="From HT feeders and transformers to LT distribution, street lighting and smart metering — we deliver end-to-end electrical infrastructure that meets IE Rules and utility standards."
      heroImg={heroVilla}
      gallery={[heroVilla, projectValley, interior2]}
      features={[
        "HT feeder line & transformer yards",
        "LT distribution panels & cabling",
        "Solar-ready street lighting",
        "EV charging provisions",
        "Individual smart meters",
        "Earthing & lightning protection",
      ]}
      process={[
        { step: "Load Analysis", detail: "Sanctioned load calculation with utility coordination." },
        { step: "Sub-station Setup", detail: "Transformer, HT panels and yard construction." },
        { step: "LT Distribution", detail: "Underground cabling, feeder pillars and metering." },
        { step: "Testing & Energisation", detail: "Insulation, earthing tests and utility handover." },
      ]}
    />
  );
}

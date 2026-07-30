import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import img1 from "@/assets/svc/electrical-1.jpg";
import img2 from "@/assets/svc/electrical-2.jpg";
import img3 from "@/assets/svc/electrical-3.jpg";

const TITLE = "Electrical Infrastructure";
const TAGLINE = "Power that is safe, coded and future-ready.";

export const Route = createFileRoute("/services/electrical-infrastructure")({
  head: () => ({
    meta: [
      { title: `${TITLE} | Nimmametro Constructions` },
      { name: "description", content: TAGLINE },
      { property: "og:title", content: `${TITLE} | Nimmametro Constructions` },
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
      heroImg={img1}
      gallery={[img1, img2, img3]}
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

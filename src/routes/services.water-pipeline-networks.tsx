import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import projectKr from "@/assets/project-kr.jpg";
import projectVss from "@/assets/project-vss.jpg";
import construction2 from "@/assets/construction-2.jpg";

const TITLE = "Water Pipeline Networks";
const TAGLINE = "Reliable pressurised water on tap, to every plot and every home.";

export const Route = createFileRoute("/services/water-pipeline-networks")({
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
      slug="water-pipeline-networks"
      title={TITLE}
      tagline={TAGLINE}
      intro="We design and lay complete potable and non-potable water networks — pump houses, overhead tanks, ring mains and service connections — engineered for pressure, purity and zero leakage."
      heroImg={projectKr}
      gallery={[projectKr, projectVss, construction2]}
      features={[
        "HDPE / DI ring main networks",
        "Overhead tanks & sump systems",
        "Booster pumps & pressure control",
        "Individual metered connections",
        "STP treated water reticulation",
        "Leak detection and pressure testing",
      ]}
      process={[
        { step: "Demand Study", detail: "Sizing based on population, plot count and usage norms." },
        { step: "Network Design", detail: "Hydraulic simulation for pressure at every node." },
        { step: "Trenching & Laying", detail: "Pipes bedded, jointed and pressure tested." },
        { step: "Commissioning", detail: "Chlorination, flushing and handover to residents." },
      ]}
    />
  );
}

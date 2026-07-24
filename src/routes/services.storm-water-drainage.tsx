import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import construction3 from "@/assets/construction-3.jpg";
import construction1 from "@/assets/construction-1.jpg";
import projectValley from "@/assets/project-valley.jpg";

const TITLE = "Storm Water Drainage";
const TAGLINE = "Engineered drainage that keeps communities dry through the heaviest monsoon.";

export const Route = createFileRoute("/services/storm-water-drainage")({
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
      slug="storm-water-drainage"
      title={TITLE}
      tagline={TAGLINE}
      intro="Water is the number one enemy of urban infrastructure. We design and build storm water systems — from catchment analysis to recharge pits — that protect roads, homes and the water table alike."
      heroImg={construction3}
      gallery={[construction3, construction1, projectValley]}
      features={[
        "Hydrological catchment analysis",
        "RCC / precast drain channels",
        "Silt traps and gratings",
        "Cross-drainage culverts",
        "Recharge pits & harvesting wells",
        "Outfall to natural water bodies",
      ]}
      process={[
        { step: "Runoff Study", detail: "Calculating peak flows for 25-year storm events." },
        { step: "Network Design", detail: "Sizing channels, gradients and outfalls." },
        { step: "Construction", detail: "Cast-in-situ or precast drains with tight quality control." },
        { step: "Commissioning", detail: "Flow testing and integration with recharge structures." },
      ]}
    />
  );
}

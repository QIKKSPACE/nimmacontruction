import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import img1 from "@/assets/svc/water-1.jpg";
import img2 from "@/assets/svc/water-2.jpg";
import img3 from "@/assets/svc/water-3.jpg";

const TITLE = "Water Supply Line Installation";
const TAGLINE = "Well-planned water supply infrastructure for layouts.";

export const Route = createFileRoute("/services/water-supply-line-installation")({
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
      slug="water-supply-line-installation"
      title={TITLE}
      tagline={TAGLINE}
      intro="Providing well-planned water supply infrastructure for layouts with efficient pipeline networks, proper distribution systems, and reliable water connectivity to every plot. Our solutions ensure smooth water flow, long-term durability, and essential utility support for residential and farmland developments."
      heroImg={img1}
      gallery={[img1, img2, img3]}
      features={[
        "Efficient pipeline network planning",
        "Proper distribution systems",
        "Reliable plot-level water connectivity",
        "Durable, long-lasting piping",
        "Leak-proof jointing and valves",
        "Integration with storage tanks"
      ]}
      process={[]}
    />
  );
}

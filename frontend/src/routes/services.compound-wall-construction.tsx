import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import img1 from "@/assets/svc/wall-1.jpg";
import img2 from "@/assets/svc/wall-2.jpg";
import img3 from "@/assets/svc/wall-3.jpg";

const TITLE = "Compound Wall Construction";
const TAGLINE = "The strong, elegant boundary that defines your community.";

export const Route = createFileRoute("/services/compound-wall-construction")({
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
      slug="compound-wall-construction"
      title={TITLE}
      tagline={TAGLINE}
      intro="A compound wall is the first thing anyone sees. We build boundary walls that combine structural strength with clean architectural detailing — precast, masonry or RCC — around plots, layouts and estates."
      heroImg={img1}
      gallery={[img1, img2, img3]}
      features={[
        "Precast panel walls (fast track)",
        "Random rubble & block masonry",
        "RCC retaining walls",
        "Architectural entrance gateways",
        "Anti-climb copings & finials",
        "Long-life exterior finishes",
      ]}
      process={[
        { step: "Boundary Survey", detail: "Verifying legal boundaries against title documents." },
        { step: "Foundation", detail: "Isolated / strip footings suited to soil conditions." },
        { step: "Wall Construction", detail: "Masonry or precast erection with plumb control." },
        { step: "Finishing", detail: "Plaster, painting and coping to a durable finish." },
      ]}
    />
  );
}

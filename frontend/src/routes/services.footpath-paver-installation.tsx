import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import img1 from "@/assets/svc/roads-1.jpg";
import img2 from "@/assets/svc/roads-2.jpg";
import img3 from "@/assets/svc/roads-3.jpg";

const TITLE = "Footpath & Paver Installation";
const TAGLINE = "Pedestrian pathways & paver block installation for layouts.";

export const Route = createFileRoute("/services/footpath-paver-installation")({
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
      slug="footpath-paver-installation"
      title={TITLE}
      tagline={TAGLINE}
      intro="Creating well-designed pedestrian pathways and open spaces with high-quality paver blocks, ensuring safety, accessibility, and aesthetic appeal across plotted developments. Our footpath solutions include proper leveling, durable paver installation, edge finishing, and integration with landscape areas to provide smooth walkways and enhance the overall look and functionality of residential layouts and farmland projects."
      heroImg={img1}
      gallery={[img1, img2, img3]}
      features={[
        "High-quality paver blocks",
        "Proper leveling & base prep",
        "Durable installation & edge finishing",
        "Landscape integration"
      ]}
      process={[]}
    />
  );
}

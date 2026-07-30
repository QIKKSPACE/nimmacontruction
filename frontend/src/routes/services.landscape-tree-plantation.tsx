import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import img1 from "@/assets/svc/landscape-1.jpg";
import img2 from "@/assets/svc/landscape-2.jpg";
import img3 from "@/assets/svc/landscape-3.jpg";

const TITLE = "Landscape & Tree Plantation";
const TAGLINE = "Green cover that turns land into a living, breathing community.";

export const Route = createFileRoute("/services/landscape-tree-plantation")({
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
      slug="landscape-tree-plantation"
      title={TITLE}
      tagline={TAGLINE}
      intro="Great landscapes take years — start right on day one. Our horticulturists plan avenues, parks and buffer greens with the right native species, irrigation and long-term maintenance in mind."
      heroImg={img1}
      gallery={[img1, img2, img3]}
      features={[
        "Native & flowering avenue trees",
        "Themed parks and play greens",
        "Drip and sprinkler irrigation",
        "Lawn establishment & upkeep",
        "Hardscape: pathways, benches, gazebos",
        "Post-plantation maintenance",
      ]}
      process={[
        { step: "Landscape Master Plan", detail: "Zoning greens with architects and hydrologists." },
        { step: "Soil Prep", detail: "Enrichment, drainage and pit preparation." },
        { step: "Plantation", detail: "Species selection matched to climate and soil." },
        { step: "Maintenance", detail: "12–24 month care to guarantee healthy establishment." },
      ]}
    />
  );
}

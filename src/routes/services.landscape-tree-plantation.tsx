import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import interior1 from "@/assets/interior-1.jpg";
import projectValley from "@/assets/project-valley.jpg";
import projectKr from "@/assets/project-kr.jpg";

const TITLE = "Landscape & Tree Plantation";
const TAGLINE = "Green cover that turns land into a living, breathing community.";

export const Route = createFileRoute("/services/landscape-tree-plantation")({
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
      slug="landscape-tree-plantation"
      title={TITLE}
      tagline={TAGLINE}
      intro="Great landscapes take years — start right on day one. Our horticulturists plan avenues, parks and buffer greens with the right native species, irrigation and long-term maintenance in mind."
      heroImg={interior1}
      gallery={[interior1, projectValley, projectKr]}
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

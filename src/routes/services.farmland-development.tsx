import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import projectVss from "@/assets/project-vss.jpg";
import projectValley from "@/assets/project-valley.jpg";
import construction3 from "@/assets/construction-3.jpg";

const TITLE = "Farmland Development";
const TAGLINE = "Weekend farmlands that combine nature, agriculture and long-term value.";

export const Route = createFileRoute("/services/farmland-development")({
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
      slug="farmland-development"
      title={TITLE}
      tagline={TAGLINE}
      intro="Own a piece of the countryside without the hassle. Our managed farmland communities blend agroforestry, organic farming and gated infrastructure — a serene escape and a smart appreciating asset."
      heroImg={projectVss}
      gallery={[projectVss, projectValley, construction3]}
      features={[
        "Managed agroforestry & fruit orchards",
        "Drip-irrigated plantations",
        "Farmhouse-ready parcels",
        "Solar-powered common utilities",
        "Rainwater harvesting ponds",
        "Weekend clubhouse & stay pods",
      ]}
      process={[
        { step: "Soil & Water Study", detail: "Detailed feasibility of the land for horticulture and living." },
        { step: "Layout Planning", detail: "Optimised parcels with shared amenities and green buffers." },
        { step: "Plantation Setup", detail: "Sapling selection, planting and irrigation network installation." },
        { step: "Ongoing Management", detail: "Optional farm-management service so your land keeps producing." },
      ]}
    />
  );
}

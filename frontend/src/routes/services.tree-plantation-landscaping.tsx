import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import img1 from "@/assets/svc/tree-plantation-1.jpeg";
import img2 from "@/assets/svc/tree-plantation-2.png";
import img3 from "@/assets/svc/tree-plantation-3.png";

const TITLE = "Tree Plantation & Landscaping";
const TAGLINE = "Avenue tree plantations & garden landscaping for developments.";

export const Route = createFileRoute("/services/tree-plantation-landscaping")({
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
      slug="tree-plantation-landscaping"
      title={TITLE}
      tagline={TAGLINE}
      intro="Creating beautiful and sustainable green environments for plotted developments through planned tree plantation, landscape design, and greenery solutions. Our landscaping services include avenue plantations, garden development, lawn areas, and green zones that enhance the aesthetics, improve the environment, and create a healthier living experience for residential layouts and farmland projects."
      heroImg={img1}
      gallery={[img1, img2, img3]}
      features={[
        "Avenue tree plantations",
        "Garden development",
        "Lawn areas",
        "Sustainable green zones"
      ]}
      process={[]}
    />
  );
}

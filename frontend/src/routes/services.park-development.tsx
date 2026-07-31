import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import img1 from "@/assets/svc/park-1.jpg";
import img2 from "@/assets/svc/park-2.jpg";
import img3 from "@/assets/svc/park-3.jpg";

const TITLE = "Park Development";
const TAGLINE = "Green recreational parks, play zones, and community open spaces.";

export const Route = createFileRoute("/services/park-development")({
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
      slug="park-development"
      title={TITLE}
      tagline={TAGLINE}
      intro="Designing and developing attractive green spaces within plotted layouts with thoughtfully planned parks, walking areas, play zones, seating spaces, and landscaping features. Our park development solutions enhance community living by creating refreshing, sustainable, and well-maintained recreational spaces that add beauty, value, and a better lifestyle experience to residential and farmland developments."
      heroImg={img1}
      gallery={[img1, img2, img3]}
      features={[
        "Thoughtfully planned parks",
        "Walking areas & play zones",
        "Seating spaces",
        "Sustainable green spaces"
      ]}
      process={[]}
    />
  );
}

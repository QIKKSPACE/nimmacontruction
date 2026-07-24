import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import img1 from "@/assets/svc/leveling-1.jpg";
import img2 from "@/assets/svc/leveling-2.jpg";
import img3 from "@/assets/svc/leveling-3.jpg";

const TITLE = "Land Leveling & Site Preparation";
const TAGLINE = "The invisible groundwork that makes great projects possible.";

export const Route = createFileRoute("/services/land-leveling-site-preparation")({
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
      slug="land-leveling-site-preparation"
      title={TITLE}
      tagline={TAGLINE}
      intro="Every successful development starts below the surface. Our teams handle contour analysis, cut-and-fill, clearing, grading and compaction to deliver a stable, buildable canvas — on time and to spec."
      heroImg={img1}
      gallery={[img1, img2, img3]}
      features={[
        "Topographic & contour surveys",
        "Vegetation clearance & de-rooting",
        "Precision cut-and-fill grading",
        "Soil stabilisation & compaction",
        "Erosion control measures",
        "Machinery for any scale of site",
      ]}
      process={[
        { step: "Site Assessment", detail: "Detailed survey and soil tests to plan earthwork volumes." },
        { step: "Clearing", detail: "Removal of vegetation, debris and obstructions." },
        { step: "Grading", detail: "Cut, fill and level to the designed finished ground level." },
        { step: "Compaction", detail: "Layered compaction to achieve target density values." },
      ]}
    />
  );
}

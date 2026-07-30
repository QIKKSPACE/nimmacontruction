import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import img1 from "@/assets/svc/drainage-1.jpg";
import img2 from "@/assets/svc/drainage-2.jpg";
import img3 from "@/assets/svc/drainage-3.jpg";

const TITLE = "Underground Sewerage (UGD) Works";
const TAGLINE = "Hygienic underground sewerage systems & chambers for layouts.";

export const Route = createFileRoute("/services/underground-sewerage-ugd-works")({
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
      slug="underground-sewerage-ugd-works"
      title={TITLE}
      tagline={TAGLINE}
      intro="Developing efficient underground sewerage systems for plotted layouts with properly designed pipelines, chambers, and drainage connections. Our UGD solutions ensure hygienic waste management, improved sanitation, and reliable infrastructure for sustainable residential and farmland developments."
      heroImg={img1}
      gallery={[img1, img2, img3]}
      features={[
        "Efficient pipeline design",
        "Durable chamber construction",
        "Hygienic waste management",
        "Reliable drainage connections"
      ]}
      process={[]}
    />
  );
}

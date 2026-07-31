import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import img1 from "@/assets/svc/rcc-drainage-1.jpg";
import img2 from "@/assets/svc/rcc-drainage-2.jpg";
import img3 from "@/assets/svc/rcc-drainage-3.jpg";
import img4 from "@/assets/svc/rcc-drainage-4.png";

const TITLE = "RCC Drainage Works";
const TAGLINE = "Robust RCC drainage solutions for plotted developments.";

export const Route = createFileRoute("/services/rcc-drainage-works")({
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
      slug="rcc-drainage-works"
      title={TITLE}
      tagline={TAGLINE}
      intro="Providing robust RCC drainage solutions for plotted developments, ensuring efficient rainwater flow, proper water management, and durable infrastructure for well-planned communities."
      heroImg={img1}
      gallery={[img1, img2, img3, img4]}
      features={[
        "Customized RCC drain channels",
        "High-capacity rainwater management",
        "Durable precast structures",
        "Integrated catch basins & grates",
        "Optimal slopes for natural flow",
        "Long-lasting underground piping"
      ]}
      process={[]}
    />
  );
}

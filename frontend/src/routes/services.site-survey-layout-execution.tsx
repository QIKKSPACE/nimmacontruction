import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import img1 from "@/assets/svc/survey-1.jpg";
import img2 from "@/assets/svc/survey-2.jpg";
import img3 from "@/assets/svc/survey-3.jpg";

const TITLE = "Site Survey & Layout Execution";
const TAGLINE = "Precision on the ground — where every millimetre matters.";

export const Route = createFileRoute("/services/site-survey-layout-execution")({
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
      slug="site-survey-layout-execution"
      title={TITLE}
      tagline={TAGLINE}
      intro="Modern survey instruments, meticulous documentation and disciplined execution. We translate approved drawings into perfectly marked layouts on site so construction begins on solid, coordinated data."
      heroImg={img1}
      gallery={[img1, img2, img3]}
      features={[
        "DGPS & Total Station surveys",
        "Contour & topographical mapping",
        "Plot marking & pillar fixing",
        "Setting-out for roads and utilities",
        "As-built survey documentation",
        "Boundary demarcation certificates",
      ]}
      process={[
        { step: "Instrument Survey", detail: "High-accuracy Total Station / DGPS observations." },
        { step: "Coordinate Grid", detail: "Establishing local grid and benchmarks." },
        { step: "Layout Marking", detail: "Physical marking of plots, roads and services." },
        { step: "Verification", detail: "Cross-checks against drawings and approvals." },
      ]}
    />
  );
}

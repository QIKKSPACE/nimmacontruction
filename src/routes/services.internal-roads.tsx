import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import construction2 from "@/assets/construction-2.jpg";
import construction1 from "@/assets/construction-1.jpg";
import projectKr from "@/assets/project-kr.jpg";

const TITLE = "Internal Roads";
const TAGLINE = "Durable, well-engineered roads that shape the everyday experience.";

export const Route = createFileRoute("/services/internal-roads")({
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
      slug="internal-roads"
      title={TITLE}
      tagline={TAGLINE}
      intro="From granular sub-base to the final wearing coat, we build internal roads that last decades — engineered for drainage, traffic loads and the character of the community they serve."
      heroImg={construction2}
      gallery={[construction2, construction1, projectKr]}
      features={[
        "WMM / GSB sub-base construction",
        "Bituminous & concrete carriageways",
        "Kerb stones and paver footpaths",
        "Speed tables & traffic calming",
        "Reflective road markings & signage",
        "Integrated drainage inlets",
      ]}
      process={[
        { step: "Alignment & Levels", detail: "Setting road centre-lines, camber and finished levels." },
        { step: "Sub-grade Prep", detail: "Rolling and compaction of native soil." },
        { step: "Base Courses", detail: "GSB and WMM layers laid and compacted to spec." },
        { step: "Wearing Coat", detail: "Bituminous or concrete surface with markings and kerbs." },
      ]}
    />
  );
}

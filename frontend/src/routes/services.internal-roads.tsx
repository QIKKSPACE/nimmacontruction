import { ServicePageLayout } from "@/components/ServicePageLayout";
import img1 from "@/assets/svc/roads-1.jpg";
import img2 from "@/assets/svc/roads-2.jpg";
import img3 from "@/assets/svc/roads-3.jpg";

const TITLE = "Internal Roads";
const TAGLINE = "Durable, well-engineered roads that shape the everyday experience.";



export default function Page() {
  return (
    <ServicePageLayout
      slug="internal-roads"
      title={TITLE}
      tagline={TAGLINE}
      intro="From granular sub-base to the final wearing coat, we build internal roads that last decades — engineered for drainage, traffic loads and the character of the community they serve."
      heroImg={img1}
      gallery={[img1, img2, img3]}
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

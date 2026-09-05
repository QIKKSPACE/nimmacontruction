import { ServicePageLayout } from "@/components/ServicePageLayout";
import img1 from "@/assets/svc/Entrance Arch Design-1.jpeg";
import img2 from "@/assets/svc/Entrance Arch Design-2.jpeg";
import img3 from "@/assets/svc/Entrance Arch Design-3.jpeg";
import img4 from "@/assets/svc/Entrance Arch Design-4.jpeg";

const TITLE = "Entrance Arch Design & Construction";
const TAGLINE = "Architectural landmark entrance arches & gateway construction.";



export default function Page() {
  return (
    <ServicePageLayout
      slug="entrance-arch-design-construction"
      title={TITLE}
      tagline={TAGLINE}
      intro="Creating attractive and landmark entrance arches for plotted developments that enhance project identity and create a welcoming first impression. Our solutions include architectural design, structural development, branding elements, and durable construction to deliver a premium entry experience for residential layouts and farmland projects."
      heroImg={img1}
      gallery={[img1, img2, img3, img4]}
      features={[
        "Architectural design",
        "Structural development",
        "Branding elements",
        "Premium entry experience"
      ]}
      process={[]}
    />
  );
}

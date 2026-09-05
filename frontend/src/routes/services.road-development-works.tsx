import { ServicePageLayout } from "@/components/ServicePageLayout";
import img1 from "@/assets/svc/roads-1.jpg";
import img2 from "@/assets/svc/roads-2.jpg";
import img3 from "@/assets/svc/roads-3.jpg";

const TITLE = "Road Development Works";
const TAGLINE = "Durable tar, asphalt, and CC internal roads for layouts.";



export default function Page() {
  return (
    <ServicePageLayout
      slug="road-development-works"
      title={TITLE}
      tagline={TAGLINE}
      intro="We provide comprehensive road development solutions for plotted developments, focusing on durable, safe, and well-connected internal road networks. Our expertise includes tar roads (bitumen roads), asphalt roads, and CC roads (cement concrete roads) designed to withstand regular usage and changing weather conditions. From proper road planning and leveling to base preparation, drainage integration, and final surface finishing, we ensure smooth movement, better accessibility, and long-lasting infrastructure for residential layouts and farmland developments. Our quality-driven approach creates well-structured roads that enhance the overall value and usability of the project."
      heroImg={img1}
      gallery={[img1, img2, img3]}
      features={[
        "Tar, asphalt, and CC roads",
        "Road planning & leveling",
        "Base preparation",
        "Final surface finishing"
      ]}
      process={[]}
    />
  );
}

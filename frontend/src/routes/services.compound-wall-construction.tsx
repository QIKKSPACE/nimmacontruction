import { ServicePageLayout } from "@/components/ServicePageLayout";
import img1 from "@/assets/svc/compound-wall-1.png";
import img2 from "@/assets/svc/compound-wall-2.png";
import img3 from "@/assets/svc/compound-wall-3.png";

const TITLE = "Compound Wall Construction";
const TAGLINE = "Durable precast & hollow block boundary walls for layout security.";



export default function Page() {
  return (
    <ServicePageLayout
      slug="compound-wall-construction"
      title={TITLE}
      tagline={TAGLINE}
      intro="Providing durable and secure boundary solutions for plotted developments using hollow block walls and precast concrete walls. Our compound wall construction ensures strong protection, clear site demarcation, and enhanced project aesthetics with quality materials, proper alignment, and long-lasting finishes for residential layouts and farmland developments."
      heroImg={img1}
      gallery={[img1, img2, img3]}
      features={[
        "Precast & hollow block walls",
        "Strong boundary protection",
        "Clear site demarcation",
        "Long-lasting finishes"
      ]}
      process={[]}
    />
  );
}

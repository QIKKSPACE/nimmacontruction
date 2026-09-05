import { ServicePageLayout } from "@/components/ServicePageLayout";
import img1 from "@/assets/svc/electrical-1.jpg";
import img2 from "@/assets/svc/electrical-2.jpg";
import img3 from "@/assets/svc/electrical-3.jpg";

const TITLE = "Electrical Infrastructure";
const TAGLINE = "Complete electrical power distribution & street lighting networks.";



export default function Page() {
  return (
    <ServicePageLayout
      slug="electrical-infrastructure"
      title={TITLE}
      tagline={TAGLINE}
      intro="Providing complete electrical infrastructure solutions for plotted developments, including underground cabling, electrical poles, street lighting, and power distribution networks. We ensure safe, reliable, and efficient electricity connectivity to every plot with well-planned systems for modern communities."
      heroImg={img1}
      gallery={[img1, img2, img3]}
      features={[
        "Underground cabling",
        "Electrical pole installation",
        "Street lighting networks",
        "Power distribution systems"
      ]}
      process={[]}
    />
  );
}

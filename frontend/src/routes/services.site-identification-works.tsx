import { ServicePageLayout } from "@/components/ServicePageLayout";
import img1 from "@/assets/svc/site-identification-1.png";
import img2 from "@/assets/svc/site-identification-2.png";
import img3 from "@/assets/svc/site-identification-3.png";

const TITLE = "Site Identification Works";
const TAGLINE = "Professional plot number boards & site identification signage.";



export default function Page() {
  return (
    <ServicePageLayout
      slug="site-identification-works"
      title={TITLE}
      tagline={TAGLINE}
      intro="Providing professional plot identification solutions for plotted developments through plot number boards, name boards, and site identification signage. Our services ensure clear visibility, easy plot navigation, and a well-organized layout presentation, enhancing customer experience and project branding."
      heroImg={img1}
      gallery={[img1, img2, img3]}
      features={[
        "Plot number boards",
        "Site identification signage",
        "Clear visibility markers",
        "Professional branding"
      ]}
      process={[]}
      imagePosition="object-top"
    />
  );
}

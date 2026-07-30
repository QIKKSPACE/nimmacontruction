import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import img1 from "@/assets/svc/survey-1.jpg";
import img2 from "@/assets/svc/survey-2.jpg";
import img3 from "@/assets/svc/survey-3.jpg";

const TITLE = "Site Identification Works";
const TAGLINE = "Professional plot number boards & site identification signage.";

export const Route = createFileRoute("/services/site-identification-works")({
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
    />
  );
}

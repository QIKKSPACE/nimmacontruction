import { ServicePageLayout } from "@/components/ServicePageLayout";
import img1 from "@/assets/svc/farmland-1.jpg";
import img2 from "@/assets/svc/farmland-2.jpg";
import img3 from "@/assets/svc/farmland-3.jpg";

const TITLE = "Farmland Development";
const TAGLINE = "Weekend farmlands that combine nature, agriculture and long-term value.";



export default function Page() {
  return (
    <ServicePageLayout
      slug="farmland-development"
      title={TITLE}
      tagline={TAGLINE}
      intro="Own a piece of the countryside without the hassle. Our managed farmland communities blend agroforestry, organic farming and gated infrastructure — a serene escape and a smart appreciating asset."
      heroImg={img1}
      gallery={[img1, img2, img3]}
      features={[
        "Managed agroforestry & fruit orchards",
        "Drip-irrigated plantations",
        "Farmhouse-ready parcels",
        "Solar-powered common utilities",
        "Rainwater harvesting ponds",
        "Weekend clubhouse & stay pods",
      ]}
      process={[
        { step: "Soil & Water Study", detail: "Detailed feasibility of the land for horticulture and living." },
        { step: "Layout Planning", detail: "Optimised parcels with shared amenities and green buffers." },
        { step: "Plantation Setup", detail: "Sapling selection, planting and irrigation network installation." },
        { step: "Ongoing Management", detail: "Optional farm-management service so your land keeps producing." },
      ]}
    />
  );
}

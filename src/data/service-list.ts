import projectValley from "@/assets/project-valley.jpg";
import projectVss from "@/assets/project-vss.jpg";
import projectKr from "@/assets/project-kr.jpg";
import construction1 from "@/assets/construction-1.jpg";
import construction2 from "@/assets/construction-2.jpg";
import construction3 from "@/assets/construction-3.jpg";
import interior1 from "@/assets/interior-1.jpg";
import interior3 from "@/assets/interior-3.jpg";
import heroVilla from "@/assets/hero-villa.jpg";

export type ServiceListItem = {
  slug: string;
  title: string;
  tagline: string;
  img: string;
  to:
    | "/services/plotted-development"
    | "/services/farmland-development"
    | "/services/land-leveling-site-preparation"
    | "/services/internal-roads"
    | "/services/storm-water-drainage"
    | "/services/water-pipeline-networks"
    | "/services/electrical-infrastructure"
    | "/services/compound-wall-construction"
    | "/services/landscape-tree-plantation"
    | "/services/site-survey-layout-execution"
    | "/services/end-to-end-land-development";
};

export const serviceList: ServiceListItem[] = [
  { slug: "plotted-development", to: "/services/plotted-development", title: "Plotted Development", tagline: "Master-planned residential plots ready to build your dream on.", img: projectValley },
  { slug: "farmland-development", to: "/services/farmland-development", title: "Farmland Development", tagline: "Weekend farmlands that combine nature, agriculture and long-term value.", img: projectVss },
  { slug: "land-leveling-site-preparation", to: "/services/land-leveling-site-preparation", title: "Land Leveling & Site Preparation", tagline: "The invisible groundwork that makes great projects possible.", img: construction1 },
  { slug: "internal-roads", to: "/services/internal-roads", title: "Internal Roads", tagline: "Durable, well-engineered roads that shape the everyday experience.", img: construction2 },
  { slug: "storm-water-drainage", to: "/services/storm-water-drainage", title: "Storm Water Drainage", tagline: "Engineered drainage that keeps communities dry through the heaviest monsoon.", img: construction3 },
  { slug: "water-pipeline-networks", to: "/services/water-pipeline-networks", title: "Water Pipeline Networks", tagline: "Reliable pressurised water on tap, to every plot and every home.", img: projectKr },
  { slug: "electrical-infrastructure", to: "/services/electrical-infrastructure", title: "Electrical Infrastructure", tagline: "Power that is safe, coded and future-ready.", img: heroVilla },
  { slug: "compound-wall-construction", to: "/services/compound-wall-construction", title: "Compound Wall Construction", tagline: "The strong, elegant boundary that defines your community.", img: interior3 },
  { slug: "landscape-tree-plantation", to: "/services/landscape-tree-plantation", title: "Landscape & Tree Plantation", tagline: "Green cover that turns land into a living, breathing community.", img: interior1 },
  { slug: "site-survey-layout-execution", to: "/services/site-survey-layout-execution", title: "Site Survey & Layout Execution", tagline: "Precision on the ground — where every millimetre matters.", img: construction2 },
  { slug: "end-to-end-land-development", to: "/services/end-to-end-land-development", title: "End-to-End Land Development", tagline: "One accountable partner, from raw land to a fully serviced community.", img: projectValley },
];

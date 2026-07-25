import plottedImg from "@/assets/svc/plotted-1.jpg";
import farmlandImg from "@/assets/svc/farmland-1.jpg";
import levelingImg from "@/assets/svc/leveling-1.jpg";
import roadsImg from "@/assets/svc/roads-1.jpg";
import drainageImg from "@/assets/svc/drainage-1.jpg";
import waterImg from "@/assets/svc/water-1.jpg";
import electricalImg from "@/assets/svc/electrical-1.jpg";
import wallImg from "@/assets/svc/wall-1.jpg";
import landscapeImg from "@/assets/svc/landscape-1.jpg";
import surveyImg from "@/assets/svc/survey-1.jpg";
import endtoendImg from "@/assets/svc/endtoend-1.jpg";

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
  { slug: "plotted-development", to: "/services/plotted-development", title: "Plotted Development", tagline: "Master-planned residential plots ready to build your dream on.", img: plottedImg },
  { slug: "farmland-development", to: "/services/farmland-development", title: "Farmland Development", tagline: "Weekend farmlands that combine nature, agriculture and long-term value.", img: farmlandImg },
  { slug: "land-leveling-site-preparation", to: "/services/land-leveling-site-preparation", title: "Land Leveling & Site Preparation", tagline: "The invisible groundwork that makes great projects possible.", img: levelingImg },
  { slug: "internal-roads", to: "/services/internal-roads", title: "Internal Roads", tagline: "Durable, well-engineered roads that shape the everyday experience.", img: roadsImg },
  { slug: "storm-water-drainage", to: "/services/storm-water-drainage", title: "Storm Water Drainage", tagline: "Engineered drainage that keeps communities dry through the heaviest monsoon.", img: drainageImg },
  { slug: "water-pipeline-networks", to: "/services/water-pipeline-networks", title: "Water Pipeline Networks", tagline: "Reliable pressurised water on tap, to every plot and every home.", img: waterImg },
  { slug: "electrical-infrastructure", to: "/services/electrical-infrastructure", title: "Electrical Infrastructure", tagline: "Power that is safe, coded and future-ready.", img: electricalImg },
  { slug: "compound-wall-construction", to: "/services/compound-wall-construction", title: "Compound Wall Construction", tagline: "The strong, elegant boundary that defines your community.", img: wallImg },
  { slug: "landscape-tree-plantation", to: "/services/landscape-tree-plantation", title: "Landscape & Tree Plantation", tagline: "Green cover that turns land into a living, breathing community.", img: landscapeImg },
  { slug: "site-survey-layout-execution", to: "/services/site-survey-layout-execution", title: "Site Survey & Layout Execution", tagline: "Precision on the ground — where every millimetre matters.", img: surveyImg },
  { slug: "end-to-end-land-development", to: "/services/end-to-end-land-development", title: "End-to-End Land Development", tagline: "One accountable partner, from raw land to a fully serviced community.", img: endtoendImg },
];

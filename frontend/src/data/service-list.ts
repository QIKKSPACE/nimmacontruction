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
  intro: string;
  img: string;
  to: string;
  subItems?: { title: string; desc: string }[];
};

export const serviceList: ServiceListItem[] = [
  {
    slug: "architectural-planning",
    to: "/services/architectural-planning",
    title: "Architectural Planning",
    tagline: "Layout Architecture, Development Planning, Layout Planning & Site Planning.",
    intro: "Creating well-planned layouts with smart space utilization, functional designs, strategic land development planning, optimized roads, amenities, and site potential analysis.",
    img: surveyImg,
    subItems: [
      {
        title: "Layout Architecture",
        desc: "Creating well-planned layouts with smart space utilization, functional designs, and aesthetic development concepts.",
      },
      {
        title: "Development Planning",
        desc: "Strategic planning of land development projects with proper infrastructure, zoning, and sustainable growth solutions.",
      },
      {
        title: "Layout Planning",
        desc: "Designing efficient residential layouts and farmland developments with optimized plots, roads, amenities, and open spaces.",
      },
      {
        title: "Site Planning",
        desc: "Analyzing land potential and planning site elements for better accessibility, functionality, and future development.",
      },
    ],
  },
  {
    slug: "rcc-drainage-works",
    to: "/services/rcc-drainage-works",
    title: "RCC Drainage Works",
    tagline: "Robust RCC drainage solutions for plotted developments.",
    intro: "Providing robust RCC drainage solutions for plotted developments, ensuring efficient rainwater flow, proper water management, and durable infrastructure for well-planned communities.",
    img: drainageImg,
  },
  {
    slug: "water-supply-line-installation",
    to: "/services/water-supply-line-installation",
    title: "Water Supply Line Installation",
    tagline: "Well-planned water supply infrastructure for layouts.",
    intro: "Providing well-planned water supply infrastructure for layouts with efficient pipeline networks, proper distribution systems, and reliable water connectivity to every plot. Our solutions ensure smooth water flow, long-term durability, and essential utility support for residential and farmland developments.",
    img: waterImg,
  },
  {
    slug: "underground-sewerage-ugd-works",
    to: "/services/underground-sewerage-ugd-works",
    title: "Underground Sewerage (UGD) Works",
    tagline: "Hygienic underground sewerage systems & chambers for layouts.",
    intro: "Developing efficient underground sewerage systems for plotted layouts with properly designed pipelines, chambers, and drainage connections. Our UGD solutions ensure hygienic waste management, improved sanitation, and reliable infrastructure for sustainable residential and farmland developments.",
    img: drainageImg,
  },
  {
    slug: "electrical-infrastructure",
    to: "/services/electrical-infrastructure",
    title: "Electrical Infrastructure",
    tagline: "Complete electrical power distribution & street lighting networks.",
    intro: "Providing complete electrical infrastructure solutions for plotted developments, including underground cabling, electrical poles, street lighting, and power distribution networks. We ensure safe, reliable, and efficient electricity connectivity to every plot with well-planned systems for modern communities.",
    img: electricalImg,
  },
  {
    slug: "road-development-works",
    to: "/services/road-development-works",
    title: "Road Development Works",
    tagline: "Durable tar, asphalt, and CC internal roads for layouts.",
    intro: "We provide comprehensive road development solutions for plotted developments, focusing on durable, safe, and well-connected internal road networks. Our expertise includes tar roads (bitumen roads), asphalt roads, and CC roads (cement concrete roads) designed to withstand regular usage and changing weather conditions. From proper road planning and leveling to base preparation, drainage integration, and final surface finishing, we ensure smooth movement, better accessibility, and long-lasting infrastructure for residential layouts and farmland developments. Our quality-driven approach creates well-structured roads that enhance the overall value and usability of the project.",
    img: roadsImg,
  },
  {
    slug: "footpath-paver-installation",
    to: "/services/footpath-paver-installation",
    title: "Footpath & Paver Installation",
    tagline: "Pedestrian pathways & paver block installation for layouts.",
    intro: "Creating well-designed pedestrian pathways and open spaces with high-quality paver blocks, ensuring safety, accessibility, and aesthetic appeal across plotted developments. Our footpath solutions include proper leveling, durable paver installation, edge finishing, and integration with landscape areas to provide smooth walkways and enhance the overall look and functionality of residential layouts and farmland projects.",
    img: roadsImg,
  },
  {
    slug: "park-development",
    to: "/services/park-development",
    title: "Park Development",
    tagline: "Green recreational parks, play zones, and community open spaces.",
    intro: "Designing and developing attractive green spaces within plotted layouts with thoughtfully planned parks, walking areas, play zones, seating spaces, and landscaping features. Our park development solutions enhance community living by creating refreshing, sustainable, and well-maintained recreational spaces that add beauty, value, and a better lifestyle experience to residential and farmland developments.",
    img: landscapeImg,
  },
  {
    slug: "tree-plantation-landscaping",
    to: "/services/tree-plantation-landscaping",
    title: "Tree Plantation & Landscaping",
    tagline: "Avenue tree plantations & garden landscaping for developments.",
    intro: "Creating beautiful and sustainable green environments for plotted developments through planned tree plantation, landscape design, and greenery solutions. Our landscaping services include avenue plantations, garden development, lawn areas, and green zones that enhance the aesthetics, improve the environment, and create a healthier living experience for residential layouts and farmland projects.",
    img: landscapeImg,
  },
  {
    slug: "compound-wall-construction",
    to: "/services/compound-wall-construction",
    title: "Compound Wall Construction",
    tagline: "Durable precast & hollow block boundary walls for layout security.",
    intro: "Providing durable and secure boundary solutions for plotted developments using hollow block walls and precast concrete walls. Our compound wall construction ensures strong protection, clear site demarcation, and enhanced project aesthetics with quality materials, proper alignment, and long-lasting finishes for residential layouts and farmland developments.",
    img: wallImg,
  },
  {
    slug: "site-identification-works",
    to: "/services/site-identification-works",
    title: "Site Identification Works",
    tagline: "Professional plot number boards & site identification signage.",
    intro: "Providing professional plot identification solutions for plotted developments through plot number boards, name boards, and site identification signage. Our services ensure clear visibility, easy plot navigation, and a well-organized layout presentation, enhancing customer experience and project branding.",
    img: surveyImg,
  },
  {
    slug: "entrance-arch-design-construction",
    to: "/services/entrance-arch-design-construction",
    title: "Entrance Arch Design & Construction",
    tagline: "Architectural landmark entrance arches & gateway construction.",
    intro: "Creating attractive and landmark entrance arches for plotted developments that enhance project identity and create a welcoming first impression. Our solutions include architectural design, structural development, branding elements, and durable construction to deliver a premium entry experience for residential layouts and farmland projects.",
    img: endtoendImg,
  },
];

import projectValley from "@/assets/project-valley.jpg";
import projectVss from "@/assets/project-vss.jpg";
import projectKr from "@/assets/project-kr.jpg";
import construction1 from "@/assets/construction-1.jpg";
import construction2 from "@/assets/construction-2.jpg";
import construction3 from "@/assets/construction-3.jpg";
import interior1 from "@/assets/interior-1.jpg";
import interior2 from "@/assets/interior-2.jpg";
import interior3 from "@/assets/interior-3.jpg";
import heroVilla from "@/assets/hero-villa.jpg";

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  intro: string;
  img: string;
  gallery: string[];
  features: string[];
  process: { step: string; detail: string }[];
};

export const services: Service[] = [
  {
    slug: "plotted-development",
    title: "Plotted Development",
    tagline: "Master-planned residential plots ready to build your dream on.",
    intro:
      "We create thoughtfully master-planned plotted communities with clear titles, approved layouts, and world-class infrastructure — giving you the freedom to design and build your own home on a foundation of trust.",
    img: projectValley,
    gallery: [projectValley, projectKr, heroVilla],
    features: [
      "DTCP / RERA approved layouts",
      "Clear titles & khata guarantee",
      "Wide black-top roads with street lighting",
      "Underground utilities & drainage",
      "Landscaped parks and open spaces",
      "Gated community with 24×7 security",
    ],
    process: [
      { step: "Land Acquisition", detail: "Sourcing prime, dispute-free parcels with strong appreciation potential." },
      { step: "Approvals & Zoning", detail: "End-to-end statutory approvals from local planning authorities." },
      { step: "Master Planning", detail: "Layouts designed around light, air, mobility and community life." },
      { step: "Infrastructure Delivery", detail: "Roads, drainage, utilities and landscaping built to spec." },
      { step: "Handover", detail: "Registered plots handed over with complete documentation." },
    ],
  },
  {
    slug: "farmland-development",
    title: "Farmland Development",
    tagline: "Weekend farmlands that combine nature, agriculture and long-term value.",
    intro:
      "Own a piece of the countryside without the hassle. Our managed farmland communities blend agroforestry, organic farming and gated infrastructure — a serene escape and a smart appreciating asset.",
    img: projectVss,
    gallery: [projectVss, projectValley, construction3],
    features: [
      "Managed agroforestry & fruit orchards",
      "Drip-irrigated plantations",
      "Farmhouse-ready parcels",
      "Solar-powered common utilities",
      "Rainwater harvesting ponds",
      "Weekend clubhouse & stay pods",
    ],
    process: [
      { step: "Soil & Water Study", detail: "Detailed feasibility of the land for horticulture and living." },
      { step: "Layout Planning", detail: "Optimised parcels with shared amenities and green buffers." },
      { step: "Plantation Setup", detail: "Sapling selection, planting and irrigation network installation." },
      { step: "Ongoing Management", detail: "Optional farm-management service so your land keeps producing." },
    ],
  },
  {
    slug: "land-leveling-site-preparation",
    title: "Land Leveling & Site Preparation",
    tagline: "The invisible groundwork that makes great projects possible.",
    intro:
      "Every successful development starts below the surface. Our teams handle contour analysis, cut-and-fill, clearing, grading and compaction to deliver a stable, buildable canvas — on time and to spec.",
    img: construction1,
    gallery: [construction1, construction2, construction3],
    features: [
      "Topographic & contour surveys",
      "Vegetation clearance & de-rooting",
      "Precision cut-and-fill grading",
      "Soil stabilisation & compaction",
      "Erosion control measures",
      "Machinery for any scale of site",
    ],
    process: [
      { step: "Site Assessment", detail: "Detailed survey and soil tests to plan earthwork volumes." },
      { step: "Clearing", detail: "Removal of vegetation, debris and obstructions." },
      { step: "Grading", detail: "Cut, fill and level to the designed finished ground level." },
      { step: "Compaction", detail: "Layered compaction to achieve target density values." },
    ],
  },
  {
    slug: "internal-roads",
    title: "Internal Roads",
    tagline: "Durable, well-engineered roads that shape the everyday experience.",
    intro:
      "From granular sub-base to the final wearing coat, we build internal roads that last decades — engineered for drainage, traffic loads and the character of the community they serve.",
    img: construction2,
    gallery: [construction2, construction1, projectKr],
    features: [
      "WMM / GSB sub-base construction",
      "Bituminous & concrete carriageways",
      "Kerb stones and paver footpaths",
      "Speed tables & traffic calming",
      "Reflective road markings & signage",
      "Integrated drainage inlets",
    ],
    process: [
      { step: "Alignment & Levels", detail: "Setting road centre-lines, camber and finished levels." },
      { step: "Sub-grade Prep", detail: "Rolling and compaction of native soil." },
      { step: "Base Courses", detail: "GSB and WMM layers laid and compacted to spec." },
      { step: "Wearing Coat", detail: "Bituminous or concrete surface with markings and kerbs." },
    ],
  },
  {
    slug: "storm-water-drainage",
    title: "Storm Water Drainage",
    tagline: "Engineered drainage that keeps communities dry through the heaviest monsoon.",
    intro:
      "Water is the number one enemy of urban infrastructure. We design and build storm water systems — from catchment analysis to recharge pits — that protect roads, homes and the water table alike.",
    img: construction3,
    gallery: [construction3, construction1, projectValley],
    features: [
      "Hydrological catchment analysis",
      "RCC / precast drain channels",
      "Silt traps and gratings",
      "Cross-drainage culverts",
      "Recharge pits & harvesting wells",
      "Outfall to natural water bodies",
    ],
    process: [
      { step: "Runoff Study", detail: "Calculating peak flows for 25-year storm events." },
      { step: "Network Design", detail: "Sizing channels, gradients and outfalls." },
      { step: "Construction", detail: "Cast-in-situ or precast drains with tight quality control." },
      { step: "Commissioning", detail: "Flow testing and integration with recharge structures." },
    ],
  },
  {
    slug: "water-pipeline-networks",
    title: "Water Pipeline Networks",
    tagline: "Reliable pressurised water on tap, to every plot and every home.",
    intro:
      "We design and lay complete potable and non-potable water networks — pump houses, overhead tanks, ring mains and service connections — engineered for pressure, purity and zero leakage.",
    img: projectKr,
    gallery: [projectKr, projectVss, construction2],
    features: [
      "HDPE / DI ring main networks",
      "Overhead tanks & sump systems",
      "Booster pumps & pressure control",
      "Individual metered connections",
      "STP treated water reticulation",
      "Leak detection and pressure testing",
    ],
    process: [
      { step: "Demand Study", detail: "Sizing based on population, plot count and usage norms." },
      { step: "Network Design", detail: "Hydraulic simulation for pressure at every node." },
      { step: "Trenching & Laying", detail: "Pipes bedded, jointed and pressure tested." },
      { step: "Commissioning", detail: "Chlorination, flushing and handover to residents." },
    ],
  },
  {
    slug: "electrical-infrastructure",
    title: "Electrical Infrastructure",
    tagline: "Power that is safe, coded and future-ready.",
    intro:
      "From HT feeders and transformers to LT distribution, street lighting and smart metering — we deliver end-to-end electrical infrastructure that meets IE Rules and utility standards.",
    img: heroVilla,
    gallery: [heroVilla, projectValley, interior2],
    features: [
      "HT feeder line & transformer yards",
      "LT distribution panels & cabling",
      "Solar-ready street lighting",
      "EV charging provisions",
      "Individual smart meters",
      "Earthing & lightning protection",
    ],
    process: [
      { step: "Load Analysis", detail: "Sanctioned load calculation with utility coordination." },
      { step: "Sub-station Setup", detail: "Transformer, HT panels and yard construction." },
      { step: "LT Distribution", detail: "Underground cabling, feeder pillars and metering." },
      { step: "Testing & Energisation", detail: "Insulation, earthing tests and utility handover." },
    ],
  },
  {
    slug: "compound-wall-construction",
    title: "Compound Wall Construction",
    tagline: "The strong, elegant boundary that defines your community.",
    intro:
      "A compound wall is the first thing anyone sees. We build boundary walls that combine structural strength with clean architectural detailing — precast, masonry or RCC — around plots, layouts and estates.",
    img: interior3,
    gallery: [interior3, construction2, projectVss],
    features: [
      "Precast panel walls (fast track)",
      "Random rubble & block masonry",
      "RCC retaining walls",
      "Architectural entrance gateways",
      "Anti-climb copings & finials",
      "Long-life exterior finishes",
    ],
    process: [
      { step: "Boundary Survey", detail: "Verifying legal boundaries against title documents." },
      { step: "Foundation", detail: "Isolated / strip footings suited to soil conditions." },
      { step: "Wall Construction", detail: "Masonry or precast erection with plumb control." },
      { step: "Finishing", detail: "Plaster, painting and coping to a durable finish." },
    ],
  },
  {
    slug: "landscape-tree-plantation",
    title: "Landscape & Tree Plantation",
    tagline: "Green cover that turns land into a living, breathing community.",
    intro:
      "Great landscapes take years — start right on day one. Our horticulturists plan avenues, parks and buffer greens with the right native species, irrigation and long-term maintenance in mind.",
    img: interior1,
    gallery: [interior1, projectValley, projectKr],
    features: [
      "Native & flowering avenue trees",
      "Themed parks and play greens",
      "Drip and sprinkler irrigation",
      "Lawn establishment & upkeep",
      "Hardscape: pathways, benches, gazebos",
      "Post-plantation maintenance",
    ],
    process: [
      { step: "Landscape Master Plan", detail: "Zoning greens with architects and hydrologists." },
      { step: "Soil Prep", detail: "Enrichment, drainage and pit preparation." },
      { step: "Plantation", detail: "Species selection matched to climate and soil." },
      { step: "Maintenance", detail: "12–24 month care to guarantee healthy establishment." },
    ],
  },
  {
    slug: "site-survey-layout-execution",
    title: "Site Survey & Layout Execution",
    tagline: "Precision on the ground — where every millimetre matters.",
    intro:
      "Modern survey instruments, meticulous documentation and disciplined execution. We translate approved drawings into perfectly marked layouts on site so construction begins on solid, coordinated data.",
    img: construction2,
    gallery: [construction2, projectKr, projectValley],
    features: [
      "DGPS & Total Station surveys",
      "Contour & topographical mapping",
      "Plot marking & pillar fixing",
      "Setting-out for roads and utilities",
      "As-built survey documentation",
      "Boundary demarcation certificates",
    ],
    process: [
      { step: "Instrument Survey", detail: "High-accuracy Total Station / DGPS observations." },
      { step: "Coordinate Grid", detail: "Establishing local grid and benchmarks." },
      { step: "Layout Marking", detail: "Physical marking of plots, roads and services." },
      { step: "Verification", detail: "Cross-checks against drawings and approvals." },
    ],
  },
  {
    slug: "end-to-end-land-development",
    title: "End-to-End Land Development",
    tagline: "One accountable partner, from raw land to a fully serviced community.",
    intro:
      "Combine every capability we offer into a single, turnkey engagement. From acquisition and approvals to infrastructure and handover, we take a raw parcel and deliver a fully serviced, sale-ready community.",
    img: projectValley,
    gallery: [projectValley, construction1, heroVilla],
    features: [
      "Land sourcing & due diligence",
      "Statutory approvals & liaisoning",
      "Master planning & architecture",
      "Full civil & MEP infrastructure",
      "Landscape & amenity build-out",
      "Marketing, sales & handover support",
    ],
    process: [
      { step: "Feasibility", detail: "Technical, legal and financial feasibility of the parcel." },
      { step: "Approvals", detail: "DTCP, RERA and local body sanctions." },
      { step: "Execution", detail: "Infrastructure, landscape and amenity construction." },
      { step: "Handover & Support", detail: "Sale, registration and post-handover management." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

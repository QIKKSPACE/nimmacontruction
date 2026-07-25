import projectValley from "@/assets/project-valley.jpg";
import plotted1 from "@/assets/svc/plotted-1.jpg";
import plotted2 from "@/assets/svc/plotted-2.jpg";
import plotted3 from "@/assets/svc/plotted-3.jpg";

import farmland1 from "@/assets/svc/farmland-1.jpg";
import farmland2 from "@/assets/svc/farmland-2.jpg";
import farmland3 from "@/assets/svc/farmland-3.jpg";
import landscape1 from "@/assets/svc/landscape-1.jpg";
import endtoend1 from "@/assets/svc/endtoend-1.jpg";
import roads1 from "@/assets/svc/roads-1.jpg";

export type ProjectItem = {
  id: string;
  name: string;
  category: "plotted" | "farmland";
  location: string;
  subLocation: string;
  status: "Completed" | "Ongoing" | "Upcoming";
  price: string;
  units: string;
  sizeRange: string;
  img: string;
  gallery: string[];
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  amenities: string[];
};

export const plottedProjects: ProjectItem[] = [
  {
    id: "valley-enclave",
    name: "The Valley Enclave",
    category: "plotted",
    location: "Penukonda",
    subLocation: "90 mins drive from North Bengaluru",
    status: "Completed",
    price: "Starting ₹15 Lacs",
    units: "474 Plots",
    sizeRange: "1200 - 2400 sq.ft",
    img: projectValley,
    gallery: [projectValley, plotted1, roads1],
    description:
      "The Valley Enclave is one of South India's premier integrated plotted developments. Spanning over 45 acres of lush greenery in Penukonda, this master-planned community is designed with black-top asphalt roads, underground electrical cabling, storm water drainage, and 24x7 gated security. Located along the rapidly developing Kia Motors Industrial Corridor, it offers unbeatable long-term appreciation.",
    highlights: [
      "DTCP Approved & Clear Title Guarantee",
      "Wide 40ft & 30ft Black-Top Asphalt Roads",
      "Underground Electrical & Sewage Connections",
      "Gated Security with Compound Wall & CCTV",
      "Landscaped Parks & Dedicated Children Play Areas",
    ],
    specs: [
      { label: "Approval", value: "DTCP & Local Planning Authority" },
      { label: "Road Width", value: "40 Feet Main / 30 Feet Internal" },
      { label: "Electricity", value: "Underground Cabling & Street Lights" },
      { label: "Water Supply", value: "Overhead Tank & Pressurised Lines" },
      { label: "Distance", value: "90 Mins from Hebbal, Bengaluru" },
      { label: "Khata Status", value: "A-Khata / E-Swathu Ready" },
    ],
    amenities: [
      "24x7 Gated Security",
      "Clubhouse & Party Lawn",
      "Walking & Jogging Track",
      "Rainwater Harvesting",
      "Avenue Plantation",
      "Children's Play Zone",
    ],
  },
  {
    id: "vss-layout-heights",
    name: "VSS Layout Heights",
    category: "plotted",
    location: "Devanahalli",
    subLocation: "Near International Airport, Bengaluru",
    status: "Completed",
    price: "Starting ₹42 Lacs",
    units: "120 Plots",
    sizeRange: "1500 - 3000 sq.ft",
    img: plotted1,
    gallery: [plotted1, plotted2, endtoend1],
    description:
      "VSS Layout Heights brings luxury residential plot living right next to Kempegowda International Airport. With BIAPPA approval and BDA-grade layout standards, this development is tailor-made for families looking to construct their dream villa in a peaceful yet hyper-connected neighbourhood.",
    highlights: [
      "BIAPPA Layout Approval with Bank Loan Eligibility",
      "Community Clubhouse & Swimming Pool Access",
      "Street Lighting & Tree Avenue Plantation",
      "Ready for Immediate Villa Construction",
    ],
    specs: [
      { label: "Approval", value: "BIAPPA Approved" },
      { label: "Plot Dimensions", value: "30x40, 30x50, 40x60 sq.ft" },
      { label: "Electricity", value: "BESCOM Connected Overhead Power" },
      { label: "Water Source", value: "Borewell + Municipal Connection" },
      { label: "Distance", value: "15 Mins to Airport Terminal" },
      { label: "Khata Status", value: "A-Khata Registration" },
    ],
    amenities: [
      "Swimming Pool",
      "Grand Entrance Arch",
      "Avenue Trees",
      "Interlocking Paved Side Tracks",
      "CCTV Surveillance",
    ],
  },
  {
    id: "metro-royal-greens",
    name: "Nimma Royal Greens",
    category: "plotted",
    location: "Yelahanka",
    subLocation: "North Bengaluru Corridor",
    status: "Ongoing",
    price: "Starting ₹65 Lacs",
    units: "85 Plots",
    sizeRange: "1200 - 2000 sq.ft",
    img: plotted2,
    gallery: [plotted2, plotted3, projectValley],
    description:
      "Situated in the heart of Yelahanka's prime residential zone, Nimma Royal Greens offers boutique villa plots. Featuring state-of-the-art underground utilities, rainwater harvesting systems, and close proximity to top international schools and tech parks.",
    highlights: [
      "BDA Compliant Master Plan & Architectural Layout",
      "Dedicated Children's Play Zone & Amphitheatre",
      "Overhead Water Storage & Automated Pumping Network",
      "Prime Investment Growth Area in North Bengaluru",
    ],
    specs: [
      { label: "Approval", value: "BDA Compliant Layout" },
      { label: "Road Width", value: "40 Feet Concrete Roads" },
      { label: "Electricity", value: "Underground Power Lines" },
      { label: "Water Supply", value: "BWSSB Line Provision" },
      { label: "Distance", value: "5 Mins to Yelahanka Circle" },
      { label: "Khata Status", value: "E-Khata Ready" },
    ],
    amenities: [
      "Amphitheatre",
      "Seating Pavilions",
      "Senior Citizen Park",
      "Underground Drainage",
      "Solar Street Lights",
    ],
  },
  {
    id: "metro-crown-enclave",
    name: "Metro Crown Enclave",
    category: "plotted",
    location: "Hoskote",
    subLocation: "Industrial Expressway, Bengaluru",
    status: "Completed",
    price: "Starting ₹28 Lacs",
    units: "210 Plots",
    sizeRange: "1200 - 1800 sq.ft",
    img: plotted3,
    gallery: [plotted3, roads1, plotted1],
    description:
      "Metro Crown Enclave is located along the rapidly rising Hoskote Industrial & Logistics Hub. Designed for smart real estate investors and homebuyers looking for solid capital gains and immediate buildability.",
    highlights: [
      "Instant Registration & E-Khata Availability",
      "Eco-Friendly Rainwater Harvesting System",
      "24x7 Security Guard Post & CCTV Surveillance",
      "Seamless Highway Connectivity to Chennai Expressway",
    ],
    specs: [
      { label: "Approval", value: "DTCP / Panchayat Approved" },
      { label: "Road Width", value: "30 Feet Asphalt Roads" },
      { label: "Electricity", value: "Individual Meter Box Provision" },
      { label: "Water Supply", value: "Continuous Borewell Supply" },
      { label: "Distance", value: "10 Mins to Hoskote Flyover" },
      { label: "Khata Status", value: "Form-9 & Form-11 Ready" },
    ],
    amenities: [
      "Commercial Zone Provision",
      "Compound Wall",
      "Sewage Treatment Plant",
      "Gated Entrance",
    ],
  },
];

export const farmlandProjects: ProjectItem[] = [
  {
    id: "green-meadows-farms",
    name: "Green Meadows Managed Farmlands",
    category: "farmland",
    location: "Chikballapur",
    subLocation: "Foothills of Nandi Hills",
    status: "Completed",
    price: "Starting ₹35 Lacs",
    units: "60 Farm Estates",
    sizeRange: "1/4 Acre to 1 Acre",
    img: farmland1,
    gallery: [farmland1, farmland2, landscape1],
    description:
      "Green Meadows Managed Farmlands offers peace of mind with 100% managed agriculture. Nestled under the picturesque Nandi Hills backdrop, each farm plot comes planted with high-value fruit trees (Mango, Guava, Chikoo) and timber trees (Mahogany & Teak), fully serviced with drip irrigation and 24x7 farm caretaker support.",
    highlights: [
      "Managed Mango, Teak & Mahogany Plantations",
      "Automated Drip Irrigation Network Connected to Farm Ponds",
      "Perimeter Solar Fencing & Guarded Entrance",
      "Weekend Cottage Ready Plots with Electricity",
    ],
    specs: [
      { label: "Land Type", value: "Agricultural Farmland" },
      { label: "Water Source", value: "Drip Irrigated Farm Ponds & Borewells" },
      { label: "Plantations", value: "15+ Fruit & Timber Varieties per Plot" },
      { label: "Management", value: "3-Year Free Farm Care Contract" },
      { label: "Distance", value: "45 Mins from North Bengaluru" },
      { label: "Title", value: "Clear Title Single Owner Land" },
    ],
    amenities: [
      "Clubhouse & Dining Shed",
      "Organic Vegetable Patch",
      "Solar Street Lighting",
      "Children Activity Zone",
      "Gated Farm Guard",
    ],
  },
  {
    id: "serene-woods-farms",
    name: "Serene Woods Farmlands",
    category: "farmland",
    location: "Penukonda Corridor",
    subLocation: "Scenic Countryside, South India",
    status: "Ongoing",
    price: "Starting ₹22 Lacs",
    units: "110 Farm Plots",
    sizeRange: "10,000 - 20,000 sq.ft",
    img: farmland2,
    gallery: [farmland2, farmland3, farmland1],
    description:
      "Escape city life with Serene Woods Farmlands. Spanning 75 acres of fertile red soil, this project provides landowners with passive farm income opportunities, weekend stay facilities, and scenic natural surroundings.",
    highlights: [
      "Organic Agro-Forestry Farming Model",
      "Natural Water Harvesting Ponds & Fish Breeding Ponds",
      "Professional Farm Care Service & Harvest Sharing",
      "High Land Value Appreciation Corridor",
    ],
    specs: [
      { label: "Land Type", value: "Clear Title Agriculture Land" },
      { label: "Water Source", value: "Perennial Water Ponds & Drip Lines" },
      { label: "Fencing", value: "Individual Plot Fencing with Gate" },
      { label: "Road Access", value: "30 Feet Internal Gravel Roads" },
      { label: "Distance", value: "85 Mins from Bengaluru Airport" },
      { label: "Maintenance", value: "Professional Agricultural Team" },
    ],
    amenities: [
      "Gazebos & Barbecue Spots",
      "Camping Grounds",
      "Farmhouse Construction Support",
      "Native Tree Sanctuary",
    ],
  },
  {
    id: "nandi-valley-retreat",
    name: "Nandi Valley Retreat",
    category: "farmland",
    location: "Muddenahalli",
    subLocation: "Near Sir M. Visvesvaraya Memorial",
    status: "Completed",
    price: "Starting ₹55 Lacs",
    units: "45 Luxury Estates",
    sizeRange: "0.5 Acre Onwards",
    img: farmland3,
    gallery: [farmland3, landscape1, farmland1],
    description:
      "Nandi Valley Retreat is an ultra-exclusive managed farmland development catering to discerning investors looking for luxury weekend estates. Features private cottages, swimming pool access, and manicured fruit orchards.",
    highlights: [
      "Exclusive Farm Clubhouse & Wooden Stay Pods",
      "High Yield Organic Fruit Orchards",
      "Full Power & Pressurised Water Line Connections",
      "Pollution-Free Eco Zone with Mountain Views",
    ],
    specs: [
      { label: "Land Type", value: "Conversion-Ready Agro Estate" },
      { label: "Cottage Option", value: "1 & 2 BHK Wooden Chalets" },
      { label: "Electricity", value: "3-Phase Power Connection" },
      { label: "Water Source", value: "24x7 Pressurised Drip Lines" },
      { label: "Distance", value: "35 Mins from Airport" },
      { label: "Security", value: "Bio-fencing + CCTV" },
    ],
    amenities: [
      "Swimming Pool",
      "Wooden Stay Pods",
      "Horse Riding Track",
      "Organic Coffee Cafe",
    ],
  },
  {
    id: "vedic-eco-farmlands",
    name: "Vedic Eco Farmlands",
    category: "farmland",
    location: "Doddaballapur Road",
    subLocation: "Bengaluru Rural District",
    status: "Completed",
    price: "Starting ₹29 Lacs",
    units: "75 Eco Plots",
    sizeRange: "12,000 - 25,000 sq.ft",
    img: landscape1,
    gallery: [landscape1, farmland2, farmland3],
    description:
      "Vedic Eco Farmlands combines ancient Vedic permaculture techniques with modern drip technology to build self-sustaining farm plots. Ideal for building weekend farmhouses surrounded by sandalwood and teak trees.",
    highlights: [
      "Timberwood (Teak/Sandalwood) & Medicinal Plantations",
      "24x7 Security & Caretaker Office on Site",
      "Turnkey Farmhouse Design & Build Support",
      "Clear Title Agricultural Land with Single Ownership",
    ],
    specs: [
      { label: "Land Type", value: "Permaculture Farm Estate" },
      { label: "Irrigation", value: "Solar Powered Drip Lines" },
      { label: "Soil Quality", value: "Enriched Red Soil" },
      { label: "Distance", value: "40 Mins from Yelahanka" },
      { label: "Registration", value: "Immediate Registration" },
      { label: "Caretaker", value: "Resident Farm Manager" },
    ],
    amenities: [
      "Ayurvedic Herb Garden",
      "Goshala & Organic Milk",
      "Solar Street Lighting",
      "Bird Watching Zone",
    ],
  },
];

export function getProjectById(id: string): ProjectItem | undefined {
  return [...plottedProjects, ...farmlandProjects].find((p) => p.id === id);
}

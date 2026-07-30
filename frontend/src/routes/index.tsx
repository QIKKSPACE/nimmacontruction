import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Linkedin,
  MessageCircle,
  ArrowRight,
  Menu,
  X,
  Globe,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { socialLinks } from "@/data/social-links";
import { fetchAllProjects, type ProjectItem } from "@/data/projects-data";
import { Loader2 } from "lucide-react";
import logoAsset from "@/assets/nimma-metro-logo.jpeg.asset.json";
import heroPlottedDev from "@/assets/hero-plotted-dev.jpg";
import servicePlotted from "@/assets/service-plotted.jpg";
import serviceFarmland from "@/assets/service-farmland.jpg";
import serviceApprovals from "@/assets/service-approvals.jpg";
import serviceSales from "@/assets/service-sales.jpg";
import serviceTurnkey from "@/assets/service-turnkey.jpg";
import serviceMarketing from "@/assets/service-marketing.jpg";
import projectValley from "@/assets/project-valley.jpg";
import projectVss from "@/assets/project-vss.jpg";
import projectKr from "@/assets/project-kr.jpg";
import construction1 from "@/assets/construction-1.jpg";
import construction2 from "@/assets/construction-2.jpg";
import construction3 from "@/assets/construction-3.jpg";
import interior1 from "@/assets/interior-1.jpg";
import interior2 from "@/assets/interior-2.jpg";
import interior3 from "@/assets/interior-3.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

const nav = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
];

const services = [
  { title: "Plotted developments", img: servicePlotted },
  { title: "Farmland developments", img: serviceFarmland },
  { title: "Layout Approvals", img: serviceApprovals },
  { title: "Layout Sales & Marketing Services", img: serviceSales },
  { title: "Turnkey Constructions", img: serviceTurnkey },
  { title: "Project Marketing & Digital Solutions", img: serviceMarketing },
];

const realEstate = [
  {
    name: "The Valley",
    img: projectValley,
    type: "Villa Plots",
    location: "Penukonda",
    sub: "90 mins from Bangalore",
  },
  {
    name: "VSS Enclave",
    img: projectVss,
    type: "2 & 3 BHK Apartments",
    location: "Yelahanka",
    sub: "Airport Road, Bangalore",
  },
  {
    name: "KR Infinity",
    img: projectKr,
    type: "2 BHK Apartments",
    location: "Devanahalli",
    sub: "Bangalore",
  },
];

const construction = [construction1, construction2, construction3];
const interiors = [
  { img: interior1, name: "RT Nagar", city: "Bengaluru" },
  { img: interior2, name: "MG Road", city: "Bengaluru" },
  { img: interior3, name: "Marathalli", city: "Bengaluru" },
];


const blogs = [
  {
    title: "Top 10 Home Builders in Bangalore for your dream home construction",
    date: "September 25, 2025",
    img: construction2,
  },
  {
    title: "Cost of building a home on a 30×40 plot in Bangalore",
    date: "September 19, 2025",
    img: construction1,
  },
  {
    title: "Everything you need to know about khata in Bangalore: A, B and E khata",
    date: "August 20, 2025",
    img: construction3,
  },
];

function Home() {
  const [open, setOpen] = useState(false);
  void open; void setOpen;
  return (
    <div id="home" className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <About />
      <Services />
      <LatestProjects />
      <ContactForm />
      <SiteFooter />
    </div>
  );
}


function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#home" className="flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-white/20">
        <img src={logoAsset.url} alt="Nimmametro Constructions" className="h-full w-full object-contain" />
      </span>
      <span className={`font-display text-lg font-bold tracking-wider ${dark ? "text-white" : "text-foreground"}`}>
        Nimmametro Constructions
      </span>
    </a>
  );
}

function Header({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[color:var(--ink)]/95 backdrop-blur">
      <div className="container-x flex h-20 items-center justify-between">
        <Logo dark />
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-sm font-medium text-white/80 transition hover:text-[color:var(--gold)]"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden rounded-full border-2 border-[color:var(--gold)] px-6 py-2.5 text-sm font-semibold text-[color:var(--gold)] transition hover:bg-[color:var(--gold)] hover:text-[color:var(--gold-foreground)] lg:inline-flex"
        >
          Contact Us
        </a>
        <button
          className="text-white lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-[color:var(--ink)] lg:hidden">
          <div className="container-x flex flex-col gap-4 py-6">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-white/80"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="rounded-full border-2 border-[color:var(--gold)] px-6 py-2.5 text-center text-sm font-semibold text-[color:var(--gold)]"
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative isolate">
      <img
        src={heroPlottedDev}
        alt="Transforming Land into Landmarks by Nimmametro Constructions"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
      <div className="container-x relative flex min-h-[82vh] flex-col justify-center py-24 text-white">
        <h1 className="max-w-4xl font-display text-4xl leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl">
          Transforming Land into Landmarks
        </h1>
        <p className="mt-6 max-w-2xl text-base text-white/85 sm:text-lg md:text-xl leading-relaxed">
          Building Karnataka&apos;s future through premium plotted developments, residential layouts, and sustainable infrastructure.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/projects/plotted-development"
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-7 py-3.5 text-sm font-semibold text-[color:var(--gold-foreground)] shadow-lg transition hover:brightness-95"
          >
            Plotted Developments <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/projects/farmland-development"
            className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-black/30 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-[color:var(--ink)]"
          >
            Farmland Projects
          </Link>
        </div>
      </div>
    </section>
  );
}

function About() {
  const stats = [
    { n: "100%", l: "Legal Transparency" },
    { n: "Turnkey", l: "End-to-End Solutions" },
    { n: "Quality", l: "Construction Standards" },
    { n: "Customer", l: "First Approach" },
  ];
  return (
    <section id="about" className="py-24">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow">About Us</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            A journey of Excellence and Innovation
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            At Nimmametro Constructionss, we turn land into opportunity. Our expertise in plotted development, residential layouts, and infrastructure development ensures every project is built with quality, transparency, and long-term value.
          </p>
          <p className="mt-3 text-sm font-semibold text-[color:var(--gold)]">
            Founded by Mr. Beerappa N
          </p>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--ink)] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--gold)] hover:text-[color:var(--gold-foreground)]"
          >
            Read More <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 border-l border-border pl-6 lg:pl-12">
          {stats.map((s) => (
            <div key={s.l}>
              <div className="font-display text-4xl text-[color:var(--ink)] md:text-5xl">{s.n}</div>
              <div className="mt-2 text-sm uppercase tracking-widest text-[color:var(--gold)]">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-[color:var(--cream)] py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">What we do</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Our services</h2>
          <p className="mt-6 text-muted-foreground">
            Specializing in end-to-end plotted development and land development projects across Karnataka — from master layout planning and site preparation to internal asphalt roads, electrical infrastructure, and underground drainage networks.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <a
              key={s.title}
              href="#contact"
              className="group relative overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border transition hover:shadow-xl"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${
                    s.title === "Layout Approvals" ? "object-[50%_65%]" : "object-center"
                  }`}
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg uppercase tracking-wide">{s.title}</h3>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--gold)]">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function LatestProjects() {
  const [allProjects, setAllProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProjects().then((data) => {
      setAllProjects(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">Featured Projects</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Latest Projects</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Explore our latest master-planned plotted developments and managed farmland projects across Karnataka — built with premium infrastructure, clear titles, and long-term value.
          </p>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-[color:var(--gold)]" />
            <span className="ml-3 text-muted-foreground">Loading projects...</span>
          </div>
        ) : allProjects.length === 0 ? (
          <div className="py-24 text-center text-muted-foreground">
            <p className="text-lg">No projects available yet.</p>
            <p className="mt-2 text-sm">Check back soon for new listings!</p>
          </div>
        ) : (
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allProjects.map((p) => (
              <article
                key={p.id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border transition hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span
                    className={`absolute top-4 left-4 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white ${
                      p.status === "Completed"
                        ? "bg-emerald-600"
                        : "bg-[color:var(--gold)] text-black"
                    }`}
                  >
                    {p.status}
                  </span>
                  <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                    {p.category === "plotted" ? "Plotted Development" : "Farmland Development"}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 text-[color:var(--gold)] flex-shrink-0" />
                      {p.location} • {p.subLocation}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold">{p.name}</h3>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {p.description}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-border pt-4">
                    <Link
                      to="/projects/$id"
                      params={{ id: p.id }}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--ink)] py-2.5 text-xs font-semibold text-white transition hover:bg-[color:var(--gold)] hover:text-black"
                    >
                      View Project <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ContactForm() {
  return (
    <section id="contact" className="relative isolate overflow-hidden bg-[color:var(--ink)] py-24 text-white">
      <img
        src={heroPlottedDev}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-15"
      />
      <div className="container-x relative grid gap-12 lg:grid-cols-2">

        {/* LEFT: Title + Contact Info + Social */}
        <div>
          <p className="eyebrow">Connect with us</p>
          <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">
            Let's start something great together
          </h2>
          <p className="mt-6 max-w-lg text-white/70">
            Have a land development project or need expert guidance? Nimmametro Constructions is here to help. Whether you're planning a residential layout, farmland development, infrastructure works, or need assistance with layout approvals, our experienced team is ready to assist you.
          </p>
          <div className="mt-10 space-y-4 text-sm">
            <a href="tel:+919148806063" className="flex items-center gap-3 text-white/85 hover:text-[color:var(--gold)]">
              <Phone className="h-4 w-4 text-[color:var(--gold)] shrink-0" /> +91 91488 06063
            </a>
            <a href="mailto:constructions@nimmametro.com" className="flex items-center gap-3 text-white/85 hover:text-[color:var(--gold)]">
              <Mail className="h-4 w-4 text-[color:var(--gold)] shrink-0" /> constructions@nimmametro.com
            </a>
            <a href="http://www.nimmametroconstructions.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/85 hover:text-[color:var(--gold)]">
              <Globe className="h-4 w-4 text-[color:var(--gold)] shrink-0" /> www.nimmametroconstructions.com
            </a>
            <div className="flex items-start gap-3 text-white/85 pt-2">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
              <div>
                <p className="font-semibold text-white mb-1">Nimmametro Constructions</p>
                <p>212/A, 1st Main Road, Domlur Stage 2,</p>
                <p>Domlur, Bengaluru, Karnataka – 560071</p>
              </div>
            </div>
          </div>

          <p className="mt-8 max-w-lg text-sm text-white/70">
            We proudly serve clients across Karnataka with complete end-to-end land development and infrastructure solutions. Contact us today to discuss your project and discover how we can bring your vision to life.
          </p>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--gold)]">Follow Us</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-[color:var(--gold)] hover:bg-[color:var(--gold)] hover:text-[color:var(--gold-foreground)]"
                  aria-label={s.name}
                  title={s.name}
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Enquiry Form */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const formData = new FormData(form);
            const data = {
              name: formData.get("name"),
              phone: formData.get("phone"),
              email: formData.get("email"),
              service: formData.get("service"),
              message: formData.get("message")
            };
            try {
              const res = await fetch("http://localhost/nimmabackend/api/enquiries.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
              });
              const json = await res.json();
              if (json.status) {
                alert("Thank you! Your enquiry has been submitted successfully.");
                form.reset();
              } else {
                alert("Submission failed: " + (json.message || "Unknown error"));
              }
            } catch (err: any) {
              alert("Error submitting form. Please try again later.");
              console.error(err);
            }
          }}
          className="grid gap-4 rounded-2xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur"
        >
          <Field label="Name" name="name" />
          <Field label="Contact Number" name="phone" type="tel" />
          <Field label="Email" name="email" type="email" />
          <label className="block">
            <span className="text-xs uppercase tracking-widest text-white/60">
              Choose Your Requirement
            </span>
            <select name="service" className="mt-2 w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[color:var(--gold)]">
              <option value="" className="text-black">Select an option</option>
              <option value="Plotted Development" className="text-black">Plotted Development</option>
              <option value="Farmland Development" className="text-black">Farmland Development</option>
              <option value="Others" className="text-black">Others</option>
            </select>
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-widest text-white/60">Message</span>
            <textarea
              name="message"
              rows={4}
              className="mt-2 w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[color:var(--gold)]"
            />
          </label>
          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--gold)] px-7 py-3 text-sm font-semibold text-[color:var(--gold-foreground)] transition hover:brightness-95"
          >
            Submit Details <ArrowRight className="h-4 w-4" />
          </button>
        </form>

      </div>
    </section>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-white/60">{label}</span>
      <input
        name={name}
        type={type}
        className="mt-2 w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[color:var(--gold)]"
      />
    </label>
  );
}

function Footer() {
  const services = [
    "House Construction",
    "Real Estate",
    "Interior Design",
    "Sales & Marketing",
    "Investment Advisory",
    "Natural Raw Commodities",
  ];
  const quick = ["Join Our Team", "Refer & Earn", "Become Our Partner"];
  return (
    <footer className="bg-black py-16 text-white/80">
      <div className="container-x grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <Logo dark />
          <p className="mt-6 max-w-xs text-sm text-white/60">
            Building trust, homes and landmarks across South India.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
                aria-label={s.name}
                title={s.name}
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <FooterCol title="Services" items={services} />
        <div>
          <h4 className="font-display text-sm uppercase tracking-widest text-[color:var(--gold)]">
            Contact
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href="tel:+918884898765" className="hover:text-[color:var(--gold)]">
                888-4898-765
              </a>
            </li>
            <li>
              <a href="mailto:info@nimmametro.com" className="hover:text-[color:var(--gold)]">
                info@nimmametro.com
              </a>
            </li>
            <li className="text-white/60">
              No-34-1 First Floor Promenade, Sivanchetti Gardens, Bengaluru 560042
            </li>
          </ul>
          <h4 className="mt-8 font-display text-sm uppercase tracking-widest text-[color:var(--gold)]">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {quick.map((q) => (
              <li key={q}>
                <a href="#" className="hover:text-[color:var(--gold)]">
                  {q}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-x mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center">
        <div>© {new Date().getFullYear()} Nimmametro Constructions. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[color:var(--gold)]">Privacy Policy</a>
          <a href="#" className="hover:text-[color:var(--gold)]">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-display text-sm uppercase tracking-widest text-[color:var(--gold)]">
        {title}
      </h4>
      <ul className="mt-5 space-y-2 text-sm">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="hover:text-[color:var(--gold)]">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

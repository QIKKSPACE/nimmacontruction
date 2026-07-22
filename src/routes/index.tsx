import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import heroVilla from "@/assets/hero-villa.jpg";
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
  { label: "Cost Calculator", href: "#calculator" },
  { label: "Blogs", href: "#blogs" },
];

const services = [
  { title: "Real Estate Development", img: projectValley },
  { title: "Turnkey Construction", img: construction1 },
  { title: "Interior Design", img: interior1 },
  { title: "Sales & Marketing", img: projectVss },
  { title: "Investment Advisory", img: projectKr },
  { title: "Natural Raw Commodities", img: construction3 },
];

const realEstate = [
  {
    name: "The Valley",
    img: projectValley,
    type: "Villa Plots",
    price: "15 Lacs",
    units: "474",
    location: "Penukonda",
    sub: "90 mins from Bangalore",
  },
  {
    name: "VSS Enclave",
    img: projectVss,
    type: "2 & 3 BHK Apartments",
    price: "65L",
    units: "44",
    location: "Yelahanka",
    sub: "Airport Road, Bangalore",
  },
  {
    name: "KR Infinity",
    img: projectKr,
    type: "2 BHK Apartments",
    price: "50 Lacs",
    units: "180",
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

const awards = [
  "Business Standard",
  "ANI News",
  "The Tribune",
  "The Print",
  "The Week",
  "British Columbia Times",
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
  return (
    <div id="home" className="min-h-screen bg-background text-foreground">
      <Header open={open} setOpen={setOpen} />
      <Hero />
      <About />
      <Services />
      <RealEstate />
      <Construction />
      <Interiors />
      <Testimonials />
      <Media />
      <Blogs />
      <ContactForm />
      <Footer />
    </div>
  );
}

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#home" className="flex items-center gap-2">
      <span
        className="flex h-10 w-10 items-center justify-center rounded-full border-2"
        style={{ borderColor: "var(--gold)" }}
      >
        <span className="font-display text-lg font-bold text-[color:var(--gold)]">V</span>
      </span>
      <span className={`flex flex-col leading-tight ${dark ? "text-white" : "text-foreground"}`}>
        <span className="font-display text-lg font-bold tracking-wide">VINRA GROUP</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--gold)]">
          Complete Living Solutions
        </span>
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
        src={heroVilla}
        alt="Luxury modern villa by Vinra Group"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      <div className="container-x relative flex min-h-[78vh] flex-col justify-center py-24 text-white">
        <h1 className="max-w-3xl font-display text-5xl leading-[1.05] md:text-7xl">
          Complete
          <br />
          Living Solutions
        </h1>
        <p className="mt-6 max-w-xl text-base text-white/85 md:text-lg">
          Being the best builders in Bangalore, we create custom homes, stunning interiors, and
          legendary real estate projects with perfection.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-7 py-3 text-sm font-semibold text-[color:var(--gold-foreground)] transition hover:brightness-95"
          >
            Explore Projects <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/60 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[color:var(--ink)]"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  const stats = [
    { n: "15+", l: "Years" },
    { n: "3,000+", l: "Projects" },
    { n: "9M+", l: "SqFt Transacted" },
    { n: "55+", l: "Ongoing Projects" },
  ];
  return (
    <section id="about" className="py-24">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow">About Vinra Group</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            A journey of Excellence and Innovation
          </h2>
          <p className="mt-6 text-muted-foreground">
            With more than 15 years of industry experience, Vinra Group is one of the most trusted
            builders in Bangalore. Our reputation is founded on trust, transparency, and an
            uncompromising pursuit of quality. We prioritize our customers' aspirations, delivering
            spaces that reflect style, comfort, and functionality.
          </p>
          <a
            href="#services"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--ink)] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--gold)] hover:text-[color:var(--gold-foreground)]"
          >
            Read More <ArrowRight className="h-4 w-4" />
          </a>
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
            Our purpose is to revolutionize homes and build iconic landmarks across South India — a
            turnkey solution across every stage of your project.
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
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
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

function RealEstate() {
  return (
    <section id="projects" className="py-24">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">Featured Projects</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Real Estate</h2>
          <p className="mt-6 text-muted-foreground">
            As a leading real estate company in Bangalore, we develop thoughtfully planned
            residential and commercial spaces designed for comfort, convenience and investment
            value.
          </p>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {realEstate.map((p) => (
            <article
              key={p.name}
              className="group overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl">{p.name}</h3>
                <div className="mt-4 grid grid-cols-2 gap-4 border-y border-border py-4 text-sm">
                  <div>
                    <div className="font-semibold text-[color:var(--ink)]">{p.type}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[color:var(--ink)]">{p.price}</div>
                    <div className="text-xs text-muted-foreground">Onwards</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[color:var(--ink)]">{p.units}</div>
                    <div className="text-xs text-muted-foreground">Units</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[color:var(--ink)]">{p.location}</div>
                    <div className="text-xs text-muted-foreground">{p.sub}</div>
                  </div>
                </div>
                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--gold)]"
                >
                  Details <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Construction() {
  return (
    <section className="bg-[color:var(--ink)] py-24 text-white">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">Featured Projects</p>
          <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">House Construction</h2>
          <p className="mt-6 text-white/70">
            Vinra Group is recognized as one of the most trusted construction companies in
            Bangalore. Turnkey construction services starting from ₹ 1,875 per sqft — everything
            from concept to completion under one roof.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {construction.map((img, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl">
              <img
                src={img}
                alt={`Construction project ${i + 1}`}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition group-hover:opacity-100" />
              <a
                href="#contact"
                className="absolute inset-x-0 bottom-6 mx-auto w-max rounded-full border border-white/70 bg-black/40 px-6 py-2 text-sm font-semibold text-white opacity-0 backdrop-blur transition group-hover:opacity-100"
              >
                View Project
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Interiors() {
  return (
    <section className="py-24">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">Featured Projects</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Interior Design</h2>
          <p className="mt-6 text-muted-foreground">
            As a premier interior design company in Bangalore, we transform ordinary spaces into
            extraordinary living environments — from smart modular kitchens to elegant living rooms.
          </p>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {interiors.map((p) => (
            <article key={p.name} className="group">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="aspect-video w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-5 font-display text-2xl">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.city}</p>
              <a
                href="#contact"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--gold)]"
              >
                View <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-[color:var(--cream)] py-24">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow">Testimonials</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">What our customers say</h2>
          <p className="mt-6 text-muted-foreground">
            At Vinra Group, our focus is on you and what you want to achieve. We pride ourselves on
            forging strong, lasting relationships, which help us to continue to thrive and develop.
          </p>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-[color:var(--ink)]">
          <img
            src={interior3}
            alt="Testimonials"
            loading="lazy"
            className="h-full w-full object-cover opacity-70"
          />
          <button
            aria-label="Play video"
            className="absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-full bg-[color:var(--gold)] text-[color:var(--gold-foreground)] shadow-2xl transition hover:scale-105"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-8 w-8">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function Media() {
  return (
    <section className="py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Media Coverage</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Awards & Recognitions</h2>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {awards.map((a) => (
            <div
              key={a}
              className="flex h-24 items-center justify-center rounded-lg border border-border bg-card px-4 text-center font-display text-sm text-muted-foreground transition hover:text-[color:var(--ink)]"
            >
              {a}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Blogs() {
  return (
    <section id="blogs" className="bg-[color:var(--cream)] py-24">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">Insights</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Latest blogs</h2>
          <p className="mt-6 text-muted-foreground">
            Stay updated with the latest insights, trends, and tips in real estate, construction and
            interior design.
          </p>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {blogs.map((b) => (
            <article
              key={b.title}
              className="group overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={b.img}
                  alt={b.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="eyebrow">Blogs</span>
                <h3 className="mt-3 font-display text-xl leading-snug">{b.title}</h3>
                <p className="mt-3 text-xs text-muted-foreground">{b.date}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  return (
    <section id="contact" className="relative isolate overflow-hidden bg-[color:var(--ink)] py-24 text-white">
      <img
        src={heroVilla}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-15"
      />
      <div className="container-x relative grid gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Connect with us</p>
          <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">
            Let's start something great together
          </h2>
          <p className="mt-6 max-w-lg text-white/70">
            Whether you seek your custom home, a top-class flat, land, or interiors — call us today
            and one of our team members will contact you within 24 hours.
          </p>
          <div className="mt-10 space-y-4 text-sm">
            <a href="tel:+918884898765" className="flex items-center gap-3 text-white/85 hover:text-[color:var(--gold)]">
              <Phone className="h-4 w-4 text-[color:var(--gold)]" /> 888-4898-765
            </a>
            <a href="mailto:info@vinragroup.com" className="flex items-center gap-3 text-white/85 hover:text-[color:var(--gold)]">
              <Mail className="h-4 w-4 text-[color:var(--gold)]" /> info@vinragroup.com
            </a>
            <div className="flex items-start gap-3 text-white/85">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
              No-34-1 First Floor Promenade, Junction, Meanee Ave Rd, Sindhi Colony,
              Sivanchetti Gardens, Bengaluru, Karnataka 560042
            </div>
          </div>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid gap-4 rounded-2xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur"
        >
          <Field label="Name" name="name" />
          <Field label="Contact Number" name="phone" type="tel" />
          <Field label="Email" name="email" type="email" />
          <label className="block">
            <span className="text-xs uppercase tracking-widest text-white/60">
              Choose Your Requirement
            </span>
            <select className="mt-2 w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[color:var(--gold)]">
              <option className="text-black">Real Estate Projects</option>
              <option className="text-black">House Construction</option>
              <option className="text-black">Interior Design</option>
              <option className="text-black">Real Estate Marketing</option>
              <option className="text-black">Investment Advisory</option>
              <option className="text-black">Job Opportunity</option>
            </select>
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-widest text-white/60">Message</span>
            <textarea
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
  const typology = [
    "Plots in Bangalore",
    "Plots in Penukonda",
    "Plots in Devanahalli",
    "Flats in Bangalore",
    "Flats in Devanahalli",
  ];
  const quick = ["Join Our Team", "Refer & Earn", "Become Our Partner"];
  const socials = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Youtube, href: "#" },
    { icon: MessageCircle, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" },
  ];
  return (
    <footer className="bg-black py-16 text-white/80">
      <div className="container-x grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo dark />
          <p className="mt-6 max-w-xs text-sm text-white/60">
            Complete Living Solutions — building trust, homes and landmarks across South India.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
                aria-label="social"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <FooterCol title="Services" items={services} />
        <FooterCol title="Typology" items={typology} />
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
              <a href="mailto:info@vinragroup.com" className="hover:text-[color:var(--gold)]">
                info@vinragroup.com
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
        <div>© {new Date().getFullYear()} Vinra Group. All rights reserved.</div>
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

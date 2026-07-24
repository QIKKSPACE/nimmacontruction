import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Phone, Mail, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import heroImg from "@/assets/about/about-hero.jpg";
import founderImg from "@/assets/about/about-founder.jpg";
import site1 from "@/assets/about/about-site-1.jpg";
import site2 from "@/assets/about/about-site-2.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Nimmametro Constructions" },
      {
        name: "description",
        content:
          "Nimmametro Constructions is a trusted plotted development and land development company in Karnataka with 10+ years of experience, 74+ completed projects and presence across 14+ districts.",
      },
      { property: "og:title", content: "About Us | Nimmametro Constructions" },
      {
        property: "og:description",
        content:
          "Transforming raw land into well-planned residential layouts, farmland projects and infrastructure-ready developments across Karnataka.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const stats = [
  { n: "10+", l: "Years of Experience" },
  { n: "74+", l: "Completed Projects" },
  { n: "14+", l: "Districts in Karnataka" },
];

const whyChoose = [
  "10+ Years of Industry Experience",
  "74+ Successfully Completed Projects",
  "Presence Across 14+ Districts in Karnataka",
  "End-to-End Land Development Solutions",
  "Experienced Engineering & Project Management Team",
  "Quality Construction Materials & Modern Equipment",
  "On-Time Project Delivery",
  "Transparent Business Practices",
  "Customized Solutions for Projects from 1 Acre to 100+ Acres",
];

const mission = [
  "Deliver high-quality plotted and farmland developments.",
  "Provide complete turnkey land development solutions.",
  "Ensure timely project completion without compromising quality.",
  "Build long-term relationships through transparency and customer satisfaction.",
  "Develop modern infrastructure that supports future-ready communities.",
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative isolate">
        <img
          src={heroImg}
          alt="Nimmametro plotted development aerial view"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="container-x relative flex min-h-[60vh] flex-col justify-center py-20 text-white">
          <p className="eyebrow">Who we are</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
            About Nimmametro Constructions
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/85">
            A trusted plotted development and land development company transforming raw land into
            well-planned, infrastructure-ready communities across Karnataka.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow">Our story</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">
              Building Karnataka, one responsible development at a time
            </h2>
            <p className="mt-6 text-muted-foreground">
              Nimmametro Constructions is a trusted plotted development and land development company
              with over 10 years of industry experience. We specialize in transforming raw land
              into well-planned residential layouts, farmland projects, and infrastructure-ready
              developments across Karnataka.
            </p>
            <p className="mt-4 text-muted-foreground">
              With a strong presence in 14+ districts and a successful portfolio of 74+ completed
              projects, we have earned a reputation for quality, transparency, and timely project
              execution. Our expertise covers every stage of land development, from legal approvals
              and planning to infrastructure development and final handover.
            </p>
            <p className="mt-4 text-muted-foreground">
              Whether it is a 1-acre residential project or a 100+ acre township, our experienced
              team delivers innovative planning, superior construction quality, and sustainable
              infrastructure.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl sm:col-span-2">
              <img
                src={site2}
                alt="Nimmametro completed development entrance"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl">
              <img
                src={site1}
                alt="Nimmametro land development site work"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="rounded-2xl border border-border bg-[color:var(--cream)] p-6">
              <p className="font-display text-4xl text-[color:var(--ink)] md:text-5xl">74+</p>
              <p className="mt-2 text-sm uppercase tracking-widest text-[color:var(--gold)]">
                Projects delivered
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--cream)] py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={founderImg}
                alt="Mr. Beerappa N, Founder of Nimmametro Constructions"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow">Leadership</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">Founded by Mr. Beerappa N</h2>
            <p className="mt-6 text-muted-foreground">
              Nimmametro Constructions was established with a vision to provide landowners and
              developers with a complete end-to-end development solution. Under the leadership of
              Mr. Beerappa N, the company has grown into a reliable partner for plotted
              developments, farmland projects and large-scale land infrastructure across Karnataka.
            </p>
            <p className="mt-4 text-muted-foreground">
              We are committed to creating organized, modern, and environmentally responsible
              communities that improve the quality of life for citizens while maximizing the value
              of every development.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <p className="eyebrow">Purpose</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">Vision & Mission</h2>
              <p className="mt-6 text-muted-foreground">
                Our vision drives every project we undertake, while our mission keeps us accountable
                to the landowners, partners and communities we serve.
              </p>
            </div>
            <div className="lg:col-span-2 grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-8">
                <h3 className="font-display text-2xl">Our Vision</h3>
                <p className="mt-4 text-muted-foreground">
                  To become Karnataka's most trusted land development company by delivering
                  world-class infrastructure, creating sustainable communities, and providing
                  complete land development solutions with quality, integrity, and innovation.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-8">
                <h3 className="font-display text-2xl">Our Mission</h3>
                <ul className="mt-4 space-y-3">
                  {mission.map((m) => (
                    <li key={m} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--gold)]" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--ink)] py-20 text-white">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Why us</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">
              Why Choose Nimmametro Constructions?
            </h2>
            <p className="mt-6 text-white/70">
              We combine experience, transparency and end-to-end execution to deliver developments
              that stand the test of time.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border border-white/10 p-5"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[color:var(--gold)]" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 grid gap-6 border-t border-white/10 pt-12 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.l} className="text-center">
                <div className="font-display text-4xl text-[color:var(--gold)] md:text-5xl">
                  {s.n}
                </div>
                <div className="mt-2 text-sm uppercase tracking-widest text-white/70">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow">Get started</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">
                Ready to develop your land?
              </h2>
              <p className="mt-6 text-muted-foreground">
                From a 1-acre plot to a 100+ acre township, our team is ready to guide your project
                from planning to handover. Let's discuss how Nimmametro Constructions can bring
                your vision to life.
              </p>
              <div className="mt-8 space-y-3 text-sm">
                <a href="tel:+918884898765" className="flex items-center gap-2 hover:text-[color:var(--gold)]">
                  <Phone className="h-4 w-4 text-[color:var(--gold)]" /> 888-4898-765
                </a>
                <a href="mailto:info@nimmametro.com" className="flex items-center gap-2 hover:text-[color:var(--gold)]">
                  <Mail className="h-4 w-4 text-[color:var(--gold)]" /> info@nimmametro.com
                </a>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--gold)]" />
                  No-34-1 First Floor Promenade, Sivanchetti Gardens, Bengaluru 560042
                </div>
              </div>
              <Link
                to="/"
                hash="contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--ink)] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--gold)] hover:text-[color:var(--gold-foreground)]"
              >
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="overflow-hidden rounded-2xl">
              <img
                src={site1}
                alt="Nimmametro active land development site"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

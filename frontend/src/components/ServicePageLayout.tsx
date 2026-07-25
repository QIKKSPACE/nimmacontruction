import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Phone, Mail } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { serviceList } from "@/data/service-list";

export type ServicePageProps = {
  slug: string;
  title: string;
  tagline: string;
  intro: string;
  heroImg: string;
  gallery: string[];
  features: string[];
  process: { step: string; detail: string }[];
};

export function ServicePageLayout(props: ServicePageProps) {
  const others = serviceList.filter((s) => s.slug !== props.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative isolate">
        <img src={props.heroImg} alt={props.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="container-x relative flex min-h-[60vh] flex-col justify-center py-20 text-white">
          <p className="eyebrow">Our Services</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight md:text-6xl">{props.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/85">{props.tagline}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="eyebrow">Overview</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">What we deliver</h2>
            <p className="mt-6 text-lg text-muted-foreground">{props.intro}</p>
          </div>
          <aside className="rounded-2xl border border-border bg-[color:var(--cream)] p-8">
            <h3 className="font-display text-xl">Talk to our team</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Get a scoping call and a preliminary estimate for your project.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <a href="tel:+918884898765" className="flex items-center gap-2 hover:text-[color:var(--gold)]">
                <Phone className="h-4 w-4 text-[color:var(--gold)]" /> 888-4898-765
              </a>
              <a href="mailto:info@nimmametro.com" className="flex items-center gap-2 hover:text-[color:var(--gold)]">
                <Mail className="h-4 w-4 text-[color:var(--gold)]" /> info@nimmametro.com
              </a>
            </div>
            <Link
              to="/"
              hash="contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[color:var(--ink)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--gold)] hover:text-[color:var(--gold-foreground)]"
            >
              Request Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="bg-[color:var(--cream)] py-20">
        <div className="container-x">
          <p className="eyebrow">Capabilities</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">What's included</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {props.features.map((f) => (
              <div key={f} className="flex items-start gap-3 rounded-xl bg-card p-5 ring-1 ring-border">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[color:var(--gold)]" />
                <span className="text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <p className="eyebrow">Gallery</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">On site</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {props.gallery.map((g, i) => (
              <div key={i} className="aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src={g}
                  alt={`${props.title} ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--ink)] py-20 text-white">
        <div className="container-x">
          <p className="eyebrow">How we work</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Our process</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {props.process.map((p, i) => (
              <div key={p.step} className="relative rounded-2xl border border-white/10 p-6">
                <div className="font-display text-4xl text-[color:var(--gold)]">0{i + 1}</div>
                <h3 className="mt-3 font-display text-lg">{p.step}</h3>
                <p className="mt-3 text-sm text-white/70">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">Explore more</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">Other services</h2>
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={o.to}
                className="group overflow-hidden rounded-2xl bg-card ring-1 ring-border transition hover:shadow-xl"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={o.img}
                    alt={o.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg">{o.title}</h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--gold)]">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

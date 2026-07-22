import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { serviceList } from "@/data/service-list";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Land Development Services | Vinra Group" },
      {
        name: "description",
        content:
          "End-to-end land development — plotted layouts, farmlands, roads, drainage, water, power, landscape and more.",
      },
      { property: "og:title", content: "Land Development Services | Vinra Group" },
      {
        property: "og:description",
        content: "Explore our full suite of land development capabilities across South India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="bg-[color:var(--ink)] py-20 text-white">
        <div className="container-x">
          <p className="eyebrow">What we do</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl md:text-6xl">
            End-to-End Land Development Services
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">
            From master planning to the last streetlight — a single accountable partner
            for every stage of a modern land development project.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {serviceList.map((s) => (
            <Link
              key={s.slug}
              to={s.to}
              className="group overflow-hidden rounded-2xl bg-card ring-1 ring-border transition hover:shadow-xl"
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
                <h3 className="font-display text-xl">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--gold)]">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

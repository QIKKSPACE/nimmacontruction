import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { farmlandProjects } from "@/data/projects-data";

export const Route = createFileRoute("/projects/farmland-development")({
  head: () => ({
    meta: [{ title: "Farmland Development Projects | Nimma Metro" }],
  }),
  component: FarmlandProjectsPage,
});

function FarmlandProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="py-12">
        <div className="container-x">
          <div className="border-b border-border pb-6">
            <h1 className="font-display text-3xl font-bold md:text-4xl">Farmland Development Projects</h1>
            <p className="mt-2 text-muted-foreground">Explore our completed and ongoing managed farmland projects.</p>
          </div>

          {/* Project Grid */}
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {farmlandProjects.map((p) => (
              <div
                key={p.id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-border shadow-md transition-all duration-300 hover:shadow-xl hover:ring-[color:var(--gold)]/50"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <span
                    className={`absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur ${
                      p.status === "Completed"
                        ? "bg-emerald-600/90"
                        : "bg-[color:var(--gold)]/90 text-black"
                    }`}
                  >
                    {p.status}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="flex items-center gap-1.5 text-xs text-white/80">
                      <MapPin className="h-3.5 w-3.5 text-[color:var(--gold)]" />
                      {p.location} • {p.subLocation}
                    </span>
                    <h3 className="mt-1 font-display text-xl font-bold">{p.name}</h3>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    {/* Key Specs */}
                    <div className="grid grid-cols-3 gap-2 rounded-xl bg-muted/60 p-3 text-center">
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-muted-foreground">Price</span>
                        <span className="font-semibold text-xs text-[color:var(--gold)]">{p.price}</span>
                      </div>
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-muted-foreground">Units</span>
                        <span className="font-semibold text-xs">{p.units}</span>
                      </div>
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-muted-foreground">Farm Size</span>
                        <span className="font-semibold text-[11px] leading-tight">{p.sizeRange}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mt-5">
                      <ul className="space-y-2">
                        {p.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-foreground/80">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[color:var(--gold)]" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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
              </div>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

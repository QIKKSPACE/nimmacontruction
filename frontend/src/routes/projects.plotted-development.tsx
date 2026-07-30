import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { MapPin, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchPlottedProjects, type ProjectItem } from "@/data/projects-data";

export const Route = createFileRoute("/projects/plotted-development")({
  head: () => ({
    meta: [{ title: "Plotted Development Projects | Nimmametro Constructions" }],
  }),
  component: PlottedProjectsPage,
});

function PlottedProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlottedProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="py-12">
        <div className="container-x">
          <div className="border-b border-border pb-6">
            <h1 className="font-display text-3xl font-bold md:text-4xl">Plotted Development Projects</h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              At Nimmametro Constructions, every project reflects our commitment to quality, precision, and timely execution. We transform raw land into well-planned residential layouts, farmland developments, and infrastructure-ready communities.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="h-8 w-8 animate-spin text-[color:var(--gold)]" />
              <span className="ml-3 text-muted-foreground">Loading projects...</span>
            </div>
          ) : projects.length === 0 ? (
            <div className="py-24 text-center text-muted-foreground">
              <p className="text-lg">No plotted development projects available yet.</p>
              <p className="mt-2 text-sm">Check back soon for new listings!</p>
            </div>
          ) : (
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
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
                      {/* Highlights */}
                      <div>
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
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

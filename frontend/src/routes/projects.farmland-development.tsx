import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MapPin, CheckCircle2, ArrowRight, Loader2, Youtube, Instagram, Link as LinkIcon, Ruler } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchFarmlandProjects, type ProjectItem } from "@/data/projects-data";



export default function FarmlandProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFarmlandProjects().then((data) => {
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
            <h1 className="font-display text-3xl font-bold md:text-4xl">Farmland Development Projects</h1>
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
              <p className="text-lg">No farmland development projects available yet.</p>
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

                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      {/* Name & Location */}
                      <h3 className="font-display text-xl font-bold">{p.name}</h3>
                      <p className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-4 w-4 text-[color:var(--gold)] flex-shrink-0" />
                        {p.location} {p.subLocation ? `• ${p.subLocation}` : ''}
                      </p>
                      {p.developmentArea && (
                        <p className="mt-1.5 flex items-start gap-1.5 text-xs text-muted-foreground">
                          <Ruler className="text-[color:var(--gold)] flex-shrink-0 h-4 w-4" />
                          {p.developmentArea.replace(/acres?/i, '').trim()} Acres Development
                        </p>
                      )}

                      {/* Completed Works Preview */}
                      {p.infrastructureWorks && p.infrastructureWorks.length > 0 && (
                        <div className="mt-4">
                          <strong className="block text-xs uppercase tracking-wider text-foreground mb-2">Completed Works</strong>
                          <ul className="space-y-1.5">
                            {p.infrastructureWorks.slice(0, 5).map((work, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-foreground/80">
                                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[color:var(--gold)]" />
                                <span>{work}</span>
                              </li>
                            ))}
                            {p.infrastructureWorks.length > 5 && (
                              <li className="text-xs text-muted-foreground pl-5 italic">+ {p.infrastructureWorks.length - 5} more</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 border-t border-border pt-4">
                      {/* Media Links */}
                      {(p.googleMap || p.youtubeVideo || p.instagramVideo) && (
                        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs">
                          {p.googleMap && (
                            <a href={p.googleMap} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[color:var(--gold)] hover:underline">
                              <LinkIcon className="h-3.5 w-3.5" /> View Location
                            </a>
                          )}
                          {(p.googleMap && (p.youtubeVideo || p.instagramVideo)) && <span className="text-border">|</span>}
                          {p.youtubeVideo && (
                            <a href={p.youtubeVideo} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-red-500 hover:underline">
                              <Youtube className="h-3.5 w-3.5" /> Watch Video
                            </a>
                          )}
                          {(!p.youtubeVideo && p.instagramVideo) && (
                            <a href={p.instagramVideo} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-pink-500 hover:underline">
                              <Instagram className="h-3.5 w-3.5" /> Watch Video
                            </a>
                          )}
                        </div>
                      )}
                      
                      <Link
                        to={`/projects/${p.id }`}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--ink)] py-2.5 text-xs font-semibold text-white transition hover:bg-[color:var(--gold)] hover:text-black"
                      >
                        View Project Details <ArrowRight className="h-3.5 w-3.5" />
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

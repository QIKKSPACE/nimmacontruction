import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  MapPin,
  CheckCircle2,
  ArrowLeft,
  Phone,
  Mail,
  Building2,
  Trees,
  ShieldCheck,
  ArrowRight,
  Loader2,
  Youtube,
  Instagram,
  Link as LinkIcon,
  Ruler
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchProjectById, type ProjectItem } from "@/data/projects-data";

export const Route = createFileRoute("/projects/$id")({
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { id } = Route.useParams();
  const [project, setProject] = useState<ProjectItem | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectById(id).then((data) => {
      setProject(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
        <SiteHeader />
        <div className="container-x py-24 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[color:var(--gold)]" />
          <span className="ml-3 text-muted-foreground">Loading project details...</span>
        </div>
        <SiteFooter />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
        <SiteHeader />
        <div className="container-x py-24 text-center">
          <h1 className="text-4xl font-bold font-display">Project Not Found</h1>
          <p className="mt-4 text-muted-foreground">The project you are looking for does not exist.</p>
          <Link
            to="/projects/plotted-development"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[color:var(--ink)] px-6 py-2.5 text-sm font-semibold text-white"
          >
            <ArrowLeft className="h-4 w-4" /> View Plotted Projects
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const backLink =
    project.category === "plotted"
      ? "/projects/plotted-development"
      : "/projects/farmland-development";

  const backLabel =
    project.category === "plotted"
      ? "Plotted Development Projects"
      : "Farmland Development Projects";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="py-10">
        <div className="container-x">
          {/* Breadcrumb / Back Link */}
          <div className="mb-6">
            <Link
              to={backLink}
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-[color:var(--gold)]"
            >
              <ArrowLeft className="h-4 w-4" /> Back to {backLabel}
            </Link>
          </div>

          <div className="flex flex-col gap-4 border-b border-border pb-8">
            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white ${
                  project.status === "Completed"
                    ? "bg-emerald-600"
                    : "bg-[color:var(--gold)] text-black"
                }`}
              >
                {project.status}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                {project.category === "plotted" ? (
                  <Building2 className="h-3.5 w-3.5 text-[color:var(--gold)]" />
                ) : (
                  <Trees className="h-3.5 w-3.5 text-[color:var(--gold)]" />
                )}
                {project.category === "plotted" ? "Plotted Development" : "Farmland Development"}
              </span>
            </div>
            
            <h1 className="mt-2 font-display text-3xl font-bold md:text-5xl">{project.name}</h1>
            
            <div className="mt-4 grid gap-4 sm:grid-cols-2 text-sm text-muted-foreground">
              <div>
                <strong className="block text-foreground mb-1">Project Location</strong>
                <p className="flex items-start gap-1.5">
                  <MapPin className="h-4 w-4 text-[color:var(--gold)] flex-shrink-0 mt-0.5" />
                  Location: {project.location} {project.subLocation ? `• ${project.subLocation}` : ''}
                </p>
              </div>
              
              {project.developmentArea && (
                <div>
                  <strong className="block text-foreground mb-1">Project Size</strong>
                  <p className="flex items-start gap-1.5">
                    <Ruler className="text-[color:var(--gold)] flex-shrink-0 mt-0.5 h-4 w-4" />
                    Development Area: {project.developmentArea}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2 aspect-[16/10] overflow-hidden rounded-2xl bg-muted ring-1 ring-border">
              <img
                src={project.img}
                alt={project.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-4">
              {project.gallery.slice(1, 3).map((g, i) => (
                <div key={i} className="aspect-[16/10] overflow-hidden rounded-2xl bg-muted ring-1 ring-border flex-1">
                  <img src={g} alt={`${project.name} ${i + 2}`} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Details & Sidebar Grid */}
          <div className="mt-12 grid gap-12 lg:grid-cols-3">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Overview */}
              <div>
                <h2 className="font-display text-2xl font-bold">Project Overview</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{project.description}</p>
              </div>

              {/* Location & Media */}
              {(project.googleMap || project.youtubeVideo || project.instagramVideo) && (
                <div>
                  <h3 className="font-display text-xl font-bold">Location & Media</h3>
                  <div className="mt-4 flex flex-col gap-3">
                    {project.googleMap && (
                      <a href={project.googleMap} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[color:var(--gold)] hover:underline">
                        <LinkIcon className="h-4 w-4" /> Google Map Location
                      </a>
                    )}
                    {project.youtubeVideo && (
                      <a href={project.youtubeVideo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-red-500 hover:underline">
                        <Youtube className="h-4 w-4" /> YouTube Project Video
                      </a>
                    )}
                    {project.instagramVideo && (
                      <a href={project.instagramVideo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-pink-500 hover:underline">
                        <Instagram className="h-4 w-4" /> Instagram Project Video
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Infrastructure & Construction Works Completed */}
              {project.infrastructureWorks && project.infrastructureWorks.length > 0 && (
                <div>
                  <h3 className="font-display text-xl font-bold">Infrastructure & Construction Works Completed</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {project.infrastructureWorks.map((work, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[color:var(--gold)]" />
                        <span className="text-sm font-medium">{work}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar - Contact Form */}
            <aside className="space-y-6">
              <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-lg">
                <h3 className="font-display text-xl font-bold">Interested in {project.name}?</h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  Get full layout plans, pricing sheets, and arrange a private site visit.
                </p>

                <div className="mt-6 space-y-4 text-sm">
                  <a
                    href="tel:+918884898765"
                    className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 p-3 font-semibold transition hover:border-[color:var(--gold)]"
                  >
                    <Phone className="h-4 w-4 text-[color:var(--gold)]" /> 888-4898-765
                  </a>
                  <a
                    href="mailto:info@nimmametro.com"
                    className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 p-3 font-semibold transition hover:border-[color:var(--gold)]"
                  >
                    <Mail className="h-4 w-4 text-[color:var(--gold)]" /> info@nimmametro.com
                  </a>
                </div>

                <div className="mt-6 border-t border-border pt-6">
                  <Link
                    to="/"
                    hash="contact"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--gold)] py-3 text-sm font-bold text-black transition hover:bg-[color:var(--gold)]/90"
                  >
                    Book A Site Visit <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

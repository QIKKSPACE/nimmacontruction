import { Link, useParams } from "react-router-dom";
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
  Ruler,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchProjectById, type ProjectItem } from "@/data/projects-data";



export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectItem | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

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

  // Gather all unique uploaded project images
  const rawImages = [
    ...(project.gallery && project.gallery.length > 0 ? project.gallery : []),
    project.img
  ].filter((url): url is string => Boolean(url && url.trim()));

  const allImages = Array.from(new Set(rawImages));

  const backLink =
    project.category === "plotted"
      ? "/projects/plotted-development"
      : project.category === "farmland"
      ? "/projects/farmland-development"
      : "/projects/other-development";

  const backLabel =
    project.category === "plotted"
      ? "Plotted Development Projects"
      : project.category === "farmland"
      ? "Farmland Development Projects"
      : "Other Development Projects";

  const handlePrevImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev === 0 ? allImages.length - 1 : (prev as number) - 1));
  };

  const handleNextImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev === allImages.length - 1 ? 0 : (prev as number) + 1));
  };

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
                {project.category === "plotted"
                  ? "Plotted Development"
                  : project.category === "farmland"
                  ? "Farmland Development"
                  : "Other Development"}
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

          {/* Square Image Gallery (All Images) */}
          {allImages.length > 0 && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-bold">Project Photos</h2>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                  {allImages.length} {allImages.length === 1 ? "Image" : "Images"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 sm:gap-4">
                {allImages.map((imgUrl, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className="group relative aspect-square overflow-hidden rounded-2xl bg-muted ring-1 ring-border shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:ring-[color:var(--gold)] cursor-pointer"
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.name} photo ${i + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 bg-black/75 text-white text-xs px-3 py-1.5 rounded-full font-medium backdrop-blur-sm flex items-center gap-1.5 shadow-lg">
                        <Maximize2 className="h-3.5 w-3.5 text-[color:var(--gold)]" /> View Full
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lightbox Modal */}
          {selectedImageIndex !== null && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
              onClick={() => setSelectedImageIndex(null)}
            >
              <div
                className="relative max-h-[90vh] max-w-[90vw] flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImageIndex(null)}
                  className="absolute -top-12 right-0 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 focus:outline-none"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl">
                  <img
                    src={allImages[selectedImageIndex]}
                    alt={`${project.name} large preview ${selectedImageIndex + 1}`}
                    className="max-h-[80vh] max-w-[85vw] object-contain"
                  />
                </div>

                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white backdrop-blur-sm transition hover:bg-black/80 hover:scale-110 focus:outline-none"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white backdrop-blur-sm transition hover:bg-black/80 hover:scale-110 focus:outline-none"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>

                    <div className="mt-3 text-xs font-semibold tracking-wider text-white/80">
                      {selectedImageIndex + 1} / {allImages.length}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

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
                  Get Layout Development Consultation & Pricing — Schedule a Site Visit.
                </p>

                <div className="mt-6 space-y-4 text-sm">
                  <a
                    href="tel:+919148806063"
                    className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 p-3 font-semibold transition hover:border-[color:var(--gold)]"
                  >
                    <Phone className="h-4 w-4 text-[color:var(--gold)]" /> +91 91488 06063
                  </a>
                  <a
                    href="mailto:constructions@nimmametro.com"
                    className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 p-3 font-semibold transition hover:border-[color:var(--gold)]"
                  >
                    <Mail className="h-4 w-4 text-[color:var(--gold)]" /> constructions@nimmametro.com
                  </a>
                </div>

                <div className="mt-6 border-t border-border pt-6">
                  <Link
                    to="/#contact"
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

import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import img1 from "@/assets/svc/survey-1.jpg";
import img2 from "@/assets/svc/plotted-1.jpg";
import img3 from "@/assets/svc/landscape-1.jpg";

const TITLE = "Architectural Planning";
const TAGLINE = "Layout Architecture, Development Planning, Layout Planning & Site Planning.";

export const Route = createFileRoute("/services/architectural-planning")({
  head: () => ({
    meta: [
      { title: `${TITLE} | Nimmametro Constructions` },
      { name: "description", content: TAGLINE },
      { property: "og:title", content: `${TITLE} | Nimmametro Constructions` },
      { property: "og:description", content: TAGLINE },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ServicePageLayout
      slug="architectural-planning"
      title={TITLE}
      tagline={TAGLINE}
      intro="Creating well-planned layouts with smart space utilization, functional designs, strategic land development planning, optimized roads, amenities, and site potential analysis."
      heroImg={img1}
      gallery={[img1, img2, img3]}
      features={[
        "Layout Architecture",
        "Development Planning",
        "Layout Planning",
        "Site Planning",
      ]}
      process={[]}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 ring-1 ring-black/5">
          <h3 className="font-display text-xl text-[color:var(--gold)]">Layout Architecture</h3>
          <p className="mt-2 text-muted-foreground">Creating well-planned layouts with smart space utilization, functional designs, and aesthetic development concepts.</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 ring-1 ring-black/5">
          <h3 className="font-display text-xl text-[color:var(--gold)]">Development Planning</h3>
          <p className="mt-2 text-muted-foreground">Strategic planning of land development projects with proper infrastructure, zoning, and sustainable growth solutions.</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 ring-1 ring-black/5">
          <h3 className="font-display text-xl text-[color:var(--gold)]">Layout Planning</h3>
          <p className="mt-2 text-muted-foreground">Designing efficient residential layouts and farmland developments with optimized plots, roads, amenities, and open spaces.</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 ring-1 ring-black/5">
          <h3 className="font-display text-xl text-[color:var(--gold)]">Site Planning</h3>
          <p className="mt-2 text-muted-foreground">Analyzing land potential and planning site elements for better accessibility, functionality, and future development.</p>
        </div>
      </div>
    </ServicePageLayout>
  );
}

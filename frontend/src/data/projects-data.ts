const API_URL = "http://localhost/nimmabackend/api/projects.php";

export type ProjectItem = {
  id: string;
  name: string;
  category: "plotted" | "farmland";
  location: string;
  subLocation: string;
  status: "Completed" | "Ongoing" | "Upcoming";
  img: string;
  gallery: string[];
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  amenities: string[];
};

// Fetch all projects from DB
export async function fetchAllProjects(): Promise<ProjectItem[]> {
  try {
    const res = await fetch(API_URL);
    const json = await res.json();
    if (json.status && Array.isArray(json.data)) {
      return json.data.map((p: any) => ({
        id: p.id,
        name: p.name,
        category: p.category || "plotted",
        location: p.location || "",
        subLocation: p.subLocation || p.sub_location || "",
        status: p.status || "Completed",
        img: p.img || "",
        gallery: Array.isArray(p.gallery) ? p.gallery : [],
        description: p.description || "",
        highlights: Array.isArray(p.highlights) ? p.highlights : [],
        specs: Array.isArray(p.specs) ? p.specs : [],
        amenities: Array.isArray(p.amenities) ? p.amenities : [],
      }));
    }
    return [];
  } catch (err) {
    console.error("Failed to fetch projects from DB:", err);
    return [];
  }
}

// Fetch only plotted projects
export async function fetchPlottedProjects(): Promise<ProjectItem[]> {
  const all = await fetchAllProjects();
  return all.filter((p) => p.category === "plotted");
}

// Fetch only farmland projects
export async function fetchFarmlandProjects(): Promise<ProjectItem[]> {
  const all = await fetchAllProjects();
  return all.filter((p) => p.category === "farmland");
}

// Fetch single project by ID
export async function fetchProjectById(id: string): Promise<ProjectItem | undefined> {
  const all = await fetchAllProjects();
  return all.find((p) => p.id === id);
}

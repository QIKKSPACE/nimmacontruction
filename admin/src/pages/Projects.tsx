import React, { useState } from "react";
import type { Project } from "../types";
import {
  Plus,
  Search,
  Building2,
  TreePine,
  MapPin,
  Edit2,
  Trash2,
  Filter,
} from "lucide-react";

type ProjectsProps = {
  projects: Project[];
  onOpenAddProject: () => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
};

export const Projects: React.FC<ProjectsProps> = ({
  projects,
  onOpenAddProject,
  onEditProject,
  onDeleteProject,
}) => {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "28px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#fff" }}>
            Projects Management
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "4px" }}>
            Upload, manage, and inspect Plotted Developments &amp; Farmland / Land Projects.
          </p>
        </div>

        <button className="btn btn-primary" onClick={onOpenAddProject}>
          <Plus size={18} /> Upload New Project
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "28px",
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ position: "relative", minWidth: "280px", flex: 1 }}>
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: "40px" }}
            placeholder="Search by project name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search
            size={18}
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Filter size={16} color="var(--gold)" />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)" }}>
            Category:
          </span>
          <button
            className={`btn ${filterCategory === "all" ? "btn-primary" : "btn-secondary"} btn-sm`}
            onClick={() => setFilterCategory("all")}
          >
            All Projects ({projects.length})
          </button>
          <button
            className={`btn ${filterCategory === "plotted" ? "btn-primary" : "btn-secondary"} btn-sm`}
            onClick={() => setFilterCategory("plotted")}
          >
            <Building2 size={14} /> Plotted ({projects.filter((p) => p.category === "plotted").length})
          </button>
          <button
            className={`btn ${filterCategory === "farmland" ? "btn-primary" : "btn-secondary"} btn-sm`}
            onClick={() => setFilterCategory("farmland")}
          >
            <TreePine size={14} /> Land / Farmland ({projects.filter((p) => p.category === "farmland").length})
          </button>
          <button
            className={`btn ${filterCategory === "other" ? "btn-primary" : "btn-secondary"} btn-sm`}
            onClick={() => setFilterCategory("other")}
          >
            <Building2 size={14} /> Other Dev ({projects.filter((p) => p.category === "other").length})
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      {filtered.length === 0 ? (
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px dashed var(--border)",
            borderRadius: "18px",
            padding: "48px 24px",
            textAlign: "center",
          }}
        >
          <Building2 size={48} color="var(--gold)" style={{ margin: "0 auto 16px", opacity: 0.8 }} />
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff" }}>No Projects Found</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "4px" }}>
            No projects match the current search filter. Try adding a new project!
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {filtered.map((p) => (
            <div key={p.id} className="project-card">
              <div className="project-card-image">
                <img
                  src={p.img}
                  alt={p.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  <span
                    className={`badge ${
                      p.category === "plotted"
                        ? "badge-plotted"
                        : p.category === "farmland"
                        ? "badge-farmland"
                        : "badge-info"
                    }`}
                  >
                    {p.category === "plotted"
                      ? "Plotted Dev"
                      : p.category === "farmland"
                      ? "Farmland Dev"
                      : "Other Dev"}
                  </span>
                </div>
              <span
                className={`badge ${
                  p.status === "Completed"
                    ? "badge-completed"
                    : p.status === "Ongoing"
                    ? "badge-ongoing"
                    : "badge-upcoming"
                }`}
                style={{ position: "absolute", top: "12px", right: "12px" }}
              >
                {p.status}
              </span>
            </div>

            <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    marginBottom: "6px",
                  }}
                >
                  <MapPin size={14} color="var(--gold)" /> {p.location} • {p.subLocation}
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#fff", margin: "0 0 10px" }}>
                  {p.name}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--text-muted)",
                    lineHeight: "1.5",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {p.description}
                </p>
              </div>

              <div
                style={{
                  marginTop: "20px",
                  paddingTop: "16px",
                  borderTop: "1px solid var(--border)",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1, justifyContent: "center" }}
                  onClick={() => onEditProject(p)}
                >
                  <Edit2 size={14} /> Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                      onDeleteProject(p.id);
                    }
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

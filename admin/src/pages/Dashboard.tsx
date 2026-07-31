import React from "react";
import { Link } from "react-router-dom";
import type { Project, Enquiry } from "../types";
import {
  Building2,
  TreePine,
  MessageSquare,
  Clock,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  MapPin,
  Eye,
} from "lucide-react";

type DashboardProps = {
  projects: Project[];
  enquiries: Enquiry[];
  onOpenAddProject: () => void;
  onViewEnquiry: (enquiry: Enquiry) => void;
};

export const Dashboard: React.FC<DashboardProps> = ({
  projects,
  enquiries,
  onOpenAddProject,
  onViewEnquiry,
}) => {
  const plottedCount = projects.filter((p) => p.category === "plotted").length;
  const farmlandCount = projects.filter((p) => p.category === "farmland").length;
  const newEnquiriesCount = enquiries.filter((e) => e.status === "New").length;

  return (
    <div>
      {/* Welcome Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(30, 41, 59, 1), rgba(15, 23, 42, 1))",
          border: "1px solid var(--border)",
          borderRadius: "20px",
          padding: "28px",
          marginBottom: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(234, 179, 8, 0.15)",
              color: "var(--gold)",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "700",
              marginBottom: "10px",
            }}
          >
            <TrendingUp size={14} /> System Active
          </div>
          <h2 style={{ fontSize: "26px", fontWeight: "800", color: "#fff", margin: 0 }}>
            Nimmametro Constructions Admin Control Panel
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "6px" }}>
            Manage plotted developments, farmland projects, layout content, and customer contact inquiries.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button className="btn btn-primary" onClick={onOpenAddProject}>
            <PlusCircle size={18} /> Upload New Project
          </button>
          <Link to="/enquiries" className="btn btn-secondary">
            <MessageSquare size={18} /> View Enquiries ({newEnquiriesCount})
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "rgba(234, 179, 8, 0.15)", color: "var(--gold)" }}>
            <Building2 size={26} />
          </div>
          <div>
            <div className="stat-val">{projects.length}</div>
            <div className="stat-lbl">Total Active Projects</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "rgba(59, 130, 246, 0.15)", color: "#60a5fa" }}>
            <Building2 size={26} />
          </div>
          <div>
            <div className="stat-val">{plottedCount}</div>
            <div className="stat-lbl">Plotted Development Projects</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#34d399" }}>
            <TreePine size={26} />
          </div>
          <div>
            <div className="stat-val">{farmlandCount}</div>
            <div className="stat-lbl">Farmland / Land Projects</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "rgba(239, 68, 68, 0.15)", color: "#f87171" }}>
            <Clock size={26} />
          </div>
          <div>
            <div className="stat-val">{newEnquiriesCount}</div>
            <div className="stat-lbl">New Pending Enquiries</div>
          </div>
        </div>
      </div>

      {/* Grid of Recent Data */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }}>
        {/* Recent Enquiries Table */}
        <div className="table-container" style={{ padding: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#fff" }}>
              Recent Contact Enquiries
            </h3>
            <Link
              to="/enquiries"
              style={{
                color: "var(--gold)",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Service</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.slice(0, 5).map((e) => (
                <tr key={e.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: "#fff" }}>{e.name}</div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                      {e.phone}
                    </div>
                  </td>
                  <td style={{ fontSize: "13px" }}>{e.service}</td>
                  <td>
                    <span
                      className={`badge ${
                        e.status === "New"
                          ? "badge-new"
                          : e.status === "Contacted"
                          ? "badge-contacted"
                          : "badge-resolved"
                      }`}
                    >
                      {e.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => onViewEnquiry(e)}
                    >
                      <Eye size={14} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Projects List */}
        <div className="table-container" style={{ padding: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#fff" }}>
              Live Projects Overview
            </h3>
            <Link
              to="/projects"
              style={{
                color: "var(--gold)",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              Manage Projects <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {projects.slice(0, 4).map((p) => (
              <div
                key={p.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "12px",
                  borderRadius: "12px",
                  backgroundColor: "#0f172a",
                  border: "1px solid var(--border)",
                }}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: "14px", color: "#fff" }}>
                    {p.name}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--text-muted)",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      marginTop: "2px",
                    }}
                  >
                    <MapPin size={12} color="var(--gold)" /> {p.location}
                  </div>
                </div>
                <span
                  className={`badge ${
                    p.category === "plotted" ? "badge-plotted" : "badge-farmland"
                  }`}
                >
                  {p.category === "plotted" ? "Plotted" : "Farmland"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import type { Enquiry, EnquiryStatus } from "../types";
import { Search, Filter, Phone, Mail, Clock, Eye, Trash2 } from "lucide-react";

type EnquiriesProps = {
  enquiries: Enquiry[];
  onViewEnquiry: (enquiry: Enquiry) => void;
  onUpdateStatus: (id: string, status: EnquiryStatus) => void;
  onDeleteEnquiry: (id: string) => void;
};

export const Enquiries: React.FC<EnquiriesProps> = ({
  enquiries,
  onViewEnquiry,
  onUpdateStatus,
  onDeleteEnquiry,
}) => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filtered = enquiries.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search);
    const matchesStatus = filterStatus === "all" || e.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Header bar */}
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#fff" }}>
          Contact Form Enquiries
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "4px" }}>
          Inspect and manage incoming lead inquiries from website visitors.
        </p>
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
            placeholder="Search by client name, email or phone..."
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
            Status:
          </span>
          <button
            className={`btn ${filterStatus === "all" ? "btn-primary" : "btn-secondary"} btn-sm`}
            onClick={() => setFilterStatus("all")}
          >
            All ({enquiries.length})
          </button>
          <button
            className={`btn ${filterStatus === "New" ? "btn-primary" : "btn-secondary"} btn-sm`}
            onClick={() => setFilterStatus("New")}
          >
            New ({enquiries.filter((e) => e.status === "New").length})
          </button>
          <button
            className={`btn ${filterStatus === "Contacted" ? "btn-primary" : "btn-secondary"} btn-sm`}
            onClick={() => setFilterStatus("Contacted")}
          >
            Contacted ({enquiries.filter((e) => e.status === "Contacted").length})
          </button>
          <button
            className={`btn ${filterStatus === "Resolved" ? "btn-primary" : "btn-secondary"} btn-sm`}
            onClick={() => setFilterStatus("Resolved")}
          >
            Resolved ({enquiries.filter((e) => e.status === "Resolved").length})
          </button>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Client Information</th>
              <th>Service Required</th>
              <th>Submitted Date</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id}>
                <td>
                  <div style={{ fontWeight: 700, color: "#fff", fontSize: "15px" }}>
                    {e.name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      fontSize: "12px",
                      color: "var(--text-muted)",
                      marginTop: "4px",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Phone size={12} color="var(--gold)" /> {e.phone}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Mail size={12} /> {e.email}
                    </span>
                  </div>
                </td>

                <td style={{ fontWeight: 600, fontSize: "14px", color: "var(--gold)" }}>
                  {e.service}
                </td>

                <td style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Clock size={13} /> {e.date}
                  </div>
                </td>

                <td>
                  <select
                    className="form-select"
                    style={{ width: "auto", padding: "4px 8px", fontSize: "12px" }}
                    value={e.status}
                    onChange={(evt) =>
                      onUpdateStatus(e.id, evt.target.value as EnquiryStatus)
                    }
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>

                <td style={{ textAlign: "right" }}>
                  <div style={{ display: "inline-flex", gap: "8px" }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => onViewEnquiry(e)}
                    >
                      <Eye size={14} /> View Details
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        if (confirm(`Delete enquiry from ${e.name}?`)) {
                          onDeleteEnquiry(e.id);
                        }
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

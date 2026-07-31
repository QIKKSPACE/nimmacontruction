import React from "react";
import type { Enquiry, EnquiryStatus } from "../types";
import { X, Phone, Mail, Clock } from "lucide-react";

type EnquiryModalProps = {
  enquiry: Enquiry | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: EnquiryStatus) => void;
};

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  enquiry,
  onClose,
  onUpdateStatus,
}) => {
  if (!enquiry) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600 }}>
              ENQUIRY DETAILS • #{enquiry.id}
            </span>
            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#fff", marginTop: "2px" }}>
              {enquiry.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
            <div style={{ background: "#0f172a", padding: "16px", borderRadius: "12px", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Phone Number</div>
              <a
                href={`tel:${enquiry.phone}`}
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "var(--gold)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "4px",
                }}
              >
                <Phone size={14} /> {enquiry.phone}
              </a>
            </div>

            <div style={{ background: "#0f172a", padding: "16px", borderRadius: "12px", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Email Address</div>
              <a
                href={`mailto:${enquiry.email}`}
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "var(--gold)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "4px",
                }}
              >
                <Mail size={14} /> {enquiry.email}
              </a>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Selected Service / Interest</label>
            <div
              style={{
                background: "#0f172a",
                padding: "12px 16px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                fontSize: "14px",
                fontWeight: 600,
                color: "#fff",
              }}
            >
              {enquiry.service}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Client Message</label>
            <div
              style={{
                background: "#0f172a",
                padding: "16px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                fontSize: "14px",
                lineHeight: "1.6",
                color: "var(--text-main)",
                whiteSpace: "pre-wrap",
              }}
            >
              {enquiry.message}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "var(--text-muted)" }}>
              <Clock size={14} /> Submitted: {enquiry.date}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)" }}>Status:</span>
              <select
                className="form-select"
                style={{ width: "auto", padding: "6px 12px", fontSize: "13px" }}
                value={enquiry.status}
                onChange={(e) => onUpdateStatus(enquiry.id, e.target.value as EnquiryStatus)}
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              onUpdateStatus(enquiry.id, "Contacted");
              window.open(`tel:${enquiry.phone}`);
            }}
          >
            <Phone size={16} /> Call Client Now
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import type { Lead, LeadAttachment } from "../types";
import { 
  X, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  FileText, 
  MessageCircle, 
  ExternalLink, 
  Download, 
  Edit, 
  History, 
  Paperclip
} from "lucide-react";

type LeadViewModalProps = {
  lead: Lead | null;
  onClose: () => void;
  onEdit: (lead: Lead) => void;
};

export const LeadViewModal: React.FC<LeadViewModalProps> = ({
  lead,
  onClose,
  onEdit,
}) => {
  if (!lead) return null;

  const [selectedDoc, setSelectedDoc] = useState<LeadAttachment | null>(
    lead.attachments && lead.attachments.length > 0 ? lead.attachments[0] : null
  );

  // Format phone number for WhatsApp link (remove spaces, symbols)
  const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
  const whatsappPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  const whatsappMsg = encodeURIComponent(
    `Hello ${lead.title} ${lead.name}, regarding your enquiry with Nimmametro Constructions...`
  );
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMsg}`;
  const telUrl = `tel:${lead.phone}`;

  // Check if next follow-up is due today
  const todayStr = new Date().toISOString().split("T")[0];
  const isDueToday = lead.nextFollowup ? lead.nextFollowup.startsWith(todayStr) : false;

  return (
    <div className="modal-overlay" style={{ background: "rgba(0, 0, 0, 0.75)", zIndex: 1100 }}>
      <div 
        className="modal-container"
        style={{
          maxWidth: "960px",
          width: "95%",
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#0f172a",
          color: "#fff",
          borderRadius: "18px",
          border: "1px solid var(--border)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
          padding: "0"
        }}
      >
        {/* Modal Header */}
        <div 
          style={{ 
            padding: "20px 24px", 
            borderBottom: "1px solid var(--border)", 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            background: "rgba(255,255,255,0.03)",
            position: "sticky",
            top: 0,
            zIndex: 10
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <div 
              style={{ 
                width: "44px", 
                height: "44px", 
                borderRadius: "50%", 
                background: "rgba(234, 179, 8, 0.15)", 
                color: "var(--gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "18px",
                border: "1px solid rgba(234, 179, 8, 0.3)"
              }}
            >
              {lead.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", margin: 0 }}>
                  <span style={{ color: "var(--gold)" }}>{lead.title}</span> {lead.name}
                </h2>
                <span
                  className="badge"
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "3px 10px",
                    background: lead.status === "Converted" 
                      ? "rgba(16, 185, 129, 0.2)" 
                      : lead.status === "Lost" 
                      ? "rgba(239, 68, 68, 0.2)" 
                      : lead.status === "New"
                      ? "rgba(59, 130, 246, 0.2)"
                      : "rgba(234, 179, 8, 0.2)",
                    color: lead.status === "Converted" 
                      ? "#34d399" 
                      : lead.status === "Lost" 
                      ? "#f87171" 
                      : lead.status === "New"
                      ? "#60a5fa"
                      : "var(--gold)",
                    border: `1px solid ${
                      lead.status === "Converted" 
                        ? "rgba(16, 185, 129, 0.4)" 
                        : lead.status === "Lost" 
                        ? "rgba(239, 68, 68, 0.4)" 
                        : "rgba(234, 179, 8, 0.4)"
                    }`
                  }}
                >
                  {lead.status}
                </span>
              </div>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "2px 0 0" }}>
                Category: <strong style={{ color: "#fff" }}>{lead.leadType}</strong> • Enquiry Date: {lead.enquiryDate || "N/A"}
              </p>
            </div>
          </div>

          {/* Quick Action Header Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <a 
              href={telUrl} 
              className="btn btn-secondary btn-sm" 
              style={{ color: "#34d399", borderColor: "rgba(52, 211, 153, 0.4)", display: "inline-flex", alignItems: "center", gap: "6px" }}
              title="Call Lead"
            >
              <Phone size={14} /> <span>Call</span>
            </a>
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-secondary btn-sm" 
              style={{ color: "#25D366", borderColor: "rgba(37, 211, 102, 0.4)", display: "inline-flex", alignItems: "center", gap: "6px" }}
              title="WhatsApp Lead"
            >
              <MessageCircle size={14} /> <span>WhatsApp</span>
            </a>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => { onClose(); onEdit(lead); }}
              style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <Edit size={14} /> <span>Edit</span>
            </button>
            <button 
              onClick={onClose} 
              style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: "4px" }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* Key Information Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
            
            {/* Phone & Email Card */}
            <div style={{ background: "rgba(255,255,255,0.03)", padding: "14px", borderRadius: "12px", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", marginBottom: "6px" }}>
                Contact Info
              </div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                <Phone size={14} color="var(--gold)" />
                <a href={telUrl} style={{ color: "#fff", textDecoration: "none" }}>{lead.phone}</a>
              </div>
              {lead.email ? (
                <div style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Mail size={13} />
                  <a href={`mailto:${lead.email}`} style={{ color: "var(--text-muted)", textDecoration: "none" }}>{lead.email}</a>
                </div>
              ) : (
                <span style={{ fontSize: "11px", color: "var(--text-muted)", fontStyle: "italic" }}>No email provided</span>
              )}
            </div>

            {/* Site Visit Card */}
            <div style={{ background: "rgba(255,255,255,0.03)", padding: "14px", borderRadius: "12px", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", marginBottom: "6px" }}>
                Site Visit / Meeting
              </div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: lead.siteVisit === "Visit Completed" ? "#34d399" : lead.siteVisit !== "None" ? "#60a5fa" : "var(--text-muted)" }}>
                {lead.siteVisit}
              </div>
              {lead.siteVisitDate && (
                <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Calendar size={12} /> {lead.siteVisitDate.replace("T", " ")}
                </div>
              )}
            </div>

            {/* Next Followup Card */}
            <div style={{ background: isDueToday ? "rgba(234, 179, 8, 0.1)" : "rgba(255,255,255,0.03)", padding: "14px", borderRadius: "12px", border: isDueToday ? "1px solid var(--gold)" : "1px solid var(--border)" }}>
              <div style={{ fontSize: "11px", color: isDueToday ? "var(--gold)" : "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", marginBottom: "6px" }}>
                Next Follow-up Date & Time
              </div>
              {lead.nextFollowup ? (
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 800, color: isDueToday ? "var(--gold)" : "#fff", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Clock size={14} color={isDueToday ? "var(--gold)" : "#fff"} /> {lead.nextFollowup.replace("T", " ")}
                  </div>
                  {isDueToday && (
                    <span style={{ fontSize: "10px", color: "var(--gold)", fontWeight: 900, marginTop: "4px", display: "block" }}>
                      🔔 FOLLOW-UP DUE TODAY
                    </span>
                  )}
                </div>
              ) : (
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>No follow-up scheduled</span>
              )}
            </div>

            {/* Lost Reason Card (If Lost) */}
            {lead.status === "Lost" && (
              <div style={{ background: "rgba(239, 68, 68, 0.1)", padding: "14px", borderRadius: "12px", border: "1px solid rgba(239, 68, 68, 0.3)" }}>
                <div style={{ fontSize: "11px", color: "#f87171", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px" }}>
                  Lost Reason
                </div>
                <div style={{ fontSize: "13px", fontWeight: 800, color: "#f87171" }}>
                  {lead.lostReason || "Not Specified"}
                </div>
              </div>
            )}

          </div>

          {/* Main Content Split: Timeline Notes (Left) & Document Viewer (Right) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            
            {/* LEFT COLUMN: Timeline Notes & Follow-up History */}
            <div style={{ background: "rgba(255,255,255,0.02)", padding: "18px", borderRadius: "14px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "14px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--gold)", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                <History size={18} /> Follow-up Notes & Remarks History
              </h3>

              {lead.notesHistory && lead.notesHistory.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "360px", overflowY: "auto", paddingRight: "4px" }}>
                  {lead.notesHistory.map((note, idx) => (
                    <div 
                      key={note.id || idx}
                      style={{
                        position: "relative",
                        paddingLeft: "16px",
                        borderLeft: "2px solid var(--gold)",
                        paddingBottom: "8px"
                      }}
                    >
                      <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--gold)", marginBottom: "3px", display: "flex", alignItems: "center", gap: "6px" }}>
                        <Clock size={11} /> {note.date || "Past Entry"}
                      </div>
                      <div style={{ fontSize: "12px", color: "#e2e8f0", lineHeight: "1.5", background: "rgba(255,255,255,0.03)", padding: "8px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                        {note.text}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: "13px", color: "var(--text-muted)", background: "rgba(255,255,255,0.02)", padding: "14px", borderRadius: "8px" }}>
                  <strong style={{ color: "#fff", display: "block", marginBottom: "4px" }}>Current Remarks / Requirements:</strong>
                  {lead.remarks ? lead.remarks : "No interaction notes or remarks recorded yet."}
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Uploaded Documents & PDF Viewer */}
            <div style={{ background: "rgba(255,255,255,0.02)", padding: "18px", borderRadius: "14px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "14px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--gold)", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                <Paperclip size={18} /> Client Documents & PDF Viewer
              </h3>

              {lead.attachments && lead.attachments.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  
                  {/* Document selector buttons */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {lead.attachments.map((doc) => {
                      const isSelected = selectedDoc?.url === doc.url;
                      return (
                        <button
                          key={doc.id}
                          type="button"
                          onClick={() => setSelectedDoc(doc)}
                          className={`btn btn-sm ${isSelected ? "btn-primary" : "btn-secondary"}`}
                          style={{ fontSize: "11px", display: "inline-flex", alignItems: "center", gap: "6px" }}
                        >
                          <FileText size={12} />
                          <span className="truncate" style={{ maxWidth: "140px" }}>{doc.name}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Inline PDF / Image Previewer */}
                  {selectedDoc && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "4px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.04)", padding: "8px 12px", borderRadius: "8px" }}>
                        <span style={{ fontSize: "12px", fontWeight: 600, color: "#fff" }} className="truncate">
                          📄 {selectedDoc.name}
                        </span>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <a 
                            href={selectedDoc.url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="btn btn-secondary btn-sm"
                            style={{ padding: "4px 8px", fontSize: "11px", display: "inline-flex", alignItems: "center", gap: "4px" }}
                            title="Open in New Tab"
                          >
                            <ExternalLink size={12} /> Open
                          </a>
                          <a 
                            href={selectedDoc.url} 
                            download 
                            className="btn btn-primary btn-sm"
                            style={{ padding: "4px 8px", fontSize: "11px", display: "inline-flex", alignItems: "center", gap: "4px" }}
                            title="Download File"
                          >
                            <Download size={12} /> Download
                          </a>
                        </div>
                      </div>

                      {/* Embedded Preview Box */}
                      <div 
                        style={{ 
                          width: "100%", 
                          height: "260px", 
                          borderRadius: "8px", 
                          overflow: "hidden", 
                          border: "1px solid var(--border)", 
                          background: "#000",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        {selectedDoc.url.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
                          <img 
                            src={selectedDoc.url} 
                            alt={selectedDoc.name} 
                            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} 
                          />
                        ) : (
                          <iframe 
                            src={selectedDoc.url} 
                            title={selectedDoc.name} 
                            style={{ width: "100%", height: "100%", border: "none" }} 
                          />
                        )}
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <div style={{ fontSize: "12px", color: "var(--text-muted)", textAlign: "center", padding: "30px", background: "rgba(255,255,255,0.01)", borderRadius: "8px", border: "1px dashed var(--border)" }}>
                  No documents or PDFs uploaded for this client lead yet.
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import type { Lead } from "../types";
import { LeadViewModal } from "../components/LeadViewModal";
import { 
  UserCheck, 
  Plus, 
  Search, 
  Bell, 
  Phone, 
  Mail, 
  Clock, 
  Edit, 
  Trash2, 
  Filter,
  Eye,
  MessageCircle
} from "lucide-react";

type CrmProps = {
  leads: Lead[];
  onAddLead: () => void;
  onEditLead: (lead: Lead) => void;
  onDeleteLead: (id: string) => void;
};

export const Crm: React.FC<CrmProps> = ({
  leads,
  onAddLead,
  onEditLead,
  onDeleteLead,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [selectedViewLead, setSelectedViewLead] = useState<Lead | null>(null);

  // Today date formatted as YYYY-MM-DD
  const todayStr = new Date().toISOString().split("T")[0];

  // Helper to check if a date string starts with today's date
  const isToday = (dateString?: string) => {
    if (!dateString) return false;
    return dateString.startsWith(todayStr);
  };

  // Filter leads scheduled for follow-up TODAY
  const todayFollowups = leads.filter((l) => isToday(l.nextFollowup));

  // Stat counts
  const totalLeads = leads.length;
  const todayCount = todayFollowups.length;
  const newCount = leads.filter((l) => l.status === "New").length;
  const contactedCount = leads.filter((l) => l.status === "Contacted").length;
  const followupCount = leads.filter((l) => l.status === "Follow-up Scheduled").length;
  const siteVisitScheduledCount = leads.filter((l) => l.status === "Site Visit Scheduled").length;
  const negotiationCount = leads.filter((l) => l.status === "Negotiation").length;
  const convertedCount = leads.filter((l) => l.status === "Converted").length;
  const lostCount = leads.filter((l) => l.status === "Lost").length;

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    // Status / Today filter
    if (statusFilter === "TODAY") {
      if (!isToday(l.nextFollowup)) return false;
    } else if (statusFilter !== "ALL" && l.status !== statusFilter) {
      return false;
    }

    // Type filter
    if (typeFilter !== "ALL" && l.leadType !== typeFilter) {
      return false;
    }

    // Search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const nameMatch = l.name.toLowerCase().includes(q);
      const phoneMatch = l.phone.includes(q);
      const emailMatch = (l.email || "").toLowerCase().includes(q);
      const remarksMatch = (l.remarks || "").toLowerCase().includes(q);
      return nameMatch || phoneMatch || emailMatch || remarksMatch;
    }

    return true;
  });

  return (
    <div className="crm-container" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* Top Action Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "10px" }}>
            <UserCheck size={28} color="var(--gold)" /> Mini CRM & Lead Tracker
          </h2>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
            Manage client leads, site visit schedules, customer requirements, and daily follow-up reminders.
          </p>
        </div>

        <button className="btn btn-primary" onClick={onAddLead} style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <Plus size={18} /> Add New Lead
        </button>
      </div>

      {/* TODAY'S FOLLOW-UP REMINDER BANNER */}
      {todayCount > 0 && (
        <div 
          style={{
            background: "linear-gradient(90deg, rgba(234, 179, 8, 0.15) 0%, rgba(234, 179, 8, 0.05) 100%)",
            border: "1px solid var(--gold)",
            borderRadius: "14px",
            padding: "16px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            boxShadow: "0 4px 20px rgba(234, 179, 8, 0.1)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div 
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "var(--gold)",
                color: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900
              }}
            >
              <Bell size={22} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: "var(--gold)" }}>
                🔔 Today's Follow-up Reminder ({todayCount} Lead{todayCount > 1 ? "s" : ""} Due)
              </h4>
              <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#e2e8f0" }}>
                You have {todayCount} lead follow-up{todayCount > 1 ? "s" : ""} scheduled for today ({todayStr}). Click below to view them!
              </p>
            </div>
          </div>

          <button 
            className="btn btn-secondary btn-sm"
            style={{ borderColor: "var(--gold)", color: "var(--gold)", fontWeight: 700 }}
            onClick={() => setStatusFilter("TODAY")}
          >
            Show Today's Follow-ups ({todayCount})
          </button>
        </div>
      )}

      {/* Stats Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px" }}>
        
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", padding: "16px", borderRadius: "14px" }}>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600 }}>Total Leads</div>
          <div style={{ fontSize: "24px", fontWeight: 800, color: "#fff", marginTop: "4px" }}>{totalLeads}</div>
        </div>

        <div 
          onClick={() => setStatusFilter("TODAY")}
          style={{ 
            background: statusFilter === "TODAY" ? "rgba(234, 179, 8, 0.2)" : "var(--bg-card)", 
            border: todayCount > 0 ? "1px solid var(--gold)" : "1px solid var(--border)", 
            padding: "16px", 
            borderRadius: "14px",
            cursor: "pointer"
          }}
        >
          <div style={{ fontSize: "12px", color: "var(--gold)", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
            🔔 Today Follow-ups
          </div>
          <div style={{ fontSize: "24px", fontWeight: 800, color: "var(--gold)", marginTop: "4px" }}>{todayCount}</div>
        </div>

        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", padding: "16px", borderRadius: "14px" }}>
          <div style={{ fontSize: "12px", color: "#60a5fa", fontWeight: 600 }}>New Enquiries</div>
          <div style={{ fontSize: "24px", fontWeight: 800, color: "#60a5fa", marginTop: "4px" }}>{newCount}</div>
        </div>

        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", padding: "16px", borderRadius: "14px" }}>
          <div style={{ fontSize: "12px", color: "#34d399", fontWeight: 600 }}>Converted 🎉</div>
          <div style={{ fontSize: "24px", fontWeight: 800, color: "#34d399", marginTop: "4px" }}>{convertedCount}</div>
        </div>

        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", padding: "16px", borderRadius: "14px" }}>
          <div style={{ fontSize: "12px", color: "#f87171", fontWeight: 600 }}>Lost Leads ❌</div>
          <div style={{ fontSize: "24px", fontWeight: 800, color: "#f87171", marginTop: "4px" }}>{lostCount}</div>
        </div>

      </div>

      {/* Search and Filters */}
      <div 
        style={{ 
          background: "var(--bg-card)", 
          border: "1px solid var(--border)", 
          borderRadius: "16px", 
          padding: "16px 20px", 
          display: "flex", 
          flexDirection: "column",
          gap: "16px"
        }}
      >
        {/* Search bar */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>
            <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: "36px" }}
              placeholder="Search leads by client name, mobile, email, requirements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Lead Type dropdown filter */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Filter size={14} color="var(--gold)" />
            <select
              className="form-select"
              style={{ width: "200px", padding: "8px 12px", fontSize: "13px" }}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="ALL">All Project Types</option>
              <option value="Plotted Development">Plotted Development</option>
              <option value="Farmland">Farmland</option>
              <option value="Compound Wall">Compound Wall</option>
              <option value="Customized Construction">Customized Construction</option>
              <option value="Layout Approvals">Layout Approvals</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>

        {/* Status Filter Tabs with Counter Badges */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "12px" }}>
          <button
            type="button"
            onClick={() => setStatusFilter("ALL")}
            className={`btn btn-sm ${statusFilter === "ALL" ? "btn-primary" : "btn-secondary"}`}
            style={{ borderRadius: "20px", fontSize: "12px", fontWeight: statusFilter === "ALL" ? 800 : 500 }}
          >
            All ({totalLeads})
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("TODAY")}
            className={`btn btn-sm ${statusFilter === "TODAY" ? "btn-primary" : "btn-secondary"}`}
            style={{ 
              borderRadius: "20px", 
              fontSize: "12px", 
              borderColor: todayCount > 0 ? "var(--gold)" : "var(--border)",
              color: statusFilter === "TODAY" ? "#000" : "var(--gold)",
              fontWeight: 700
            }}
          >
            🔔 Today's Follow-up ({todayCount})
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("New")}
            className={`btn btn-sm ${statusFilter === "New" ? "btn-primary" : "btn-secondary"}`}
            style={{ borderRadius: "20px", fontSize: "12px" }}
          >
            New ({newCount})
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("Contacted")}
            className={`btn btn-sm ${statusFilter === "Contacted" ? "btn-primary" : "btn-secondary"}`}
            style={{ borderRadius: "20px", fontSize: "12px" }}
          >
            Contacted ({contactedCount})
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("Follow-up Scheduled")}
            className={`btn btn-sm ${statusFilter === "Follow-up Scheduled" ? "btn-primary" : "btn-secondary"}`}
            style={{ borderRadius: "20px", fontSize: "12px" }}
          >
            Follow-up Scheduled ({followupCount})
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("Site Visit Scheduled")}
            className={`btn btn-sm ${statusFilter === "Site Visit Scheduled" ? "btn-primary" : "btn-secondary"}`}
            style={{ borderRadius: "20px", fontSize: "12px" }}
          >
            Site Visit Scheduled ({siteVisitScheduledCount})
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("Negotiation")}
            className={`btn btn-sm ${statusFilter === "Negotiation" ? "btn-primary" : "btn-secondary"}`}
            style={{ borderRadius: "20px", fontSize: "12px" }}
          >
            Negotiation ({negotiationCount})
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("Converted")}
            className={`btn btn-sm ${statusFilter === "Converted" ? "btn-primary" : "btn-secondary"}`}
            style={{ borderRadius: "20px", fontSize: "12px", color: statusFilter === "Converted" ? "#000" : "#34d399" }}
          >
            Converted 🎉 ({convertedCount})
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("Lost")}
            className={`btn btn-sm ${statusFilter === "Lost" ? "btn-primary" : "btn-secondary"}`}
            style={{ borderRadius: "20px", fontSize: "12px", color: statusFilter === "Lost" ? "#000" : "#f87171" }}
          >
            Lost ❌ ({lostCount})
          </button>
        </div>
      </div>

      {/* CRM Leads Table */}
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Client Information</th>
              <th>Category</th>
              <th>Site Visit / Meeting</th>
              <th>Next Follow-up</th>
              <th>Status</th>
              <th>Customer Requirements / Lost Reason</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                  No CRM leads found matching your filter criteria.
                </td>
              </tr>
            ) : (
              filteredLeads.map((l) => {
                const isDueToday = isToday(l.nextFollowup);
                const cleanPhone = l.phone.replace(/[^0-9]/g, "");
                const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
                const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(`Hello ${l.title} ${l.name}, regarding your enquiry with Nimmametro Constructions...`)}`;
                
                return (
                  <tr 
                    key={l.id} 
                    style={{ 
                      background: isDueToday ? "rgba(234, 179, 8, 0.04)" : "transparent",
                      borderLeft: isDueToday ? "3px solid var(--gold)" : "none" 
                    }}
                  >
                    {/* Client Info with Call & WhatsApp buttons */}
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                        <div style={{ fontWeight: 700, color: "#fff", fontSize: "15px" }}>
                          <span style={{ color: "var(--gold)", marginRight: "4px" }}>{l.title}</span> {l.name}
                        </div>
                        {/* Call & WhatsApp Quick Trigger Icons */}
                        <div style={{ display: "inline-flex", gap: "4px" }}>
                          <a 
                            href={`tel:${l.phone}`} 
                            className="btn btn-secondary btn-sm" 
                            style={{ padding: "2px 6px", color: "#34d399", borderColor: "rgba(52, 211, 153, 0.3)" }} 
                            title={`Call ${l.name}`}
                          >
                            <Phone size={12} />
                          </a>
                          <a 
                            href={waUrl} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="btn btn-secondary btn-sm" 
                            style={{ padding: "2px 6px", color: "#25D366", borderColor: "rgba(37, 211, 102, 0.3)" }} 
                            title={`WhatsApp ${l.name}`}
                          >
                            <MessageCircle size={12} />
                          </a>
                        </div>
                      </div>
                      
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          <Phone size={12} color="var(--gold)" /> {l.phone}
                        </span>
                        {l.email && (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                            <Mail size={12} /> {l.email}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Lead Category */}
                    <td>
                      <span className="badge badge-info" style={{ fontSize: "11px" }}>
                        {l.leadType}
                      </span>
                    </td>

                    {/* Site Visit */}
                    <td>
                      <div style={{ fontSize: "12px" }}>
                        <span style={{ 
                          fontWeight: 600, 
                          color: l.siteVisit === "Visit Completed" ? "#34d399" : l.siteVisit && l.siteVisit !== "None" ? "#60a5fa" : "var(--text-muted)" 
                        }}>
                          {l.siteVisit}
                        </span>
                        {l.siteVisitDate && (
                          <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                            {l.siteVisitDate.replace("T", " ")}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Next Followup */}
                    <td>
                      {l.nextFollowup ? (
                        <div>
                          <span 
                            style={{ 
                              display: "inline-flex", 
                              alignItems: "center", 
                              gap: "4px", 
                              fontSize: "12px",
                              padding: "2px 8px",
                              borderRadius: "12px",
                              fontWeight: isDueToday ? 800 : 500,
                              background: isDueToday ? "var(--gold)" : "rgba(255,255,255,0.06)",
                              color: isDueToday ? "#000" : "#fff"
                            }}
                          >
                            <Clock size={12} /> {l.nextFollowup.replace("T", " ")}
                          </span>
                          {isDueToday && (
                            <span style={{ display: "block", fontSize: "10px", color: "var(--gold)", fontWeight: 800, marginTop: "2px" }}>
                              🔔 DUE TODAY
                            </span>
                          )}
                        </div>
                      ) : (
                        <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Not Set</span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td>
                      <span
                        className="badge"
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          background: l.status === "Converted" 
                            ? "rgba(16, 185, 129, 0.2)" 
                            : l.status === "Lost" 
                            ? "rgba(239, 68, 68, 0.2)" 
                            : l.status === "New"
                            ? "rgba(59, 130, 246, 0.2)"
                            : "rgba(234, 179, 8, 0.2)",
                          color: l.status === "Converted" 
                            ? "#34d399" 
                            : l.status === "Lost" 
                            ? "#f87171" 
                            : l.status === "New"
                            ? "#60a5fa"
                            : "var(--gold)",
                          border: `1px solid ${
                            l.status === "Converted" 
                              ? "rgba(16, 185, 129, 0.4)" 
                              : l.status === "Lost" 
                              ? "rgba(239, 68, 68, 0.4)" 
                              : "rgba(234, 179, 8, 0.4)"
                          }`
                        }}
                      >
                        {l.status}
                      </span>
                    </td>

                    {/* Customer Requirements / Timeline / Lost Reason */}
                    <td style={{ maxWidth: "240px" }}>
                      {l.status === "Lost" && l.lostReason ? (
                        <div>
                          <span style={{ fontSize: "11px", color: "#f87171", fontWeight: 700, display: "block" }}>
                            Reason: {l.lostReason}
                          </span>
                          {l.remarks && (
                            <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block", marginTop: "2px" }} className="truncate">
                              {l.remarks}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div>
                          <span style={{ fontSize: "12px", color: "#fff", display: "block" }} className="truncate">
                            {l.notesHistory && l.notesHistory.length > 0 
                              ? l.notesHistory[0].text 
                              : (l.remarks || "No remarks added.")}
                          </span>
                          {l.notesHistory && l.notesHistory.length > 1 && (
                            <span style={{ fontSize: "10px", color: "var(--gold)", fontWeight: 600 }}>
                              + {l.notesHistory.length - 1} previous update(s)
                            </span>
                          )}
                        </div>
                      )}

                      {/* Attachments Count Badge */}
                      {l.attachments && l.attachments.length > 0 && (
                        <div style={{ marginTop: "4px" }}>
                          <span className="badge" style={{ fontSize: "10px", background: "rgba(255,255,255,0.08)", color: "var(--gold)", border: "1px solid rgba(234, 179, 8, 0.3)" }}>
                            📎 {l.attachments.length} Document{l.attachments.length > 1 ? "s" : ""}
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Actions: View (Eye), Edit, Delete */}
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "6px" }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setSelectedViewLead(l)}
                          title="View Lead Details & PDF Documents"
                          style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
                        >
                          <Eye size={14} /> <span>View</span>
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => onEditLead(l)}
                          title="Edit Lead"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            if (confirm(`Delete lead entry for ${l.name}?`)) {
                              onDeleteLead(l.id);
                            }
                          }}
                          title="Delete Lead"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* View Lead Details & PDF Viewer Modal */}
      <LeadViewModal 
        lead={selectedViewLead} 
        onClose={() => setSelectedViewLead(null)} 
        onEdit={onEditLead} 
      />
    </div>
  );
};

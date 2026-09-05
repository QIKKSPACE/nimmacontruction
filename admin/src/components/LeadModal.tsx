import React, { useState, useEffect } from "react";
import type { Lead, LeadTitle, LeadType, LeadStatus, SiteVisitType, LostReason, LeadNote, LeadAttachment } from "../types";
import { X, User, Clock, AlertCircle, FileText, Paperclip, Plus, Trash2, ExternalLink, Upload, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { API } from "../lib/api";

type LeadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (lead: Lead) => void;
  editingLead?: Lead | null;
};

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingLead,
}) => {
  const [title, setTitle] = useState<LeadTitle>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [siteVisit, setSiteVisit] = useState<SiteVisitType>("None");
  const [siteVisitDate, setSiteVisitDate] = useState("");
  const [leadType, setLeadType] = useState<LeadType>("Plotted Development");
  const [enquiryDate, setEnquiryDate] = useState(new Date().toISOString().split("T")[0]);
  const [status, setStatus] = useState<LeadStatus>("New");
  const [nextFollowup, setNextFollowup] = useState("");
  const [remarks, setRemarks] = useState("");
  const [lostReason, setLostReason] = useState<LostReason | string>("Budget");
  const [customLostReason, setCustomLostReason] = useState("");
  
  // New Timeline Notes & Attachments State
  const [notesHistory, setNotesHistory] = useState<LeadNote[]>([]);
  const [newNoteText, setNewNoteText] = useState("");
  const [attachments, setAttachments] = useState<LeadAttachment[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editingLead) {
      setTitle(editingLead.title || "");
      setName(editingLead.name || "");
      setPhone(editingLead.phone || "");
      setEmail(editingLead.email || "");
      setSiteVisit(editingLead.siteVisit || "None");
      setSiteVisitDate(editingLead.siteVisitDate || "");
      setLeadType(editingLead.leadType || "Plotted Development");
      setEnquiryDate(editingLead.enquiryDate || new Date().toISOString().split("T")[0]);
      setStatus(editingLead.status || "New");
      setNextFollowup(editingLead.nextFollowup || "");
      setRemarks(editingLead.remarks || "");
      setNotesHistory(editingLead.notesHistory || []);
      setAttachments(editingLead.attachments || []);
      
      const isKnownLost = ["Budget", "Location", "No Response", "Competitor", "Changed Mind"].includes(editingLead.lostReason || "");
      if (isKnownLost) {
        setLostReason(editingLead.lostReason as LostReason);
        setCustomLostReason("");
      } else if (editingLead.lostReason) {
        setLostReason("Others");
        setCustomLostReason(editingLead.lostReason);
      } else {
        setLostReason("Budget");
        setCustomLostReason("");
      }
    } else {
      setTitle("");
      setName("");
      setPhone("");
      setEmail("");
      setSiteVisit("None");
      setSiteVisitDate("");
      setLeadType("Plotted Development");
      setEnquiryDate(new Date().toISOString().split("T")[0]);
      setStatus("New");
      setNextFollowup("");
      setRemarks("");
      setNotesHistory([]);
      setAttachments([]);
      setLostReason("Budget");
      setCustomLostReason("");
    }
    setNewNoteText("");
  }, [editingLead, isOpen]);

  if (!isOpen) return null;

  // Add a new timeline note entry
  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    const nowStr = new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
    const noteEntry: LeadNote = {
      id: `note-${Date.now()}`,
      text: newNoteText.trim(),
      date: nowStr,
    };
    setNotesHistory([noteEntry, ...notesHistory]);
    setNewNoteText("");
    toast.success("Timeline note added.");
  };

  const handleRemoveNote = (noteId: string) => {
    setNotesHistory(notesHistory.filter((n) => n.id !== noteId));
  };

  // Upload Document / PDF / Image files to PHP backend
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const toastId = toast.loading("Uploading document/file to server...");
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("documents[]", files[i]);
    }

    try {
      const response = await fetch(API.upload, {
        method: "POST",
        body: formData,
      });

      const resData = await response.json();
      if (response.ok && resData.status && (resData.files || resData.urls)) {
        toast.success("Document uploaded successfully!", { id: toastId });
        const nowStr = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
        
        let newDocs: LeadAttachment[] = [];
        if (resData.files && Array.isArray(resData.files)) {
          newDocs = resData.files.map((f: any, idx: number) => ({
            id: `att-${Date.now()}-${idx}`,
            name: f.name || "Attachment",
            url: f.url,
            fileType: f.ext || "file",
            date: nowStr,
          }));
        } else if (resData.urls && Array.isArray(resData.urls)) {
          newDocs = resData.urls.map((url: string, idx: number) => {
            const fileName = url.split("/").pop() || "Document";
            const ext = fileName.split(".").pop() || "file";
            return {
              id: `att-${Date.now()}-${idx}`,
              name: fileName,
              url: url,
              fileType: ext,
              date: nowStr,
            };
          });
        }
        setAttachments([...attachments, ...newDocs]);
      } else {
        toast.error("File upload failed: " + (resData.message || "Unknown error"), { id: toastId });
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      toast.error("Upload Error: " + err.message, { id: toastId });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleRemoveAttachment = (attId: string) => {
    setAttachments(attachments.filter((a) => a.id !== attId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalLostReason = status === "Lost" 
      ? (lostReason === "Others" ? customLostReason.trim() || "Others" : lostReason)
      : "";

    // If user typed a note in textarea but didn't click "Add Note", include it automatically
    let finalNotesHistory = [...notesHistory];
    if (newNoteText.trim()) {
      const nowStr = new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
      finalNotesHistory = [{ id: `note-${Date.now()}`, text: newNoteText.trim(), date: nowStr }, ...notesHistory];
    }

    const newLead: Lead = {
      id: editingLead ? editingLead.id : `lead-${Date.now()}`,
      title,
      name,
      phone,
      email,
      siteVisit,
      siteVisitDate,
      leadType,
      enquiryDate,
      status,
      nextFollowup,
      remarks,
      notesHistory: finalNotesHistory,
      attachments,
      lostReason: finalLostReason,
    };

    onSave(newLead);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: "820px", maxHeight: "90vh", overflowY: "auto" }}>
        <div className="modal-header" style={{ position: "sticky", top: 0, zIndex: 10, background: "var(--card-bg)" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "8px" }}>
            <User size={20} color="var(--gold)" />
            {editingLead ? `Edit Lead Details: ${editingLead.name}` : "Add New CRM Lead"}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ gap: "18px" }}>
            
            {/* Title, Name, Phone Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.5fr 1.3fr", gap: "12px" }}>
              <div className="form-group">
                <label className="form-label">Title / Note Prefix</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 30 Acre Plot, Mr., Er."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Client / Lead Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Ramesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email & Enquiry Date Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="e.g. client@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Enquiry Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={enquiryDate}
                  onChange={(e) => setEnquiryDate(e.target.value)}
                />
              </div>
            </div>

            {/* Lead Category & Lead Status */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-group">
                <label className="form-label">Lead Category / Type</label>
                <select
                  className="form-select"
                  value={leadType}
                  onChange={(e) => setLeadType(e.target.value as LeadType)}
                >
                  <option value="Plotted Development">Plotted Development</option>
                  <option value="Farmland Development">Farmland Development</option>
                  <option value="Compound Wall">Compound Wall</option>
                  <option value="Customized Construction">Customized Construction</option>
                  <option value="Layout Approvals">Layout Approvals</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Lead Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as LeadStatus)}
                  style={{
                    borderColor: status === "Converted" ? "#10b981" : status === "Lost" ? "#ef4444" : "var(--border)",
                    color: status === "Converted" ? "#34d399" : status === "Lost" ? "#f87171" : "#fff"
                  }}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Follow-up Scheduled">Follow-up Scheduled</option>
                  <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Converted">Converted 🎉</option>
                  <option value="Lost">Lost ❌</option>
                </select>
              </div>
            </div>

            {/* Site Visit / Meeting Status & Date */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-group">
                <label className="form-label">Site Visit / Meeting</label>
                <select
                  className="form-select"
                  value={siteVisit}
                  onChange={(e) => setSiteVisit(e.target.value as SiteVisitType)}
                >
                  <option value="None">None</option>
                  <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                  <option value="Meeting Scheduled">Meeting Scheduled</option>
                  <option value="Visit Completed">Visit Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Site Visit / Meeting Date & Time</label>
                <input
                  type="datetime-local"
                  className="form-input"
                  value={siteVisitDate}
                  onChange={(e) => setSiteVisitDate(e.target.value)}
                />
              </div>
            </div>

            {/* Next Follow-up Date & Time */}
            <div className="form-group" style={{ background: "rgba(234, 179, 8, 0.05)", padding: "12px 14px", borderRadius: "10px", border: "1px solid rgba(234, 179, 8, 0.2)" }}>
              <label className="form-label" style={{ color: "var(--gold)", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px" }}>
                <Clock size={15} /> Next Follow-up Date & Time (Reminder Trigger)
              </label>
              <input
                type="datetime-local"
                className="form-input"
                value={nextFollowup}
                onChange={(e) => setNextFollowup(e.target.value)}
              />
            </div>

            {/* Lost Reason (Conditional) */}
            {status === "Lost" && (
              <div className="form-group" style={{ background: "rgba(239, 68, 68, 0.08)", padding: "14px", borderRadius: "10px", border: "1px solid rgba(239, 68, 68, 0.3)" }}>
                <label className="form-label" style={{ color: "#f87171", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px" }}>
                  <AlertCircle size={16} /> Lost Reason
                </label>
                <select
                  className="form-select"
                  value={lostReason}
                  onChange={(e) => setLostReason(e.target.value)}
                  style={{ marginBottom: lostReason === "Others" ? "10px" : "0" }}
                >
                  <option value="Budget">Budget Issue (High Price)</option>
                  <option value="Location">Location Concern</option>
                  <option value="No Response">No Response / Unreachable</option>
                  <option value="Competitor">Bought from Competitor</option>
                  <option value="Changed Mind">Postponed / Changed Mind</option>
                  <option value="Others">Others (Custom Reason)</option>
                </select>
                {lostReason === "Others" && (
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Specify exact reason why lead was lost..."
                    value={customLostReason}
                    onChange={(e) => setCustomLostReason(e.target.value)}
                  />
                )}
              </div>
            )}

            {/* Initial Remarks / Requirements */}
            <div className="form-group">
              <label className="form-label">Initial Remarks / Base Requirements</label>
              <textarea
                className="form-textarea"
                rows={2}
                placeholder="Specify initial plot dimension, budget range, layout preferences..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>

            {/* 📝 NEW FEATURE 1: MULTIPLE TIMELINE NOTES / REMARKS HISTORY */}
            <div className="form-group" style={{ background: "rgba(255, 255, 255, 0.03)", padding: "16px", borderRadius: "12px", border: "1px solid var(--border)" }}>
              <label className="form-label" style={{ color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
                <FileText size={16} color="var(--gold)" /> Timeline Updates & Follow-up History
              </label>

              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Talked today: Sent contract draft to client..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddNote();
                    }
                  }}
                />
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleAddNote}
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", flexShrink: 0 }}
                >
                  <Plus size={16} /> Add Update Note
                </button>
              </div>

              {/* History list */}
              {notesHistory.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "12px" }}>
                  {notesHistory.map((note) => (
                    <div
                      key={note.id}
                      style={{
                        background: "rgba(0, 0, 0, 0.3)",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        borderLeft: "3px solid var(--gold)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "12px"
                      }}
                    >
                      <div>
                        <div style={{ fontSize: "11px", color: "var(--gold)", fontWeight: 600 }}>
                          {note.date}
                        </div>
                        <div style={{ fontSize: "13px", color: "#fff", marginTop: "2px" }}>
                          {note.text}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveNote(note.id)}
                        style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", padding: "2px" }}
                        title="Delete Note"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 📁 NEW FEATURE 2: DOCUMENTS, PDFS & CONTRACT ATTACHMENTS */}
            <div className="form-group" style={{ background: "rgba(255, 255, 255, 0.03)", padding: "16px", borderRadius: "12px", border: "1px solid var(--border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
                <label className="form-label" style={{ color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", margin: 0 }}>
                  <Paperclip size={16} color="var(--gold)" /> Client Documents & Attachments (PDFs, Contracts, Images)
                </label>

                <label className="btn btn-secondary btn-sm" style={{ cursor: uploading ? "not-allowed" : "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                  <span>{uploading ? "Uploading..." : "Upload PDF/Document"}</span>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.webp"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    style={{ display: "none" }}
                  />
                </label>
              </div>

              {/* Attachments List */}
              {attachments.length === 0 ? (
                <p style={{ fontSize: "12px", color: "var(--text-muted)", fontStyle: "italic", margin: 0 }}>
                  No documents or contract files attached yet. Click "Upload PDF/Document" above to attach files.
                </p>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "10px" }}>
                  {attachments.map((att) => (
                    <div
                      key={att.id}
                      style={{
                        background: "rgba(0, 0, 0, 0.4)",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "8px"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", overflow: "hidden" }}>
                        <Paperclip size={16} color="var(--gold)" style={{ flexShrink: 0 }} />
                        <div style={{ overflow: "hidden" }}>
                          <a
                            href={att.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: "12px", fontWeight: 600, color: "#fff", display: "flex", alignItems: "center", gap: "4px" }}
                            className="truncate"
                            title={att.name}
                          >
                            <span className="truncate">{att.name}</span>
                            <ExternalLink size={12} style={{ flexShrink: 0 }} />
                          </a>
                          {att.date && (
                            <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>
                              {att.date}
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveAttachment(att.id)}
                        style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", padding: "2px", flexShrink: 0 }}
                        title="Remove Attachment"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          <div className="modal-footer" style={{ position: "sticky", bottom: 0, zIndex: 10, background: "var(--card-bg)" }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Lead Profile & Timeline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import type { Invoice, InvoiceItem, BankDetails } from "../types";
import logoImg from "../assets/logo.png";
import { 
  FileText, 
  Plus, 
  Trash2, 
  Printer, 
  Download, 
  Save, 
  Eye, 
  Edit, 
  ArrowLeft, 
  Search, 
  Loader2,
  ListPlus
} from "lucide-react";
import { toast } from "react-hot-toast";

type QuotationMakerProps = {
  invoices: Invoice[];
  onSaveInvoice: (invoice: Invoice) => Promise<void>;
  onDeleteInvoice: (id: string) => Promise<void>;
};

const DEFAULT_BANK_DETAILS: BankDetails = {
  bankName: "HDFC Bank",
  accountNo: "50200087654321",
  ifscCode: "HDFC0001234",
  branch: "Koramangala, Bengaluru"
};

const DEFAULT_TERMS = `1. Drawings / Stipulations / Design Works to be Supplied and approved by the Client.
2. Changes in Quantities / Specifications / Materials at any level of execution will be charged extra.
3. If Excavation is in Hard Rock, prior approval is needed before start of work and will be charged separately.
4. Payment: 10% Mobilization advance with Work Order. Remaining as Running Bills as Work Progresses.`;

const DEFAULT_SUBJECT = "Proposed Quote for Farmland & Plotted Development of Land Civil Works";

const DEFAULT_COVER_LETTER = `Dear Sir/Madam,

Thank you for your kind enquiry and we are pleased to submit our comprehensive proposal for the plotted development & civil infrastructure work.

Hope you will find our quote most competitive and expect to receive your feedback along with the Purchase Order, for our immediate action.

The detailed rates with specification is attached below on Page 2.

Hope the details below are inline with your requirement and looking forward to working with you.`;

const DEFAULT_SCOPE_ITEMS = [
  "DRAINAGE WORK (DWC PIPE)",
  "SEWAGE CONNECTION (UGD)",
  "WATER LINE CONNECTION",
  "ROAD WORKS (WET-MIX OVER GROUND BASE)",
  "SITE IDENTIFICATION & MARKING WORK",
  "TREE PLANTATION & PARK DEVELOPMENT",
  "UNDERGROUND SOAK PIT TANK"
];

export const QuotationMaker: React.FC<QuotationMakerProps> = ({
  invoices,
  onSaveInvoice,
  onDeleteInvoice,
}) => {
  const [viewMode, setViewMode] = useState<"LIST" | "FORM" | "PREVIEW">("LIST");
  const [searchTerm, setSearchTerm] = useState("");
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  // Form State
  const [currentId, setCurrentId] = useState<string>("");
  const [docType, setDocType] = useState<"QUOTATION" | "INVOICE">("QUOTATION");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0]);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [siteName, setSiteName] = useState("");

  // Page 1 Proposal State
  const [subject, setSubject] = useState(DEFAULT_SUBJECT);
  const [coverLetter, setCoverLetter] = useState(DEFAULT_COVER_LETTER);
  const [scopeItems, setScopeItems] = useState<string[]>(DEFAULT_SCOPE_ITEMS);

  // Page 2 Items State
  const [items, setItems] = useState<InvoiceItem[]>([
    { slNo: 1, description: "DRAINAGE WORK: Earthwork excavation, laying, setting pipe using 1st quality 450mm dia MP3 pipes", unit: "r.ft", qty: 450, rate: 850, amount: 382500 },
    { slNo: 2, description: "SEWAGE CONNECTION: Excavation for sanitary lines with DWC pipes & Manhole chambers", unit: "nos", qty: 12, rate: 14500, amount: 174000 },
    { slNo: 3, description: "WATER LINE CONNECTION: Excavation and laying PVC/UPVC pipes for main lines", unit: "r.ft", qty: 600, rate: 320, amount: 192000 },
    { slNo: 4, description: "ROAD WORKS: Wet-Mix coat 6\" thickness over gravelling base with compaction & rolling", unit: "sq.ft", qty: 2500, rate: 140, amount: 350000 }
  ]);

  // Tax & Totals State
  const [showSubtotal, setShowSubtotal] = useState<boolean>(true);
  const [showColumnSlNo, setShowColumnSlNo] = useState<boolean>(true);
  const [showColumnUnit, setShowColumnUnit] = useState<boolean>(true);
  const [showColumnQty, setShowColumnQty] = useState<boolean>(true);
  const [showColumnRate, setShowColumnRate] = useState<boolean>(true);
  const [showColumnAmount, setShowColumnAmount] = useState<boolean>(true);
  const [includeGst, setIncludeGst] = useState<boolean>(true);
  const [gstPercent, setGstPercent] = useState<number>(18);
  const [showGrandTotal, setShowGrandTotal] = useState<boolean>(true);
  const [terms, setTerms] = useState<string>(DEFAULT_TERMS);
  const [bankDetails, setBankDetails] = useState<BankDetails>(DEFAULT_BANK_DETAILS);

  // Reset or initialize form for New Quotation
  const handleCreateNew = () => {
    setCurrentId("");
    setDocType("QUOTATION");
    const randomNo = `NMC-${Date.now().toString().slice(-6)}`;
    setInvoiceNo(randomNo);
    setInvoiceDate(new Date().toISOString().split("T")[0]);
    setCustomerName("");
    setCustomerAddress("");
    setSiteName("");
    setSubject(DEFAULT_SUBJECT);
    setCoverLetter(DEFAULT_COVER_LETTER);
    setScopeItems(DEFAULT_SCOPE_ITEMS);
    setItems([
      { slNo: 1, description: "DRAINAGE WORK: Earthwork excavation & laying 450mm DWC pipes", unit: "r.ft", qty: 500, rate: 850, amount: 425000, showRates: true, showSlNo: true, showUnit: true, showQty: true, showRate: true, showAmount: true },
      { slNo: 2, description: "ROAD WORKS: Providing and laying Wet-Mix coat 6\" thickness with rolling", unit: "sq.ft", qty: 3000, rate: 140, amount: 420000, showRates: true, showSlNo: true, showUnit: true, showQty: true, showRate: true, showAmount: true }
    ]);
    setShowSubtotal(true);
    setShowColumnSlNo(true);
    setShowColumnUnit(true);
    setShowColumnQty(true);
    setShowColumnRate(true);
    setShowColumnAmount(true);
    setIncludeGst(true);
    setGstPercent(18);
    setShowGrandTotal(true);
    setTerms(DEFAULT_TERMS);
    setBankDetails(DEFAULT_BANK_DETAILS);
    setViewMode("FORM");
  };

  const parseBool = (val: any, defaultVal = true): boolean => {
    if (val === undefined || val === null) return defaultVal;
    if (val === false || val === 0 || val === "0" || val === "false") return false;
    return true;
  };

  // Edit existing invoice
  const handleEdit = (inv: Invoice) => {
    setCurrentId(inv.id);
    setDocType(inv.docType);
    setInvoiceNo(inv.invoiceNo);
    setInvoiceDate(inv.invoiceDate);
    setCustomerName(inv.customerName);
    setCustomerAddress(inv.customerAddress || "");
    setSiteName(inv.siteName || "");
    setSubject(inv.subject || DEFAULT_SUBJECT);
    setCoverLetter(inv.coverLetter || DEFAULT_COVER_LETTER);
    setScopeItems(inv.scopeItems && inv.scopeItems.length ? inv.scopeItems : DEFAULT_SCOPE_ITEMS);
    setItems((inv.items || []).map((it) => ({
      ...it,
      showRates: parseBool(it.showRates, true),
      showSlNo: parseBool(it.showSlNo, true),
      showUnit: parseBool(it.showUnit, true),
      showQty: parseBool(it.showQty, true),
      showRate: parseBool(it.showRate, true),
      showAmount: parseBool(it.showAmount, true),
    })));
    setShowSubtotal(parseBool(inv.showSubtotal, true));
    setShowColumnSlNo(parseBool(inv.showColumnSlNo, true));
    setShowColumnUnit(parseBool(inv.showColumnUnit, true));
    setShowColumnQty(parseBool(inv.showColumnQty, true));
    setShowColumnRate(parseBool(inv.showColumnRate, true));
    setShowColumnAmount(parseBool(inv.showColumnAmount, true));
    setIncludeGst(parseBool(inv.includeGst, inv.gstPercent > 0));
    setGstPercent(inv.gstPercent || 18);
    setShowGrandTotal(parseBool(inv.showGrandTotal, true));
    setTerms(inv.terms || DEFAULT_TERMS);
    setBankDetails(inv.bankDetails || DEFAULT_BANK_DETAILS);
    setViewMode("FORM");
  };

  // Preview invoice
  const handlePreview = (inv?: Invoice) => {
    if (inv) {
      handleEdit(inv);
    }
    setViewMode("PREVIEW");
  };

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + (item.showRates !== false ? (Number(item.amount) || 0) : 0), 0);
  const gstAmount = includeGst ? (subtotal * gstPercent) / 100 : 0;
  const grandTotal = subtotal + gstAmount;

  // Add Scope Item
  const handleAddScopeItem = () => {
    setScopeItems([...scopeItems, ""]);
  };

  const handleScopeChange = (index: number, value: string) => {
    const updated = [...scopeItems];
    updated[index] = value;
    setScopeItems(updated);
  };

  const handleRemoveScopeItem = (index: number) => {
    setScopeItems(scopeItems.filter((_, i) => i !== index));
  };

  // Add Rate Item Row
  const handleAddItem = () => {
    const nextSlNo = items.length + 1;
    setItems([
      ...items,
      { slNo: nextSlNo, description: "", unit: "sq.ft", qty: 1, rate: 0, amount: 0, showRates: true, showSlNo: true, showUnit: true, showQty: true, showRate: true, showAmount: true }
    ]);
  };

  // Update Rate Item Row
  const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
    const updated = [...items];
    const item = { ...updated[index], [field]: value };

    if (field === "showRates") {
      const isRatesOn = Boolean(value);
      item.showRates = isRatesOn;
      item.showUnit = isRatesOn;
      item.showQty = isRatesOn;
      item.showRate = isRatesOn;
      item.showAmount = isRatesOn;
      item.amount = isRatesOn ? (Number(item.qty) || 0) * (Number(item.rate) || 0) : 0;
    } else if (field === "qty" || field === "rate") {
      const q = field === "qty" ? Number(value) : item.qty;
      const r = field === "rate" ? Number(value) : item.rate;
      item.amount = item.showRates !== false ? (q || 0) * (r || 0) : 0;
    }

    updated[index] = item;
    setItems(updated);
  };

  // Remove Rate Item Row
  const handleRemoveItem = (index: number) => {
    const updated = items.filter((_, idx) => idx !== index);
    setItems(updated);
  };

  // Save Proposal to DB
  const handleSave = async () => {
    if (!customerName.trim()) {
      toast.error("Please enter Client / Customer Name");
      return;
    }

    const payload: Invoice = {
      id: currentId || `inv-${Date.now()}`,
      invoiceNo,
      invoiceDate,
      docType,
      customerName,
      customerAddress,
      siteName,
      subject,
      coverLetter,
      scopeItems,
      items,
      subtotal,
      showSubtotal,
      showColumnSlNo,
      showColumnUnit,
      showColumnQty,
      showColumnRate,
      showColumnAmount,
      includeGst,
      gstPercent: includeGst ? gstPercent : 0,
      gstAmount,
      grandTotal,
      showGrandTotal,
      terms,
      bankDetails
    };

    await onSaveInvoice(payload);
    setViewMode("LIST");
  };

  // Print Document
  const handlePrint = () => {
    window.print();
  };

  // 1-Click PDF Download (2-Page PDF Export)
  const handleDownloadPdf = async () => {
    const pdfContainer = document.getElementById("pdf-render-document");
    if (!pdfContainer) {
      toast.error("Quotation template element not found");
      return;
    }

    setDownloadingPdf(true);
    const toastId = toast.loading("Generating 2-Page Proposal PDF...");

    try {
      // Dynamically load html2pdf.js if not present
      if (!(window as any).html2pdf) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load PDF generator library"));
          document.body.appendChild(script);
        });
      }

      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${docType}_Proposal_${customerName ? customerName.replace(/[^a-zA-Z0-9]/g, "_") : "Client"}_${invoiceNo}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false, scrollY: 0, scrollX: 0 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ['css', 'legacy'] }
      };

      await (window as any).html2pdf().set(opt).from(pdfContainer).save();
      toast.success("2-Page Proposal PDF Downloaded successfully!", { id: toastId });
    } catch (err: any) {
      console.error("PDF Download error:", err);
      toast.error("Failed to generate PDF: " + (err.message || err), { id: toastId });
    } finally {
      setDownloadingPdf(false);
    }
  };

  // Filtered Invoices List
  const filteredInvoices = invoices.filter((inv) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      inv.invoiceNo.toLowerCase().includes(q) ||
      inv.customerName.toLowerCase().includes(q) ||
      (inv.siteName || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="quotation-maker-page" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* Action Bar Header */}
      <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "10px" }}>
            <FileText size={28} color="var(--gold)" /> 2-Page Proposal & Quotation PDF Maker
          </h2>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
            Generate 2-Page Official Proposal PDF: Page 1 (Cover & Work Scope Summary) + Page 2 (Itemized Rates & Terms).
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          {viewMode !== "LIST" && (
            <button className="btn btn-secondary" onClick={() => setViewMode("LIST")} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <ArrowLeft size={16} /> Back to List
            </button>
          )}

          {viewMode === "LIST" && (
            <button className="btn btn-primary" onClick={handleCreateNew} style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <Plus size={18} /> Create New 2-Page Proposal
            </button>
          )}

          {viewMode === "FORM" && (
            <>
              <button className="btn btn-secondary" onClick={() => handlePreview()} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Eye size={16} /> Preview 2-Page PDF
              </button>
              <button className="btn btn-primary" onClick={handleSave} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Save size={16} /> Save to Database
              </button>
            </>
          )}

          {viewMode === "PREVIEW" && (
            <>
              <button className="btn btn-secondary" onClick={() => setViewMode("FORM")} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Edit size={16} /> Edit Proposal
              </button>
              <button className="btn btn-secondary" onClick={handlePrint} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Printer size={16} /> Print Document
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleDownloadPdf} 
                disabled={downloadingPdf}
                style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                {downloadingPdf ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                <span>Download 2-Page PDF</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── MODE 1: QUOTATIONS LIST ────────────────────────────────────────── */}
      {viewMode === "LIST" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          
          {/* Search bar */}
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div style={{ position: "relative", flex: 1 }}>
              <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: "36px" }}
                placeholder="Search by client name, proposal no, site name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Doc Type & No</th>
                  <th>Date</th>
                  <th>Client / Customer</th>
                  <th>Project / Site</th>
                  <th>Grand Total (₹)</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                      No Proposals or Invoices found. Click <strong>"Create New 2-Page Proposal"</strong> above to generate one.
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((inv) => (
                    <tr key={inv.id}>
                      <td>
                        <div style={{ fontWeight: 700, color: "#fff", fontSize: "14px" }}>
                          {inv.invoiceNo}
                        </div>
                        <span className="badge badge-info" style={{ fontSize: "10px", marginTop: "2px" }}>
                          {inv.docType} (2-PAGE)
                        </span>
                      </td>
                      <td style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                        {inv.invoiceDate}
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: "var(--gold)", fontSize: "14px" }}>
                          {inv.customerName}
                        </div>
                        {inv.customerAddress && (
                          <div style={{ fontSize: "11px", color: "var(--text-muted)" }} className="truncate">
                            {inv.customerAddress}
                          </div>
                        )}
                      </td>
                      <td style={{ fontSize: "13px" }}>
                        {inv.siteName || "N/A"}
                      </td>
                      <td>
                        <div style={{ fontWeight: 800, color: "#34d399", fontSize: "15px" }}>
                          ₹{Number(inv.grandTotal).toLocaleString("en-IN")}
                        </div>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "6px" }}>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => handlePreview(inv)}
                            title="Preview / Print / PDF"
                          >
                            <Eye size={14} /> Preview PDF
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleEdit(inv)}
                            title="Edit"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              if (confirm(`Delete proposal ${inv.invoiceNo}?`)) {
                                onDeleteInvoice(inv.id);
                              }
                            }}
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── MODE 2: FORM EDITOR ───────────────────────────────────────────── */}
      {viewMode === "FORM" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", background: "var(--card-bg)", padding: "24px", borderRadius: "16px", border: "1px solid var(--border)" }}>
          
          {/* Document Header Info */}
          <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 1fr", gap: "16px" }}>
            <div className="form-group">
              <label className="form-label">Document Type</label>
              <select className="form-select" value={docType} onChange={(e) => setDocType(e.target.value as any)}>
                <option value="QUOTATION">PROPOSAL & QUOTATION</option>
                <option value="INVOICE">TAX INVOICE</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Proposal / Quote No</label>
              <input type="text" className="form-input" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Date</label>
              <input type="date" className="form-input" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
            </div>
          </div>

          {/* Customer & Site Details */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", background: "rgba(255,255,255,0.02)", padding: "16px", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <div className="form-group">
              <label className="form-label">Customer / Client Name *</label>
              <input type="text" className="form-input" placeholder="e.g. Ramesh Kumar" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
            </div>

            <div className="form-group">
              <label className="form-label">Customer Address</label>
              <input type="text" className="form-input" placeholder="e.g. Domlur, Bengaluru" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Project / Site Name</label>
              <input type="text" className="form-input" placeholder="e.g. Farmland Civil Works" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
            </div>
          </div>

          {/* ── PAGE 1 EDITORS: Proposal Subject, Cover Letter & Scope Summary ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", background: "rgba(217, 119, 6, 0.05)", padding: "20px", borderRadius: "14px", border: "1px solid rgba(217, 119, 6, 0.2)" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--gold)", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              <FileText size={18} /> PAGE 1: Proposal Letter & Scope Summary Setup
            </h3>

            <div className="form-group">
              <label className="form-label">Subject Line</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Subject of quotation..."
                value={subject} 
                onChange={(e) => setSubject(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Proposal Cover Message</label>
              <textarea 
                className="form-textarea" 
                rows={4} 
                value={coverLetter} 
                onChange={(e) => setCoverLetter(e.target.value)} 
              />
            </div>

            {/* Scope Summary Box Items */}
            <div className="form-group">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <label className="form-label" style={{ fontWeight: 700, color: "#fff", margin: 0 }}>
                  Description of Items (Work Scope Summary Points)
                </label>
                <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddScopeItem} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <Plus size={14} /> Add Scope Point
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {scopeItems.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ width: "24px", color: "var(--gold)", fontWeight: 700, fontSize: "13px" }}>
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <input
                      type="text"
                      className="form-input"
                      style={{ flex: 1 }}
                      placeholder="e.g. DRAINAGE WORK (DWC PIPE)"
                      value={item}
                      onChange={(e) => handleScopeChange(idx, e.target.value)}
                    />
                    {scopeItems.length > 1 && (
                      <button type="button" onClick={() => handleRemoveScopeItem(idx)} style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", padding: "4px" }}>
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── PAGE 2 EDITORS: Itemized Rate Table ───────────────────────────── */}
          <div className="form-group">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <label className="form-label" style={{ fontSize: "15px", fontWeight: 700, color: "var(--gold)", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                <ListPlus size={18} /> PAGE 2: Itemized Rate & Specifications Table
              </label>
              <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddItem} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <Plus size={14} /> Add Work Item
              </button>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.05)", borderBottom: "1px solid var(--border)" }}>
                    <th style={{ padding: "10px", textAlign: "center", width: "80px" }}>
                      <label style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", color: showColumnSlNo ? "var(--gold)" : "var(--text-muted)" }} title="Toggle Sl.No Column ON/OFF on PDF">
                        <input type="checkbox" checked={showColumnSlNo} onChange={(e) => setShowColumnSlNo(e.target.checked)} style={{ accentColor: "var(--gold)", cursor: "pointer" }} />
                        <span>#</span>
                      </label>
                    </th>
                    <th style={{ padding: "10px", textAlign: "left" }}>Description of Work & Specifications</th>
                    <th style={{ padding: "10px", textAlign: "center", width: "80px" }}>Rates</th>
                    <th style={{ padding: "10px", textAlign: "center", width: "95px" }}>
                      <label style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", color: showColumnUnit ? "#60a5fa" : "var(--text-muted)" }} title="Toggle Unit Column ON/OFF on PDF">
                        <input type="checkbox" checked={showColumnUnit} onChange={(e) => setShowColumnUnit(e.target.checked)} style={{ accentColor: "#60a5fa", cursor: "pointer" }} />
                        <span>Unit</span>
                      </label>
                    </th>
                    <th style={{ padding: "10px", textAlign: "center", width: "95px" }}>
                      <label style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", color: showColumnQty ? "#60a5fa" : "var(--text-muted)" }} title="Toggle Qty Column ON/OFF on PDF">
                        <input type="checkbox" checked={showColumnQty} onChange={(e) => setShowColumnQty(e.target.checked)} style={{ accentColor: "#60a5fa", cursor: "pointer" }} />
                        <span>Qty</span>
                      </label>
                    </th>
                    <th style={{ padding: "10px", textAlign: "right", width: "115px" }}>
                      <label style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", color: showColumnRate ? "#60a5fa" : "var(--text-muted)" }} title="Toggle Rate Column ON/OFF on PDF">
                        <input type="checkbox" checked={showColumnRate} onChange={(e) => setShowColumnRate(e.target.checked)} style={{ accentColor: "#60a5fa", cursor: "pointer" }} />
                        <span>Rate (₹)</span>
                      </label>
                    </th>
                    <th style={{ padding: "10px", textAlign: "right", width: "125px" }}>
                      <label style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", color: showColumnAmount ? "#34d399" : "var(--text-muted)" }} title="Toggle Amount Column ON/OFF on PDF">
                        <input type="checkbox" checked={showColumnAmount} onChange={(e) => setShowColumnAmount(e.target.checked)} style={{ accentColor: "#34d399", cursor: "pointer" }} />
                        <span>Amount (₹)</span>
                      </label>
                    </th>
                    <th style={{ padding: "10px", textAlign: "center", width: "40px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => {
                    const ratesOn = item.showRates !== false;
                    return (
                      <tr key={idx} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", opacity: ratesOn ? 1 : 0.8 }}>
                        <td style={{ padding: "8px", textAlign: "center", color: "var(--gold)", fontWeight: 700 }}>
                          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                            <label style={{ cursor: "pointer" }} title="Toggle Serial Number visibility on PDF">
                              <input
                                type="checkbox"
                                checked={item.showSlNo !== false}
                                onChange={(e) => handleItemChange(idx, "showSlNo", e.target.checked)}
                                style={{ accentColor: "var(--gold)", cursor: "pointer" }}
                              />
                            </label>
                            <input
                              type="text"
                              className="form-input"
                              style={{ width: "55px", textAlign: "center", padding: "4px 6px", fontSize: "12px", fontWeight: 700, color: "var(--gold)" }}
                              placeholder="1, A..."
                              value={item.slNo !== undefined ? item.slNo : (idx + 1)}
                              onChange={(e) => handleItemChange(idx, "slNo", e.target.value)}
                              title="Edit Serial Number (e.g. 1, 2, A, B, C, D)"
                            />
                          </div>
                        </td>
                        <td style={{ padding: "8px" }}>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Detailed work specification..."
                            value={item.description}
                            onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                          />
                        </td>
                        <td style={{ padding: "8px", textAlign: "center" }}>
                          <label style={{ display: "inline-flex", alignItems: "center", gap: "4px", cursor: "pointer", fontSize: "11px", color: ratesOn ? "#34d399" : "var(--text-muted)", fontWeight: 600 }}>
                            <input
                              type="checkbox"
                              checked={ratesOn}
                              onChange={(e) => handleItemChange(idx, "showRates", e.target.checked)}
                            />
                            {ratesOn ? "ON" : "OFF"}
                          </label>
                        </td>
                        <td style={{ padding: "8px" }}>
                          <select
                            className="form-select"
                            disabled={!ratesOn}
                            style={{ opacity: ratesOn ? 1 : 0.4 }}
                            value={item.unit}
                            onChange={(e) => handleItemChange(idx, "unit", e.target.value)}
                          >
                            <option value="sq.ft">sq.ft</option>
                            <option value="sq.m">sq.m</option>
                            <option value="cu.m">cu.m</option>
                            <option value="r.ft">r.ft</option>
                            <option value="nos">nos</option>
                            <option value="lump sum">lump sum</option>
                            <option value="days">days</option>
                          </select>
                        </td>
                        <td style={{ padding: "8px" }}>
                          <input
                            type="number"
                            className="form-input"
                            disabled={!ratesOn}
                            style={{ textAlign: "center", opacity: ratesOn ? 1 : 0.4 }}
                            value={item.qty}
                            onChange={(e) => handleItemChange(idx, "qty", e.target.value)}
                          />
                        </td>
                        <td style={{ padding: "8px" }}>
                          <input
                            type="number"
                            className="form-input"
                            disabled={!ratesOn}
                            style={{ textAlign: "right", opacity: ratesOn ? 1 : 0.4 }}
                            value={item.rate}
                            onChange={(e) => handleItemChange(idx, "rate", e.target.value)}
                          />
                        </td>
                        <td style={{ padding: "8px", textAlign: "right", fontWeight: 700, color: ratesOn ? "#34d399" : "var(--text-muted)" }}>
                          {ratesOn ? `₹${Number(item.amount).toLocaleString("en-IN")}` : ""}
                        </td>
                        <td style={{ padding: "8px", textAlign: "center" }}>
                          {items.length > 1 && (
                            <button type="button" onClick={() => handleRemoveItem(idx)} style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer" }}>
                              <Trash2 size={16} />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Subtotal, GST & Grand Total */}
          <div style={{ display: "flex", justifyContent: "flex-end", borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
            <div style={{ width: "340px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {/* Subtotal Toggle */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: 600, color: "#fff" }}>
                  <input
                    type="checkbox"
                    checked={showSubtotal}
                    onChange={(e) => setShowSubtotal(e.target.checked)}
                    style={{ width: "16px", height: "16px", accentColor: "var(--gold)", cursor: "pointer" }}
                  />
                  <span>Show Subtotal?</span>
                </label>
                <span style={{ fontWeight: 700, opacity: showSubtotal ? 1 : 0.4 }}>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              {/* GST Toggle */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: 600, color: "#fff" }}>
                  <input
                    type="checkbox"
                    checked={includeGst}
                    onChange={(e) => setIncludeGst(e.target.checked)}
                    style={{ width: "16px", height: "16px", accentColor: "var(--gold)", cursor: "pointer" }}
                  />
                  <span>Add GST?</span>
                </label>

                {includeGst ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>GST (%):</span>
                    <input
                      type="number"
                      className="form-input"
                      style={{ width: "65px", textAlign: "right", padding: "4px 8px" }}
                      value={gstPercent}
                      onChange={(e) => setGstPercent(Number(e.target.value))}
                    />
                    <span style={{ fontWeight: 600 }}>₹{gstAmount.toLocaleString("en-IN")}</span>
                  </div>
                ) : (
                  <span style={{ fontSize: "12px", color: "#94a3b8", fontStyle: "italic" }}>
                    (GST Excluded / OFF)
                  </span>
                )}
              </div>

              {/* Grand Total Toggle */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "16px", fontWeight: 800, color: "var(--gold)", borderTop: "1px solid var(--border)", paddingTop: "8px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: 700, color: "var(--gold)" }}>
                  <input
                    type="checkbox"
                    checked={showGrandTotal}
                    onChange={(e) => setShowGrandTotal(e.target.checked)}
                    style={{ width: "16px", height: "16px", accentColor: "var(--gold)", cursor: "pointer" }}
                  />
                  <span>Show Grand Total?</span>
                </label>
                <span style={{ opacity: showGrandTotal ? 1 : 0.4 }}>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Bank Details & Terms */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, color: "#fff" }}>Terms & Conditions</label>
              <textarea className="form-textarea" rows={5} value={terms} onChange={(e) => setTerms(e.target.value)} />
            </div>

            <div className="form-group" style={{ background: "rgba(255,255,255,0.02)", padding: "14px", borderRadius: "10px", border: "1px solid var(--border)" }}>
              <label className="form-label" style={{ fontWeight: 700, color: "var(--gold)" }}>Bank Account Details</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <input type="text" className="form-input" placeholder="Bank Name" value={bankDetails.bankName} onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })} />
                <input type="text" className="form-input" placeholder="Account No" value={bankDetails.accountNo} onChange={(e) => setBankDetails({ ...bankDetails, accountNo: e.target.value })} />
                <input type="text" className="form-input" placeholder="IFSC Code" value={bankDetails.ifscCode} onChange={(e) => setBankDetails({ ...bankDetails, ifscCode: e.target.value })} />
                <input type="text" className="form-input" placeholder="Branch" value={bankDetails.branch} onChange={(e) => setBankDetails({ ...bankDetails, branch: e.target.value })} />
              </div>
            </div>
          </div>

          {/* Bottom Save Action */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "12px" }}>
            <button type="button" className="btn btn-secondary" onClick={() => setViewMode("LIST")}>Cancel</button>
            <button type="button" className="btn btn-secondary" onClick={() => handlePreview()}>Preview 2-Page PDF</button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>Save Proposal to DB</button>
          </div>

        </div>
      )}

      {/* ── MODE 3: PRINT & PDF READY PREVIEW DOCUMENT (2-PAGE PROPOSAL) ──────── */}
      {viewMode === "PREVIEW" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", width: "100%" }}>
          
          {/* Printable White A4 Document Container */}
          <div className="pdf-preview-scroll-wrapper">
            <div 
              id="pdf-render-document"
              style={{
                width: "700px",
                maxWidth: "100%",
                background: "#ffffff",
                color: "#1e293b",
                padding: "0",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                borderRadius: "4px",
                fontFamily: "Arial, Helvetica, sans-serif",
                boxSizing: "border-box",
                margin: "0 auto"
              }}
            >
            {/* ═════════════════════════════════════════════════════════════════ */}
            {/* PAGE 1: PROPOSAL COVER LETTER & WORK SCOPE SUMMARY              */}
            {/* ═════════════════════════════════════════════════════════════════ */}
            <div style={{ minHeight: "270mm", padding: "28px 32px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                {/* Header Logo & Company Info */}
                <div style={{ textAlign: "center", paddingBottom: "12px", marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginBottom: "10px" }}>
                    <img 
                      src={logoImg} 
                      alt="Nimmametro Logo" 
                      style={{ height: "92px", width: "auto", objectFit: "contain", display: "block", margin: "0 auto" }} 
                    />
                  </div>
                  <h1 style={{ margin: 0, fontSize: "31px", fontWeight: 900, color: "#000000", fontFamily: "Arial, Helvetica, sans-serif", letterSpacing: "0.2px", lineHeight: "1.15", whiteSpace: "nowrap" }}>
                    NIMMAMETRO CONSTRUCTIONS
                  </h1>
                  <p style={{ margin: "4px 0 0", fontSize: "11px", fontWeight: 700, color: "#000000" }}>
                    212/A, 3rd Floor, 1st Main Rd, Domlur, Stage 2, Domluru, Bengaluru, Karnataka 560071
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "11px", fontWeight: 700, color: "#003366", marginTop: "6px", borderTop: "1.5px solid #003366", paddingTop: "6px" }}>
                    <a href="https://www.nimmametroconstructions.com" style={{ color: "#003366", textDecoration: "underline" }}>www.nimmametroconstructions.com</a>
                    <span>Phone: +91 91488 06063 | constructions@nimmametro.com</span>
                  </div>
                </div>

                {/* Subject Line */}
                <div style={{ marginBottom: "20px" }}>
                  <h3 style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#000000", fontFamily: "Arial, Helvetica, sans-serif" }}>
                    Subject: <span>{subject}</span>
                  </h3>
                </div>

                {/* Proposal Cover Letter Body */}
                <div style={{ fontSize: "12px", lineHeight: "1.6", color: "#000000", fontWeight: 500, marginBottom: "24px", whiteSpace: "pre-line", fontFamily: "Arial, Helvetica, sans-serif" }}>
                  {coverLetter}
                </div>

                {/* Scope Summary Box (Description of Items) */}
                <div style={{ margin: "20px auto", width: "82%" }}>
                  <h4 style={{ textAlign: "center", fontSize: "13px", fontWeight: 700, color: "#003366", margin: "0 0 10px", fontFamily: "Arial, Helvetica, sans-serif" }}>
                    Description of items.
                  </h4>
                  <div style={{ border: "1px solid #000000", background: "#ffffff", padding: "16px 24px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {scopeItems.map((item, idx) => (
                      <div key={idx} style={{ fontSize: "12px", fontWeight: 700, color: "#003366", display: "flex", gap: "8px", alignItems: "center", fontFamily: "Arial, Helvetica, sans-serif" }}>
                        <span style={{ width: "20px" }}>{String.fromCharCode(65 + idx)}.</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            {/* PAGE BREAK FOR HTML2PDF & PRINT */}
            <div style={{ pageBreakAfter: "always", breakAfter: "page", height: "1px", display: "block" }} />

            {/* ═════════════════════════════════════════════════════════════════ */}
            {/* PAGE 2: ITEMIZED RATE TABLE & FINANCIAL BREAKDOWN & TERMS          */}
            {/* ═════════════════════════════════════════════════════════════════ */}
            <div style={{ minHeight: "270mm", padding: "28px 32px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #e2e8f0", paddingBottom: "14px", marginBottom: "18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <img 
                      src={logoImg} 
                      alt="Nimmametro Logo" 
                      style={{ height: "46px", width: "auto", objectFit: "contain" }} 
                    />
                    <div>
                      <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: "#000000" }}>
                        NIMMAMETRO CONSTRUCTIONS
                      </h2>
                      <p style={{ margin: "2px 0 0", fontSize: "10px", color: "#003366", fontWeight: 700 }}>
                        Phone: +91 91488 06063 | Email: constructions@nimmametro.com
                      </p>
                    </div>
                  </div>

                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 600 }}>
                      Date: <strong>{invoiceDate}</strong>
                    </div>
                  </div>
                </div>

                {/* Customer & Site Details Box */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", background: "#f8fafc", padding: "12px 16px", borderRadius: "6px", border: "1px solid #e2e8f0", marginBottom: "16px" }}>
                  <div>
                    <div style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase", color: "#64748b" }}>
                      Billed To / Customer Name:
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a", marginTop: "2px" }}>
                      {customerName || "Client Name"}
                    </div>
                    {customerAddress && (
                      <div style={{ fontSize: "11px", color: "#475569" }}>{customerAddress}</div>
                    )}
                  </div>

                  <div>
                    <div style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase", color: "#64748b" }}>
                      Project / Site Name:
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#003366", marginTop: "2px" }}>
                      {siteName || "Civil Works Site"}
                    </div>
                  </div>
                </div>

                {/* Itemized Rate Table */}
                <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "16px", fontSize: "11px" }}>
                  <thead>
                    <tr style={{ background: "#0f172a", color: "#ffffff" }}>
                      <th style={{ padding: "8px", textAlign: "center", width: "35px" }}>{showColumnSlNo ? "Sl.No" : ""}</th>
                      <th style={{ padding: "8px", textAlign: "left" }}>Description of Work & Specifications</th>
                      <th style={{ padding: "8px", textAlign: "center", width: "65px" }}>{showColumnUnit ? "Unit" : ""}</th>
                      <th style={{ padding: "8px", textAlign: "center", width: "55px" }}>{showColumnQty ? "Qty" : ""}</th>
                      <th style={{ padding: "8px", textAlign: "right", width: "85px" }}>{showColumnRate ? "Rate (₹)" : ""}</th>
                      <th style={{ padding: "8px", textAlign: "right", width: "95px" }}>{showColumnAmount ? "Amount (₹)" : ""}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => {
                      const ratesOn = parseBool(item.showRates, true);
                      const slNoOn = showColumnSlNo && parseBool(item.showSlNo, true);
                      const unitOn = showColumnUnit && ratesOn && parseBool(item.showUnit, true);
                      const qtyOn = showColumnQty && ratesOn && parseBool(item.showQty, true);
                      const rateOn = showColumnRate && ratesOn && parseBool(item.showRate, true);
                      const amountOn = showColumnAmount && ratesOn && parseBool(item.showAmount, true);

                      return (
                        <tr key={idx} style={{ borderBottom: "1px solid #e2e8f0", background: idx % 2 === 0 ? "#ffffff" : "#f8fafc" }}>
                          <td style={{ padding: "8px", textAlign: "center", fontWeight: 700, color: "#64748b" }}>
                            {slNoOn ? (item.slNo !== undefined && item.slNo !== "" ? item.slNo : (idx + 1)) : ""}
                          </td>
                          <td style={{ padding: "8px", fontWeight: 600, color: "#1e293b", lineHeight: "1.4" }}>
                            {item.description}
                          </td>
                          <td style={{ padding: "8px", textAlign: "center", color: "#475569" }}>
                            {unitOn ? item.unit : ""}
                          </td>
                          <td style={{ padding: "8px", textAlign: "center", fontWeight: 600 }}>
                            {qtyOn ? item.qty : ""}
                          </td>
                          <td style={{ padding: "8px", textAlign: "right" }}>
                            {rateOn ? `₹${Number(item.rate).toLocaleString("en-IN")}` : ""}
                          </td>
                          <td style={{ padding: "8px", textAlign: "right", fontWeight: 700, color: amountOn ? "#0f172a" : "#94a3b8" }}>
                            {amountOn ? `₹${Number(item.amount).toLocaleString("en-IN")}` : ""}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Subtotal & Totals Box */}
                {(showSubtotal || (includeGst && gstPercent > 0) || showGrandTotal) && (
                  <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
                    <div style={{ width: "240px", fontSize: "11px", border: "1px solid #e2e8f0", borderRadius: "6px", overflow: "hidden" }}>
                      {showSubtotal && (
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 10px", background: "#f8fafc", borderBottom: (includeGst && gstPercent > 0) || showGrandTotal ? "1px solid #e2e8f0" : "none" }}>
                          <span>Subtotal:</span>
                          <strong style={{ color: "#0f172a" }}>₹{subtotal.toLocaleString("en-IN")}</strong>
                        </div>
                      )}
                      {includeGst && gstPercent > 0 && (
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 10px", background: "#f8fafc", borderBottom: showGrandTotal ? "1px solid #e2e8f0" : "none" }}>
                          <span>GST ({gstPercent}%):</span>
                          <strong style={{ color: "#0f172a" }}>₹{gstAmount.toLocaleString("en-IN")}</strong>
                        </div>
                      )}
                      {showGrandTotal && (
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 10px", background: "#003366", color: "#ffffff", fontSize: "13px", fontWeight: 800 }}>
                          <span>Grand Total:</span>
                          <span style={{ color: "#ffffff" }}>₹{grandTotal.toLocaleString("en-IN")}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Terms & Conditions & Bank Details */}
                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "16px", borderTop: "2px solid #e2e8f0", paddingTop: "14px", fontSize: "10px" }}>
                  <div>
                    <div style={{ fontWeight: 800, color: "#0f172a", marginBottom: "4px", textTransform: "uppercase", fontSize: "10px" }}>
                      TERMS & CONDITIONS:
                    </div>
                    <div style={{ whiteSpace: "pre-line", color: "#475569", lineHeight: "1.5" }}>
                      {terms}
                    </div>
                  </div>

                  <div style={{ background: "#f8fafc", padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontWeight: 800, color: "#003366", marginBottom: "4px", textTransform: "uppercase", fontSize: "10px" }}>
                      BANK PAYMENT DETAILS:
                    </div>
                    <div style={{ color: "#334155", display: "flex", flexDirection: "column", gap: "2px" }}>
                      <div>Bank: <strong>{bankDetails.bankName}</strong></div>
                      <div>A/C No: <strong>{bankDetails.accountNo}</strong></div>
                      <div>IFSC: <strong>{bankDetails.ifscCode}</strong></div>
                      <div>Branch: <strong>{bankDetails.branch}</strong></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Page 2 Bottom Signature Area */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "24px", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
                <div style={{ fontSize: "10px", color: "#64748b" }}>
                  Thanking you,
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "10px", color: "#64748b" }}>yours faithfully,</div>
                  <div style={{ fontWeight: 800, fontSize: "11px", color: "#0f172a", marginBottom: "28px" }}>
                    For NIMMAMETRO CONSTRUCTIONS
                  </div>
                  <div style={{ borderTop: "1px dashed #94a3b8", width: "160px", margin: "0 auto 3px" }}></div>
                  <div style={{ fontSize: "10px", fontWeight: 700, color: "#64748b" }}>
                    Authorized Signatory
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )}

</div>
);
};

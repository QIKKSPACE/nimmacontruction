import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Projects } from "./pages/Projects";
import { Enquiries } from "./pages/Enquiries";
import { Crm } from "./pages/Crm";
import { QuotationMaker } from "./pages/QuotationMaker";
import { HeroSlider } from "./pages/HeroSlider";
import { Login } from "./pages/Login";
import { ProjectModal } from "./components/ProjectModal";
import { EnquiryModal } from "./components/EnquiryModal";
import { LeadModal } from "./components/LeadModal";
import { initialProjects, initialEnquiries, initialLeads, initialInvoices } from "./data/initial-data";
import type { Project, Enquiry, Lead, Invoice, EnquiryStatus } from "./types";
import { Toaster, toast } from "react-hot-toast";
import { API } from "./lib/api";

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Layout>{children}</Layout>;
};

export const AppContent: React.FC = () => {
  // State for Projects, Enquiries, CRM Leads & Invoices/Quotations
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("nimma_admin_projects");
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem("nimma_admin_enquiries");
    return saved ? JSON.parse(saved) : initialEnquiries;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem("nimma_admin_leads");
    return saved ? JSON.parse(saved) : initialLeads;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem("nimma_admin_invoices");
    return saved ? JSON.parse(saved) : initialInvoices;
  });

  // Modal States
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  // Load Projects, Enquiries, Leads & Invoices from Backend API on mount
  useEffect(() => {
    fetch(API.projects)
      .then((res) => res.json())
      .then((data) => {
        if (data.status && Array.isArray(data.data)) {
          setProjects(data.data);
          localStorage.setItem("nimma_admin_projects", JSON.stringify(data.data));
        }
      })
      .catch((err) => console.log("Backend project fetch error:", err));

    fetch(API.enquiries)
      .then((res) => res.json())
      .then((data) => {
        if (data.status && Array.isArray(data.data)) {
          setEnquiries(data.data);
          localStorage.setItem("nimma_admin_enquiries", JSON.stringify(data.data));
        }
      })
      .catch((err) => console.log("Backend enquiry fetch error:", err));

    fetch(API.leads)
      .then((res) => res.json())
      .then((data) => {
        if (data.status && Array.isArray(data.data)) {
          setLeads(data.data);
          localStorage.setItem("nimma_admin_leads", JSON.stringify(data.data));
        }
      })
      .catch((err) => console.log("Backend leads fetch error:", err));

    fetch(API.invoices)
      .then((res) => res.json())
      .then((data) => {
        if (data.status && Array.isArray(data.data)) {
          setInvoices(data.data);
          localStorage.setItem("nimma_admin_invoices", JSON.stringify(data.data));
        }
      })
      .catch((err) => console.log("Backend invoices fetch error:", err));
  }, []);

  // Save Project to Database API
  const handleSaveProject = async (project: Project) => {
    let updated: Project[];
    const exists = projects.some((p) => p.id === project.id);
    if (exists) {
      updated = projects.map((p) => (p.id === project.id ? project : p));
    } else {
      updated = [project, ...projects];
    }
    setProjects(updated);
    localStorage.setItem("nimma_admin_projects", JSON.stringify(updated));

    const toastId = toast.loading("Saving project to Database...");
    try {
      const response = await fetch(API.projects, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      const resData = await response.json();
      if (resData.status) {
        toast.success("Project saved successfully!", { id: toastId });
        const refresh = await fetch(API.projects);
        const freshData = await refresh.json();
        if (freshData.status && Array.isArray(freshData.data)) {
          setProjects(freshData.data);
          localStorage.setItem("nimma_admin_projects", JSON.stringify(freshData.data));
        }
      } else {
        toast.error("Database save warning: " + resData.message, { id: toastId, duration: 6000 });
      }
    } catch (err: any) {
      console.error("Failed to persist project to DB:", err);
      toast.error("Failed to save project to Database: " + (err.message || err), { id: toastId, duration: 6000 });
    }
  };

  // Delete Project from Database API
  const handleDeleteProject = async (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    localStorage.setItem("nimma_admin_projects", JSON.stringify(updated));

    try {
      await fetch(API.projects, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch (err) {
      console.error("DB Delete error:", err);
    }
  };

  // Enquiries Operations
  const handleUpdateEnquiryStatus = async (id: string, status: EnquiryStatus) => {
    const updated = enquiries.map((e) => (e.id === id ? { ...e, status } : e));
    setEnquiries(updated);
    localStorage.setItem("nimma_admin_enquiries", JSON.stringify(updated));
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status });
    }

    try {
      await fetch(API.enquiries, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
    } catch (err) {
      console.error("DB Enquiry update error:", err);
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    const updated = enquiries.filter((e) => e.id !== id);
    setEnquiries(updated);
    localStorage.setItem("nimma_admin_enquiries", JSON.stringify(updated));

    try {
      await fetch(API.enquiries, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch (err) {
      console.error("DB Enquiry delete error:", err);
    }
  };

  // CRM Leads Operations
  const handleSaveLead = async (lead: Lead) => {
    let updated: Lead[];
    const exists = leads.some((l) => l.id === lead.id);
    if (exists) {
      updated = leads.map((l) => (l.id === lead.id ? lead : l));
    } else {
      updated = [lead, ...leads];
    }
    setLeads(updated);
    localStorage.setItem("nimma_admin_leads", JSON.stringify(updated));

    const toastId = toast.loading("Saving lead to CRM Database...");
    try {
      const response = await fetch(API.leads, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      const resData = await response.json();
      if (resData.status) {
        toast.success("Lead saved successfully!", { id: toastId });
        const refresh = await fetch(API.leads);
        const freshData = await refresh.json();
        if (freshData.status && Array.isArray(freshData.data)) {
          setLeads(freshData.data);
          localStorage.setItem("nimma_admin_leads", JSON.stringify(freshData.data));
        }
      } else {
        toast.error("CRM save warning: " + resData.message, { id: toastId, duration: 6000 });
      }
    } catch (err: any) {
      console.error("Failed to persist lead to DB:", err);
      toast.error("Failed to save lead to DB: " + (err.message || err), { id: toastId, duration: 6000 });
    }
  };

  const handleDeleteLead = async (id: string) => {
    const updated = leads.filter((l) => l.id !== id);
    setLeads(updated);
    localStorage.setItem("nimma_admin_leads", JSON.stringify(updated));

    const toastId = toast.loading("Deleting lead...");
    try {
      const response = await fetch(API.leads, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const resData = await response.json();
      if (resData.status) {
        toast.success("Lead deleted successfully!", { id: toastId });
      }
    } catch (err) {
      console.error("DB Lead Delete error:", err);
      toast.error("Failed to delete lead from database.", { id: toastId });
    }
  };

  // Invoices / Quotation Operations
  const handleSaveInvoice = async (invoice: Invoice) => {
    let updated: Invoice[];
    const exists = invoices.some((i) => i.id === invoice.id);
    if (exists) {
      updated = invoices.map((i) => (i.id === invoice.id ? invoice : i));
    } else {
      updated = [invoice, ...invoices];
    }
    setInvoices(updated);
    localStorage.setItem("nimma_admin_invoices", JSON.stringify(updated));

    const toastId = toast.loading(`Saving ${invoice.docType} to Database...`);
    try {
      const response = await fetch(API.invoices, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoice),
      });
      const resData = await response.json();
      if (resData.status) {
        toast.success(`${invoice.docType} saved successfully!`, { id: toastId });
        const refresh = await fetch(API.invoices);
        const freshData = await refresh.json();
        if (freshData.status && Array.isArray(freshData.data)) {
          setInvoices(freshData.data);
          localStorage.setItem("nimma_admin_invoices", JSON.stringify(freshData.data));
        }
      } else {
        toast.error("Save warning: " + resData.message, { id: toastId, duration: 6000 });
      }
    } catch (err: any) {
      console.error("Failed to persist invoice to DB:", err);
      toast.error("Failed to save to Database: " + (err.message || err), { id: toastId, duration: 6000 });
    }
  };

  const handleDeleteInvoice = async (id: string) => {
    const updated = invoices.filter((i) => i.id !== id);
    setInvoices(updated);
    localStorage.setItem("nimma_admin_invoices", JSON.stringify(updated));

    const toastId = toast.loading("Deleting item...");
    try {
      const response = await fetch(API.invoices, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const resData = await response.json();
      if (resData.status) {
        toast.success("Deleted successfully!", { id: toastId });
      }
    } catch (err) {
      console.error("DB Delete error:", err);
      toast.error("Failed to delete from database.", { id: toastId });
    }
  };

  return (
    <>
      <Toaster position="top-right" toastOptions={{ style: { background: '#1e293b', color: '#fff' } }} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedLayout>
              <Dashboard
                projects={projects}
                enquiries={enquiries}
                onOpenAddProject={() => {
                  setEditingProject(null);
                  setIsProjectModalOpen(true);
                }}
                onViewEnquiry={(e) => setSelectedEnquiry(e)}
              />
            </ProtectedLayout>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedLayout>
              <Projects
                projects={projects}
                onOpenAddProject={() => {
                  setEditingProject(null);
                  setIsProjectModalOpen(true);
                }}
                onEditProject={(p) => {
                  setEditingProject(p);
                  setIsProjectModalOpen(true);
                }}
                onDeleteProject={handleDeleteProject}
              />
            </ProtectedLayout>
          }
        />
        <Route
          path="/enquiries"
          element={
            <ProtectedLayout>
              <Enquiries
                enquiries={enquiries}
                onViewEnquiry={(e) => setSelectedEnquiry(e)}
                onUpdateStatus={handleUpdateEnquiryStatus}
                onDeleteEnquiry={handleDeleteEnquiry}
              />
            </ProtectedLayout>
          }
        />
        <Route
          path="/crm"
          element={
            <ProtectedLayout>
              <Crm
                leads={leads}
                onAddLead={() => {
                  setEditingLead(null);
                  setIsLeadModalOpen(true);
                }}
                onEditLead={(l) => {
                  setEditingLead(l);
                  setIsLeadModalOpen(true);
                }}
                onDeleteLead={handleDeleteLead}
              />
            </ProtectedLayout>
          }
        />
        <Route
          path="/quotations"
          element={
            <ProtectedLayout>
              <QuotationMaker
                invoices={invoices}
                onSaveInvoice={handleSaveInvoice}
                onDeleteInvoice={handleDeleteInvoice}
              />
            </ProtectedLayout>
          }
        />
        <Route
          path="/hero-slider"
          element={
            <ProtectedLayout>
              <HeroSlider />
            </ProtectedLayout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Modals */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSave={handleSaveProject}
        editingProject={editingProject}
      />

      <EnquiryModal
        enquiry={selectedEnquiry}
        onClose={() => setSelectedEnquiry(null)}
        onUpdateStatus={handleUpdateEnquiryStatus}
      />

      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        onSave={handleSaveLead}
        editingLead={editingLead}
      />
    </>
  );
};

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

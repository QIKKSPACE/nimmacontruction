import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Projects } from "./pages/Projects";
import { Enquiries } from "./pages/Enquiries";
import { HeroSlider } from "./pages/HeroSlider";
import { Login } from "./pages/Login";
import { ProjectModal } from "./components/ProjectModal";
import { EnquiryModal } from "./components/EnquiryModal";
import { initialProjects, initialEnquiries } from "./data/initial-data";
import type { Project, Enquiry, EnquiryStatus } from "./types";
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
  // State for Projects & Enquiries
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("nimma_admin_projects");
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem("nimma_admin_enquiries");
    return saved ? JSON.parse(saved) : initialEnquiries;
  });

  // Modal States
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  // Load Projects from Backend API on mount
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
  }, []);

  // Save Project to Database API
  const handleSaveProject = async (project: Project) => {
    // 1. Optimistic Local Update
    let updated: Project[];
    const exists = projects.some((p) => p.id === project.id);
    if (exists) {
      updated = projects.map((p) => (p.id === project.id ? project : p));
    } else {
      updated = [project, ...projects];
    }
    setProjects(updated);
    localStorage.setItem("nimma_admin_projects", JSON.stringify(updated));

    // 2. Persist to MySQL DB
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
        // Refresh project list from DB
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
    // 1. Local Update
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    localStorage.setItem("nimma_admin_projects", JSON.stringify(updated));

    // 2. Persist Delete to DB
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

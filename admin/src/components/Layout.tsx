import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  LogOut,
  Menu,
  X,
  UserCheck,
  Images,
} from "lucide-react";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { label: "Dashboard", path: "/", icon: LayoutDashboard },
    { label: "Projects", path: "/projects", icon: Building2 },
    { label: "Enquiries", path: "/enquiries", icon: MessageSquare },
    { label: "Hero Slider", path: "/hero-slider", icon: Images },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo-icon">N</div>
          <div>
            <div className="sidebar-logo-text" style={{ fontSize: "14px" }}>Nimmametro Constructions</div>
            <div style={{ fontSize: "11px", color: "var(--gold)", fontWeight: 600 }}>
              ADMIN PANEL
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${active ? "active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button
            onClick={handleLogout}
            className="nav-item"
            style={{
              width: "100%",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              color: "#ef4444",
            }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="top-bar">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="btn btn-secondary btn-sm"
              style={{ display: "none" }} // Show on mobile via CSS if needed
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <h1 className="top-title">
              {location.pathname === "/"
                ? "Dashboard"
                : location.pathname === "/projects"
                ? "Projects Management"
                : location.pathname === "/enquiries"
                ? "Contact Enquiries"
                : location.pathname === "/hero-slider"
                ? "Hero Slider"
                : "Admin"}
            </h1>
          </div>

          <div className="top-actions">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "rgba(255,255,255,0.05)",
                padding: "6px 14px",
                borderRadius: "20px",
                border: "1px solid var(--border)",
              }}
            >
              <UserCheck size={16} color="var(--gold)" />
              <span style={{ fontSize: "13px", fontWeight: 600 }}>
                {user?.name || "Admin"}
              </span>
            </div>
          </div>
        </header>

        <main className="page-container">{children}</main>
      </div>
    </div>
  );
};

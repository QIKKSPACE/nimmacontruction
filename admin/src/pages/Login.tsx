import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import { API_BASE } from "../lib/api";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.message || "Invalid credentials. Please enter valid email and password.");
      }
    } catch (err: any) {
      setError("An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "var(--gold)",
              color: "#000",
              fontSize: "28px",
              fontWeight: "800",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              boxShadow: "0 10px 25px -5px rgba(234, 179, 8, 0.5)",
            }}
          >
            N
          </div>
          <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#fff" }}>
            Nimmametro Constructions
          </h2>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", marginTop: "4px" }}>
            JWT Control Panel Login
          </p>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "#f87171",
              padding: "12px",
              borderRadius: "10px",
              fontSize: "13px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Admin Email</label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                className="form-input"
                style={{ paddingLeft: "42px" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail
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
          </div>

          <div className="form-group" style={{ marginBottom: "28px" }}>
            <label className="form-label">Password</label>
            <div style={{ position: "relative" }}>
              <input
                type="password"
                className="form-input"
                style={{ paddingLeft: "42px" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", padding: "14px" }}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Verifying JWT...
              </>
            ) : (
              <>
                Sign In to Dashboard <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div
          style={{
            marginTop: "24px",
            textAlign: "center",
            fontSize: "12px",
            color: "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          <ShieldCheck size={14} color="var(--gold)" /> Connected to {API_BASE}
        </div>
      </div>
    </div>
  );
};

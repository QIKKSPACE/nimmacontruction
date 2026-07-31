import React, { useState, useEffect, useRef } from "react";
import { Trash2, Loader2, ImagePlus, Images, Type, Save } from "lucide-react";
import { toast } from "react-hot-toast";
import { API, API_BASE } from "../lib/api";

interface Slide {
  id: number;
  img_url: string;
  display_order: number;
  created_at: string;
}

interface HeroContent {
  title: string;
  subtitle: string;
  btn1_label: string;
  btn1_url: string;
  btn2_label: string;
  btn2_url: string;
}

const DEFAULT_CONTENT: HeroContent = {
  title: "Transforming Land into Landmarks",
  subtitle: "Building Karnataka's future through premium plotted developments, residential layouts, and sustainable infrastructure.",
  btn1_label: "Plotted Developments",
  btn1_url: "/projects/plotted-development",
  btn2_label: "Farmland Projects",
  btn2_url: "/projects/farmland-development",
};

export const HeroSlider: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [content, setContent] = useState<HeroContent>(DEFAULT_CONTENT);
  const [savingContent, setSavingContent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchSlides = async () => {
    try {
      const res = await fetch(API.hero);
      const data = await res.json();
      if (data.status) setSlides(data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch slides");
    } finally {
      setLoading(false);
    }
  };

  const fetchContent = async () => {
    try {
      const res = await fetch(`${API.hero}?type=content`);
      const data = await res.json();
      if (data.status && data.data) setContent(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSlides();
    fetchContent();
  }, []);

  const handleSaveContent = async () => {
    setSavingContent(true);
    const toastId = toast.loading("Saving hero content...");
    try {
      const res = await fetch(`${API.hero}?type=content`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (data.status) {
        toast.success("Hero content saved!", { id: toastId });
      } else {
        toast.error(data.message || "Failed to save", { id: toastId });
      }
    } catch (err) {
      toast.error("Network error", { id: toastId });
    } finally {
      setSavingContent(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    const toastId = toast.loading("Uploading slide(s)...");
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) formData.append("images[]", files[i]);
      const uploadRes = await fetch(API.upload, { method: "POST", body: formData });
      const uploadData = await uploadRes.json();
      if (uploadData.status && uploadData.urls?.length > 0) {
        for (const url of uploadData.urls) {
          await fetch(API.hero, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ img_url: url, display_order: slides.length }),
          });
        }
        toast.success(`${uploadData.urls.length} slide(s) uploaded!`, { id: toastId });
        fetchSlides();
      } else {
        toast.error(uploadData.message || "Failed to upload", { id: toastId });
      }
    } catch (err) {
      toast.error("Network error during upload", { id: toastId });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this slide from the homepage slider?")) return;
    try {
      const res = await fetch(`${API.hero}?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.status) {
        toast.success("Slide deleted");
        setSlides((prev) => prev.filter((s) => s.id !== id));
      } else {
        toast.error(data.message || "Failed to delete");
      }
    } catch {
      toast.error("Network error during delete");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--bg-main)",
    border: "1px solid var(--border)",
    borderRadius: "10px",
    padding: "10px 14px",
    color: "var(--text-main)",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "12px",
    fontWeight: 600,
    color: "var(--text-muted)",
    marginBottom: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };

  return (
    <div>
      {/* Page Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#fff" }}>Hero Slider</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "4px" }}>
            Manage the homepage hero — content text and background images.
          </p>
        </div>
        <div>
          <input type="file" accept="image/*" multiple ref={fileInputRef} onChange={handleUpload} style={{ display: "none" }} />
          <button
            className="btn btn-primary"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            {uploading ? <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> : <ImagePlus size={18} />}
            {uploading ? "Uploading..." : "Upload Slides"}
          </button>
        </div>
      </div>

      {/* ── CONTENT EDITOR ─────────────────────────────────────────────── */}
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px", marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid var(--border)" }}>
          <Type size={18} color="var(--gold)" />
          <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#fff" }}>Hero Text Content</h3>
        </div>

        <div style={{ display: "grid", gap: "18px" }}>
          {/* Title */}
          <div>
            <label style={labelStyle}>Main Heading</label>
            <input
              style={inputStyle}
              value={content.title}
              onChange={(e) => setContent({ ...content, title: e.target.value })}
              placeholder="Transforming Land into Landmarks"
              onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          {/* Subtitle */}
          <div>
            <label style={labelStyle}>Subtitle / Description</label>
            <textarea
              style={{ ...inputStyle, resize: "vertical", minHeight: "80px", fontFamily: "inherit" }}
              value={content.subtitle}
              onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
              placeholder="Building Karnataka's future through..."
              onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          {/* Button 1 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Button 1 — Label</label>
              <input
                style={inputStyle}
                value={content.btn1_label}
                onChange={(e) => setContent({ ...content, btn1_label: e.target.value })}
                placeholder="Plotted Developments"
                onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>
            <div>
              <label style={labelStyle}>Button 1 — URL</label>
              <input
                style={inputStyle}
                value={content.btn1_url}
                onChange={(e) => setContent({ ...content, btn1_url: e.target.value })}
                placeholder="/projects/plotted-development"
                onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>
          </div>

          {/* Button 2 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Button 2 — Label</label>
              <input
                style={inputStyle}
                value={content.btn2_label}
                onChange={(e) => setContent({ ...content, btn2_label: e.target.value })}
                placeholder="Farmland Projects"
                onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>
            <div>
              <label style={labelStyle}>Button 2 — URL</label>
              <input
                style={inputStyle}
                value={content.btn2_url}
                onChange={(e) => setContent({ ...content, btn2_url: e.target.value })}
                placeholder="/projects/farmland-development"
                onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>
          </div>

          {/* Save button */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              className="btn btn-primary"
              onClick={handleSaveContent}
              disabled={savingContent}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              {savingContent ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> : <Save size={16} />}
              Save Content
            </button>
          </div>
        </div>
      </div>

      {/* ── SLIDES SECTION ─────────────────────────────────────────────── */}
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "16px 24px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
        <Images size={20} color="var(--gold)" />
        <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>
          <strong style={{ color: "#fff" }}>{slides.length}</strong>{" "}
          {slides.length === 1 ? "slide" : "slides"} active on homepage
        </span>
        {slides.length > 0 && (
          <span style={{ marginLeft: "auto", fontSize: "12px", color: "var(--gold)", background: "rgba(234,179,8,0.1)", padding: "4px 12px", borderRadius: "20px", fontWeight: 600 }}>
            Auto-slides every 5s
          </span>
        )}
      </div>

      {loading ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px" }}>
          <Loader2 size={36} color="var(--gold)" style={{ animation: "spin 1s linear infinite" }} />
        </div>
      ) : slides.length === 0 ? (
        <div style={{ background: "var(--bg-card)", border: "2px dashed var(--border)", borderRadius: "20px", padding: "48px 32px", textAlign: "center" }}>
          <ImagePlus size={48} color="var(--text-muted)" style={{ margin: "0 auto 16px" }} />
          <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>No slides yet</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "20px" }}>Upload images to populate the homepage hero slider.</p>
          <button className="btn btn-primary" onClick={() => fileInputRef.current?.click()} style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <ImagePlus size={18} /> Upload First Slide
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", overflow: "hidden", transition: "border-color 0.2s ease, transform 0.2s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
            >
              <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                <img src={slide.img_url} alt={`Hero Slide ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", top: "10px", left: "10px", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", color: "var(--gold)", fontSize: "11px", fontWeight: "700", padding: "4px 10px", borderRadius: "20px", border: "1px solid rgba(234,179,8,0.3)" }}>
                  Slide {index + 1}
                </div>
              </div>
              <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--border)" }}>
                <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  Added: {new Date(slide.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
                <button
                  onClick={() => handleDelete(slide.id)}
                  style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", borderRadius: "8px", padding: "6px 12px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.25)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.1)")}
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import type { Project, ProjectCategory, ProjectStatus } from "../types";
import { X, Plus, Trash2, Upload, Star, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { API } from "../lib/api";

type ProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  editingProject?: Project | null;
};

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingProject,
}) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<ProjectCategory>("plotted");
  const [location, setLocation] = useState("");
  const [subLocation, setSubLocation] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("Completed");
  const [coverImg, setCoverImg] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [developmentArea, setDevelopmentArea] = useState("");
  const [googleMap, setGoogleMap] = useState("");
  const [youtubeVideo, setYoutubeVideo] = useState("");
  const [instagramVideo, setInstagramVideo] = useState("");
  const [infrastructureWorks, setInfrastructureWorks] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editingProject) {
      setName(editingProject.name);
      setCategory(editingProject.category);
      setLocation(editingProject.location);
      setSubLocation(editingProject.subLocation);
      setStatus(editingProject.status);
      setCoverImg(editingProject.img);
      setGallery(editingProject.gallery && editingProject.gallery.length ? editingProject.gallery : [editingProject.img]);
      setDescription(editingProject.description);
      setDevelopmentArea(editingProject.developmentArea || "");
      setGoogleMap(editingProject.googleMap || "");
      setYoutubeVideo(editingProject.youtubeVideo || "");
      setInstagramVideo(editingProject.instagramVideo || "");
      setInfrastructureWorks(editingProject.infrastructureWorks || []);
    } else {
      setName("");
      setCategory("plotted");
      setLocation("");
      setSubLocation("");
      setStatus("Completed");
      setCoverImg("");
      setGallery([]);
      setDescription("");
      setDevelopmentArea("");
      setGoogleMap("");
      setYoutubeVideo("");
      setInstagramVideo("");
      setInfrastructureWorks([]);
    }
  }, [editingProject, isOpen]);

  if (!isOpen) return null;

  // Handle Multi-file Upload to PHP Backend
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const toastId = toast.loading("Uploading images to server...");
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images[]", files[i]);
    }

    try {
      const response = await fetch(API.upload, {
        method: "POST",
        body: formData,
      });

      const resData = await response.json();
      if (response.ok && resData.status && resData.urls) {
        toast.success("Images uploaded successfully!", { id: toastId });
        const newUrls: string[] = resData.urls;
        const updatedGallery = [...gallery, ...newUrls];
        setGallery(updatedGallery);
        if (!coverImg) {
          setCoverImg(newUrls[0]);
        }
      } else {
        toast.error("Image upload failed: " + (resData.message || "Unknown error"), { id: toastId, duration: 5000 });
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      toast.error("Upload Error: " + err.message, { id: toastId, duration: 5000 });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleRemoveImage = (urlToRemove: string) => {
    const updated = gallery.filter((url) => url !== urlToRemove);
    setGallery(updated);
    if (coverImg === urlToRemove) {
      setCoverImg(updated.length > 0 ? updated[0] : "");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCover = coverImg || (gallery.length > 0 ? gallery[0] : "");

    if (!name || !location || !finalCover) {
      toast.error("Please fill in project name, location, and wait for image to finish uploading.", { duration: 4000 });
      return;
    }

    const newProject: Project = {
      id: editingProject ? editingProject.id : name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name,
      category,
      location,
      subLocation,
      status,
      img: finalCover,
      gallery: gallery.length > 0 ? gallery : [finalCover],
      description,
      developmentArea,
      googleMap,
      youtubeVideo,
      instagramVideo,
      infrastructureWorks,
    };

    onSave(newProject);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: "720px" }}>
        <div className="modal-header">
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff" }}>
            {editingProject ? "Edit Project" : "Upload New Project"}
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
          <div className="modal-body">
            {/* Project Category Selection */}
            <div className="form-group">
              <label className="form-label">Project Type (Category)</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as ProjectCategory)}
              >
                <option value="plotted">Plotted Development Project</option>
                <option value="farmland">Land / Farmland Development Project</option>
              </select>
            </div>

            {/* Project Name */}
            <div className="form-group">
              <label className="form-label">Project Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Nimma Royal Greens"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Location & Sub-location */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="form-group">
                <label className="form-label">Location (Village, Taluk, District, Karnataka)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Village, Taluk, District, Karnataka"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Sub Location / Connectivity</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. North Bengaluru Corridor"
                  value={subLocation}
                  onChange={(e) => setSubLocation(e.target.value)}
                />
              </div>
            </div>

            {/* Status */}
            <div className="form-group">
              <label className="form-label">Project Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
              >
                <option value="Completed">Completed</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Upcoming">Upcoming</option>
              </select>
            </div>

            {/* MULTI-IMAGE UPLOAD SECTION */}
            <div className="form-group" style={{ background: "#0f172a", padding: "16px", borderRadius: "12px", border: "1px solid var(--border)" }}>
              <label className="form-label" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span>Upload Project Images (Multiple Files)</span>
                <span style={{ fontSize: "11px", color: "var(--gold)" }}>⭐ Click star to set as main Cover Image</span>
              </label>

              {/* Upload Drop Zone */}
              <div style={{ marginBottom: "16px" }}>
                <label
                  className="btn btn-primary"
                  style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", width: "100%", justifyContent: "center", padding: "14px" }}
                >
                  {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                  {uploading ? "Uploading Image Files to Database..." : "Select & Upload Image Files"}
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                    disabled={uploading}
                  />
                </label>
              </div>

              {/* Image Previews Grid */}
              {gallery.length > 0 ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
                    gap: "12px",
                  }}
                >
                  {gallery.map((url, idx) => {
                    const isCover = coverImg === url;
                    return (
                      <div
                        key={idx}
                        style={{
                          position: "relative",
                          borderRadius: "10px",
                          overflow: "hidden",
                          border: isCover ? "2px solid var(--gold)" : "1px solid var(--border)",
                          height: "90px",
                          background: "#000",
                        }}
                      >
                        <img
                          src={url}
                          alt={`Project img ${idx + 1}`}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />

                        {/* Cover Star Button */}
                        <button
                          type="button"
                          title={isCover ? "Main Cover Image" : "Set as Cover Image"}
                          onClick={() => setCoverImg(url)}
                          style={{
                            position: "absolute",
                            top: "4px",
                            left: "4px",
                            background: isCover ? "var(--gold)" : "rgba(0,0,0,0.6)",
                            color: isCover ? "#000" : "#fff",
                            border: "none",
                            borderRadius: "50%",
                            width: "24px",
                            height: "24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <Star size={13} fill={isCover ? "#000" : "none"} />
                        </button>

                        {/* Remove Image Button */}
                        <button
                          type="button"
                          title="Remove image"
                          onClick={() => handleRemoveImage(url)}
                          style={{
                            position: "absolute",
                            top: "4px",
                            right: "4px",
                            background: "rgba(239, 68, 68, 0.8)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "50%",
                            width: "24px",
                            height: "24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <X size={13} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "20px", color: "var(--text-muted)", fontSize: "13px" }}>
                  <ImageIcon size={28} style={{ margin: "0 auto 6px", opacity: 0.6 }} />
                  No images uploaded yet. Select files or add URLs above.
                </div>
              )}
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">Project Overview Description</label>
              <textarea
                className="form-textarea"
                placeholder="Write detailed layout overview..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Project Size */}
            <div className="form-group">
              <label className="form-label">📐 Development Area (e.g. 10 Acres)</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 10 Acres"
                value={developmentArea}
                onChange={(e) => setDevelopmentArea(e.target.value)}
              />
            </div>

            {/* Location & Media */}
            <div className="form-group">
              <label className="form-label">📍 Google Map Location URL</label>
              <input type="url" className="form-input" placeholder="https://maps.app.goo.gl/..." value={googleMap} onChange={(e) => setGoogleMap(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">🎥 YouTube Project Video URL</label>
              <input type="url" className="form-input" placeholder="https://youtube.com/watch?..." value={youtubeVideo} onChange={(e) => setYoutubeVideo(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">📸 Instagram Project Video URL</label>
              <input type="url" className="form-input" placeholder="https://instagram.com/reel/..." value={instagramVideo} onChange={(e) => setInstagramVideo(e.target.value)} />
            </div>

            {/* Infrastructure & Construction Works Completed */}
            <div className="form-group">
              <label className="form-label" style={{marginBottom: '10px', display: 'block'}}>✔ Infrastructure & Construction Works Completed</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  'Layout Planning & Design',
                  'Entrance Arch Design & Construction',
                  'RCC Drainage Works',
                  'Water Supply Line Installation',
                  'Underground Sewerage (UGD) Works',
                  'Electrical Infrastructure (Poles & Underground Cabling)',
                  'Tar Roads / CC Roads',
                  'Footpath & Paver Works',
                  'Park Development',
                  'Tree Plantation & Landscaping',
                  'Compound Wall Construction',
                  'Plot Number & Name Board Installation'
                ].map((work) => (
                  <label key={work} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-muted)' }}>
                    <input 
                      type="checkbox" 
                      checked={infrastructureWorks.includes(work)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setInfrastructureWorks([...infrastructureWorks, work]);
                        } else {
                          setInfrastructureWorks(infrastructureWorks.filter(w => w !== work));
                        }
                      }}
                    />
                    {work}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={uploading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={uploading}>
              {uploading ? <Loader2 size={16} className="animate-spin" /> : null}
              {uploading ? " Uploading..." : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

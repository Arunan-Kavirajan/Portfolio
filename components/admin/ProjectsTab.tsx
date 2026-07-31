"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Project } from "@/lib/projects";

// Omit slug from form state since it should be generated or handled specially,
// but for now we'll allow manual entry.
type ProjectFormData = Omit<Project, "tech"> & { tech: string };

export default function ProjectsTab() {
  const [projects, setProjects] = useState<(Project & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const initialFormState: ProjectFormData = {
    slug: "",
    title: "",
    tagline: "",
    description: "",
    tech: "", // Comma-separated string for easier input
    year: new Date().getFullYear().toString(),
    type: "project",
    liveUrl: "",
    githubUrl: "",
  };

  const [formData, setFormData] = useState<ProjectFormData>(initialFormState);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projectsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as (Project & { id: string })[];
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert tech string to array
    const techArray = formData.tech
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const projectData = {
      ...formData,
      tech: techArray,
    };

    try {
      if (isEditing && currentId) {
        await updateDoc(doc(db, "projects", currentId), projectData);
      } else {
        await addDoc(collection(db, "projects"), projectData);
      }
      
      setFormData(initialFormState);
      setIsEditing(false);
      setCurrentId(null);
      fetchProjects();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project.");
    }
  };

  const handleEdit = (project: Project & { id: string }) => {
    setIsEditing(true);
    setCurrentId(project.id);
    setFormData({
      slug: project.slug,
      title: project.title,
      tagline: project.tagline,
      description: project.description,
      tech: project.tech ? project.tech.join(", ") : "",
      year: project.year,
      type: project.type,
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteDoc(doc(db, "projects", id));
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project.");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Form Section */}
      <div>
        <h2 className="font-serif text-2xl mb-6">{isEditing ? "Edit Project" : "Add New Project"}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans text-sm">
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="p-3 rounded-lg bg-bg border border-border focus:border-ink outline-none text-ink"
          />
          <input
            name="slug"
            placeholder="Slug (e.g., my-project)"
            value={formData.slug}
            onChange={handleInputChange}
            required
            className="p-3 rounded-lg bg-bg border border-border focus:border-ink outline-none text-ink"
          />
          <input
            name="tagline"
            placeholder="Tagline"
            value={formData.tagline}
            onChange={handleInputChange}
            required
            className="p-3 rounded-lg bg-bg border border-border focus:border-ink outline-none text-ink"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={5}
            className="p-3 rounded-lg bg-bg border border-border focus:border-ink outline-none text-ink resize-y"
          />
          <input
            name="tech"
            placeholder="Tech Stack (comma separated)"
            value={formData.tech}
            onChange={handleInputChange}
            className="p-3 rounded-lg bg-bg border border-border focus:border-ink outline-none text-ink"
          />
          <div className="flex gap-4">
            <input
              name="year"
              placeholder="Year"
              value={formData.year}
              onChange={handleInputChange}
              required
              className="p-3 flex-1 rounded-lg bg-bg border border-border focus:border-ink outline-none text-ink"
            />
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="p-3 flex-1 rounded-lg bg-bg border border-border focus:border-ink outline-none text-ink"
            >
              <option value="project">Project</option>
              <option value="talk">Talk</option>
            </select>
          </div>
          <input
            name="liveUrl"
            placeholder="Live URL (optional)"
            value={formData.liveUrl}
            onChange={handleInputChange}
            className="p-3 rounded-lg bg-bg border border-border focus:border-ink outline-none text-ink"
          />
          <input
            name="githubUrl"
            placeholder="GitHub URL (optional)"
            value={formData.githubUrl}
            onChange={handleInputChange}
            className="p-3 rounded-lg bg-bg border border-border focus:border-ink outline-none text-ink"
          />
          <div className="flex gap-4 mt-2">
            <button
              type="submit"
              className="flex-1 py-3 rounded-lg bg-ink text-bg font-medium hover:bg-ink/90 transition-colors"
            >
              {isEditing ? "Update Project" : "Save Project"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData(initialFormState);
                  setCurrentId(null);
                }}
                className="py-3 px-6 rounded-lg border border-border hover:bg-surface transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List Section */}
      <div>
        <h2 className="font-serif text-2xl mb-6">Existing Projects</h2>
        {loading ? (
          <p className="font-sans text-muted">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="font-sans text-muted">No projects found. Add one!</p>
        ) : (
          <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-2">
            {projects.map((p) => (
              <div key={p.id} className="p-4 rounded-xl border border-border bg-bg flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-lg">{p.title}</h3>
                  <p className="font-sans text-sm text-muted mt-1">{p.slug}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="font-sans text-xs px-3 py-1 bg-surface border border-border rounded-md hover:text-ink transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="font-sans text-xs px-3 py-1 bg-red-900/20 border border-red-900/50 text-red-400 rounded-md hover:bg-red-900/40 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

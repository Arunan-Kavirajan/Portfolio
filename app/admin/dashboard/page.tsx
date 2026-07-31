"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import ProjectsTab from "@/components/admin/ProjectsTab";
import BlogsTab from "@/components/admin/BlogsTab";

export default function AdminDashboard() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"projects" | "blogs">("projects");

  useEffect(() => {
    if (!loading && (!user || user.email !== "arunan.kavirajan@gmail.com")) {
      router.push("/admin");
    }
  }, [user, loading, router]);

  if (loading || !user || user.email !== "arunan.kavirajan@gmail.com") {
    return (
      <main className="min-h-screen flex items-center justify-center px-8">
        <p className="font-sans text-muted">Checking authorization...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-12 border-b border-border pb-6">
        <div>
          <h1 className="font-serif text-4xl text-ink">Admin Dashboard</h1>
          <p className="font-sans text-sm text-muted mt-2">
            Logged in as {user.email}
          </p>
        </div>
        <button
          onClick={signOut}
          className="font-sans text-sm px-4 py-2 border border-border rounded-lg hover:bg-surface transition-colors"
        >
          Sign out
        </button>
      </header>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("projects")}
          className={`font-sans text-sm px-6 py-3 rounded-full transition-colors ${
            activeTab === "projects"
              ? "bg-ink text-bg"
              : "border border-border text-ink hover:bg-surface"
          }`}
        >
          Manage Projects
        </button>
        <button
          onClick={() => setActiveTab("blogs")}
          className={`font-sans text-sm px-6 py-3 rounded-full transition-colors ${
            activeTab === "blogs"
              ? "bg-ink text-bg"
              : "border border-border text-ink hover:bg-surface"
          }`}
        >
          Manage Blog Posts
        </button>
      </div>

      <section className="bg-surface rounded-2xl border border-border p-8 min-h-[600px]">
        {activeTab === "projects" ? <ProjectsTab /> : <BlogsTab />}
      </section>
    </main>
  );
}

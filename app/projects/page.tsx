import Link from "next/link";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen px-8 py-32 max-w-4xl mx-auto">
      <h1 className="font-serif text-5xl mb-16">Projects</h1>
      <div className="flex flex-col gap-2">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group flex items-baseline justify-between py-6 border-b border-border hover:text-coral transition-colors"
          >
            <div>
              <h2 className="font-serif text-3xl">{project.title}</h2>
              <p className="font-sans text-sm text-muted mt-1">
                {project.tagline}
              </p>
            </div>
            <span className="font-sans text-sm text-muted shrink-0 ml-4">
              {project.year}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
import Link from "next/link";
import { projects } from "@/lib/projects";
import Reveal from "@/components/ui/Reveal";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen px-8 py-32 max-w-4xl mx-auto">
      <h1 className="font-serif text-5xl mb-16">Projects</h1>
      <div className="flex flex-col gap-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08}>
            <Link
              href={`/projects/${project.slug}`}
              className="group flex items-baseline justify-between py-6 border-b border-border"
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
          </Reveal>
        ))}
      </div>
    </main>
  );
}
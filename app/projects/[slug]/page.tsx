import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen px-8 py-32 max-w-3xl mx-auto">
      <span className="font-sans text-sm text-muted">{project.year}</span>
      <h1 className="font-serif text-6xl mt-2 mb-4">{project.title}</h1>
      <p className="font-sans text-xl text-muted mb-10">{project.tagline}</p>

      <p className="font-sans text-base leading-relaxed mb-10">
        {project.description}
      </p>

      {project.tech.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-sans text-xs px-3 py-1 rounded-full bg-surface text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-6">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm"
          >
            view live →
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm"
          >
            github →
          </a>
        )}
      </div>
    </main>
  );
}
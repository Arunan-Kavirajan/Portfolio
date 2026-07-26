export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  year: string;
  type: "project" | "talk";
  liveUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "echoes",
    title: "Echoes",
    tagline: "Anonymous messages, floating like stars.",
    description:
      "An anonymous public platform where messages appear as floating cards on a starfield canvas, with monthly constellation views. Built with a full admin panel, rate limiting, moderation tools, and automated backups.",
    tech: ["React", "Vite", "Tailwind CSS", "Supabase", "Framer Motion", "Vercel"],
    year: "2026",
    type: "project",
    liveUrl: "",
    githubUrl: "",
  },
  {
    slug: "koda",
    title: "Koda",
    tagline: "Bring your own AI, for your codebase.",
    description:
      "A BYOAI software project workspace with semantic code search, built on a RAG architecture with pgvector for embeddings.",
    tech: ["Next.js", "Supabase", "pgvector", "RAG"],
    year: "2026",
    type: "project",
    liveUrl: "",
    githubUrl: "",
  },
  {
    slug: "beyond-the-breach",
    title: "Beyond the Breach",
    tagline: "A cybersecurity talk for CHAT Club.",
    description:
      "A talk delivered at a CHAT Club online event covering practical cybersecurity concepts for a peer audience.",
    tech: [],
    year: "2026",
    type: "talk",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
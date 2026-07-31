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
  {
    slug: "nexus",
    title: "Nexus",
    tagline: "Real-time collaboration, reimagined.",
    description:
      "A multiplayer workspace for teams to brainstorm, sketch, and code together in real time with conflict-free syncing.",
    tech: ["Next.js", "WebSockets", "CRDT", "Tailwind CSS"],
    year: "2025",
    type: "project",
  },
  {
    slug: "pulse",
    title: "Pulse",
    tagline: "Your health data, visualized.",
    description:
      "A personal health dashboard that aggregates wearable data into beautiful, actionable visualizations and trend insights.",
    tech: ["React", "D3.js", "Supabase", "Tailwind CSS"],
    year: "2025",
    type: "project",
  },
  {
    slug: "cipher",
    title: "Cipher",
    tagline: "Encryption made simple.",
    description:
      "A browser-based encryption toolkit with AES-256, RSA key generation, and secure file sharing — all client-side, zero server trust.",
    tech: ["TypeScript", "Web Crypto API", "React"],
    year: "2025",
    type: "project",
  },
  {
    slug: "mosaic",
    title: "Mosaic",
    tagline: "AI-powered photo collages.",
    description:
      "Upload photos and let AI arrange them into stunning, theme-aware collages with smart cropping and color harmony.",
    tech: ["Next.js", "Sharp", "TensorFlow.js", "Tailwind CSS"],
    year: "2024",
    type: "project",
  },
  {
    slug: "drift",
    title: "Drift",
    tagline: "Weather that feels alive.",
    description:
      "A weather app with immersive particle animations — rain, snow, fog — reflecting real-time conditions in your location.",
    tech: ["React", "Canvas API", "OpenWeatherMap", "Framer Motion"],
    year: "2024",
    type: "project",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
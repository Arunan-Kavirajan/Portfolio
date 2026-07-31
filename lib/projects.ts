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
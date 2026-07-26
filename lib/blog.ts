import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
};

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(BLOG_DIR, filename);
    const { data } = matter(fs.readFileSync(filePath, "utf-8"));

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
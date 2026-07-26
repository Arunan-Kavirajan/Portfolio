import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export function generateStaticParams() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  return files.map((filename) => ({
    slug: filename.replace(/\.mdx$/, ""),
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));

  return (
    <main className="min-h-screen px-8 py-32 max-w-2xl mx-auto">
      <span className="font-sans text-sm text-muted">{data.date}</span>
      <h1 className="font-serif text-5xl mt-2 mb-10">{data.title}</h1>
      <article className="font-sans text-base leading-relaxed prose">
        <MDXRemote source={content} />
      </article>
    </main>
  );
}
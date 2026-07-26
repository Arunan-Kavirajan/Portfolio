import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen px-8 py-32 max-w-3xl mx-auto">
      <h1 className="font-serif text-5xl mb-16">Blog</h1>
      <div className="flex flex-col gap-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group py-6 border-b border-border hover:text-coral transition-colors"
          >
            <span className="font-sans text-sm text-muted">{post.date}</span>
            <h2 className="font-serif text-2xl mt-1">{post.title}</h2>
            <p className="font-sans text-sm text-muted mt-1">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
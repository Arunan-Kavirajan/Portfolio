import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PostMeta } from "@/lib/blog";

// Since it's a server component we can fetch directly in the component body
export default async function BlogPage() {
  const snapshot = await getDocs(collection(db, "blog_posts"));
  const posts = snapshot.docs.map(doc => doc.data() as PostMeta);
  
  // Sort by date descending
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <main className="min-h-screen px-8 py-32 max-w-3xl mx-auto">
      <h1 className="font-serif text-5xl mb-16">Blog</h1>
      {posts.length === 0 ? (
        <p className="font-sans text-muted">No posts yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                className="group py-6 border-b border-border block"
              >
                <span className="font-sans text-sm text-muted">{post.date}</span>
                <h2 className="font-serif text-2xl mt-1 group-hover:text-peach transition-colors">{post.title}</h2>
                <p className="font-sans text-sm text-muted mt-1">{post.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </main>
  );
}
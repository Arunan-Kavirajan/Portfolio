import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PostMeta } from "@/lib/blog";

export async function generateStaticParams() {
  const snapshot = await getDocs(collection(db, "blog_posts"));
  return snapshot.docs.map((doc) => ({
    slug: doc.data().slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const q = query(collection(db, "blog_posts"), where("slug", "==", slug));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    notFound();
  }

  const postData = snapshot.docs[0].data() as PostMeta & { content: string };

  return (
    <main className="min-h-screen px-8 py-32 max-w-2xl mx-auto">
      <span className="font-sans text-sm text-muted">{postData.date}</span>
      <h1 className="font-serif text-5xl mt-2 mb-10">{postData.title}</h1>
      <article className="font-sans text-base leading-relaxed prose prose-invert">
        {/* We use next-mdx-remote to render the markdown content string from Firestore */}
        <MDXRemote source={postData.content || ""} />
      </article>
    </main>
  );
}
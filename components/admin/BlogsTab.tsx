"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PostMeta } from "@/lib/blog";

// We need to add 'content' to our data structure for Firestore
type BlogPost = PostMeta & { content: string; id?: string };

export default function BlogsTab() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const initialFormState = {
    slug: "",
    title: "",
    date: new Date().toISOString().split("T")[0], // YYYY-MM-DD format
    excerpt: "",
    content: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "blog_posts"));
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as BlogPost[];
      
      // Sort by date descending
      postsData.sort((a, b) => (a.date < b.date ? 1 : -1));
      
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditing && currentId) {
        await updateDoc(doc(db, "blog_posts", currentId), formData);
      } else {
        await addDoc(collection(db, "blog_posts"), formData);
      }
      
      setFormData(initialFormState);
      setIsEditing(false);
      setCurrentId(null);
      fetchPosts();
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post.");
    }
  };

  const handleEdit = (post: BlogPost) => {
    setIsEditing(true);
    setCurrentId(post.id!);
    setFormData({
      slug: post.slug,
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
      content: post.content || "",
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteDoc(doc(db, "blog_posts", id));
        fetchPosts();
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete post.");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Form Section */}
      <div>
        <h2 className="font-serif text-2xl mb-6">{isEditing ? "Edit Post" : "New Blog Post"}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans text-sm">
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="p-3 rounded-lg bg-bg border border-border focus:border-ink outline-none text-ink"
          />
          <div className="flex gap-4">
            <input
              name="slug"
              placeholder="Slug (e.g., my-post)"
              value={formData.slug}
              onChange={handleInputChange}
              required
              className="p-3 flex-1 rounded-lg bg-bg border border-border focus:border-ink outline-none text-ink"
            />
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              className="p-3 rounded-lg bg-bg border border-border focus:border-ink outline-none text-ink"
            />
          </div>
          <textarea
            name="excerpt"
            placeholder="Short Excerpt"
            value={formData.excerpt}
            onChange={handleInputChange}
            required
            rows={3}
            className="p-3 rounded-lg bg-bg border border-border focus:border-ink outline-none text-ink resize-y"
          />
          <textarea
            name="content"
            placeholder="Markdown Content..."
            value={formData.content}
            onChange={handleInputChange}
            required
            rows={15}
            className="p-3 rounded-lg bg-bg border border-border focus:border-ink outline-none text-ink resize-y font-mono text-xs"
          />
          
          <div className="flex gap-4 mt-2">
            <button
              type="submit"
              className="flex-1 py-3 rounded-lg bg-ink text-bg font-medium hover:bg-ink/90 transition-colors"
            >
              {isEditing ? "Update Post" : "Publish Post"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData(initialFormState);
                  setCurrentId(null);
                }}
                className="py-3 px-6 rounded-lg border border-border hover:bg-surface transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List Section */}
      <div>
        <h2 className="font-serif text-2xl mb-6">Existing Posts</h2>
        {loading ? (
          <p className="font-sans text-muted">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="font-sans text-muted">No posts found. Write one!</p>
        ) : (
          <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-2">
            {posts.map((p) => (
              <div key={p.id} className="p-4 rounded-xl border border-border bg-bg flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-lg">{p.title}</h3>
                  <div className="flex gap-3 mt-1">
                    <span className="font-sans text-xs text-muted">{p.date}</span>
                    <span className="font-sans text-xs text-muted">{p.slug}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="font-sans text-xs px-3 py-1 bg-surface border border-border rounded-md hover:text-ink transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id!)}
                    className="font-sans text-xs px-3 py-1 bg-red-900/20 border border-red-900/50 text-red-400 rounded-md hover:bg-red-900/40 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

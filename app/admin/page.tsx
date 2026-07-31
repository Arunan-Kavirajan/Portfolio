"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.email === "arunan.kavirajan@gmail.com") {
      router.push("/admin/dashboard");
    }
  }, [user, router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center px-8">
        <p className="font-sans text-muted">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8">
      <h1 className="font-serif text-5xl mb-6">Admin Panel</h1>
      
      {!user ? (
        <button
          onClick={signInWithGoogle}
          className="font-sans text-sm px-6 py-3 rounded-full bg-ink text-bg hover:bg-ink/90 transition-colors"
        >
          Sign in with Google
        </button>
      ) : user.email !== "arunan.kavirajan@gmail.com" ? (
        <div className="text-center">
          <p className="font-sans text-red-500 mb-6">
            Unauthorized access. You do not have permission to view this page.
          </p>
          <button
            onClick={signOut}
            className="font-sans text-sm px-6 py-3 border border-border rounded-full hover:bg-surface transition-colors"
          >
            Sign out
          </button>
        </div>
      ) : null}
    </main>
  );
}

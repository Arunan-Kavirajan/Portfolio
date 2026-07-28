export default function ResumePage() {
  return (
    <main className="min-h-screen px-8 py-32 max-w-2xl mx-auto">
      <div className="flex items-baseline justify-between mb-16">
        <h1 className="font-serif text-5xl">Resume</h1>
        <a
          href="/arunan-kavirajan-resume.pdf"
          download
          className="font-sans text-sm"
        >
          download pdf →
        </a>
      </div>

      <section className="mb-12">
        <h2 className="font-serif text-2xl mb-4">Education</h2>
        <div className="font-sans text-sm">
          <p className="text-ink">
            SRM Institute of Science and Technology, Chennai
          </p>
          <p className="text-muted">B.Tech, Information Technology</p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-serif text-2xl mb-4">Roles</h2>
        <div className="font-sans text-sm">
          <p className="text-ink">
            Technical Team Vice Head — CHAT (Community of Hackers and
            Advanced Technologists)
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-serif text-2xl mb-4">Projects</h2>
        <div className="font-sans text-sm flex flex-col gap-2">
          <p className="text-ink">Echoes — anonymous message platform</p>
          <p className="text-ink">Koda — BYOAI code workspace</p>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {["React", "Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Framer Motion"].map(
            (skill) => (
              <span
                key={skill}
                className="font-sans text-xs px-3 py-1 rounded-full bg-surface text-muted"
              >
                {skill}
              </span>
            )
          )}
        </div>
      </section>
    </main>
  );
}
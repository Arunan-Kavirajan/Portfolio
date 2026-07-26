export default function AboutPage() {
  return (
    <main className="min-h-screen px-8 py-32 max-w-2xl mx-auto">
      <h1 className="font-serif text-5xl mb-10">About</h1>

      <div className="font-sans text-base leading-relaxed text-ink space-y-6">
        <p>
          I&apos;m Arunan, an IT undergraduate at SRM Institute of Science and
          Technology in Chennai, India. I build software projects independently
          alongside my studies, and currently serve as Technical Team Vice Head
          at CHAT — Community of Hackers and Advanced Technologists.
        </p>
        <p>
          Right now I&apos;m building Echoes, an anonymous public platform where
          messages float across a starfield canvas, and exploring Koda, a
          BYOAI workspace tool for semantic code search.
        </p>
        <p>
          Outside of building, I create short-form video content and speak at
          tech club events when I get the chance.
        </p>
      </div>

      <div className="flex gap-6 mt-12 font-sans text-sm">
        <a
          href="https://github.com/arunan-kavirajan"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-coral transition-colors"
        >
          github
        </a>
        <a
          href="https://linkedin.com/in/arunan-kavirajan"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-coral transition-colors"
        >
          linkedin
        </a>
        <a
          href="mailto:arunan.kavirajan@gmail.com"
          className="hover:text-coral transition-colors"
        >
          email
        </a>
      </div>
    </main>
  );
}
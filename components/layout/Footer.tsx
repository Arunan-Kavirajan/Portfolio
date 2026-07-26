export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-between px-8 py-6 border-t border-border font-sans text-sm text-muted">
      <div className="flex gap-6">
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
      </div>
      <a
        href="mailto:arunan.kavirajan@gmail.com"
        className="hover:text-coral transition-colors"
      >
        arunan.kavirajan@gmail.com
      </a>
    </footer>
  );
}
"use client";

export default function MobileHero() {
  return (
    <main className="h-full relative overflow-y-auto w-full flex flex-col items-center justify-center px-8 text-center bg-bg">
      <div className="border border-border/50 bg-surface/30 backdrop-blur-md p-8 rounded-2xl max-w-sm w-full mx-auto shadow-2xl">
        <h1 className="font-serif text-3xl mb-4 text-ink leading-tight">
          Mobile Dossier<br />
          <span className="italic opacity-80">Coming Soon</span>
        </h1>
        <p className="font-sans text-sm text-ink/70 leading-relaxed">
          We are building a bespoke mobile experience optimized for touch. Please view on a desktop device to explore the full interactive portfolio.
        </p>
      </div>
    </main>
  );
}

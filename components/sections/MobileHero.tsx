"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════
   COMPACT HOMEPAGE — A Personal Field Journal
   Mobile + Tablet (< 1024px)

   PALETTE — Vintage Bounty Poster
   ─────────────────────────────────
   Parchment bg:   #F0E2C8
   Dark ink:       #1C1108
   Medium ink:     #4A3828
   Faded ink:      #6B5B48
   Dusty:          #9C8B78
   Accent (rust):  #8B4513
   Border:         #8B4513 at low opacity
   Hero bg:        #F0E2C8 (Parchment matching)
   ═══════════════════════════════════════════════════════════ */

/* ── Shared chapter label ── */
function ChapterMark({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-16 md:mb-24">
      <span className="font-mono text-[10px] tracking-[0.3em] text-[#8B4513]/70">{number}</span>
      <div className="h-[1px] w-8 bg-[#8B4513]/25" />
      <span className="font-mono text-[10px] tracking-[0.3em] text-[#8B4513]/50 uppercase">{title}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   01 — THE COVER
   An actual bounty poster nailed to a wall.
   Parchment paper, centered portrait, ornamental type,
   physical artifacts, stamp-in entrance.
   ────────────────────────────────────────────────────────── */
function TheCover() {
  /* shared spring for "stamped onto paper" feel */
  const stamp = (delay: number): any => ({
    initial: { opacity: 0, scale: 1.3, y: -8 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { type: "spring", stiffness: 180, damping: 16, delay },
  });

  const fadeUp = (delay: number): any => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  });

  const draw = (delay: number): any => ({
    initial: { scaleX: 0 },
    animate: { scaleX: 1 },
    transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section className="relative min-h-[100dvh] bg-[#D2BA94] overflow-hidden flex items-center justify-center py-10 px-4 sm:px-6">

      {/* ── Woodgrain wall behind the poster ── */}
      <div className="absolute inset-0 bg-[#3D2B1F]">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="wood">
              <feTurbulence type="fractalNoise" baseFrequency="0.02 0.15" numOctaves="5" seed="3" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#wood)" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#2A1C12]/60 via-transparent to-[#2A1C12]/80" />
      </div>

      {/* ── THE POSTER ── */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: 0.5 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[380px] sm:max-w-[440px] bg-[#F0E2C8] z-10"
        style={{ boxShadow: "8px 12px 40px rgba(0,0,0,0.5), 2px 3px 8px rgba(0,0,0,0.3)" }}
      >
        {/* Paper grain texture */}
        <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply rounded-sm overflow-hidden">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="poster-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="5" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#poster-grain)" opacity="0.5" />
          </svg>
        </div>

        {/* Coffee stain — top-right */}
        <div
          className="absolute -top-4 -right-3 w-20 h-20 rounded-full pointer-events-none z-30"
          style={{
            background: "radial-gradient(ellipse, rgba(139,69,19,0.08) 30%, rgba(139,69,19,0.03) 60%, transparent 75%)",
          }}
        />

        {/* Fold crease — diagonal */}
        <div className="absolute top-0 right-0 w-[140%] h-[1px] bg-[#1C1108]/[0.06] origin-top-right rotate-[28deg] pointer-events-none z-20" />

        {/* Nail hole at top center */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
          className="absolute -top-3 left-1/2 -translate-x-1/2 z-40"
        >
          <div className="w-4 h-4 rounded-full bg-[#3D2B1F] border-2 border-[#5C4A38] shadow-md" />
          <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-[#2A1C12]" />
        </motion.div>

        {/* ── POSTER CONTENT ── */}
        <div className="relative px-6 sm:px-8 pt-10 pb-8 flex flex-col items-center z-10">

          {/* Outer decorative border */}
          <div className="absolute inset-3 border-2 border-[#1C1108]/60 pointer-events-none" />
          <div className="absolute inset-[14px] border border-[#1C1108]/25 pointer-events-none" />

          {/* ── Top ornamental row ── */}
          <motion.div {...stamp(0.4)} className="flex items-center gap-3 mb-2">
            <span className="text-[#8B4513]/60 text-xs">★</span>
            <span className="font-mono text-[7px] tracking-[0.4em] text-[#6B5B48] uppercase">By Order of the Portfolio</span>
            <span className="text-[#8B4513]/60 text-xs">★</span>
          </motion.div>

          {/* ── Ornamental rule ── */}
          <motion.div {...draw(0.5)} className="w-full h-[2px] bg-[#1C1108]/50 origin-center mb-3" />

          {/* ── WANTED ── */}
          <motion.h2
            {...stamp(0.6)}
            className="font-serif text-[16vw] sm:text-[72px] leading-none tracking-[0.08em] text-[#1C1108] uppercase font-black text-center"
            style={{ textShadow: "2px 2px 0px rgba(139,69,19,0.15)" }}
          >
            WANTED
          </motion.h2>

          {/* ── Sub-headline ── */}
          <motion.div {...stamp(0.75)} className="flex items-center gap-4 my-2">
            <div className="h-[1px] w-6 bg-[#1C1108]/30" />
            <span className="font-serif text-[11px] sm:text-xs tracking-[0.3em] text-[#4A3828] uppercase italic">
              Dead Code or Alive
            </span>
            <div className="h-[1px] w-6 bg-[#1C1108]/30" />
          </motion.div>

          {/* ── Ornamental rule ── */}
          <motion.div {...draw(0.85)} className="w-full h-[1px] bg-[#1C1108]/30 origin-center mb-6" />

          {/* ── PORTRAIT ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[60vw] max-w-[260px] sm:max-w-[280px] aspect-[3/4] mb-6"
          >
            {/* Decorative corner brackets */}
            <div className="absolute -top-2 -left-2 w-5 h-5 border-t-[3px] border-l-[3px] border-[#1C1108]/70 z-20" />
            <div className="absolute -top-2 -right-2 w-5 h-5 border-t-[3px] border-r-[3px] border-[#1C1108]/70 z-20" />
            <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-[3px] border-l-[3px] border-[#1C1108]/70 z-20" />
            <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-[3px] border-r-[3px] border-[#1C1108]/70 z-20" />

            {/* Portrait frame */}
            <div className="absolute inset-0 border-2 border-[#1C1108]/40 z-10 pointer-events-none" />

            {/* The portrait */}
            <div className="absolute inset-0 overflow-hidden bg-[#D2BA94]">
              <Image
                src="/profile_new.jpg"
                alt="Arunan Kavirajan"
                fill
                className="object-cover object-top"
                style={{ filter: "sepia(35%) contrast(1.1) brightness(0.95) saturate(0.85)" }}
                priority
                sizes="(max-width: 640px) 60vw, 280px"
              />
              {/* Daguerreotype vignette */}
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(28,17,8,0.45)] z-10" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(28,17,8,0.3)_100%)] z-10" />
            </div>

            {/* Wax seal — bottom-right */}
            <motion.div
              initial={{ scale: 2.5, opacity: 0, rotate: -30 }}
              animate={{ scale: 1, opacity: 1, rotate: -8 }}
              transition={{ type: "spring", stiffness: 160, damping: 12, delay: 1.8 }}
              className="absolute -bottom-5 -right-5 sm:-bottom-6 sm:-right-6 w-14 h-14 sm:w-16 sm:h-16 z-30"
            >
              <div className="w-full h-full rounded-full bg-[#8B2500] flex items-center justify-center shadow-lg"
                style={{ background: "radial-gradient(circle at 40% 35%, #B83A1B 0%, #8B2500 50%, #6B1A00 100%)" }}
              >
                <span className="font-serif text-lg sm:text-xl font-bold text-[#F0E2C8]/90 tracking-tight">AK</span>
              </div>
              {/* Wax drip */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#8B2500]/80" />
            </motion.div>
          </motion.div>

          {/* ── NAME ── */}
          <motion.h1
            {...stamp(1.2)}
            className="font-serif text-[11vw] sm:text-[48px] leading-[0.9] tracking-tight text-[#1C1108] text-center uppercase font-bold mb-1"
          >
            <span className="block">Arunan</span>
            <span className="block">Kavirajan</span>
          </motion.h1>

          {/* ── Thin divider with star ── */}
          <motion.div {...fadeUp(1.35)} className="flex items-center gap-3 my-4 w-full max-w-[240px]">
            <div className="flex-1 h-[1px] bg-[#1C1108]/25" />
            <span className="text-[#8B4513]/50 text-[10px]">✦</span>
            <div className="flex-1 h-[1px] bg-[#1C1108]/25" />
          </motion.div>

          {/* ── REWARD / tagline section ── */}
          <motion.div {...fadeUp(1.45)} className="flex flex-col items-center gap-3 mb-5">
            <span className="font-serif text-xs sm:text-sm tracking-[0.25em] text-[#4A3828] uppercase font-bold">
              Known For
            </span>
            <p className="font-serif text-base sm:text-lg text-[#1C1108]/80 italic text-center leading-relaxed max-w-[260px]">
              &quot;Building software and studying how it breaks&quot;
            </p>
          </motion.div>

          {/* ── Discipline badges ── */}
          <motion.div {...fadeUp(1.6)} className="flex flex-wrap justify-center gap-2 mb-5">
            {["Software Engineer", "Cybersecurity", "AI / ML"].map((d) => (
              <span
                key={d}
                className="border border-[#1C1108]/50 px-2.5 py-1 font-mono text-[8px] sm:text-[9px] tracking-[0.15em] text-[#1C1108] uppercase bg-[#EBD9BC]/40"
              >
                {d}
              </span>
            ))}
          </motion.div>

          {/* ── Bottom ornamental rule ── */}
          <motion.div {...draw(1.7)} className="w-full h-[2px] bg-[#1C1108]/50 origin-center mb-4" />

          {/* ── Bottom details ── */}
          <motion.div {...fadeUp(1.8)} className="flex justify-between w-full px-1 sm:px-2">
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.2em] text-[#6B5B48] uppercase">
                Last Seen
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] text-[#1C1108]/70 tracking-wider">
                Chennai, India
              </span>
            </div>
            <div className="flex flex-col gap-0.5 items-end">
              <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.2em] text-[#6B5B48] uppercase">
                Status
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] text-[#8B4513] tracking-wider font-bold">
                ACTIVE
              </span>
            </div>
          </motion.div>

          {/* ── Star row at bottom ── */}
          <motion.div {...fadeUp(1.9)} className="flex items-center gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-[#8B4513]/40 text-[8px]">★</span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll cue below the poster ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
      >
        <motion.div
          className="w-[1px] h-6 bg-[#F0E2C8]/30 origin-top"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
        <span className="font-mono text-[7px] tracking-[0.3em] text-[#F0E2C8]/40 uppercase">
          Examine Dossier
        </span>
      </motion.div>

      {/* ── Torn bottom edge transition into parchment ── */}
      <div className="absolute -bottom-1 left-0 w-full z-30">
        <svg viewBox="0 0 1200 50" preserveAspectRatio="none" className="w-full h-8 sm:h-10" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,25 Q20,10 50,22 T100,18 T150,28 T200,15 T250,22 T300,12 T350,20 T400,28 T450,16 T500,24 T550,14 T600,22 T650,18 T700,26 T750,12 T800,20 T850,28 T900,16 T950,22 T1000,14 T1050,24 T1100,18 T1150,26 T1200,20 V50 H0 Z"
            fill="#F0E2C8"
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes flicker {
          0%, 100% { opacity: 0.18; }
          50% { opacity: 0.22; }
          73% { opacity: 0.16; }
        }
      `}</style>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   02 — A NOTE TO SELF
   ────────────────────────────────────────────────────────── */
function ANoteToSelf() {
  return (
    <section className="px-6 md:px-12 py-32 md:py-48 bg-[#F0E2C8]">
      <div className="max-w-xl mx-auto md:max-w-2xl">
        <ChapterMark number="02" title="A Note to Self" />

        <div className="flex flex-col gap-8 md:gap-10">
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1C1108] leading-relaxed">
            I&apos;ve always wanted to know what&apos;s underneath.
          </p>
          <p className="font-sans text-base sm:text-lg md:text-xl text-[#6B5B48] leading-relaxed font-light">
            How things work. Why they fail. What happens when you start pulling them apart.
          </p>
          <p className="font-sans text-base sm:text-lg md:text-xl text-[#6B5B48] leading-relaxed font-light">
            That curiosity is probably what keeps me building.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   03 — UNDER THE SURFACE
   ────────────────────────────────────────────────────────── */
function UnderTheSurface() {
  const stages = ["MAKE", "TAKE APART", "UNDERSTAND", "MAKE AGAIN"];

  return (
    <section className="px-6 md:px-12 py-32 md:py-48 bg-[#EBD9BC] border-t border-[#8B4513]/10">
      <div className="max-w-xl mx-auto md:max-w-3xl">
        <ChapterMark number="03" title="Under the Surface" />

        <div className="flex flex-col gap-12 md:gap-16">
          {stages.map((stage, i) => (
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex items-baseline gap-6"
            >
              <span className="font-mono text-[10px] text-[#8B4513]/40 tracking-widest">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1108] tracking-tight">{stage}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   04 — THINGS I'M CHASING
   ────────────────────────────────────────────────────────── */
function ThingsImChasing() {
  const interests = ["SOFTWARE", "CYBERSECURITY", "AI / ML", "SYSTEMS", "EXPERIMENTATION", "BUILDING"];

  return (
    <section className="px-6 md:px-12 py-32 md:py-48 bg-[#F0E2C8] border-t border-[#8B4513]/10">
      <div className="max-w-xl mx-auto md:max-w-3xl">
        <ChapterMark number="04" title="Things I'm Chasing" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-12">
          {interests.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className="font-serif text-xl sm:text-2xl text-[#1C1108] tracking-tight">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   05 — THE WORKBENCH
   ────────────────────────────────────────────────────────── */
function TheWorkbench() {
  const categories = [
    { label: "Languages", items: ["C", "Python", "JavaScript", "TypeScript", "Bash"] },
    { label: "Frameworks / Software", items: ["React", "Next.js", "Node.js", "Flutter", "Tailwind CSS"] },
    { label: "Data / Backend", items: ["Supabase", "Firebase", "SQLite"] },
    { label: "Tools", items: ["Git", "GitHub", "Linux", "VS Code", "Vercel"] },
  ];

  return (
    <section className="px-6 md:px-12 py-32 md:py-48 bg-[#EBD9BC] border-t border-[#8B4513]/10">
      <div className="max-w-xl mx-auto md:max-w-3xl">
        <ChapterMark number="05" title="The Workbench" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 md:gap-12 mb-20">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: ci * 0.1 }}
            >
              <h3 className="font-mono text-[10px] text-[#8B4513] tracking-[0.2em] uppercase mb-6 pb-3 border-b border-[#8B4513]/20">{cat.label}</h3>
              <div className="flex flex-col gap-3">
                {cat.items.map((item) => (
                  <span key={item} className="font-sans text-lg sm:text-xl text-[#1C1108] font-light">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Current experiments */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="pt-12 border-t border-[#8B4513]/10"
        >
          <h3 className="font-serif italic text-lg text-[#6B5B48] mb-6">Current Experiments</h3>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {["Cybersecurity", "AI/ML", "AI Agents", "Cloud"].map((item) => (
              <span key={item} className="font-mono text-xs text-[#6B5B48] tracking-[0.15em] uppercase">{item}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   06 — RECENT SPECIMENS
   ────────────────────────────────────────────────────────── */
const specimens = [
  { id: "koda", number: "01", title: "KODA", note: "Agentic codebase detective", tags: ["Next.js", "TypeScript", "GitHub API"] },
  { id: "echoes", number: "02", title: "ECHOES", note: "Anonymous drifting messages", tags: ["React", "Supabase", "Framer Motion"] },
  { id: "certiva", number: "03", title: "CERTIVA", note: "Certificate automation at scale", tags: ["React", "Vite", "PDF-lib"] },
  { id: "algolab", number: "04", title: "ALGORITHM LABORATORY", note: "Interactive visualization engine", tags: ["FastAPI", "Python", "React"] },
  { id: "dbrownie", number: "05", title: "ANDROID BILLING APP", note: "Retail POS with Bluetooth printing", tags: ["Flutter", "Dart", "SQLite"] },
  { id: "chatclub", number: "06", title: "CHAT CLUB WEBSITE", note: "Club platform with event management", tags: ["Next.js", "Firebase"] },
  { id: "pallavan", number: "07", title: "PALLAVAN MES", note: "Offline-first manufacturing system", tags: ["React", "Dexie.js", "Firebase"] },
  { id: "ascend", number: "08", title: "ASCEND", note: "Gamified productivity platform", tags: ["React", "Firebase", "Vite"] },
];

function RecentSpecimens() {
  return (
    <section className="px-6 md:px-12 py-32 md:py-48 bg-[#F0E2C8] border-t border-[#8B4513]/10">
      <div className="max-w-xl mx-auto md:max-w-3xl">
        <ChapterMark number="06" title="Recent Specimens" />

        <div className="flex flex-col gap-12 md:gap-10">
          {specimens.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link href={`/projects/${s.id}`} className="group block">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="font-mono text-[10px] text-[#8B4513]/40 tracking-widest">{s.number}</span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1108] tracking-tight group-hover:text-[#8B4513] transition-colors">{s.title}</h3>
                </div>
                <p className="font-sans text-sm text-[#6B5B48] font-light ml-10 mb-3">{s.note}</p>
                <div className="flex flex-wrap gap-3 ml-10">
                  {s.tags.map((t) => (
                    <span key={t} className="font-mono text-[9px] text-[#9C8B78] tracking-widest uppercase">{t}</span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   07 — RECORDS
   ────────────────────────────────────────────────────────── */
function Records() {
  return (
    <section className="px-6 md:px-12 py-32 md:py-48 bg-[#EBD9BC] border-t border-[#8B4513]/10">
      <div className="max-w-xl mx-auto md:max-w-3xl">
        <ChapterMark number="07" title="Records" />

        {/* Experience */}
        <div className="mb-24 md:mb-32">
          <div className="font-mono text-[9px] text-[#6B5B48] tracking-[0.3em] uppercase mb-12">Experience</div>

          <div className="flex flex-col gap-16">
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="font-mono text-[10px] text-[#8B4513] tracking-widest mb-3 block">2026</span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#1C1108] tracking-tight mb-2">ApexFlow Technologies</h3>
              <p className="font-sans text-base text-[#6B5B48] font-light">Software Development Intern</p>
              <p className="font-serif text-sm text-[#9C8B78] italic mt-2">Six-month internship</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <span className="font-mono text-[10px] text-[#8B4513]/70 tracking-widest mb-3 block">2026</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1108] tracking-tight mb-2">DecodeLabs</h3>
              <p className="font-sans text-base text-[#6B5B48] font-light">Python Programming Intern</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1108] tracking-tight mb-2">CHAT</h3>
              <p className="font-sans text-base text-[#6B5B48] font-light mb-1">Computer Hardware and AI Technology Club</p>
              <p className="font-serif text-sm text-[#9C8B78] italic">Official platform with dynamic event management</p>
            </motion.div>
          </div>
        </div>

        {/* Education */}
        <div className="pt-16 border-t border-[#8B4513]/10">
          <div className="font-mono text-[9px] text-[#6B5B48] tracking-[0.3em] uppercase mb-12">Education</div>

          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1C1108] tracking-tight mb-3 leading-tight">
              SRM Institute of Science and Technology
            </h3>
            <p className="font-sans text-base sm:text-lg text-[#6B5B48] font-light mb-2">B.Tech Information Technology</p>
            <span className="font-mono text-[10px] text-[#8B4513] tracking-widest">2025 — PRESENT</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   08 — MARGINALIA
   ────────────────────────────────────────────────────────── */
function Marginalia() {
  const notes = [
    { label: "Books", value: "Always reading something" },
    { label: "Philosophy", value: "Why things exist the way they do" },
    { label: "Electronics", value: "Hardware under the software" },
    { label: "Languages", value: "Words shape how you think" },
    { label: "Current Obsession", value: "How systems fail gracefully" },
  ];

  return (
    <section className="px-6 md:px-12 py-32 md:py-48 bg-[#F0E2C8] border-t border-[#8B4513]/10">
      <div className="max-w-xl mx-auto md:max-w-3xl">
        <ChapterMark number="08" title="Marginalia" />

        <div className="flex flex-col gap-8">
          {notes.map((n, i) => (
            <motion.div
              key={n.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6"
            >
              <span className="font-mono text-[10px] text-[#8B4513]/50 tracking-[0.2em] uppercase min-w-[120px]">{n.label}</span>
              <span className="font-serif text-lg sm:text-xl text-[#4A3828]/80 italic">{n.value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   09 — LAST FRAME
   ────────────────────────────────────────────────────────── */
function LastFrame() {
  return (
    <section className="px-6 md:px-12 py-32 md:py-48 bg-[#EBD9BC] border-t border-[#8B4513]/10">
      <div className="max-w-xl mx-auto md:max-w-3xl text-center">
        <ChapterMark number="09" title="Last Frame" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-12"
        >
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1C1108] tracking-tighter">
            ARUNAN KAVIRAJAN
          </h2>

          <div className="flex flex-wrap justify-center gap-8">
            <a href="mailto:arunan.kavirajan@gmail.com" className="font-mono text-[10px] text-[#4A3828] hover:text-[#8B4513] tracking-widest uppercase transition-colors">Email</a>
            <a href="https://github.com/arunan-kavirajan" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-[#4A3828] hover:text-[#8B4513] tracking-widest uppercase transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/arunan-kavirajan" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-[#4A3828] hover:text-[#8B4513] tracking-widest uppercase transition-colors">LinkedIn</a>
            <Link href="/resume" className="font-mono text-[10px] text-[#8B4513] hover:text-[#1C1108] tracking-widest uppercase transition-colors">Resume</Link>
          </div>

          <p className="font-serif text-base sm:text-lg text-[#6B5B48] italic mt-4">
            Still curious.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   ASSEMBLED COMPACT HOMEPAGE
   ══════════════════════════════════════════════════════════ */
export default function CompactHomeHero() {
  return (
    <main className="bg-[#F0E2C8] text-[#1C1108] selection:bg-[#8B4513]/25">
      <TheCover />
      <ANoteToSelf />
      <UnderTheSurface />
      <ThingsImChasing />
      <TheWorkbench />
      <RecentSpecimens />
      <Records />
      <Marginalia />
      <LastFrame />
    </main>
  );
}

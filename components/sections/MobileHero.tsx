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
   Portrait-dominant bounty poster. Photo is the hero.
   No scroll lock. One powerful viewport.
   ────────────────────────────────────────────────────────── */
function TheCover() {
  return (
    <section className="relative min-h-[100dvh] bg-[#1C1108] overflow-hidden">

      {/* ── Full-bleed portrait ── */}
      <div className="absolute inset-0">
        <Image
          src="/profile_new.jpg"
          alt="Arunan Kavirajan"
          fill
          className="object-cover object-top"
          style={{ filter: "sepia(25%) contrast(1.05) brightness(0.85) saturate(0.9)" }}
          priority
          sizes="100vw"
        />
        {/* Warm overlay to unify with parchment palette */}
        <div className="absolute inset-0 bg-[#1C1108]/25 mix-blend-multiply" />
        {/* Bottom gradient into parchment */}
        <div className="absolute bottom-0 left-0 w-full h-[45%] bg-gradient-to-t from-[#1C1108] via-[#1C1108]/70 to-transparent" />
        {/* Top gradient for header text readability */}
        <div className="absolute top-0 left-0 w-full h-[25%] bg-gradient-to-b from-[#1C1108]/50 to-transparent" />
      </div>

      {/* ── Paper grain ── */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay z-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="hero-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-grain)" opacity="0.5" />
        </svg>
      </div>

      {/* ── Poster border frame ── */}
      <div className="absolute inset-3 sm:inset-5 border border-[#F0E2C8]/10 z-10 pointer-events-none" />
      <div className="absolute inset-4 sm:inset-6 border border-[#F0E2C8]/5 z-10 pointer-events-none" />

      {/* ── Top archival strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-0 left-0 w-full px-5 sm:px-7 pt-6 sm:pt-8 flex justify-between items-start z-20"
      >
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.35em] text-[#F0E2C8]/50 uppercase">
            No. 001
          </span>
          <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.25em] text-[#F0E2C8]/30 uppercase">
            Est. 2026
          </span>
        </div>
        <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.25em] text-[#F0E2C8]/40 uppercase">
          Field Archive
        </span>
      </motion.div>

      {/* ── Main content — anchored to bottom ── */}
      <div className="relative z-20 min-h-[100dvh] flex flex-col justify-end px-5 sm:px-7 pb-8 sm:pb-10">

        {/* Name — the poster headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5"
        >
          <h1 className="font-serif text-[15vw] sm:text-[12vw] leading-[0.82] tracking-tight text-[#F0E2C8] uppercase">
            <span className="block">Arunan</span>
            <span className="block text-[#F0E2C8]/50">Kavirajan</span>
          </h1>
        </motion.div>

        {/* Thin rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] bg-[#F0E2C8]/20 origin-left mb-5"
        />

        {/* Tagline + disciplines */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 mb-8"
        >
          <p className="font-serif text-lg sm:text-xl text-[#F0E2C8]/80 leading-relaxed max-w-xs">
            I build software.{" "}
            <span className="italic text-[#F0E2C8]/45">I study how it breaks.</span>
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {["Software", "Cybersecurity", "AI / ML"].map((d, i) => (
              <motion.span
                key={d}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.2 + i * 0.12 }}
                className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#D4A76A]/70 uppercase"
              >
                {d}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Scroll prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
          className="flex items-center gap-3"
        >
          <motion.div
            className="w-[1px] h-5 bg-[#D4A76A]/50 origin-top"
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
          <span className="font-mono text-[8px] tracking-[0.3em] text-[#F0E2C8]/35 uppercase">
            Scroll to examine
          </span>
        </motion.div>
      </div>

      {/* ── Torn bottom edge into parchment ── */}
      <div className="absolute -bottom-1 left-0 w-full z-30">
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-6 sm:h-8" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,20 Q30,8 60,18 T120,14 T180,20 T240,12 T300,18 T360,10 T420,16 T480,20 T540,12 T600,18 T660,10 T720,16 T780,20 T840,14 T900,18 T960,12 T1020,16 T1080,20 T1140,14 T1200,18 V40 H0 Z"
            fill="#F0E2C8"
          />
        </svg>
      </div>
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

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
   Hero bg:        #0A0A08 (dark — photograph develops from darkness)
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
   01 — THE COVER (stays dark — photograph develops from black)
   ────────────────────────────────────────────────────────── */
function TheCover() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const photoBrightness = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.1, 0.5, 1]);
  const photoContrast = useTransform(scrollYProgress, [0, 0.35, 0.6], [0.4, 0.75, 1]);
  const photoBlur = useTransform(scrollYProgress, [0, 0.4, 0.6], [10, 3, 0]);
  const photoGrayscale = useTransform(scrollYProgress, [0, 0.5, 0.7], [1, 0.5, 0]);
  const photoOpacity = useTransform(scrollYProgress, [0, 0.1], [0.4, 1]);
  const photoSepia = useTransform(scrollYProgress, [0.5, 0.7, 0.9], [0, 0.3, 0.15]);

  const filterStr = useTransform(
    [photoBrightness, photoContrast, photoBlur, photoGrayscale, photoSepia] as any,
    ([b, c, bl, g, s]: number[]) =>
      `brightness(${b}) contrast(${c}) blur(${bl}px) grayscale(${g}) sepia(${s})`
  );

  const faultX = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 3, 2]);
  const faultY = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, -2, -1.5]);
  const faultOpacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 0.3, 0.18]);

  const grainOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [0.5, 0.25, 0.1]);
  const metaOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 0.95], [0.6, 0.8, 0.8, 0]);
  const nameOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const nameY = useTransform(scrollYProgress, [0.35, 0.55], [25, 0]);
  const discOpacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);
  const discY = useTransform(scrollYProgress, [0.55, 0.7], [15, 0]);
  const stmtOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
  const stmtY = useTransform(scrollYProgress, [0.7, 0.85], [15, 0]);
  const sectionOpacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section ref={sectionRef} className="h-[250vh] relative bg-[#0A0A08]">
      <div className="sticky top-0 h-screen w-full overflow-hidden will-change-transform">
        <motion.div className="absolute inset-0 flex flex-col" style={{ opacity: sectionOpacity }}>

          {/* Film grain */}
          <motion.div className="absolute inset-0 z-40 pointer-events-none mix-blend-overlay" style={{ opacity: grainOpacity }}>
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
              <rect width="100%" height="100%" filter="url(#grain)" opacity="0.4" />
            </svg>
          </motion.div>

          {/* Photograph */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div className="absolute w-[72vw] max-w-[400px] sm:w-[58vw] sm:max-w-[440px] md:w-[48vw] md:max-w-[500px] aspect-[3/4] rounded-sm overflow-hidden" style={{ x: faultX, y: faultY, opacity: faultOpacity }}>
              <Image src="/profile_new.jpg" alt="" fill className="object-cover object-top" style={{ filter: "contrast(2) brightness(0.15) sepia(0.3)" }} priority aria-hidden="true" />
            </motion.div>
            <div className="relative w-[72vw] max-w-[400px] sm:w-[58vw] sm:max-w-[440px] md:w-[48vw] md:max-w-[500px] aspect-[3/4] rounded-sm overflow-hidden shadow-2xl">
              <motion.div className="absolute inset-0" style={{ filter: filterStr, opacity: photoOpacity }}>
                <Image src="/profile_new.jpg" alt="Arunan Kavirajan" fill className="object-cover object-top" priority sizes="(max-width: 640px) 72vw, (max-width: 1024px) 58vw, 48vw" />
              </motion.div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,10,8,0.65)_100%)] z-10" />
              <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(10,10,8,0.5)] z-10" />
            </div>
          </div>

          {/* Archival metadata */}
          <motion.div className="absolute top-0 pt-20 px-6 w-full flex justify-between items-start z-30 pointer-events-none" style={{ opacity: metaOpacity }}>
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] tracking-[0.35em] text-[#D4A76A] uppercase">Archive 001</span>
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#9C8B78] uppercase">Personal Field Notes</span>
            </div>
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#9C8B78]">2026</span>
          </motion.div>

          <motion.div className="absolute bottom-6 left-6 z-30 pointer-events-none" style={{ opacity: metaOpacity }}>
            <span className="font-mono text-[9px] tracking-[0.3em] text-[#9C8B78]/70 uppercase">Software / Security / AI</span>
          </motion.div>

          {/* Name */}
          <motion.div className="absolute bottom-[28%] sm:bottom-[30%] md:bottom-[32%] w-full px-6 z-30 pointer-events-none" style={{ opacity: nameOpacity, y: nameY }}>
            <h1 className="font-serif text-[14vw] sm:text-[11vw] md:text-[9vw] leading-[0.85] tracking-tight text-[#F0E2C8]">
              <span className="block">ARUNAN</span>
              <span className="block text-[#F0E2C8]/60 mt-1">KAVIRAJAN</span>
            </h1>
          </motion.div>

          {/* Disciplines */}
          <motion.div className="absolute bottom-[16%] sm:bottom-[18%] md:bottom-[20%] w-full px-6 z-30 pointer-events-none" style={{ opacity: discOpacity, y: discY }}>
            <div className="flex gap-4 sm:gap-6 flex-wrap">
              {["Software", "Cybersecurity", "AI / ML"].map((d) => (
                <span key={d} className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-[#D4A76A] uppercase">{d}</span>
              ))}
            </div>
          </motion.div>

          {/* Statement */}
          <motion.div className="absolute bottom-[6%] sm:bottom-[8%] md:bottom-[10%] w-full px-6 z-30 pointer-events-none" style={{ opacity: stmtOpacity, y: stmtY }}>
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#F0E2C8]/90 leading-relaxed max-w-sm">
              I build software.<br /><span className="italic text-[#F0E2C8]/50">I study how it breaks.</span>
            </p>
          </motion.div>

          {/* Frame */}
          <div className="absolute inset-4 sm:inset-6 border border-[#D4A76A]/[0.08] rounded-sm z-20 pointer-events-none animate-[breathe_4s_ease-in-out_infinite]" />

          {/* Scroll indicator */}
          <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center gap-2" style={{ opacity: scrollHintOpacity }}>
            <span className="font-mono text-[8px] tracking-[0.3em] text-[#9C8B78] uppercase">Scroll</span>
            <svg className="w-4 h-4 text-[#D4A76A] animate-bounce" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
          </motion.div>
        </motion.div>
      </div>
      <style jsx>{`@keyframes breathe { 0%, 100% { opacity: 0.08; } 50% { opacity: 0.2; } }`}</style>
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

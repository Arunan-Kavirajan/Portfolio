"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Minimal Data Template
const MOCK_DATA = {
  id: "koda",
  number: "01 / 08",
  title: "KODA",
  subtitle: "CODEBASE DETECTIVE",
  status: "IN DEVELOPMENT",
  role: "SOLO",
  year: "2026",
  tech: ["NEXT.JS", "TYPESCRIPT", "SUPABASE", "OPENAI"],
  links: [
    { label: "LIVE PROJECT", url: "#" },
    { label: "SOURCE CODE", url: "#" }
  ],
  overview: "KODA is an agentic system for understanding unfamiliar codebases. It ingests repositories, reconstructs their architecture and produces a navigable representation of the system.",
  features: [
    { title: "REPOSITORY INGESTION", desc: "Maps deeply nested directory trees and generates comprehensive abstract syntax mappings of internal dependencies." },
    { title: "ARCHITECTURE ANALYSIS", desc: "Translates proprietary business logic into dense vector space, allowing for instantaneous semantic retrieval." },
    { title: "SECURITY ANALYSIS", desc: "Proposes and simulates structural refactors in an isolated sandbox before committing changes." }
  ],
  highlights: [
    { title: "Recursive AST parsing", desc: "Generates comprehensive syntax mappings in seconds across thousands of files." },
    { title: "Vector embeddings", desc: "Translates business logic into searchable dense vector space." },
    { title: "Agent orchestration", desc: "Manages parallel execution of highly specialized sub-agents." },
    { title: "Repository graph generation", desc: "Constructs a live, interactive node map of codebase architecture." }
  ],
  next: {
    id: "echoes",
    number: "02 / 08",
    title: "ECHOES"
  }
};

export default function ProjectArchiveEditorial() {
  const params = useParams();
  const router = useRouter();
  
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#0B0E12] text-[#E8EDF2] selection:bg-[#36D9E6]/30 overflow-x-hidden pt-32 pb-24">
      
      {/* ARCHIVE NAVIGATION */}
      <motion.div 
        className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-end mb-24"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Link href="/" className="font-sans text-xs tracking-widest text-[#69737D] hover:text-[#E8EDF2] transition-colors">
          ← WORK
        </Link>
        <div className="font-mono text-xs tracking-widest text-[#69737D]">
          {MOCK_DATA.number}
        </div>
      </motion.div>

      {/* 1. PROJECT HERO */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-40">
        
        <motion.div 
          className="max-w-4xl flex flex-col justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-[#E8EDF2] leading-none mb-6 tracking-tight uppercase">
            {MOCK_DATA.title}
          </h1>
          <h2 className="font-sans text-xs md:text-sm tracking-[0.2em] text-[#69737D] mb-12 uppercase">
            {MOCK_DATA.subtitle}
          </h2>
          
          <div className="flex flex-wrap gap-x-12 gap-y-8 mb-16">
            <div>
              <div className="font-sans text-[10px] text-[#69737D] tracking-widest mb-3 uppercase">Status</div>
              <div className="font-sans text-xs text-[#E8EDF2] tracking-wide uppercase">{MOCK_DATA.status}</div>
            </div>
            <div>
              <div className="font-sans text-[10px] text-[#69737D] tracking-widest mb-3 uppercase">Role</div>
              <div className="font-sans text-xs text-[#E8EDF2] tracking-wide uppercase">{MOCK_DATA.role}</div>
            </div>
            <div>
              <div className="font-sans text-[10px] text-[#69737D] tracking-widest mb-3 uppercase">Year</div>
              <div className="font-sans text-xs text-[#E8EDF2] tracking-wide uppercase">{MOCK_DATA.year}</div>
            </div>
            <div>
              <div className="font-sans text-[10px] text-[#69737D] tracking-widest mb-3 uppercase">Stack</div>
              <div className="font-sans text-xs text-[#E8EDF2] tracking-wide leading-loose uppercase">
                {MOCK_DATA.tech.map((t, i) => <div key={i}>{t}</div>)}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {MOCK_DATA.links.map((link, i) => (
              <Link key={i} href={link.url} className="font-sans text-xs tracking-widest flex items-center group w-fit text-[#E8EDF2]">
                {link.label} <span className="ml-3 group-hover:translate-x-1 transition-transform text-[#69737D]">→</span>
              </Link>
            ))}
          </div>
        </motion.div>

      </div>

      {/* 2. OVERVIEW */}
      <motion.div 
        className="max-w-[900px] mx-auto px-6 md:px-12 mb-40 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="font-sans text-[10px] text-[#69737D] tracking-[0.2em] mb-8 uppercase">Overview</div>
        <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed text-[#E8EDF2]">
          {MOCK_DATA.overview}
        </p>
      </motion.div>

      {/* 3. FEATURES (Staggered Blocks) */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          {MOCK_DATA.features.map((feature, i) => (
            <motion.div 
              key={i} 
              className="flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="font-mono text-4xl text-[#69737D] mb-8 font-light">0{i + 1}</div>
              <h3 className="font-sans text-sm tracking-widest mb-4 uppercase text-[#E8EDF2]">{feature.title}</h3>
              <p className="font-sans text-sm text-[#69737D] leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. ARCHITECTURE (Full Width) */}
      <motion.div 
        className="w-full border-t border-[#69737D]/20 pt-32 pb-16 mb-40 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="font-sans text-[10px] text-[#69737D] tracking-[0.2em] mb-24 text-center uppercase">System Architecture</div>
          <div className="w-full overflow-x-auto pb-12 flex justify-center">
            <FullArchitectureDiagram />
          </div>
        </div>
      </motion.div>

      {/* 5. TECHNICAL HIGHLIGHTS */}
      <div className="max-w-[800px] mx-auto px-6 md:px-12 mb-40">
        <motion.div 
          className="font-sans text-[10px] text-[#69737D] tracking-[0.2em] mb-16 uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Technical Highlights
        </motion.div>
        
        <div className="flex flex-col gap-16">
          {MOCK_DATA.highlights.map((highlight, i) => (
            <motion.div 
              key={i} 
              className="flex gap-8 md:gap-12"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="font-mono text-[#69737D] pt-1">0{i + 1}</div>
              <div>
                <h3 className="font-sans text-sm tracking-wide mb-3 text-[#E8EDF2]">{highlight.title}</h3>
                <p className="font-sans text-sm text-[#69737D] leading-relaxed max-w-lg">{highlight.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 6. RESULT / OUTPUT */}
      <motion.div 
        className="max-w-[1400px] mx-auto px-6 md:px-12 mb-48"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="font-sans text-[10px] text-[#69737D] tracking-[0.2em] mb-12 uppercase">Result</div>
        <div className="w-full aspect-video bg-[#0B0E12] border border-[#69737D]/20 relative overflow-hidden flex items-center justify-center group">
          {/* Mock visual representation */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#36D9E6]/5 via-[#0B0E12]/0 to-[#0B0E12]" />
          <svg className="absolute w-full h-full opacity-10 group-hover:opacity-20 transition-opacity duration-1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dotGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#69737D" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotGrid)" />
          </svg>
          <div className="font-serif text-2xl md:text-4xl text-[#69737D] font-light z-10 tracking-widest">
            [ ARCHIVE RECORDING ]
          </div>
        </div>
      </motion.div>

      {/* 7. NEXT PROJECT TRANSITION */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-12 border-t border-[#69737D]/20 pt-24">
        <div 
          className="flex flex-col md:flex-row md:items-end justify-between group cursor-pointer gap-8" 
          onClick={() => router.push(`/projects/${MOCK_DATA.next.id}`)}
        >
          <div>
            <div className="font-sans text-[10px] text-[#69737D] tracking-[0.2em] mb-6 uppercase">Next Project</div>
            <div className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#69737D] group-hover:text-[#E8EDF2] transition-colors duration-500 uppercase tracking-tight">
              {MOCK_DATA.next.title}
            </div>
          </div>
          <div className="font-mono text-xs md:text-sm text-[#69737D] group-hover:text-[#E8EDF2] transition-colors duration-500 flex items-center gap-6">
            {MOCK_DATA.next.number} 
            <span className="text-2xl group-hover:translate-x-4 transition-transform duration-500 ease-out font-light">→</span>
          </div>
        </div>
      </div>

    </main>
  );
}

// --- VISUALIZATION COMPONENTS ---



function FullArchitectureDiagram() {
  return (
    <div className="w-[800px] flex flex-col items-center font-sans text-[10px] md:text-xs tracking-widest text-[#E8EDF2] min-w-[800px]">
      
      {/* REPOSITORY */}
      <div className="py-2 text-[#69737D]">REPOSITORY</div>
      <VerticalArrow />
      
      {/* INGESTION */}
      <div className="py-2">INGESTION</div>
      <div className="h-16 w-[1px] bg-[#69737D]/30" />
      
      {/* SPLIT */}
      <div className="w-[600px] h-[1px] bg-[#69737D]/30 relative">
         <div className="absolute top-0 left-0 w-[1px] h-6 bg-[#69737D]/30" />
         <div className="absolute top-0 right-0 w-[1px] h-6 bg-[#69737D]/30" />
         <div className="absolute top-0 left-1/2 w-[1px] h-6 bg-[#69737D]/30" />
         <ArrowHead className="absolute top-6 left-0 -translate-x-[0.5px]" />
         <ArrowHead className="absolute top-6 right-0 -translate-x-[0.5px]" />
         <ArrowHead className="absolute top-6 left-1/2 -translate-x-[0.5px]" />
      </div>

      {/* AGENTS ROW */}
      <div className="w-[600px] flex justify-between mt-8">
         <div className="w-[140px] text-center">ARCHITECT<br/>AGENT</div>
         <div className="w-[140px] text-center">CODE<br/>AGENT</div>
         <div className="w-[140px] text-center">SECURITY<br/>AGENT</div>
      </div>

      {/* MERGE */}
      <div className="w-[600px] h-8 relative mt-6">
         <div className="absolute bottom-0 left-0 w-[1px] h-8 bg-[#69737D]/30" />
         <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-[#69737D]/30" />
         <div className="absolute bottom-0 left-1/2 w-[1px] h-8 bg-[#69737D]/30" />
      </div>
      <div className="w-[600px] h-[1px] bg-[#69737D]/30 relative">
         <div className="absolute top-0 left-1/2 w-[1px] h-16 bg-[#69737D]/30" />
         <ArrowHead className="absolute top-16 left-1/2 -translate-x-[0.5px]" />
      </div>

      {/* SYNTHESIZER */}
      <div className="mt-20 py-2">SYNTHESIZER</div>
      <VerticalArrow />
      
      {/* SYSTEM REPRESENTATION */}
      <div className="py-2 text-[#36D9E6]">SYSTEM REPRESENTATION</div>
    </div>
  );
}

function VerticalArrow() {
  return (
    <div className="h-12 w-[1px] bg-[#69737D]/30 relative my-2">
      <ArrowHead className="absolute bottom-0 left-0 -translate-x-[0.5px]" />
    </div>
  );
}

function ArrowHead({ className }: { className?: string }) {
  return (
    <div className={`w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-l-transparent border-r-transparent border-t-[#69737D]/50 ${className}`} />
  );
}

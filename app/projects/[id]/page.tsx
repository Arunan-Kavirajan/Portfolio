"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Mock Data Template
const MOCK_DATA = {
  title: "PROJECT KODA",
  subtitle: "CODEBASE DETECTIVE & INGESTION SYSTEM",
  status: "ACTIVE / IN DEVELOPMENT",
  classification: "AGENTIC / AI",
  tech: ["NEXT.JS", "TYPESCRIPT", "GITHUB API", "TAILWIND CSS", "OPENAI"],
  links: [
    { label: "LIVE DEPLOYMENT", url: "#" },
    { label: "REPOSITORY", url: "#" }
  ],
  summary: "An agentic system designed to ingest, comprehend, and navigate entirely unfamiliar codebases. KODA operates as a synthetic developer, mapping complex file structures and architectural dependencies without prior human instruction.",
  mechanics: [
    { title: "Recursive AST Parsing", desc: "Maps deeply nested directory trees and generates comprehensive abstract syntax mappings of internal dependencies." },
    { title: "Vector Embeddings", desc: "Translates proprietary business logic into dense vector space, allowing for instantaneous semantic retrieval of functions and types." },
    { title: "Autonomous Refactoring", desc: "Proposes and simulates structural refactors in an isolated sandbox before committing changes to the primary repository." }
  ]
};

export default function ProjectDossier() {
  const params = useParams();
  const id = params.id as string;
  
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#0B0E12] selection:bg-[#36D9E6]/30 overflow-x-hidden font-sans">
      
      {/* SUBTLE BACKGROUND GRID */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#69737D" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* TOP NAVIGATION BAR */}
      <motion.nav 
        className="fixed top-0 left-0 w-full h-12 border-b border-[#69737D]/30 bg-[#0B0E12]/80 backdrop-blur-md flex items-center justify-between px-6 z-50 font-mono text-[10px] tracking-[0.2em] text-[#69737D]"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Link href="/projects" className="flex items-center hover:text-[#E8EDF2] transition-colors">
          <span className="mr-2">←</span> ABORT TO FIELD
        </Link>
        <div className="text-[#36D9E6]">DOSSIER : {id?.toUpperCase() || 'UNKNOWN'}</div>
        <div className="hidden md:block">STATUS : SECURE</div>
      </motion.nav>

      {/* DOSSIER CONTAINER */}
      <div className="pt-24 pb-24 px-4 md:px-12 max-w-[1400px] mx-auto relative z-10">
        
        {/* BORDER WRAPPER */}
        <motion.div 
          className="border border-[#69737D]/30 bg-[#0B0E12]/50 backdrop-blur-sm relative"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* CORNER ACCENTS */}
          <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#36D9E6]" />
          <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-[#36D9E6]" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-[#36D9E6]" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#36D9E6]" />

          {/* GRID LAYOUT */}
          <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#69737D]/30">
            
            {/* LEFT COLUMN: METADATA */}
            <div className="md:col-span-3 p-6 md:p-8 flex flex-col gap-12">
              
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <div className="font-mono text-[9px] text-[#69737D] tracking-[0.2em] mb-3">CLASSIFICATION</div>
                <div className="font-mono text-xs text-[#E8EDF2] tracking-wider">{MOCK_DATA.classification}</div>
                <div className="font-mono text-xs text-[#36D9E6] tracking-wider mt-1">{MOCK_DATA.status}</div>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <div className="font-mono text-[9px] text-[#69737D] tracking-[0.2em] mb-4">TECHNICAL STACK</div>
                <ul className="flex flex-col gap-2">
                  {MOCK_DATA.tech.map((t, i) => (
                    <li key={i} className="font-mono text-[10px] text-[#E8EDF2] tracking-wider flex items-center gap-2">
                      <span className="text-[#69737D]">+</span> {t}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <div className="font-mono text-[9px] text-[#69737D] tracking-[0.2em] mb-4">EXTERNAL LINKS</div>
                <ul className="flex flex-col gap-3">
                  {MOCK_DATA.links.map((l, i) => (
                    <li key={i}>
                      <a href={l.url} className="font-mono text-[10px] text-[#36D9E6] tracking-wider hover:text-[#E8EDF2] transition-colors flex items-center justify-between border border-[#69737D]/20 px-3 py-2 group">
                        {l.label}
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* DIAGRAM PLACEHOLDER */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-auto hidden md:block">
                <div className="font-mono text-[9px] text-[#69737D] tracking-[0.2em] mb-4">SYSTEM SCHEMATIC</div>
                <div className="border border-[#69737D]/20 aspect-square p-4 flex items-center justify-center relative overflow-hidden">
                  <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
                    <circle cx="50" cy="50" r="30" fill="none" stroke="#36D9E6" strokeWidth="0.5" strokeDasharray="2 4" />
                    <circle cx="50" cy="50" r="15" fill="none" stroke="#E8EDF2" strokeWidth="1" />
                    <line x1="20" y1="50" x2="35" y2="50" stroke="#69737D" strokeWidth="1" />
                    <line x1="65" y1="50" x2="80" y2="50" stroke="#69737D" strokeWidth="1" />
                    <line x1="50" y1="20" x2="50" y2="35" stroke="#69737D" strokeWidth="1" />
                    <line x1="50" y1="65" x2="50" y2="80" stroke="#69737D" strokeWidth="1" />
                  </svg>
                </div>
              </motion.div>

            </div>

            {/* RIGHT COLUMN: CONTENT */}
            <div className="md:col-span-9 p-6 md:p-12 lg:p-16 flex flex-col">
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2, duration: 0.6 }}
                className="border-b border-[#69737D]/30 pb-12 mb-12"
              >
                <div className="font-mono text-[10px] text-[#36D9E6] tracking-[0.3em] mb-6">01 // IDENTITY</div>
                <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#E8EDF2] tracking-wide leading-none mb-4 uppercase">{MOCK_DATA.title}</h1>
                <h2 className="font-mono text-xs md:text-sm text-[#69737D] tracking-[0.2em]">{MOCK_DATA.subtitle}</h2>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-16 max-w-3xl"
              >
                <div className="font-mono text-[10px] text-[#36D9E6] tracking-[0.3em] mb-6">02 // EXECUTIVE SUMMARY</div>
                <p className="font-serif text-lg md:text-xl lg:text-2xl text-[#E8EDF2]/90 leading-relaxed">
                  {MOCK_DATA.summary}
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="font-mono text-[10px] text-[#36D9E6] tracking-[0.3em] mb-8">03 // CORE MECHANICS</div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {MOCK_DATA.mechanics.map((mech, i) => (
                    <div key={i} className="border border-[#69737D]/20 p-6 bg-[#0B0E12]/40 group hover:border-[#36D9E6]/40 transition-colors">
                      <div className="font-mono text-[10px] text-[#69737D] tracking-[0.2em] mb-3">M.{i + 1}</div>
                      <h3 className="font-sans text-sm tracking-wider text-[#E8EDF2] mb-3 uppercase">{mech.title}</h3>
                      <p className="font-sans text-xs text-[#E8EDF2]/70 leading-relaxed font-light">
                        {mech.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </div>

    </main>
  );
}

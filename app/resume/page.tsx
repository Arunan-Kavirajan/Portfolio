"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("@/components/sections/PDFViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-[800px] h-[1130px] max-w-[95%] flex items-center justify-center bg-white/5 animate-pulse shadow-[0_0_40px_rgba(54,217,230,0.1)] z-10 relative">
      <div className="font-mono text-xs text-[#36D9E6] tracking-widest uppercase">Initializing...</div>
    </div>
  )
});

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-[#0B0E12] text-[#E8EDF2] selection:bg-[#36D9E6]/30 flex flex-col relative overflow-hidden">
      
      {/* Background atmospheric glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#36D9E6]/5 blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[40%] rounded-full bg-[#E8EDF2]/5 blur-[120px] pointer-events-none z-0" />

      <div className="flex-1 flex flex-col items-center justify-start px-4 pb-24 md:px-12 w-full max-w-[1400px] mx-auto z-10 pt-32">
        
        {/* Title Section */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col"
          >
            <div className="font-mono text-[10px] text-[#36D9E6] tracking-[0.3em] uppercase mb-6">Curriculum Vitae</div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tighter text-[#E8EDF2]">
              RESUME
            </h1>
          </motion.div>

          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            href="/resume.pdf" 
            download="Arunan_Kavirajan_Resume.pdf"
            className="group flex items-center gap-4 border border-[#36D9E6]/30 bg-[#36D9E6]/5 hover:bg-[#36D9E6]/10 px-8 py-4 rounded-full transition-all duration-300"
          >
            <span className="font-mono text-xs tracking-[0.2em] text-[#36D9E6] uppercase">Download PDF</span>
            <svg className="w-4 h-4 text-[#36D9E6] group-hover:translate-y-0.5 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          </motion.a>
        </div>

        {/* Custom PDF Viewer Container */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="w-full relative rounded-2xl border border-[#69737D]/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#050608] flex flex-col items-center justify-center min-h-[800px] py-16 group"
        >
          {/* Beautiful Architectural Background Design */}
          <div className="absolute inset-0 z-0 pointer-events-none rounded-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-[0.07]" style={{
              backgroundImage: `linear-gradient(to right, #36D9E6 1px, transparent 1px), linear-gradient(to bottom, #36D9E6 1px, transparent 1px)`,
              backgroundSize: '3rem 3rem'
            }} />
            <div className="absolute inset-0 bg-[#050608] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)]" />
          </div>
          
          {/* PDF Engine */}
          <PDFViewer />
        </motion.div>
      </div>
    </main>
  );
}

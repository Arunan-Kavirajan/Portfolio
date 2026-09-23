# -*- coding: utf-8 -*-
import re

with open('app/about/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

new_comp = '''// 5. EXPERIENCE
function Experience() {
  const container: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };
  
  const item: any = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    <section className="py-32 md:py-64 border-t border-[#69737D]/20 bg-[#0B0E12] z-10 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        
        {/* Section Label */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="font-mono text-[9px] text-[#69737D] tracking-[0.3em] uppercase mb-32 md:mb-48"
        >
          Experience
        </motion.div>

        {/* Experience Chapters */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-40 md:gap-64 mb-40 md:mb-64"
        >
          
          {/* APEXFLOW */}
          <motion.div variants={item} className="flex flex-col">
            <div className="font-mono text-xs md:text-sm text-[#36D9E6] tracking-[0.2em] uppercase mb-8">2026</div>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-9xl text-[#E8EDF2] tracking-tighter mb-8 leading-none">
              APEXFLOW<br className="hidden md:block" /> TECHNOLOGIES
            </h2>
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div className="font-sans text-2xl md:text-4xl text-[#E8EDF2] font-light">Software Development Intern</div>
              <div className="hidden md:block w-16 h-[1px] bg-[#69737D]/30" />
              <div className="font-serif text-xl md:text-2xl text-[#69737D] italic">Six-month internship</div>
            </div>
          </motion.div>

          {/* DECODELABS */}
          <motion.div variants={item} className="flex flex-col md:self-end md:text-right md:w-3/4">
            <div className="font-mono text-xs md:text-sm text-[#69737D] tracking-[0.2em] uppercase mb-6">2026</div>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-8xl text-[#E8EDF2] tracking-tighter mb-6">
              DECODELABS
            </h2>
            <div className="font-sans text-xl md:text-3xl text-[#E8EDF2] font-light">Python Programming Intern</div>
          </motion.div>

          {/* CHAT */}
          <motion.div variants={item} className="flex flex-col md:w-2/3">
            <h2 className="font-serif text-3xl md:text-5xl lg:text-7xl text-[#E8EDF2] tracking-tighter mb-6">
              CHAT
            </h2>
            <div className="font-sans text-xl md:text-2xl text-[#E8EDF2] font-light mb-4">
              Computer Hardware and AI Technology Club
            </div>
            <div className="font-serif text-lg md:text-xl text-[#69737D] italic leading-relaxed max-w-xl">
              The official platform for the Computer Hardware and AI Technology (CHAT) Club, featuring dynamic event management.
            </div>
          </motion.div>

        </motion.div>

        {/* Education Chapter */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut", delay: 0.2 } }
          }}
          className="border-t border-[#69737D]/20 pt-32 md:pt-48"
        >
          <div className="font-mono text-[9px] text-[#69737D] tracking-[0.3em] uppercase mb-24">
            Education
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="flex flex-col max-w-2xl">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#E8EDF2] tracking-tight mb-6 leading-tight">
                SRM Institute of Science and Technology
              </h2>
              <div className="font-sans text-2xl md:text-3xl text-[#69737D] font-light">
                B.Tech Information Technology
              </div>
            </div>
            <div className="font-mono text-sm md:text-base text-[#36D9E6] tracking-[0.2em] uppercase md:pb-2">
              2025 - Present
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}'''

content = re.sub(
    r'// 5\. EXPERIENCE\nfunction Experience\(\) \{.*?(?=\n// 6\. BEYOND CODE)',
    new_comp + '\n',
    content,
    flags=re.DOTALL
)

with open('app/about/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

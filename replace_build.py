import re

with open('app/about/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

new_comp = '''// 4. WHAT I WORK WITH
function WhatIWorkWith() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="py-32 md:py-64 relative border-t border-[#69737D]/20 bg-[#0B0E12] z-10">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
        >
          {/* Section Title */}
          <motion.h2 variants={item} className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#E8EDF2] tracking-tighter mb-24 md:mb-40">
            WHAT I WORK WITH
          </motion.h2>
          
          {/* Main 4 Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-8 mb-32 md:mb-48">
            
            {/* LANGUAGES */}
            <motion.div variants={item} className="flex flex-col">
              <h3 className="font-mono text-[10px] text-[#36D9E6] tracking-[0.2em] uppercase mb-8 border-b border-[#69737D]/20 pb-4">Languages</h3>
              <div className="flex flex-col gap-5">
                {["C", "Python", "JavaScript", "TypeScript", "Bash"].map(tech => (
                  <div key={tech} className="font-sans text-2xl md:text-3xl text-[#E8EDF2] font-light tracking-tight">{tech}</div>
                ))}
              </div>
            </motion.div>

            {/* SOFTWARE */}
            <motion.div variants={item} className="flex flex-col">
              <h3 className="font-mono text-[10px] text-[#36D9E6] tracking-[0.2em] uppercase mb-8 border-b border-[#69737D]/20 pb-4">Software</h3>
              <div className="flex flex-col gap-5">
                {["React", "Next.js", "Node.js", "Flutter", "Tailwind CSS"].map(tech => (
                  <div key={tech} className="font-sans text-2xl md:text-3xl text-[#E8EDF2] font-light tracking-tight">{tech}</div>
                ))}
              </div>
            </motion.div>

            {/* BACKEND & DATA */}
            <motion.div variants={item} className="flex flex-col">
              <h3 className="font-mono text-[10px] text-[#36D9E6] tracking-[0.2em] uppercase mb-8 border-b border-[#69737D]/20 pb-4">Backend & Data</h3>
              <div className="flex flex-col gap-5">
                {["Supabase", "Firebase", "SQLite"].map(tech => (
                  <div key={tech} className="font-sans text-2xl md:text-3xl text-[#E8EDF2] font-light tracking-tight">{tech}</div>
                ))}
              </div>
            </motion.div>

            {/* TOOLS */}
            <motion.div variants={item} className="flex flex-col">
              <h3 className="font-mono text-[10px] text-[#36D9E6] tracking-[0.2em] uppercase mb-8 border-b border-[#69737D]/20 pb-4">Tools</h3>
              <div className="flex flex-col gap-5">
                {["Git", "GitHub", "Linux", "VS Code", "Vercel"].map(tech => (
                  <div key={tech} className="font-sans text-2xl md:text-3xl text-[#E8EDF2] font-light tracking-tight">{tech}</div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* EXPLORING */}
          <motion.div variants={item} className="pt-16 border-t border-[#69737D]/20">
            <h3 className="font-serif italic text-xl md:text-2xl text-[#69737D] mb-8">Exploring</h3>
            <div className="flex flex-wrap gap-x-12 gap-y-6">
              {["Cybersecurity", "AI/ML", "AI Agents", "Cloud"].map(tech => (
                <div key={tech} className="font-mono text-xs md:text-sm text-[#69737D] uppercase tracking-[0.2em]">{tech}</div>
              ))}
            </div>
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  );
}'''

# Replace WhatIBuild function
content = re.sub(
    r'// 4\. WHAT I BUILD\nfunction WhatIBuild\(\) \{.*?(?=\n// 5\. EXPERIENCE)',
    new_comp + '\n',
    content,
    flags=re.DOTALL
)

# Update the call in AboutPage component
content = re.sub(
    r'<WhatIBuild />',
    r'<WhatIWorkWith />',
    content
)

with open('app/about/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

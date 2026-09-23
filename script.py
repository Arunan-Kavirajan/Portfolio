import re

with open('app/about/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

new_comp = '''// 3. MIND VISUAL
function MindVisual() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  
  // Progress mappings for the 3 stages: [0, 0.4, 0.9] -> [Early, Middle, Late]
  
  // SOFTWARE
  const swX = useTransform(scrollYProgress, [0, 0.4, 0.9], ["-15vw", "-5vw", "0vw"]);
  const swY = useTransform(scrollYProgress, [0, 0.4, 0.9], ["15vh", "5vh", "0vh"]);
  const swScale = useTransform(scrollYProgress, [0, 0.4, 0.9], [0.7, 1, 1.4]);
  const swOp = useTransform(scrollYProgress, [0, 0.4, 0.9], [0.2, 0.8, 1]);

  // SECURITY
  const secX = useTransform(scrollYProgress, [0, 0.4, 0.9], ["25vw", "-10vw", "10vw"]);
  const secY = useTransform(scrollYProgress, [0, 0.4, 0.9], ["-30vh", "-15vh", "-12vh"]);
  const secScale = useTransform(scrollYProgress, [0, 0.4, 0.9], [0.5, 0.9, 0.7]);
  const secOp = useTransform(scrollYProgress, [0, 0.4, 0.9], [0, 0.9, 0.8]);

  // AI / ML
  const aiX = useTransform(scrollYProgress, [0, 0.4, 0.9], ["-30vw", "10vw", "-16vw"]);
  const aiY = useTransform(scrollYProgress, [0, 0.4, 0.9], ["-20vh", "25vh", "12vh"]);
  const aiScale = useTransform(scrollYProgress, [0, 0.4, 0.9], [0.6, 0.8, 0.7]);
  const aiOp = useTransform(scrollYProgress, [0, 0.4, 0.9], [0, 0.6, 0.7]);

  // SYSTEMS
  const sysX = useTransform(scrollYProgress, [0, 0.4, 0.9], ["30vw", "35vw", "18vw"]);
  const sysY = useTransform(scrollYProgress, [0, 0.4, 0.9], ["35vh", "5vh", "18vh"]);
  const sysScale = useTransform(scrollYProgress, [0, 0.4, 0.9], [0.4, 0.5, 0.6]);
  const sysOp = useTransform(scrollYProgress, [0, 0.4, 0.9], [0, 0.4, 0.6]);

  // EXPERIMENTATION
  const expX = useTransform(scrollYProgress, [0, 0.4, 0.9], ["-35vw", "5vw", "-12vw"]);
  const expY = useTransform(scrollYProgress, [0, 0.4, 0.9], ["40vh", "0vh", "-22vh"]);
  const expScale = useTransform(scrollYProgress, [0, 0.4, 0.9], [0.5, 1.1, 0.5]);
  const expOp = useTransform(scrollYProgress, [0, 0.4, 0.9], [0, 0.7, 0.5]);

  // BUILDING
  const bldX = useTransform(scrollYProgress, [0, 0.4, 0.9], ["40vw", "15vw", "2vw"]);
  const bldY = useTransform(scrollYProgress, [0, 0.4, 0.9], ["20vh", "15vh", "-18vh"]);
  const bldScale = useTransform(scrollYProgress, [0, 0.4, 0.9], [0.6, 0.8, 0.7]);
  const bldOp = useTransform(scrollYProgress, [0, 0.4, 0.9], [0, 0.6, 0.8]);

  // FINAL STATEMENT
  const statementOp = useTransform(scrollYProgress, [0.75, 0.95], [0, 1]);
  const statementY = useTransform(scrollYProgress, [0.75, 0.95], [20, 0]);

  // Floating animations for subtle constant physical movement
  const float1: Transition = { repeat: Infinity, duration: 8, repeatType: "mirror", ease: "easeInOut" };
  const float2: Transition = { repeat: Infinity, duration: 6, repeatType: "mirror", ease: "easeInOut", delay: 1 };
  const float3: Transition = { repeat: Infinity, duration: 7, repeatType: "mirror", ease: "easeInOut", delay: 2 };

  return (
    <section ref={ref} className="h-[250vh] w-full relative border-t border-[#69737D]/20 bg-[#0B0E12]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="font-mono text-[9px] text-[#69737D] tracking-[0.3em] absolute top-16 md:top-24 uppercase z-10">The Topology of Interest</div>
        
        {/* Typographic Field */}
        <div className="relative w-full h-full max-w-7xl flex items-center justify-center">
          
          <motion.div 
            className="absolute flex items-center justify-center"
            style={{ x: swX, y: swY, scale: swScale, opacity: swOp, zIndex: 10 }}
          >
            <motion.div animate={{ y: ["-2%", "2%"] }} transition={float1}>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-7xl tracking-widest text-[#E8EDF2]">SOFTWARE</h2>
            </motion.div>
          </motion.div>

          <motion.div 
            className="absolute flex items-center justify-center"
            style={{ x: secX, y: secY, scale: secScale, opacity: secOp, zIndex: 20 }}
          >
            <motion.div animate={{ x: ["-3%", "3%"] }} transition={float2}>
              <span className="font-mono text-xl md:text-3xl tracking-widest text-[#36D9E6]">SECURITY</span>
            </motion.div>
          </motion.div>

          <motion.div 
            className="absolute flex items-center justify-center"
            style={{ x: aiX, y: aiY, scale: aiScale, opacity: aiOp, zIndex: 5 }}
          >
            <motion.div animate={{ y: ["3%", "-3%"], rotate: [-1, 1] }} transition={float3}>
              <span className="font-sans text-xl md:text-3xl font-light tracking-widest text-[#69737D]">AI / ML</span>
            </motion.div>
          </motion.div>

          <motion.div 
            className="absolute flex items-center justify-center"
            style={{ x: sysX, y: sysY, scale: sysScale, opacity: sysOp, zIndex: 15 }}
          >
            <motion.div animate={{ y: ["-1%", "1%"] }} transition={float1}>
              <span className="font-mono text-lg md:text-2xl font-bold tracking-widest text-[#69737D]">SYSTEMS</span>
            </motion.div>
          </motion.div>

          <motion.div 
            className="absolute flex items-center justify-center"
            style={{ x: expX, y: expY, scale: expScale, opacity: expOp, zIndex: 8 }}
          >
            <motion.div animate={{ x: ["2%", "-2%"], y: ["-2%", "2%"] }} transition={float2}>
              <span className="font-serif italic text-xl md:text-4xl text-[#69737D]">Experimentation</span>
            </motion.div>
          </motion.div>

          <motion.div 
            className="absolute flex items-center justify-center"
            style={{ x: bldX, y: bldY, scale: bldScale, opacity: bldOp, zIndex: 12 }}
          >
            <motion.div animate={{ y: ["-4%", "4%"] }} transition={float3}>
              <span className="font-sans text-2xl md:text-4xl font-bold tracking-tight text-[#E8EDF2]">BUILDING</span>
            </motion.div>
          </motion.div>

          {/* Final Statement */}
          <motion.div 
            className="absolute bottom-32 md:bottom-24"
            style={{ opacity: statementOp, y: statementY, zIndex: 30 }}
          >
            <p className="font-serif italic text-[#69737D] text-lg md:text-xl">The things I keep coming back to.</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}'''

new_content = re.sub(r'// 3\. MIND VISUAL\nfunction MindVisual\(\) \{.*?(?=\n// 4\. WHAT I BUILD)', new_comp + '\n\n', content, flags=re.DOTALL)

with open('app/about/page.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

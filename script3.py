import re

with open('app/about/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

new_comp = '''// 3. MIND VISUAL
function MindVisual() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  
  // -- TARGET GENERATORS (from scroll) --
  const tSwTx = useTransform(scrollYProgress, [0, 0.45, 0.9], [-20, 0, -18]);
  const tSwTy = useTransform(scrollYProgress, [0, 0.45, 0.9], [20, 0, -12]);
  const tSwTs = useTransform(scrollYProgress, [0, 0.45, 0.9], [0.6, 1.1, 0.9]);
  const swOp = useTransform(scrollYProgress, [0, 0.45, 0.9], [0, 1, 0.9]);

  const tSecTx = useTransform(scrollYProgress, [0, 0.45, 0.9], [30, -5, 18]);
  const tSecTy = useTransform(scrollYProgress, [0, 0.45, 0.9], [-30, 20, -18]);
  const tSecTs = useTransform(scrollYProgress, [0, 0.45, 0.9], [0.5, 1.0, 0.9]);
  const secOp = useTransform(scrollYProgress, [0, 0.45, 0.9], [0, 0.8, 0.9]);

  const tAiTx = useTransform(scrollYProgress, [0, 0.45, 0.9], [-30, 15, -22]);
  const tAiTy = useTransform(scrollYProgress, [0, 0.45, 0.9], [-15, -15, 15]);
  const tAiTs = useTransform(scrollYProgress, [0, 0.45, 0.9], [0.5, 0.9, 0.8]);
  const aiOp = useTransform(scrollYProgress, [0, 0.45, 0.9], [0, 0.7, 0.9]);

  const tSysTx = useTransform(scrollYProgress, [0, 0.45, 0.9], [30, 10, 22]);
  const tSysTy = useTransform(scrollYProgress, [0, 0.45, 0.9], [35, -25, 18]);
  const tSysTs = useTransform(scrollYProgress, [0, 0.45, 0.9], [0.5, 0.8, 0.9]);
  const sysOp = useTransform(scrollYProgress, [0, 0.45, 0.9], [0, 0.6, 0.9]);

  const tExpTx = useTransform(scrollYProgress, [0, 0.45, 0.9], [-35, -15, 0]);
  const tExpTy = useTransform(scrollYProgress, [0, 0.45, 0.9], [40, 10, -8]);
  const tExpTs = useTransform(scrollYProgress, [0, 0.45, 0.9], [0.5, 1.0, 0.9]);
  const expOp = useTransform(scrollYProgress, [0, 0.45, 0.9], [0, 0.9, 0.9]);

  const tBldTx = useTransform(scrollYProgress, [0, 0.45, 0.9], [40, 10, 0]);
  const tBldTy = useTransform(scrollYProgress, [0, 0.45, 0.9], [20, 20, 12]);
  const tBldTs = useTransform(scrollYProgress, [0, 0.45, 0.9], [0.5, 0.7, 1.0]);
  const bldOp = useTransform(scrollYProgress, [0, 0.45, 0.9], [0, 0.5, 1.0]);

  // -- PHYSICS MOTION VALUES --
  const mSwX = useMotionValue(-20); const mSwY = useMotionValue(20); const mSwS = useMotionValue(0.6);
  const mSecX = useMotionValue(30); const mSecY = useMotionValue(-30); const mSecS = useMotionValue(0.5);
  const mAiX = useMotionValue(-30); const mAiY = useMotionValue(-15); const mAiS = useMotionValue(0.5);
  const mSysX = useMotionValue(30); const mSysY = useMotionValue(35); const mSysS = useMotionValue(0.5);
  const mExpX = useMotionValue(-35); const mExpY = useMotionValue(40); const mExpS = useMotionValue(0.5);
  const mBldX = useMotionValue(40); const mBldY = useMotionValue(20); const mBldS = useMotionValue(0.5);

  const swX = useTransform(mSwX, v => `${v}vw`); const swY = useTransform(mSwY, v => `${v}vh`);
  const secX = useTransform(mSecX, v => `${v}vw`); const secY = useTransform(mSecY, v => `${v}vh`);
  const aiX = useTransform(mAiX, v => `${v}vw`); const aiY = useTransform(mAiY, v => `${v}vh`);
  const sysX = useTransform(mSysX, v => `${v}vw`); const sysY = useTransform(mSysY, v => `${v}vh`);
  const expX = useTransform(mExpX, v => `${v}vw`); const expY = useTransform(mExpY, v => `${v}vh`);
  const bldX = useTransform(mBldX, v => `${v}vw`); const bldY = useTransform(mBldY, v => `${v}vh`);

  // -- PHYSICS ENGINE --
  const items = useRef([
    { id: "sw",  x: -20, y: 20,  s: 0.6, vx: 0, vy: 0, vs: 0, mass: 2.5, mX: mSwX, mY: mSwY, mS: mSwS },
    { id: "sec", x: 30,  y: -30, s: 0.5, vx: 0, vy: 0, vs: 0, mass: 1.2, mX: mSecX, mY: mSecY, mS: mSecS },
    { id: "ai",  x: -30, y: -15, s: 0.5, vx: 0, vy: 0, vs: 0, mass: 1.0, mX: mAiX, mY: mAiY, mS: mAiS },
    { id: "sys", x: 30,  y: 35,  s: 0.5, vx: 0, vy: 0, vs: 0, mass: 1.8, mX: mSysX, mY: mSysY, mS: mSysS },
    { id: "exp", x: -35, y: 40,  s: 0.5, vx: 0, vy: 0, vs: 0, mass: 0.8, mX: mExpX, mY: mExpY, mS: mExpS },
    { id: "bld", x: 40,  y: 20,  s: 0.5, vx: 0, vy: 0, vs: 0, mass: 1.5, mX: mBldX, mY: mBldY, mS: mBldS }
  ]).current;

  useAnimationFrame((t, delta) => {
    // Cap delta to avoid huge jumps if tab was hidden
    const dt = Math.min(delta / 16, 2); 
    const time = t / 1000;

    const targets = [
      { tx: tSwTx.get(), ty: tSwTy.get(), ts: tSwTs.get() },
      { tx: tSecTx.get(), ty: tSecTy.get(), ts: tSecTs.get() },
      { tx: tAiTx.get(), ty: tAiTy.get(), ts: tAiTs.get() },
      { tx: tSysTx.get(), ty: tSysTy.get(), ts: tSysTs.get() },
      { tx: tExpTx.get(), ty: tExpTy.get(), ts: tExpTs.get() },
      { tx: tBldTx.get(), ty: tBldTy.get(), ts: tBldTs.get() }
    ];

    for (let i = 0; i < 6; i++) {
      let item = items[i];
      let target = targets[i];
      
      // Base Spring
      let springK = 0.03;
      if (item.id === "sys") springK = 0.05; // Systems maintains structure
      if (item.id === "exp") springK = 0.015; // Experimentation drifts more loosely
      if (item.id === "bld") springK = 0.02;

      let fx = (target.tx - item.x) * springK;
      let fy = (target.ty - item.y) * springK;
      let fs = (target.ts - item.s) * 0.05; // Scale spring

      // Idle Behaviors
      if (item.id === "sw") {
        fx += Math.sin(time * 0.4) * 0.02;
        fy += Math.cos(time * 0.3) * 0.02;
        fs += Math.sin(time * 0.6) * 0.001; // subtle breathing
      } else if (item.id === "sec") {
        fx += Math.sin(time * 2) * 0.06; // pulsing/scanning
        fy += Math.cos(time * 1.5) * 0.06;
      } else if (item.id === "ai") {
        fx += Math.sin(time * 0.7 + Math.cos(time * 0.4)) * 0.08; // unpredictable
        fy += Math.cos(time * 0.5 + Math.sin(time * 0.3)) * 0.08;
      } else if (item.id === "sys") {
        fx += Math.sin(time * 0.2) * 0.01; // very stable
      } else if (item.id === "exp") {
        fx += Math.sin(time * 0.9) * 0.15; // large exploratory drift
        fy += Math.cos(time * 1.1) * 0.15;
      } else if (item.id === "bld") {
        fx += Math.sin(time * 0.3) * 0.03;
        fy += Math.cos(time * 0.4) * 0.03;
      }

      // Repulsion / Interaction
      for (let j = 0; j < 6; j++) {
        if (i === j) continue;
        let other = items[j];
        let dx = item.x - other.x;
        let dy = item.y - other.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let minDist = 14; 
        
        if (dist < minDist && dist > 0.1) {
          let strength = (minDist - dist) * 0.006;
          
          if (other.id === "exp") strength *= 2.5; // Exp pushes things out of its way
          if (other.id === "sec") strength *= 1.8; // Sec examines and pushes
          if (item.id === "sys" && other.id === "sec") strength *= 2.0; // Systems strongly reacts to Security
          
          fx += (dx / dist) * strength / item.mass;
          fy += (dy / dist) * strength / item.mass;
        }
      }

      item.vx = (item.vx + fx) * 0.88; // friction
      item.vy = (item.vy + fy) * 0.88;
      item.vs = (item.vs + fs) * 0.85;

      item.x += item.vx * dt;
      item.y += item.vy * dt;
      item.s += item.vs * dt;

      // Update actual motion values for React to render
      item.mX.set(item.x);
      item.mY.set(item.y);
      item.mS.set(item.s);
    }
  });

  const statementOp = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const statementY = useTransform(scrollYProgress, [0.85, 0.95], [20, 0]);

  return (
    <section ref={ref} className="h-[250vh] w-full relative border-t border-[#69737D]/20 bg-[#0B0E12]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="font-mono text-[9px] text-[#69737D] tracking-[0.3em] absolute top-16 md:top-24 uppercase z-10 pointer-events-none">The Topology of Interest</div>
        
        <div className="relative w-full h-full max-w-7xl flex items-center justify-center">
          
          <motion.div 
            className="absolute flex items-center justify-center"
            style={{ x: swX, y: swY, scale: mSwS, opacity: swOp, zIndex: 10 }}
          >
            <h2 className="font-serif text-3xl md:text-5xl tracking-widest text-[#E8EDF2] whitespace-nowrap">SOFTWARE</h2>
          </motion.div>

          <motion.div 
            className="absolute flex items-center justify-center"
            style={{ x: secX, y: secY, scale: mSecS, opacity: secOp, zIndex: 20 }}
          >
            <span className="font-mono text-2xl md:text-4xl tracking-widest text-[#36D9E6] whitespace-nowrap">CYBERSECURITY</span>
          </motion.div>

          <motion.div 
            className="absolute flex items-center justify-center"
            style={{ x: aiX, y: aiY, scale: mAiS, opacity: aiOp, zIndex: 5 }}
          >
            <span className="font-sans text-3xl md:text-5xl font-light tracking-widest text-[#69737D] whitespace-nowrap">AI / ML</span>
          </motion.div>

          <motion.div 
            className="absolute flex items-center justify-center"
            style={{ x: sysX, y: sysY, scale: mSysS, opacity: sysOp, zIndex: 15 }}
          >
            <span className="font-mono text-2xl md:text-4xl font-bold tracking-widest text-[#69737D] whitespace-nowrap">SYSTEMS</span>
          </motion.div>

          <motion.div 
            className="absolute flex items-center justify-center"
            style={{ x: expX, y: expY, scale: mExpS, opacity: expOp, zIndex: 8 }}
          >
            <span className="font-serif italic text-3xl md:text-5xl text-[#69737D] whitespace-nowrap">Experimentation</span>
          </motion.div>

          <motion.div 
            className="absolute flex items-center justify-center"
            style={{ x: bldX, y: bldY, scale: mBldS, opacity: bldOp, zIndex: 12 }}
          >
            <span className="font-sans text-3xl md:text-5xl font-bold tracking-tight text-[#E8EDF2] whitespace-nowrap">BUILDING</span>
          </motion.div>

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

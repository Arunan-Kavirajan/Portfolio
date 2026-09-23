import re

with open('app/about/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

new_comp = '''// 3. MIND VISUAL
function TopologyEnvironment({ scrollYProgress, hoveredId }: { scrollYProgress: any, hoveredId: string | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverRef = useRef(hoveredId);
  const scrollRef = useRef(0);

  useEffect(() => {
    hoverRef.current = hoveredId;
  }, [hoveredId]);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v: number) => { scrollRef.current = v; });
    return () => unsub();
  }, [scrollYProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationId: number;
    let time = 0;
    
    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    const setSize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    setSize();
    window.addEventListener("resize", setSize);

    // Generative Data
    const sysCrosses = Array.from({length: 30}, () => ({ ox: Math.random()*160-80, oy: Math.random()*160-80 }));
    const aiPoints = Array.from({length: 40}, () => ({ x: Math.random()*120-60, y: Math.random()*120-60, vx: (Math.random()-0.5)*0.8, vy: (Math.random()-0.5)*0.8 }));
    const bldFrags = Array.from({length: 20}, () => ({ x: Math.random()*100-50, y: Math.random()*100-50, size: Math.random()*12+4 }));
    const swLines = Array.from({length: 15}, () => ({ x: Math.random()*150-75, y: Math.random()*150-75, w: Math.random()*50+10, h: Math.random()*50+10 }));

    const render = () => {
       time += 0.015;
       const scroll = scrollRef.current;
       const hover = hoverRef.current;
       
       ctx.clearRect(0, 0, w, h);
       
       const globalIntensity = Math.min(1, Math.max(0, (scroll - 0.1) * 2.5));
       if (globalIntensity <= 0) {
          animationId = requestAnimationFrame(render);
          return;
       }

       // SOFTWARE (Architecture / Recomposition)
       ctx.save();
       ctx.translate(w * 0.3, h * 0.35);
       const swHover = hover === 'sw' ? 1 : 0;
       const swAlpha = (0.02 + swHover * 0.08) * globalIntensity;
       ctx.strokeStyle = `rgba(105, 115, 125, ${swAlpha})`;
       ctx.lineWidth = 1;
       swLines.forEach((l, i) => {
          let curX = l.x + Math.sin(time * 0.5 + i) * 15;
          let curY = l.y + Math.cos(time * 0.4 + i) * 15;
          ctx.strokeRect(curX, curY, l.w, l.h);
          if (i > 0 && Math.sin(time * 1.5 + i) > 0.7) {
             ctx.beginPath();
             ctx.moveTo(curX, curY);
             ctx.lineTo(swLines[i-1].x, swLines[i-1].y);
             ctx.stroke();
          }
       });
       ctx.restore();

       // CYBERSECURITY (Scanning Sweep)
       ctx.save();
       ctx.translate(w * 0.7, h * 0.25);
       const secHover = hover === 'sec' ? 1 : 0;
       let scanY = (time * 60) % 200 - 100; 
       ctx.strokeStyle = secHover ? `rgba(54, 217, 230, ${0.4 * globalIntensity})` : `rgba(105, 115, 125, ${0.1 * globalIntensity})`;
       ctx.beginPath(); ctx.moveTo(-120, scanY); ctx.lineTo(120, scanY); ctx.stroke();
       ctx.fillStyle = `rgba(105, 115, 125, ${(0.1 + secHover * 0.2) * globalIntensity})`;
       for(let x=-100; x<=100; x+=25) {
         for(let y=-80; y<=80; y+=25) {
           if (Math.abs(y - scanY) < 15) ctx.fillRect(x, y, 2, 2);
           else ctx.fillRect(x, y, 0.5, 0.5);
         }
       }
       ctx.restore();

       // AI / ML (Probabilistic Field)
       ctx.save();
       ctx.translate(w * 0.25, h * 0.55);
       const aiHover = hover === 'ai' ? 1 : 0;
       ctx.fillStyle = `rgba(105, 115, 125, ${(0.15 + aiHover * 0.2) * globalIntensity})`;
       ctx.strokeStyle = `rgba(105, 115, 125, ${(0.05 + aiHover * 0.1) * globalIntensity})`;
       aiPoints.forEach(p => {
          p.x += p.vx * (1 + aiHover * 1.5);
          p.y += p.vy * (1 + aiHover * 1.5);
          if(p.x > 100) p.x = -100; if(p.x < -100) p.x = 100;
          if(p.y > 80) p.y = -80; if(p.y < -80) p.y = 80;
          ctx.beginPath(); ctx.arc(p.x, p.y, 1, 0, Math.PI*2); ctx.fill();
       });
       for(let i=0; i<aiPoints.length; i++) {
          for(let j=i+1; j<aiPoints.length; j++) {
             let dx = aiPoints[i].x - aiPoints[j].x;
             let dy = aiPoints[i].y - aiPoints[j].y;
             if(dx*dx + dy*dy < 1200) { 
                ctx.beginPath(); ctx.moveTo(aiPoints[i].x, aiPoints[i].y); ctx.lineTo(aiPoints[j].x, aiPoints[j].y); ctx.stroke();
             }
          }
       }
       ctx.restore();

       // SYSTEMS (Structural Alignment)
       ctx.save();
       ctx.translate(w * 0.75, h * 0.6);
       const sysHover = hover === 'sys' ? 1 : 0;
       const alignFactor = (Math.sin(time * 0.8) + 1) / 2; 
       const finalAlign = sysHover ? 1 : alignFactor;
       ctx.strokeStyle = `rgba(105, 115, 125, ${(0.1 + sysHover * 0.15) * globalIntensity})`;
       sysCrosses.forEach(c => {
          let gx = Math.round(c.ox / 40) * 40;
          let gy = Math.round(c.oy / 40) * 40;
          let curX = c.ox + (gx - c.ox) * finalAlign;
          let curY = c.oy + (gy - c.oy) * finalAlign;
          ctx.beginPath();
          ctx.moveTo(curX - 4, curY); ctx.lineTo(curX + 4, curY);
          ctx.moveTo(curX, curY - 4); ctx.lineTo(curX, curY + 4);
          ctx.stroke();
       });
       ctx.restore();

       // EXPERIMENTATION (Branching Traces)
       ctx.save();
       ctx.translate(w * 0.35, h * 0.75);
       const expHover = hover === 'exp' ? 1 : 0;
       ctx.strokeStyle = `rgba(105, 115, 125, ${(0.08 + expHover * 0.15) * globalIntensity})`;
       for(let i=0; i<4; i++) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          for(let t=0; t<40; t++) {
             let angle = Math.sin(time * 0.5 + t*0.1 + i*2.5) * 2.5;
             let rad = t * (2 + expHover * 1.5);
             ctx.lineTo(Math.cos(angle)*rad, Math.sin(angle)*rad);
          }
          ctx.stroke();
       }
       ctx.restore();

       // BUILDING (Assembly)
       ctx.save();
       ctx.translate(w * 0.65, h * 0.8);
       const bldHover = hover === 'bld' ? 1 : 0;
       ctx.strokeStyle = `rgba(232, 237, 242, ${(0.04 + bldHover * 0.1) * globalIntensity})`;
       ctx.fillStyle = `rgba(232, 237, 242, ${(0.01 + bldHover * 0.04) * globalIntensity})`;
       const assembleFactor = (Math.cos(time * 1.2) + 1) / 2; 
       const bldAlign = bldHover ? 1 : assembleFactor;
       bldFrags.forEach((f, i) => {
          let cols = 5;
          let row = Math.floor(i / cols);
          let col = i % cols;
          let tx = (col - 2) * 18;
          let ty = (row - 1) * 18;
          let curX = f.x + (tx - f.x) * bldAlign;
          let curY = f.y + (ty - f.y) * bldAlign;
          ctx.fillRect(curX, curY, f.size, f.size);
          ctx.strokeRect(curX, curY, f.size, f.size);
       });
       ctx.restore();

       animationId = requestAnimationFrame(render);
    }
    render();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

function MindVisual() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Entrance animation: fades in and translates slightly up into fixed position
  const entryY = useTransform(scrollYProgress, [0, 0.2], [40, 0]);
  const entryOp = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const yOffset = useTransform(entryY, (v: number) => `calc(-50% + ${v}px)`);

  const statementOp = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);
  const statementY = useTransform(scrollYProgress, [0.8, 0.95], [20, 0]);

  const ANCHORS = [
    { id: "sw",  label: "SOFTWARE",        cx: 30, cy: 35, font: "font-serif text-3xl md:text-4xl text-[#E8EDF2]" },
    { id: "sec", label: "CYBERSECURITY",   cx: 70, cy: 25, font: "font-mono text-xl md:text-2xl text-[#36D9E6]" },
    { id: "ai",  label: "AI / ML",         cx: 25, cy: 55, font: "font-sans font-light text-2xl md:text-4xl text-[#69737D]" },
    { id: "sys", label: "SYSTEMS",         cx: 75, cy: 60, font: "font-mono font-bold text-xl md:text-2xl text-[#69737D]" },
    { id: "exp", label: "Experimentation", cx: 35, cy: 75, font: "font-serif italic text-2xl md:text-4xl text-[#69737D]" },
    { id: "bld", label: "BUILDING",        cx: 65, cy: 80, font: "font-sans font-bold text-3xl md:text-4xl tracking-tight text-[#E8EDF2]" },
  ];

  return (
    <section ref={ref} className="h-[300vh] w-full relative border-t border-[#69737D]/20 bg-[#0B0E12]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        <TopologyEnvironment scrollYProgress={scrollYProgress} hoveredId={hoveredId} />

        <div className="font-mono text-[9px] text-[#69737D] tracking-[0.3em] absolute top-16 md:top-24 uppercase z-10 pointer-events-none">
          The Topology of Interest
        </div>
        
        <div className="relative w-full h-full max-w-7xl mx-auto">
          {ANCHORS.map(a => (
            <motion.div
              key={a.id}
              className="absolute flex items-center justify-center pointer-events-auto cursor-default z-20"
              style={{ 
                left: `${a.cx}%`, 
                top: `${a.cy}%`, 
                x: "-50%", 
                y: yOffset,
                opacity: entryOp
              }}
              onMouseEnter={() => setHoveredId(a.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <span className={a.font}>{a.label}</span>
            </motion.div>
          ))}

          <motion.div 
            className="absolute bottom-32 md:bottom-24 z-30 pointer-events-none whitespace-nowrap"
            style={{ left: "50%", x: "-50%", opacity: statementOp, y: statementY }}
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

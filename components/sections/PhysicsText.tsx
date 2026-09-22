"use client";

import { useEffect, useRef, useState, memo } from "react";

type Category = 'ai' | 'cyber' | 'dev';
const BUZZWORDS: { text: string; category: Category }[] = [
  { text: "Transformers", category: "ai" }, { text: "LLMs", category: "ai" }, { text: "Neural Networks", category: "ai" },
  { text: "RAG", category: "ai" }, { text: "Vector DB", category: "ai" }, { text: "Embeddings", category: "ai" },
  { text: "PyTorch", category: "ai" }, { text: "TensorFlow", category: "ai" }, { text: "Generative AI", category: "ai" },
  { text: "Agents", category: "ai" }, { text: "Stable Diffusion", category: "ai" }, { text: "Deep Learning", category: "ai" },
  { text: "Inference", category: "ai" }, { text: "Prompt Engineering", category: "ai" },
  { text: "Zero Trust", category: "cyber" }, { text: "Pen-Testing", category: "cyber" }, { text: "Cryptography", category: "cyber" },
  { text: "OAuth2", category: "cyber" }, { text: "JWT", category: "cyber" }, { text: "SOC2", category: "cyber" },
  { text: "OWASP", category: "cyber" }, { text: "SIEM", category: "cyber" }, { text: "Endpoint Security", category: "cyber" },
  { text: "RBAC", category: "cyber" }, { text: "Malware Analysis", category: "cyber" }, { text: "WAF", category: "cyber" },
  { text: "Phishing", category: "cyber" }, { text: "Zero-Day", category: "cyber" },
  { text: "React", category: "dev" }, { text: "Next.js", category: "dev" }, { text: "TypeScript", category: "dev" },
  { text: "Node.js", category: "dev" }, { text: "Rust", category: "dev" }, { text: "Go", category: "dev" },
  { text: "Docker", category: "dev" }, { text: "Kubernetes", category: "dev" }, { text: "GraphQL", category: "dev" },
  { text: "PostgreSQL", category: "dev" }, { text: "Redis", category: "dev" }, { text: "Kafka", category: "dev" },
  { text: "AWS", category: "dev" }, { text: "CI/CD", category: "dev" }, { text: "WebAssembly", category: "dev" },
  { text: "Vim", category: "dev" }, { text: "Linux", category: "dev" }, { text: "Serverless", category: "dev" }
];

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!<>-_/[]{}=+*^?#";
const GLITCH_CHARS = "░▒▓█▄▀■□▪▫◘◙◆◇○●";
const CORRUPT_RATIO = 0.4;

const AnimatedWord = memo(({ 
  word, 
  innerRef 
}: { 
  word: { text: string; category: Category; color: string; initialX: number; initialY: number }; 
  innerRef: (el: HTMLDivElement | null) => void; 
}) => {
  const [display, setDisplay] = useState(word.text);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock the width to prevent layout jitter during animations
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      containerRef.current.style.minWidth = `${rect.width}px`;
      containerRef.current.style.maxWidth = `${rect.width}px`;
      containerRef.current.style.transform = `translate(${word.initialX}px, ${word.initialY}px) translate(-50%, -50%)`;
    }
  }, [word.initialX, word.initialY]);

  useEffect(() => {
    let timeoutId: number;
    let intervalId: number;

    const scheduleAnimation = () => {
      const delay = 4000 + Math.random() * 5000; // 4-9s
      timeoutId = window.setTimeout(() => {
        setIsAnimating(true);

        if (word.category === "ai") {
          // Decrypt Cascade
          let tick = 0;
          const totalTicks = 14;
          const len = word.text.length;
          
          intervalId = window.setInterval(() => {
            tick++;
            const revealCount = Math.floor((tick / totalTicks) * len);
            const next = word.text.split("").map((ch, i) => {
              if (ch === " ") return "\u00A0";
              if (i < revealCount) return ch;
              return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            }).join("");
            setDisplay(next);
            if (tick >= totalTicks) { 
              clearInterval(intervalId); 
              setDisplay(word.text); 
              setIsAnimating(false);
              scheduleAnimation(); 
            }
          }, 40);

        } else if (word.category === "dev") {
          // Typewriter Reveal
          let i = 0;
          intervalId = window.setInterval(() => {
            i++;
            const revealed = word.text.slice(0, i);
            const hidden = "\u00A0".repeat(Math.max(0, word.text.length - i));
            setDisplay(revealed + "_" + hidden);
            if (i >= word.text.length) { 
              clearInterval(intervalId); 
              setDisplay(word.text); 
              setIsAnimating(false);
              scheduleAnimation(); 
            }
          }, 45);

        } else if (word.category === "cyber") {
          // Glitch Burst
          let flickers = 0;
          const maxFlickers = 3;
          intervalId = window.setInterval(() => {
            flickers++;
            if (flickers >= maxFlickers) {
              clearInterval(intervalId);
              setDisplay(word.text);
              setIsAnimating(false);
              scheduleAnimation();
              return;
            }
            const next = word.text.split("").map(ch => {
              if (ch === " ") return "\u00A0";
              return Math.random() < CORRUPT_RATIO
                ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
                : ch;
            }).join("");
            setDisplay(next);
          }, 60);
        }
      }, delay);
    };

    scheduleAnimation();

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [word]);

  return (
    <div
      ref={(el) => {
        // @ts-ignore
        containerRef.current = el;
        innerRef(el);
      }}
      className="absolute top-0 left-0 text-sm md:text-base font-mono uppercase tracking-wider whitespace-nowrap will-change-transform select-none"
      style={{
        color: isAnimating && word.category !== 'cyber' ? '#fff' : word.color,
        opacity: 1, // Solid, no fading
        textShadow: isAnimating && word.category === 'cyber' ? '2px 0 #FF0055, -2px 0 #00FFFF' : 'none',
        transition: 'color 0.2s ease',
        fontWeight: 600, // Make it pop physically
      }}
    >
      {display}
    </div>
  );
});

AnimatedWord.displayName = "AnimatedWord";

type WordPhysics = (typeof BUZZWORDS)[number] & {
  initialX: number;
  initialY: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  color: string;
};

export default function PhysicsText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);
  const [wordsData, setWordsData] = useState<WordPhysics[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    // On mobile, take only half the words to reduce clutter, skipping every other word to preserve the categorical mix
    const activeWords = isMobile ? BUZZWORDS.filter((_, i) => i % 2 === 0) : BUZZWORDS;

    const data = activeWords.map((w) => {
      const speed = 0.5 + Math.random() * 0.7;
      const angle = Math.random() * Math.PI * 2;

      let hue = 0;
      let sat = 90;
      let light = 65;

      if (w.category === 'ai') {
        // Glass Teal variations
        hue = 194;
        sat = 20 + Math.random() * 15;
        light = 45 + Math.random() * 15;
      } else if (w.category === 'cyber') {
        // Deep Moss variations
        hue = 115;
        sat = 15 + Math.random() * 15;
        light = 40 + Math.random() * 15;
      } else if (w.category === 'dev') {
        // Brick Earth variations
        hue = 20;
        sat = 20 + Math.random() * 15;
        light = 45 + Math.random() * 15;
      }

      return {
        ...w,
        initialX: Math.random() * (window.innerWidth - 200) + 100,
        initialY: Math.random() * (window.innerHeight - 200) + 100,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        width: 100,
        height: 24,
        color: `hsl(${hue}, ${sat}%, ${light}%)`
      };
    });

    setWordsData(data);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || wordsData.length === 0) return;

    // Grab actual dimensions of the rendered words
    const timer = setTimeout(() => {
      wordRefs.current.forEach((el, i) => {
        if (el && wordsData[i]) {
          const rect = el.getBoundingClientRect();
          wordsData[i].width = rect.width;
          wordsData[i].height = rect.height;
        }
      });
    }, 100);

    let frameId: number;
    let lastTime = performance.now();

    const update = (time: number) => {
      // iOS ProMotion spikes to 120Hz on touch. Delta time normalizes it to 60fps.
      let dt = (time - lastTime) / (1000 / 60);
      lastTime = time;
      
      // Cap dt to prevent massive jumps if tab was backgrounded
      if (dt > 3) dt = 1;

      const w = window.innerWidth;
      const h = window.innerHeight;

      wordsData.forEach((p, i) => {
        p.initialX += p.vx * dt;
        p.initialY += p.vy * dt;

        const halfW = p.width / 2;
        const halfH = p.height / 2;

        if (p.initialX - halfW < 0) {
          p.initialX = halfW;
          p.vx *= -1;
        } else if (p.initialX + halfW > w) {
          p.initialX = w - halfW;
          p.vx *= -1;
        }

        if (p.initialY - halfH < 0) {
          p.initialY = halfH;
          p.vy *= -1;
        } else if (p.initialY + halfH > h) {
          p.initialY = h - halfH;
          p.vy *= -1;
        }

        const el = wordRefs.current[i];
        if (el) {
          el.style.transform = `translate(${p.initialX}px, ${p.initialY}px) translate(-50%, -50%)`;
        }
      });

      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameId);
    };
  }, [mounted, wordsData]);

  if (!mounted || wordsData.length === 0) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-90 select-none">
      {wordsData.map((word, i) => (
        <AnimatedWord
          key={i}
          word={word}
          innerRef={(el) => {
            wordRefs.current[i] = el;
          }}
        />
      ))}
    </div>
  );
}

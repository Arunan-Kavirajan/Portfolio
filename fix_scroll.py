import re

with open('app/about/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# CinematicTypography modifications
content = re.sub(
    r'const w1Op = useTransform\(scrollYProgress, \[0.1, 0.2, 0.25, 0.3\], \[0, 1, 1, 0\]\);',
    r'const w1Op = useTransform(scrollYProgress, [0.05, 0.15, 0.2, 0.25], [0, 1, 1, 0]);',
    content
)
content = re.sub(
    r'const w2Op = useTransform\(scrollYProgress, \[0.3, 0.4, 0.45, 0.5\], \[0, 1, 1, 0\]\);',
    r'const w2Op = useTransform(scrollYProgress, [0.25, 0.35, 0.4, 0.45], [0, 1, 1, 0]);',
    content
)
content = re.sub(
    r'const w3Op = useTransform\(scrollYProgress, \[0.5, 0.6, 0.65, 0.7\], \[0, 1, 1, 0\]\);',
    r'const w3Op = useTransform(scrollYProgress, [0.45, 0.55, 0.6, 0.65], [0, 1, 1, 0]);',
    content
)
content = re.sub(
    r'const w4Op = useTransform\(scrollYProgress, \[0.7, 0.8, 0.85, 0.9\], \[0, 1, 1, 0\]\);',
    r'const w4Op = useTransform(scrollYProgress, [0.65, 0.75, 0.8, 0.85], [0, 1, 1, 0]);',
    content
)
content = re.sub(
    r'const y1 = useTransform\(scrollYProgress, \[0.1, 0.3\], \[30, -30\]\);',
    r'const y1 = useTransform(scrollYProgress, [0.05, 0.25], [30, -30]);',
    content
)
content = re.sub(
    r'const y2 = useTransform\(scrollYProgress, \[0.3, 0.5\], \[30, -30\]\);',
    r'const y2 = useTransform(scrollYProgress, [0.25, 0.45], [30, -30]);',
    content
)
content = re.sub(
    r'const y3 = useTransform\(scrollYProgress, \[0.5, 0.7\], \[30, -30\]\);',
    r'const y3 = useTransform(scrollYProgress, [0.45, 0.65], [30, -30]);',
    content
)
content = re.sub(
    r'const y4 = useTransform\(scrollYProgress, \[0.7, 0.9\], \[30, -30\]\);',
    r'const y4 = useTransform(scrollYProgress, [0.65, 0.85], [30, -30]);',
    content
)

# AftermathText modifications
content = re.sub(
    r'const pOp = useTransform\(scrollYProgress, \[0.9, 0.94\], \[0, 1\]\);',
    r'const pOp = useTransform(scrollYProgress, [0.85, 0.9], [0, 1]);',
    content
)
content = re.sub(
    r'const pY = useTransform\(scrollYProgress, \[0.9, 0.94\], \[30, 0\]\);',
    r'const pY = useTransform(scrollYProgress, [0.85, 0.9], [30, 0]);',
    content
)

# CuriousSection height modification
content = re.sub(
    r'className="h-\[600vh\] relative z-20 bg-\[#0B0E12\]"',
    r'className="h-[800vh] relative z-20 bg-[#0B0E12]"',
    content
)

with open('app/about/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)


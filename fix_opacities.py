import re

with open('app/about/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace swOp
content = re.sub(
    r'const swOp = useTransform\(scrollYProgress, \[0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9\], \[0, 1, 0.5, 0.3, 0.5, 0.7, 0.9\]\);',
    r'const swOp = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9], [1, 1, 0.5, 0.3, 0.5, 0.7, 0.9]);',
    content
)

# Replace secOp
content = re.sub(
    r'const secOp = useTransform\(scrollYProgress, \[0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9\], \[0, 0.5, 1, 0.6, 0.4, 0.6, 0.9\]\);',
    r'const secOp = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9], [0.6, 0.7, 1, 0.6, 0.4, 0.6, 0.9]);',
    content
)

# Replace aiOp
content = re.sub(
    r'const aiOp = useTransform\(scrollYProgress, \[0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9\], \[0, 0.4, 0.6, 1, 0.6, 0.4, 0.9\]\);',
    r'const aiOp = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9], [0.4, 0.5, 0.6, 1, 0.6, 0.4, 0.9]);',
    content
)

# Replace sysOp
content = re.sub(
    r'const sysOp = useTransform\(scrollYProgress, \[0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9\], \[0, 0.4, 0.5, 0.7, 1, 0.6, 0.9\]\);',
    r'const sysOp = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9], [0.3, 0.4, 0.5, 0.7, 1, 0.6, 0.9]);',
    content
)

# Replace expOp
content = re.sub(
    r'const expOp = useTransform\(scrollYProgress, \[0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9\], \[0, 0.4, 0.5, 0.6, 0.8, 1, 0.9\]\);',
    r'const expOp = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9], [0.2, 0.4, 0.5, 0.6, 0.8, 1, 0.9]);',
    content
)

# Replace bldOp
content = re.sub(
    r'const bldOp = useTransform\(scrollYProgress, \[0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9\], \[0, 0.3, 0.4, 0.5, 0.6, 0.8, 1\]\);',
    r'const bldOp = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9], [0.1, 0.3, 0.4, 0.5, 0.6, 0.8, 1]);',
    content
)

with open('app/about/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)


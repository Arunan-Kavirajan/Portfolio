import re

with open('app/about/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace pOp
content = re.sub(
    r'const pOp = useTransform\(scrollYProgress, \[0.93, 0.98\], \[0, 1\]\);',
    r'const pOp = useTransform(scrollYProgress, [0.9, 0.94], [0, 1]);',
    content
)

# Replace pY
content = re.sub(
    r'const pY = useTransform\(scrollYProgress, \[0.93, 0.98\], \[30, 0\]\);',
    r'const pY = useTransform(scrollYProgress, [0.9, 0.94], [30, 0]);',
    content
)

with open('app/about/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)


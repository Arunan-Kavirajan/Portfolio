import re

with open('app/about/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(
    r'ease: \[0.16, 1, 0.3, 1\]',
    r'ease: "easeOut"',
    content
)

with open('app/about/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)


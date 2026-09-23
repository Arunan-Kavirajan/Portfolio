import re

with open('app/about/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(
    r'const container = \{',
    r'const container: any = {',
    content
)

content = re.sub(
    r'const item = \{',
    r'const item: any = {',
    content
)

with open('app/about/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)


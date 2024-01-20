import os
import shutil
import re

md_src_path = '../export'

md_destination_path = '../../site/content/posts'
media_destination_path = '../../site/static/media'

with open(f'{md_src_path}/to_export.md', 'r', encoding='utf-8') as f:
    s = f.read()

ptitle = re.compile(r'title: "(.*)"')

all_titles = ptitle.findall(s)
if len(all_titles) == 0:
    ptitle = re.compile(r'title: \'(.*)\'')
    all_titles = ptitle.findall(s)
if len(all_titles) == 0:
    ptitle = re.compile(r'title: (.*)')
    all_titles = ptitle.findall(s)

title = all_titles[0]
compact_title = title.replace(' ', '')[:50]

changed = False

if os.path.exists(f'{md_destination_path}/{compact_title}.md'):
    os.remove(f'{md_destination_path}/{compact_title}.md')
    changed = True

if os.path.exists(f'{media_destination_path}/{compact_title}'):
    shutil.rmtree(f'{media_destination_path}/{compact_title}')
    changed = True
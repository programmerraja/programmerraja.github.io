import os

from export_no_git import *

print(f'git add {md_destination_path}/')
os.system(f'git add {md_destination_path}/')
os.system(f'git add {media_destination_path}/')
os.system(f'git commit -m \"added article {compact_title}\"')
os.system(f'git push origin')

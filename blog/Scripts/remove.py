import os

from remove_no_git import *


if changed:
    os.system(f'git add {md_destination_path}/')
    os.system(f'git add {media_destination_path}/')
    os.system(f'git commit -m \"removed article {compact_title}\"')
    os.system(f'git push origin')
else:
    raise Exception('Nothing was changed')
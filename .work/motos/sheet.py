import os
from PIL import Image, ImageDraw
from list import MOTOS
W,H=240,160
for s in range(0,len(MOTOS),6):
    grp=MOTOS[s:s+6]
    sheet=Image.new('RGB',(8*W+150,len(grp)*(H+6)),'white'); d=ImageDraw.Draw(sheet)
    for r,m in enumerate(grp):
        y=r*(H+6); d.text((4,y+60),m[0][:22],fill='black')
        for i in range(8):
            p=f"thumbs/{m[0]}-{i}.jpg"
            if not os.path.exists(p): continue
            try: im=Image.open(p).convert('RGB'); im.thumbnail((W-4,H-4))
            except: continue
            x=150+i*W; sheet.paste(im,(x,y)); d.rectangle((x,y,x+18,y+14),fill='yellow'); d.text((x+4,y+1),str(i),fill='black')
    sheet.save(f"sheet-{s//6}.jpg",quality=80)
print("ok")

import json, os, re, time, urllib.request, io
from PIL import Image
from picks import PICKS
UA={"User-Agent":"AuraFleetBot/1.0 (hellena.main1@gmail.com)"}
f=json.load(open("found.json")); os.makedirs("final",exist_ok=True); meta={}
for mid,idx in PICKS.items():
    for n,i in enumerate(idx,1):
        r=f[mid][i]; out=f"final/{mid}-{n}.jpg"
        meta[f"{mid}-{n}"]=dict(title=r["title"],artist=r["artist"],lic=r["lic"],page=r["page"])
        if os.path.exists(out): continue
        w=min(1280,r["w"]); u=re.sub(r"/400px-",f"/{w}px-",r["thumb"])
        for k in range(5):
            try:
                time.sleep(0.8); data=urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=60).read()
                im=Image.open(io.BytesIO(data)).convert("RGB"); im.thumbnail((1280,1280)); im.save(out,quality=82); break
            except Exception as e:
                err=e; time.sleep(6+6*k)
        else: print("FAIL",out,u,err,flush=True)
json.dump(meta,open("final/meta.json","w"),indent=1)
print("ALLDONE",len(meta),flush=True)

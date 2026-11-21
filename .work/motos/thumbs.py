import json, os, time, urllib.request, concurrent.futures as cf
from list import MOTOS
UA={"User-Agent":"AuraFleetBot/1.0 (hellena.main1@gmail.com)"}
f=json.load(open("found.json")); os.makedirs("thumbs",exist_ok=True)
jobs=[(f"thumbs/{m[0]}-{i}.jpg", r["thumb"]) for m in MOTOS for i,r in enumerate(f.get(m[0],[])[:8])]
def get(j):
    p,u=j
    if os.path.exists(p): return
    err=None
    for k in range(5):
        try:
            time.sleep(0.4); open(p,"wb").write(urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=40).read()); return
        except Exception as e: err=e; time.sleep(6+k*6)
    print("FAIL",p,err,flush=True)
with cf.ThreadPoolExecutor(2) as ex: list(ex.map(get,jobs))
print("ALLDONE",len(jobs),flush=True)

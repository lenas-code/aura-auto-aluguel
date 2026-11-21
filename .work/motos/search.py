import json, re, sys, urllib.request, urllib.parse, time, unicodedata
from list import MOTOS
API="https://commons.wikimedia.org/w/api.php"
UA={"User-Agent":"AuraFleetBot/1.0 (hellena.main1@gmail.com)"}
OK_LIC=re.compile(r"^(cc[- ]by(-sa)?[- ]?[0-9.]*|cc0|public domain|pd.*)$",re.I)
BAD=re.compile(r"engine|motor\b|detail|dashboard|cockpit|instrument|interior|wheel|tank|logo|badge|emblem|\btoys?\b|model kit|scale|crash|wreck|exhaust|headlight|tail ?light|seat|brake|close|nahaufnahme|cluster|speedo|gauge|fork|swingarm|police|polic|race|racing|superbike|championship|track|circuit|\bgp\b|sbk|rider|riding|parade|museum",re.I)
def norm(s):
    s=unicodedata.normalize("NFD",s.lower()); s=re.sub(r"[\u0300-\u036f]","",s)
    return re.sub(r"[^a-z0-9]+"," ",s)
def squash(s): return norm(s).replace(" ","")
def q(params):
    params.update(format="json"); url=API+"?"+urllib.parse.urlencode(params)
    for i in range(5):
        try: return json.load(urllib.request.urlopen(urllib.request.Request(url,headers=UA),timeout=30))
        except Exception as e: time.sleep(3+i*4)
    print("QFAIL",params.get("gsrsearch")); return {}
try: out=json.load(open("found.json"))
except: out={}
only=sys.argv[1:]
for mid,name,tier,query,toks in MOTOS:
    if only and mid not in only: continue
    if not only and mid in out: continue
    res=[]
    for sr in [query, query+" motorcycle"]:
        time.sleep(0.5)
        d=q({"action":"query","generator":"search","gsrsearch":sr+" filetype:bitmap","gsrnamespace":6,"gsrlimit":50,"prop":"imageinfo","iiprop":"url|size|extmetadata","iiurlwidth":400})
        for p in (d.get("query",{}).get("pages",{}) or {}).values():
            ii=(p.get("imageinfo") or [{}])[0]; t=p["title"]
            if any(r["title"]==t for r in res): continue
            md=ii.get("extmetadata",{}); lic=md.get("LicenseShortName",{}).get("value","")
            if not OK_LIC.match(lic.strip()): continue
            w,h=ii.get("width",0),ii.get("height",0)
            if w<900 or w<h*1.1: continue
            if BAD.search(t): continue
            tn=norm(t); ts=squash(t)
            if not all((tk in tn.split()) or (tk in ts) for tk in toks): continue
            art=re.sub("<[^>]+>","",md.get("Artist",{}).get("value","")).strip()
            yr=re.findall(r"(19[89]\d|20[0-2]\d)",t); y=max(map(int,yr)) if yr else 0
            sc=(y-2000)*0.3 if y else 0
            if re.search(r"side|left|right|profile|front|rear|back",t,re.I): sc+=1
            if re.search(r"show|salon|eicma|expo|messe|motorshow",t,re.I): sc-=1.5
            res.append(dict(title=t,thumb=ii.get("thumburl"),w=w,lic=lic,artist=art,page=ii.get("descriptionurl"),score=sc,year=y))
    res.sort(key=lambda r:-r["score"])
    out[mid]=res
    print(mid,len(res),flush=True)
    json.dump(out,open("found.json","w"),indent=1)

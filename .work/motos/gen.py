import json, re, html
from picks import PICKS
meta=json.load(open("final/meta.json"))
# id: (name, tier, category, tagline, description, price_cents, seats, transmission, fuel, features)
S={
"honda-cg-160":("Honda CG Titan","economico","Street urbana","A moto mais vendida do Brasil, valente e econômica.","Robusta, fácil de pilotar e muito econômica. Perfeita para o dia a dia na cidade e entregas.",5900,2,"Manual","Flex",["Freio CBS","Painel digital","Partida elétrica","Baixo consumo"]),
"honda-super-cub-125":("Honda Super Cub C125","economico","Cub urbana","Clássica, charmosa e levinha para a cidade.","Visual retrô, embreagem automática e consumo baixíssimo. Um passeio cheio de estilo.",6900,2,"Semiautomático","Gasolina",["Embreagem automática","Partida sem chave","Painel retrô","Baixo consumo"]),
"yamaha-ybr-125":("Yamaha YBR 125","economico","Street urbana","Simples, confiável e barata de rodar.","Ótima para quem está começando: leve, macia e com manutenção tranquila.",5900,2,"Manual","Gasolina",["Partida elétrica","Freio a disco dianteiro","Bagageiro","Baixo consumo"]),
"honda-pcx-160":("Honda PCX 160","economico","Scooter","Scooter automática, confortável e moderna.","Sem marchas, com porta-objetos sob o banco e muito conforto no trânsito.",7900,2,"Automático","Gasolina",["Câmbio automático (CVT)","Freio ABS","Partida sem chave","Porta-objetos sob o banco"]),
"yamaha-nmax-160":("Yamaha NMax 160","economico","Scooter","Scooter esperta e econômica para a cidade.","Automática, ágil no trânsito e com bom espaço para levar o capacete.",7900,2,"Automático","Gasolina",["Câmbio automático (CVT)","Freio ABS","Painel digital","Porta-objetos sob o banco"]),
"suzuki-burgman-125":("Suzuki Burgman 125","economico","Scooter","Banco largo e conforto para o dia a dia.","Scooter automática com posição relaxada de pilotagem e bom porta-objetos.",7500,2,"Automático","Gasolina",["Câmbio automático (CVT)","Banco largo","Porta-objetos","Para-brisa"]),
"honda-crf-300l":("Honda CRF 300L","intermediario","Trail","Leve e pronta para a terra e a trilha.","Suspensão de curso longo e peso baixo. Encara estrada de chão e trilha sem medo.",13900,2,"Manual","Gasolina",["Suspensão de curso longo","Freio ABS","Pneus de uso misto","Painel digital"]),
"yamaha-tenere-700":("Yamaha Ténéré 700","intermediario","Big trail","Aventura de verdade, no asfalto e na terra.","Motor bicilíndrico forte e ciclística feita para viagens longas e estradas de terra.",24900,2,"Manual","Gasolina",["Motor bicilíndrico 689 cc","Freio ABS","Para-brisa","Protetor de motor"]),
"honda-cb-650r":("Honda CB 650R","intermediario","Naked","Quatro cilindros com visual neo-retrô.","Ronco marcante, motor quatro cilindros e posição confortável para curtir a estrada.",21900,2,"Manual","Gasolina",["Motor 4 cilindros 649 cc","Freio ABS","Controle de tração","Painel digital"]),
"kawasaki-ninja-400":("Kawasaki Ninja 400","intermediario","Esportiva","Visual de superesportiva, fácil de pilotar.","Leve e esperta, ótima para quem quer a primeira esportiva sem sustos.",17900,2,"Manual","Gasolina",["Motor bicilíndrico 399 cc","Freio ABS","Embreagem deslizante","Painel digital"]),
"honda-cb-500f":("Honda CB 500F","intermediario","Naked","Equilíbrio entre conforto, força e economia.","Bicilíndrica versátil, boa na cidade e na estrada, com consumo comportado.",16900,2,"Manual","Gasolina",["Motor bicilíndrico 471 cc","Freio ABS","Painel digital","Embreagem assistida"]),
"bmw-g-310-gs":("BMW G 310 GS","intermediario","Trail","A porta de entrada para o mundo GS.","Posição alta, confortável e pronta para estradas de terra leves.",16900,2,"Manual","Gasolina",["Freio ABS","Suspensão de curso longo","Painel digital","Bagageiro"]),
"yamaha-mt-07":("Yamaha MT-07","intermediario","Naked","Torque de sobra e muita diversão.","Motor bicilíndrico cheio de força em baixa e chassi leve. Diversão garantida.",21900,2,"Manual","Gasolina",["Motor bicilíndrico 689 cc","Freio ABS","Painel digital","Iluminação full LED"]),
"honda-nc-750x":("Honda NC 750X","intermediario","Crossover","Confortável e com porta-capacete no lugar do tanque.","Motor econômico, posição relaxada e espaço para um capacete onde ficaria o tanque.",19900,2,"Manual","Gasolina",["Porta-capacete integrado","Freio ABS","Controle de tração","Para-brisa"]),
"kawasaki-z650":("Kawasaki Z650","intermediario","Naked","Naked leve, ágil e com visual agressivo.","Bicilíndrica fácil de pilotar, ótima para a cidade e para passeios de fim de semana.",18900,2,"Manual","Gasolina",["Motor bicilíndrico 649 cc","Freio ABS","Embreagem deslizante","Painel TFT"]),
"triumph-tiger-900":("Triumph Tiger 900","intermediario","Big trail","Três cilindros para viajar longe.","Motor tricilíndrico suave, conforto de viagem e modos de pilotagem para cada terreno.",27900,2,"Manual","Gasolina",["Motor tricilíndrico 888 cc","Freio ABS em curva","Modos de pilotagem","Malas laterais"]),
"yamaha-yzf-r1":("Yamaha YZF-R1","esportivo","Superesportiva","Tecnologia de pista para quem sabe pilotar.","Quase 200 cv, eletrônica de MotoGP e visual de corrida. Emoção do começo ao fim.",54900,2,"Manual","Gasolina",["Motor 998 cc crossplane","Controle de tração","Quickshifter","Modos de pilotagem"]),
"kawasaki-ninja-zx-10r":("Kawasaki Ninja ZX-10R","esportivo","Superesportiva","A campeã das pistas, na rua.","Superesportiva de mil cilindradas com eletrônica completa e o verde clássico da Kawasaki.",52900,2,"Manual","Gasolina",["Motor 998 cc","Controle de tração","Quickshifter","Freio ABS em curva"]),
"honda-cbr-1000rr":("Honda CBR 1000RR Fireblade","esportivo","Superesportiva","Fireblade: precisão e potência de sobra.","Lenda das superesportivas, com motor de quatro cilindros e acerto refinado.",54900,2,"Manual","Gasolina",["Motor 4 cilindros 999 cc","Controle de tração","Quickshifter","Modos de pilotagem"]),
"ducati-panigale-v4":("Ducati Panigale V4","esportivo","Superesportiva","Paixão italiana com motor V4.","Design italiano, motor V4 derivado das pistas e um ronco inesquecível.",59000,2,"Manual","Gasolina",["Motor V4 1.103 cc","Controle de tração","Quickshifter","Freio ABS em curva"]),
"bmw-s-1000-rr":("BMW S 1000 RR","esportivo","Superesportiva","Superesportiva alemã cheia de tecnologia.","Motor de quatro cilindros, eletrônica de ponta e acabamento impecável.",56900,2,"Manual","Gasolina",["Motor 4 cilindros 999 cc","Controle de tração","Quickshifter","Modos de pilotagem"]),
"harley-davidson-fat-boy":("Harley-Davidson Fat Boy","esportivo","Custom","O ícone custom para rodar com estilo.","Motor V2 de muito torque, rodas sólidas e presença de sobra em qualquer lugar.",44900,2,"Manual","Gasolina",["Motor V2 Milwaukee-Eight","Freio ABS","Rodas sólidas","Banco baixo"]),
"bmw-r-1250-gs":("BMW R 1250 GS","esportivo","Big trail","A rainha das viagens de moto.","Motor boxer, conforto de primeira e tecnologia para cruzar o país com tranquilidade.",49900,2,"Manual","Gasolina",["Motor boxer 1.254 cc","Freio ABS em curva","Modos de pilotagem","Malas laterais"]),
"kawasaki-z900":("Kawasaki Z900RS","esportivo","Naked retrô","Visual clássico com motor moderno.","Estilo dos anos 70 com motor de quatro cilindros atual. Charme e força na mesma moto.",36900,2,"Manual","Gasolina",["Motor 4 cilindros 948 cc","Freio ABS","Controle de tração","Painel analógico"]),
"triumph-street-triple":("Triumph Street Triple","esportivo","Naked","Três cilindros, ágil e cheia de personalidade.","Leve, rápida nas curvas e com o ronco característico do motor tricilíndrico.",34900,2,"Manual","Gasolina",["Motor tricilíndrico 765 cc","Freio ABS","Quickshifter","Modos de pilotagem"]),
"ducati-monster":("Ducati Monster","esportivo","Naked","A naked italiana que virou lenda.","Estilo inconfundível, motor bicilíndrico Ducati e pilotagem divertida.",32900,2,"Manual","Gasolina",["Motor bicilíndrico Testastretta","Freio ABS","Controle de tração","Painel digital"]),
}
assert set(S)==set(PICKS), set(S)^set(PICKS)
def clean(a):
    a=html.unescape(a); a=re.sub(r"\s+"," ",a).strip()
    a=re.sub(r"^(Own work|Photo by|by)\s*","",a,flags=re.I)
    return a[:60] or "Wikimedia Commons"
def view(t):
    t=t.lower()
    if re.search(r"rear|back|heck|hinten|arri",t): return "vista de trás"
    if re.search(r"front|vorn|avant",t): return "vista de frente"
    if re.search(r"side|left|right|profile|seite",t): return "vista lateral"
    return "outro ângulo"
def js(s): return json.dumps(s,ensure_ascii=False)
out=['// Motorcycles: real models with free-licensed Wikimedia Commons photos (credits required by the licenses).',
'import type { Car, CarPhoto } from "./cars";','',
'const fleetPhotos = import.meta.glob<{ url: string }>("../assets/fleet/*.asset.json", { eager: true, import: "default" });','',
'function photo(file: string, alt: string, author: string, license: string, url: string): CarPhoto {',
'  const src = fleetPhotos[`../assets/fleet/${file}.jpg.asset.json`]?.url ?? "";',
'  return { src, alt, credit: { author, license, url } };','}','',
'export const motos: Car[] = [']
for mid in PICKS:
    n,tier,cat,tag,desc,price,seats,tr,fuel,feat=S[mid]
    out+=['  {',f'    id: {js(mid)},','    kind: "moto",',f'    name: {js(n)},',f'    tier: {js(tier)},',f'    category: {js(cat)},',f'    tagline: {js(tag)},',f'    description: {js(desc)},',f'    dailyPriceCents: {price},',f'    seats: {seats},',f'    transmission: {js(tr)},',f'    fuel: {js(fuel)},',f'    features: {js(feat)},','    photos: [']
    for k in (1,2,3):
        m=meta[f"{mid}-{k}"]; page=m["page"]
        out.append(f'      photo({js(f"{mid}-{k}")}, {js(n+", "+view(m["title"]))}, {js(clean(m["artist"]))}, {js(m["lic"])}, {js(page)}),')
    out+=['    ],','  },']
out+=['];','']
open("/dev-server/src/data/motos.ts","w").write("\n".join(out))
print("ok")

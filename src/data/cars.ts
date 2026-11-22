import mobi1 from "@/assets/fleet/mobi-1.jpg.asset.json";
import mobi2 from "@/assets/fleet/mobi-2.jpg.asset.json";
import mobi3 from "@/assets/fleet/mobi-3.jpg.asset.json";
import kwid1 from "@/assets/fleet/kwid-1.jpg.asset.json";
import kwid2 from "@/assets/fleet/kwid-2.jpg.asset.json";
import kwid3 from "@/assets/fleet/kwid-3.jpg.asset.json";
import onix1 from "@/assets/fleet/onix-1.jpg.asset.json";
import onix2 from "@/assets/fleet/onix-2.jpg.asset.json";
import onix3 from "@/assets/fleet/onix-3.jpg.asset.json";
import tcross1 from "@/assets/fleet/tcross-1.jpg.asset.json";
import tcross2 from "@/assets/fleet/tcross-2.jpg.asset.json";
import tcross3 from "@/assets/fleet/tcross-3.jpg.asset.json";
import corolla1 from "@/assets/fleet/corolla-1.jpg.asset.json";
import corolla2 from "@/assets/fleet/corolla-2.jpg.asset.json";
import corolla3 from "@/assets/fleet/corolla-3.jpg.asset.json";
import compass1 from "@/assets/fleet/compass-1.jpg.asset.json";
import compass2 from "@/assets/fleet/compass-2.jpg.asset.json";
import compass3 from "@/assets/fleet/compass-3.jpg.asset.json";
import camaro1 from "@/assets/fleet/camaro-1.jpg.asset.json";
import camaro2 from "@/assets/fleet/camaro-2.jpg.asset.json";
import camaro3 from "@/assets/fleet/camaro-3.jpg.asset.json";
import mustang1 from "@/assets/fleet/mustang-1.jpg.asset.json";
import mustang2 from "@/assets/fleet/mustang-2.jpg.asset.json";
import mustang3 from "@/assets/fleet/mustang-3.jpg.asset.json";
import porsche1 from "@/assets/fleet/porsche-1.jpg.asset.json";
import porsche2 from "@/assets/fleet/porsche-2.jpg.asset.json";
import porsche3 from "@/assets/fleet/porsche-3.jpg.asset.json";

import { extraCars } from "./cars-extra";
import { extraCars2 } from "./cars-extra2";
import { motos as motoList } from "./motos";

export type PhotoCredit = { author: string; license: string; url: string };
export type CarPhoto = { src: string; alt: string; credit: PhotoCredit };

export type CarTier = "economico" | "intermediario" | "esportivo";

export const tiers: { id: CarTier; label: string; description: string }[] = [
  { id: "economico", label: "Econômicos", description: "Diária baixa e pouco gasto com combustível." },
  { id: "intermediario", label: "Intermediários", description: "Mais espaço e conforto para viajar." },
  { id: "esportivo", label: "Esportivos", description: "Potência e emoção para ocasiões especiais." },
];

export type Car = {
  id: string;
  /** Present only on motorcycles; cars leave it out. */
  kind?: "moto";
  name: string;
  tier: CarTier;
  category: string;
  tagline: string;
  description: string;
  dailyPriceCents: number;
  seats: number;
  transmission: "Manual" | "Automático" | "Semiautomático";
  fuel: string;
  features: string[];
  photos: [CarPhoto, CarPhoto, CarPhoto];
};

const baseCars: Car[] = [
  {
    id: "fiat-mobi",
    name: "Fiat Mobi Trekking",
    tier: "economico",
    category: "Hatch compacto",
    tagline: "Pequeno por fora, esperto na cidade e econômico no posto.",
    description:
      "Fácil de estacionar e muito econômico. Ótimo para resolver a vida na cidade ou fazer viagens curtas gastando pouco.",
    dailyPriceCents: 11900,
    seats: 5,
    transmission: "Manual",
    fuel: "Flex",
    features: ["Ar-condicionado", "Direção elétrica", "Central multimídia", "Rack de teto"],
    photos: [
      { src: mobi1.url, alt: "Fiat Mobi vermelho, vista de frente", credit: { author: "NaBUru38", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Fiat_Mobi_Trekking_1.0_2021_in_Montevideo_(front).jpg" } },
      { src: mobi2.url, alt: "Fiat Mobi vermelho, vista de trás", credit: { author: "NaBUru38", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Fiat_Mobi_Trekking_1.0_2021_in_Montevideo_(back).jpg" } },
      { src: mobi3.url, alt: "Fiat Mobi vermelho, outro ângulo", credit: { author: "RL GNZLZ", license: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Fiat_Mobi_1.0_Like_2021.jpg" } },
    ],
  },
  {
    id: "renault-kwid",
    name: "Renault Kwid",
    tier: "economico",
    category: "Hatch compacto",
    tagline: "Visual de aventureiro e diária que cabe no bolso.",
    description:
      "Mais alto que os compactos comuns, encara bem rua de paralelepípedo e estradinha de terra sem gastar muito combustível.",
    dailyPriceCents: 12900,
    seats: 5,
    transmission: "Manual",
    fuel: "Flex",
    features: ["Ar-condicionado", "Altura elevada do solo", "Central multimídia", "Câmera de ré"],
    photos: [
      { src: kwid1.url, alt: "Renault Kwid, vista de frente", credit: { author: "Autosdeprimera", license: "CC BY 3.0", url: "https://commons.wikimedia.org/wiki/File:2023_Renault_Kwid_Iconic_(Colombia)_front_view_02.png" } },
      { src: kwid2.url, alt: "Renault Kwid, vista de trás", credit: { author: "Autosdeprimera", license: "CC BY 3.0", url: "https://commons.wikimedia.org/wiki/File:2023_Renault_Kwid_Iconic_(Colombia)_rear_view.png" } },
      { src: kwid3.url, alt: "Renault Kwid, outro ângulo", credit: { author: "BugWarp", license: "CC BY 4.0", url: "https://commons.wikimedia.org/wiki/File:Empalme_San_Carlos_Wikimania_2022-_BugWarp_29.jpg" } },
    ],
  },
  {
    id: "chevrolet-onix-plus",
    name: "Chevrolet Onix Plus",
    tier: "economico",
    category: "Sedã compacto",
    tagline: "Porta-malas grande e câmbio automático pelo preço de um popular.",
    description:
      "O sedã mais vendido do Brasil: confortável, econômico com motor turbo e com espaço de sobra para a bagagem da família.",
    dailyPriceCents: 15900,
    seats: 5,
    transmission: "Automático",
    fuel: "Flex",
    features: ["Motor 1.0 turbo", "Porta-malas de 470 litros", "Wi-Fi a bordo", "Ar-condicionado"],
    photos: [
      { src: onix1.url, alt: "Chevrolet Onix Plus, vista de frente", credit: { author: "Autosdeprimera", license: "CC BY 3.0", url: "https://commons.wikimedia.org/wiki/File:2021_Chevrolet_Onix_Sedan_1.0_Premier_Turbo_(Colombia)_front_view.png" } },
      { src: onix2.url, alt: "Chevrolet Onix Plus, vista de trás", credit: { author: "Autosdeprimera", license: "CC BY 3.0", url: "https://commons.wikimedia.org/wiki/File:2021_Chevrolet_Onix_Sedan_1.0_Premier_Turbo_(Colombia)_rear_view.png" } },
      { src: onix3.url, alt: "Chevrolet Onix Plus, outro ângulo", credit: { author: "Jengtingchen", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Chevrolet_Onix_010.jpg" } },
    ],
  },
  {
    id: "volkswagen-t-cross",
    name: "Volkswagen T-Cross",
    tier: "intermediario",
    category: "SUV compacto",
    tagline: "Posição alta de dirigir e conforto para a estrada.",
    description:
      "SUV compacto com motor turbo, câmbio automático e bom espaço interno. Equilíbrio certo entre cidade e viagem.",
    dailyPriceCents: 22900,
    seats: 5,
    transmission: "Automático",
    fuel: "Flex",
    features: ["Motor 200 TSI turbo", "Painel digital", "Piloto automático", "Sensor de estacionamento"],
    photos: [
      { src: tcross1.url, alt: "Volkswagen T-Cross branco, vista de frente", credit: { author: "Calreyn88", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:2019_Volkswagen_T-Cross_R-Line_TDi.jpg" } },
      { src: tcross2.url, alt: "Volkswagen T-Cross branco, vista de trás", credit: { author: "Calreyn88", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:2019_Volkswagen_T-Cross_R-Line_TDi_4.jpg" } },
      { src: tcross3.url, alt: "Interior do Volkswagen T-Cross", credit: { author: "Vauxford", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:2019_Volkswagen_T-Cross_R-Line_1.0_Interior.jpg" } },
    ],
  },
  {
    id: "toyota-corolla",
    name: "Toyota Corolla",
    tier: "intermediario",
    category: "Sedã médio",
    tagline: "Silencioso, macio e confiável para quilômetros de estrada.",
    description:
      "Referência em conforto e durabilidade. Ideal para viagens longas, reuniões de trabalho ou para quem quer rodar tranquilo.",
    dailyPriceCents: 25900,
    seats: 5,
    transmission: "Automático",
    fuel: "Flex",
    features: ["Motor 2.0", "Bancos em couro", "Controle de cruzeiro adaptativo", "Ar digital"],
    photos: [
      { src: corolla1.url, alt: "Toyota Corolla prata, vista de frente", credit: { author: "LuvsMG481", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:2020_Toyota_Corolla_Altis_petrol_version_front.jpg" } },
      { src: corolla2.url, alt: "Toyota Corolla prata, vista de trás", credit: { author: "LuvsMG481", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:2020_Toyota_Corolla_Altis_petrol_version_rear.jpg" } },
      { src: corolla3.url, alt: "Toyota Corolla prata, outro ângulo", credit: { author: "Autosdeprimera", license: "CC BY 3.0", url: "https://commons.wikimedia.org/wiki/File:2020_Toyota_Corolla_Hybrid_SEG_(Colombia)_front_view.png" } },
    ],
  },
  {
    id: "jeep-compass",
    name: "Jeep Compass",
    tier: "intermediario",
    category: "SUV médio",
    tagline: "Robustez de Jeep com acabamento caprichado.",
    description:
      "SUV médio espaçoso, firme em qualquer piso e cheio de tecnologia. Perfeito para a família descer para a serra ou para o litoral.",
    dailyPriceCents: 29900,
    seats: 5,
    transmission: "Automático",
    fuel: "Flex",
    features: ["Motor 1.3 turbo", "Teto solar", "Central multimídia de 10 polegadas", "Assistente de faixa"],
    photos: [
      { src: compass1.url, alt: "Jeep Compass prata, vista de frente", credit: { author: "Alexander Migl", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Jeep_Compass_(MP)_PHEV_Facelift_1X7A0140.jpg" } },
      { src: compass2.url, alt: "Jeep Compass prata, vista de trás", credit: { author: "Alexander Migl", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Jeep_Compass_(MP)_PHEV_Facelift_1X7A0139.jpg" } },
      { src: compass3.url, alt: "Interior do Jeep Compass", credit: { author: "deathpallie325", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:2022_Jeep_Compass_interior.jpg" } },
    ],
  },
  {
    id: "chevrolet-camaro-ss",
    name: "Chevrolet Camaro SS",
    tier: "esportivo",
    category: "Esportivo cupê",
    tagline: "Um V8 americano para fazer a viagem virar história.",
    description:
      "Ronco grave, aceleração forte e presença que vira cabeças. Para um fim de semana especial, um casamento ou um presente inesquecível.",
    dailyPriceCents: 119000,
    seats: 4,
    transmission: "Automático",
    fuel: "Gasolina",
    features: ["Motor 6.2 V8 de 461 cv", "Escapamento esportivo", "Bancos esportivos", "Head-up display"],
    photos: [
      { src: camaro1.url, alt: "Chevrolet Camaro SS prata, vista de frente", credit: { author: "Kevauto", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:2019_Chevrolet_Camaro_2SS,_front_11.9.19.jpg" } },
      { src: camaro2.url, alt: "Chevrolet Camaro SS prata, vista de trás", credit: { author: "Kevauto", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:2019_Chevrolet_Camaro_2SS,_rear_11.9.19.jpg" } },
      { src: camaro3.url, alt: "Chevrolet Camaro SS prata, outro ângulo", credit: { author: "Kevauto", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:2019_Chevrolet_Camaro_2SS_6.2L_front_3.16.19.jpg" } },
    ],
  },
  {
    id: "ford-mustang-gt",
    name: "Ford Mustang GT",
    tier: "esportivo",
    category: "Esportivo cupê",
    tagline: "O cavalo mais famoso das estradas, agora na sua garagem.",
    description:
      "Ícone dos esportivos, com V8 de 5.0 litros e acabamento premium. Escolha o modo de condução e aproveite cada curva.",
    dailyPriceCents: 129000,
    seats: 4,
    transmission: "Automático",
    fuel: "Gasolina",
    features: ["Motor 5.0 V8 de 483 cv", "Painel digital configurável", "Modos de condução", "Bancos com ventilação"],
    photos: [
      { src: mustang1.url, alt: "Ford Mustang GT azul, vista de frente", credit: { author: "Vauxford", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:2018_Ford_Mustang_GT_V8_5.0_facelift.jpg" } },
      { src: mustang2.url, alt: "Ford Mustang GT azul, vista de trás", credit: { author: "Vauxford", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:2018_Ford_Mustang_GT_V8_5.0_facelift_Rear_(1).jpg" } },
      { src: mustang3.url, alt: "Interior do Ford Mustang GT", credit: { author: "Vauxford", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:2018_Ford_Mustang_GT_V8_5.0_facelift_Interior.jpg" } },
    ],
  },
  {
    id: "porsche-911-carrera",
    name: "Porsche 911 Carrera",
    tier: "esportivo",
    category: "Esportivo de luxo",
    tagline: "Precisão alemã para quem quer o melhor da estrada.",
    description:
      "Lenda das pistas e das estradas, com motor boxer turbo e câmbio PDK. Dirigibilidade afiada e conforto para o dia a dia.",
    dailyPriceCents: 249000,
    seats: 4,
    transmission: "Automático",
    fuel: "Gasolina",
    features: ["Motor boxer 3.0 biturbo", "Câmbio PDK de 8 marchas", "Escapamento esportivo", "Modo Sport Chrono"],
    photos: [
      { src: porsche1.url, alt: "Porsche 911 Carrera azul, vista de frente", credit: { author: "Calreyn88", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:2022_Porsche_911_992_Carrera_GTS.jpg" } },
      { src: porsche2.url, alt: "Porsche 911 Carrera azul, vista de trás", credit: { author: "Dinkun Chen", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:PORSCHE_911_(992)_China_(12).jpg" } },
      { src: porsche3.url, alt: "Porsche 911 Carrera azul, outro ângulo", credit: { author: "Dinkun Chen", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:PORSCHE_911_(992)_China_(13).jpg" } },
    ],
  },
];

// Whole fleet, cheapest first inside each tier listing.
export const cars: Car[] = [...baseCars, ...extraCars, ...extraCars2].sort((a, b) => a.dailyPriceCents - b.dailyPriceCents);

// Motorcycles, cheapest first. Same tiers as cars, with their own labels.
export const motos: Car[] = [...motoList].sort((a, b) => a.dailyPriceCents - b.dailyPriceCents);

export const motoTiers: { id: CarTier; label: string; description: string }[] = [
  { id: "economico", label: "Urbanas", description: "Scooters e motos leves para o dia a dia." },
  { id: "intermediario", label: "Médias e aventura", description: "Naked, trail e big trail para viajar." },
  { id: "esportivo", label: "Esportivas e premium", description: "Superesportivas, custom e grandes viajantes." },
];

// Every vehicle the shop rents: reservations point at either kind by id.
export const vehicles: Car[] = [...cars, ...motos];

export function isMoto(vehicle: Car): boolean {
  return vehicle.kind === "moto";
}

export function getCar(id: string): Car | undefined {
  return vehicles.find((c) => c.id === id);
}

export function tierLabel(tier: CarTier): string {
  return tiers.find((t) => t.id === tier)?.label ?? tier;
}

/** Tier name in the right vocabulary for the vehicle ("Econômicos" for cars, "Urbanas" for motos). */
export function tierLabelFor(vehicle: Car): string {
  const list = isMoto(vehicle) ? motoTiers : tiers;
  return list.find((t) => t.id === vehicle.tier)?.label ?? vehicle.tier;
}

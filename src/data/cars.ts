import picape1 from "@/assets/cars/picape-1.jpg";
import picape2 from "@/assets/cars/picape-2.jpg";
import picape3 from "@/assets/cars/picape-3.jpg";
import jipe1 from "@/assets/cars/jipe-1.jpg";
import jipe2 from "@/assets/cars/jipe-2.jpg";
import jipe3 from "@/assets/cars/jipe-3.jpg";
import suv1 from "@/assets/cars/suv-1.jpg";
import suv2 from "@/assets/cars/suv-2.jpg";
import suv3 from "@/assets/cars/suv-3.jpg";
import seda1 from "@/assets/cars/seda-1.jpg";
import seda2 from "@/assets/cars/seda-2.jpg";
import seda3 from "@/assets/cars/seda-3.jpg";
import hatch1 from "@/assets/cars/hatch-1.jpg";
import hatch2 from "@/assets/cars/hatch-2.jpg";
import hatch3 from "@/assets/cars/hatch-3.jpg";

export type CarPhoto = { src: string; alt: string };

export type Car = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  dailyPriceCents: number;
  seats: number;
  transmission: "Manual" | "Automático";
  fuel: string;
  features: string[];
  photos: [CarPhoto, CarPhoto, CarPhoto];
};

export const cars: Car[] = [
  {
    id: "picape-serra-4x4",
    name: "Picape Serra 4x4",
    category: "Picape",
    tagline: "Força para estrada de terra e caçamba para a bagagem toda.",
    description:
      "Cabine dupla, tração 4x4 e bancos de couro. Ideal para fazenda, pescaria e viagens em que o asfalto acaba no meio do caminho.",
    dailyPriceCents: 38900,
    seats: 5,
    transmission: "Automático",
    fuel: "Diesel",
    features: ["Tração 4x4", "Caçamba com capota", "Bancos de couro", "Ar-condicionado"],
    photos: [
      { src: picape1, alt: "Picape Serra 4x4 verde em estrada de terra ao pôr do sol" },
      { src: picape2, alt: "Interior da Picape Serra com bancos de couro marrom" },
      { src: picape3, alt: "Traseira da Picape Serra ao lado de um celeiro de madeira" },
    ],
  },
  {
    id: "jipe-trilheiro",
    name: "Jipe Trilheiro",
    category: "Off-road",
    tagline: "Capota aberta, lama no pneu e vento no rosto.",
    description:
      "Clássico, robusto e simples de dirigir em trilha. Para quem quer chegar onde o mapa não mostra.",
    dailyPriceCents: 29900,
    seats: 4,
    transmission: "Manual",
    fuel: "Gasolina",
    features: ["Tração 4x4", "Capota removível", "Pneus para trilha", "Estepe externo"],
    photos: [
      { src: jipe1, alt: "Jipe Trilheiro bege em trilha de lama na floresta" },
      { src: jipe2, alt: "Painel clássico do Jipe Trilheiro com vista da trilha" },
      { src: jipe3, alt: "Jipe Trilheiro de lado diante das montanhas ao entardecer" },
    ],
  },
  {
    id: "suv-cafezal",
    name: "SUV Cafezal",
    category: "SUV",
    tagline: "Espaço e conforto para a família subir a serra.",
    description:
      "Porta-malas generoso, acabamento em madeira e couro caramelo. Confortável na cidade e firme na estrada de cascalho.",
    dailyPriceCents: 27900,
    seats: 5,
    transmission: "Automático",
    fuel: "Flex",
    features: ["Central multimídia", "Câmera de ré", "Porta-malas amplo", "Ar-condicionado"],
    photos: [
      { src: suv1, alt: "SUV Cafezal cor terracota entre plantações de café" },
      { src: suv2, alt: "Interior do SUV Cafezal com couro caramelo e painel de madeira" },
      { src: suv3, alt: "SUV Cafezal estacionado diante de uma pousada de pedra" },
    ],
  },
  {
    id: "seda-estrada-real",
    name: "Sedã Estrada Real",
    category: "Sedã",
    tagline: "Elegância para viagens longas e compromissos.",
    description:
      "Silencioso, econômico na rodovia e com bancos de couro conhaque. Perfeito para casamentos no campo e viagens a trabalho.",
    dailyPriceCents: 21900,
    seats: 5,
    transmission: "Automático",
    fuel: "Flex",
    features: ["Bancos de couro", "Piloto automático", "Sensor de estacionamento", "Ar-condicionado"],
    photos: [
      { src: seda1, alt: "Sedã Estrada Real vinho em alameda de árvores no outono" },
      { src: seda2, alt: "Interior do Sedã Estrada Real com couro conhaque" },
      { src: seda3, alt: "Sedã Estrada Real de lado em frente a uma casa colonial" },
    ],
  },
  {
    id: "hatch-vila",
    name: "Hatch Vila",
    category: "Compacto",
    tagline: "Leve, econômico e fácil de estacionar.",
    description:
      "O companheiro certo para circular pela cidade e pelas vilas históricas, gastando pouco combustível.",
    dailyPriceCents: 13900,
    seats: 5,
    transmission: "Manual",
    fuel: "Flex",
    features: ["Econômico", "Direção elétrica", "Rádio com Bluetooth", "Ar-condicionado"],
    photos: [
      { src: hatch1, alt: "Hatch Vila creme em rua de paralelepípedo" },
      { src: hatch2, alt: "Interior simples e claro do Hatch Vila" },
      { src: hatch3, alt: "Traseira do Hatch Vila diante de um café rústico" },
    ],
  },
];

export function getCar(id: string): Car | undefined {
  return cars.find((car) => car.id === id);
}

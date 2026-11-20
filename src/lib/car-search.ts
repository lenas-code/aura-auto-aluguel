import { tierLabel, type Car } from "@/data/cars";

// Brands whose name is two words: the first word alone is not the brand.
const TWO_WORD_BRANDS = ["Aston Martin", "Caoa Chery", "Land Rover", "Mercedes-Benz", "Alfa Romeo"];

// Query words the user types -> text we look for inside a car.
// "sedã" becomes "seda" once accents are stripped, so "sedan" has to be mapped to it.
const QUERY_SYNONYMS: Record<string, string> = {
  sedan: "seda",
  sedans: "seda",
  picape: "picape",
  picapes: "picape",
  pickup: "picape",
  pickups: "picape",
  camionete: "picape",
  suv: "suv",
  suvs: "suv",
  jipe: "jipe",
  jipes: "jipe",
  hatch: "hatch",
  hatches: "hatch",
  hatchback: "hatch",
  hatchbacks: "hatch",
  coupe: "cupe",
  coupes: "cupe",
  conversivel: "conversivel",
  conversiveis: "conversivel",
  minivan: "minivan",
  minivans: "minivan",
  monovolume: "monovolume",
  furgao: "furgao",
  furgoes: "furgao",
  eletrico: "eletrico",
  eletricos: "eletrico",
  hibrido: "hibrido",
  hibridos: "hibrido",
  esportivo: "esportiv",
  esportivos: "esportiv",
  sport: "esportiv",
  sports: "esportiv",
  luxo: "luxo",
};

export function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function brandOf(car: Car): string {
  const twoWord = TWO_WORD_BRANDS.find((brand) => car.name.startsWith(brand));
  if (twoWord) return twoWord;
  return car.name.split(" ")[0] ?? car.name;
}

export function queryTokens(query: string): string[] {
  const tokens = normalize(query)
    .split(" ")
    .filter((token) => token.length > 0)
    .map((token) => QUERY_SYNONYMS[token] ?? token);
  return Array.from(new Set(tokens));
}

// Only facts that identify the car: marketing prose says things like
// "SUV" about a pickup, which would make a type search return the wrong cars.
function haystackOf(car: Car): string {
  return normalize(
    [
      car.name,
      brandOf(car),
      car.category,
      tierLabel(car.tier),
      car.features.join(" "),
      car.fuel,
      car.transmission,
    ].join(" "),
  );
}

export function searchCars(cars: Car[], query: string): Car[] {
  const tokens = queryTokens(query);
  if (tokens.length === 0) return cars;
  return cars.filter((car) => {
    const haystack = haystackOf(car);
    return tokens.every((token) => haystack.includes(token));
  });
}

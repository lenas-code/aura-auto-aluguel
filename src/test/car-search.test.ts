import { describe, expect, it } from "vitest";
import { cars, motos } from "@/data/cars";
import { brandOf, queryTokens, searchCars } from "@/lib/car-search";

const ids = (list: ReturnType<typeof searchCars>) => list.map((c) => c.id);

describe("pesquisa da frota", () => {
  it("pesquisa por marca: fiat só traz Fiat", () => {
    const result = searchCars(cars, "fiat");
    expect(result.length).toBeGreaterThan(0);
    for (const car of result) expect(brandOf(car)).toBe("Fiat");
    expect(ids(result)).toContain("fiat-mobi");
  });

  it("pesquisa pelo nome do carro", () => {
    expect(ids(searchCars(cars, "mobi"))).toContain("fiat-mobi");
    expect(ids(searchCars(cars, "porsche 911"))).toContain("porsche-911-carrera");
  });

  it("pesquisa por tipo: sedan encontra os sedãs (com acento)", () => {
    const result = searchCars(cars, "sedan");
    expect(result.length).toBeGreaterThan(0);
    for (const car of result) expect(car.category).toMatch(/Sed/);
  });

  it("pesquisa por tipo: suv, picape e hatch", () => {
    for (const [term, pattern] of [
      ["suv", /SUV/],
      ["picape", /Picape/],
      ["hatch", /Hatch/],
    ] as const) {
      const result = searchCars(cars, term);
      expect(result.length, term).toBeGreaterThan(0);
      for (const car of result) expect(car.category, `${term}: ${car.name}`).toMatch(pattern);
    }
  });

  it("marca + tipo juntos", () => {
    const result = searchCars(cars, "toyota suv");
    expect(result.length).toBeGreaterThan(0);
    for (const car of result) {
      expect(brandOf(car)).toBe("Toyota");
      expect(car.category).toMatch(/SUV/);
    }
  });

  it("acecento e maiúsculas não importam", () => {
    expect(ids(searchCars(cars, "  SEDÃ  "))).toEqual(ids(searchCars(cars, "sedan")));
  });

  it("nada encontrado não devolve carros", () => {
    expect(searchCars(cars, "zzzzz")).toEqual([]);
    expect(searchCars(cars, "fiat zzzzz")).toEqual([]);
  });

  it("pesquisa vazia devolve a frota inteira", () => {
    expect(searchCars(cars, "")).toHaveLength(cars.length);
    expect(searchCars(cars, "   ")).toHaveLength(cars.length);
  });

  it("marca de duas palavras é reconhecida", () => {
    const aston = cars.find((c) => c.name.startsWith("Aston"));
    expect(aston).toBeDefined();
    expect(brandOf(aston!)).toBe("Aston Martin");
    expect(ids(searchCars(cars, "aston martin"))).toContain(aston!.id);
  });

  it("sinônimos viram uma busca só", () => {
    expect(queryTokens("sedan")).toEqual(["seda"]);
    expect(queryTokens("pickup")).toEqual(["picape"]);
  });
});

describe("pesquisa de motos", () => {
  it("acha moto por marca, nome e estilo", () => {
    expect(searchCars(motos, "ducati").every((m) => m.name.startsWith("Ducati"))).toBe(true);
    expect(searchCars(motos, "pcx").map((m) => m.id)).toContain("honda-pcx-160");
    const scooters = searchCars(motos, "scooter");
    expect(scooters.length).toBeGreaterThan(0);
    expect(scooters.every((m) => /Scooter/.test(m.category))).toBe(true);
  });

  it("'moto' e 'motos' encontram só motos", () => {
    const all = [...cars, ...motos];
    expect(searchCars(all, "motos").every((v) => v.kind === "moto")).toBe(true);
    expect(searchCars(all, "moto").length).toBe(motos.length);
  });
});

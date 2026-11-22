import { describe, expect, it } from "vitest";
import { cars, getCar, motos, motoTiers, tiers, vehicles } from "@/data/cars";

describe("frota", () => {
  it("cada carro tem exatamente 3 fotos, todas com imagem e crédito", () => {
    for (const car of cars) {
      expect(car.photos, car.id).toHaveLength(3);
      for (const p of car.photos) {
        expect(p.src, car.id).not.toBe("");
        expect(p.credit.author, car.id).not.toBe("");
      }
    }
  });

  it("tem os carros nas três faixas, sem ids repetidos", () => {
    expect(new Set(cars.map((c) => c.id)).size).toBe(cars.length);
    for (const t of tiers) expect(cars.some((c) => c.tier === t.id)).toBe(true);
    expect(cars.length).toBeGreaterThanOrEqual(140);
  });
});

describe("motos", () => {
  it("cada moto tem exatamente 3 fotos, todas com imagem e crédito", () => {
    for (const moto of motos) {
      expect(moto.kind, moto.id).toBe("moto");
      expect(moto.photos, moto.id).toHaveLength(3);
      for (const p of moto.photos) {
        expect(p.src, moto.id).not.toBe("");
        expect(p.credit.author, moto.id).not.toBe("");
      }
    }
  });

  it("tem motos nas três faixas e nenhum id repete com os carros", () => {
    for (const t of motoTiers) expect(motos.some((m) => m.tier === t.id)).toBe(true);
    expect(new Set(vehicles.map((v) => v.id)).size).toBe(vehicles.length);
    expect(motos.length).toBeGreaterThanOrEqual(20);
  });

  it("a página de carros não mostra motos, e uma moto abre pela mesma busca de veículo", () => {
    expect(cars.some((c) => c.kind === "moto")).toBe(false);
    expect(getCar("honda-pcx-160")?.kind).toBe("moto");
  });
});

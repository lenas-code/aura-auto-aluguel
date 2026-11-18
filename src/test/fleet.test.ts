import { describe, expect, it } from "vitest";
import { cars, tiers } from "@/data/cars";

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
    expect(cars.length).toBeGreaterThanOrEqual(59);
  });
});

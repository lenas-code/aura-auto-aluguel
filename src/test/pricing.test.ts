import { describe, expect, it } from "vitest";
import { checkRental, countRentalDays, rentalTotalCents } from "@/lib/pricing";

describe("aluguel: diárias e total", () => {
  it("conta uma diária por dia entre retirada e devolução", () => {
    expect(countRentalDays("2026-12-01", "2026-12-04")).toBe(3);
  });

  it("não aceita devolução no mesmo dia ou antes da retirada", () => {
    expect(countRentalDays("2026-12-04", "2026-12-04")).toBeNull();
    expect(countRentalDays("2026-12-05", "2026-12-04")).toBeNull();
  });

  it("total é diárias vezes o valor da diária", () => {
    expect(rentalTotalCents(13900, 3)).toBe(41700);
  });

  it("não permite retirada em data passada", () => {
    const result = checkRental("2026-11-10", "2026-11-12", 13900, "2026-11-18");
    expect(result.ok).toBe(false);
  });

  it("aceita retirada hoje e calcula o total", () => {
    const result = checkRental("2026-11-18", "2026-11-20", 21900, "2026-11-18");
    expect(result).toEqual({ ok: true, days: 2, totalCents: 43800 });
  });
});

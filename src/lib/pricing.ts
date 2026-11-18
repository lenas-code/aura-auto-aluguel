const DAY_MS = 24 * 60 * 60 * 1000;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function parseIsoDate(value: string): number | null {
  if (!ISO_DATE.test(value)) return null;
  const time = Date.parse(`${value}T00:00:00Z`);
  return Number.isNaN(time) ? null : time;
}

/** Number of rental days (nights) between pickup and return. Null when invalid. */
export function countRentalDays(pickup: string, returnDate: string): number | null {
  const start = parseIsoDate(pickup);
  const end = parseIsoDate(returnDate);
  if (start === null || end === null) return null;
  const days = Math.round((end - start) / DAY_MS);
  return days >= 1 ? days : null;
}

export function rentalTotalCents(dailyPriceCents: number, days: number): number {
  return dailyPriceCents * days;
}

/** Pickup can be today or later. */
export function isPickupAllowed(pickup: string, today: string): boolean {
  const p = parseIsoDate(pickup);
  const t = parseIsoDate(today);
  if (p === null || t === null) return false;
  return p >= t;
}

export type RentalCheck =
  | { ok: true; days: number; totalCents: number }
  | { ok: false; reason: string };

export function checkRental(
  pickup: string,
  returnDate: string,
  dailyPriceCents: number,
  today: string,
): RentalCheck {
  if (!pickup || !returnDate) return { ok: false, reason: "Escolha as datas de retirada e devolução." };
  if (!isPickupAllowed(pickup, today)) return { ok: false, reason: "A retirada não pode ser em uma data passada." };
  const days = countRentalDays(pickup, returnDate);
  if (days === null) return { ok: false, reason: "A devolução precisa ser pelo menos um dia depois da retirada." };
  return { ok: true, days, totalCents: rentalTotalCents(dailyPriceCents, days) };
}

export function todayIso(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatBRL(cents: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
}

export function formatDateBR(iso: string): string {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

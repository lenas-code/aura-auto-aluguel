import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Cog, Fuel, Users, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { isMoto, tierLabelFor, type Car } from "@/data/cars";
import { checkRental, formatBRL, formatDateBR, todayIso } from "@/lib/pricing";
import { supabase } from "@/integrations/supabase/client";

type ReservedPeriod = { pickup_date: string; return_date: string };
function isoFromDate(date: Date) {
  const y = date.getFullYear(); const m = String(date.getMonth() + 1).padStart(2, "0"); const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
function dateFromIso(iso: string) { return iso ? new Date(`${iso}T12:00:00`) : undefined; }
function datesInPeriods(periods: ReservedPeriod[]) {
  const dates: Date[] = [];
  periods.forEach((period) => {
    const cursor = dateFromIso(period.pickup_date);
    const end = dateFromIso(period.return_date);
    if (!cursor || !end) return;
    while (cursor < end) { dates.push(new Date(cursor)); cursor.setDate(cursor.getDate() + 1); }
  });
  return dates;
}
function isBlockedRange(pickup: string, returnDate: string, periods: ReservedPeriod[]) {
  return periods.some((p) => pickup < p.return_date && returnDate > p.pickup_date);
}
function DatePicker({ label, value, min, blocked, onChange }: {
  label: string; value: string; min?: string; blocked: Date[]; onChange: (value: string) => void; allowReturnOnPickup?: boolean;
}) {
  const blockedMatcher = (date: Date) => {
    const iso = isoFromDate(date);
    return date < (dateFromIso(min ?? "") ?? new Date(0)) || blocked.some((d) => isoFromDate(d) === iso);
  };
  return <div className="space-y-1">
    <Label>{label}</Label>
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left font-normal" disabled={!min && label === "Devolução"}>
          <CalendarDays className="mr-2 size-4" />{value ? formatDateBR(value) : "Selecione uma data"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={dateFromIso(value)} onSelect={(d) => d && onChange(isoFromDate(d))} disabled={blockedMatcher}
          modifiers={{ booked: blocked }} modifiersClassNames={{ booked: "line-through text-destructive opacity-70" }}
          className="rounded-md border" />
        <p className="px-3 pb-3 text-xs text-muted-foreground">Dias riscados já estão reservados.</p>
      </PopoverContent>
    </Popover>
  </div>;
}


export function VehicleNotFound({ moto = false }: { moto?: boolean }) {
  return <div className="mx-auto max-w-xl px-4 py-24 text-center"><h1 className="text-3xl font-bold">Veículo não encontrado</h1><p className="mt-3 text-muted-foreground">Esse veículo não está mais na nossa frota.</p><Button asChild className="mt-6 rounded-full">{moto ? <Link to="/motos">Ver as motos</Link> : <Link to="/frota">Ver os carros</Link>}</Button></div>;
}

export function VehicleDetail({ car }: { car: Car }) {
  const [active, setActive] = useState(0); const [pickup, setPickup] = useState(""); const [returnDate, setReturnDate] = useState(""); const [today, setToday] = useState("");
  const [periods, setPeriods] = useState<ReservedPeriod[]>([]); const [availabilityLoading, setAvailabilityLoading] = useState(true);
  useEffect(() => setToday(todayIso()), []);
  useEffect(() => {
    let active = true; setAvailabilityLoading(true);
    supabase.rpc("get_vehicle_availability", { p_car_id: car.id }).then(({ data, error }) => {
      if (!active) return;
      if (!error && data) setPeriods(data as ReservedPeriod[]);
      else setPeriods([]);
      setAvailabilityLoading(false);
    });
    return () => { active = false; };
  }, [car.id]);
  const blockedDates = useMemo(() => datesInPeriods(periods), [periods]);
  const photo = car.photos[active] ?? car.photos[0];
  const check = today ? checkRental(pickup, returnDate, car.dailyPriceCents, today) : null;
  const dateConflict = pickup && returnDate ? isBlockedRange(pickup, returnDate, periods) : false;
  const canBook = Boolean(check?.ok && !dateConflict && !availabilityLoading);
  const pickupBlocked = blockedDates;
  const returnBlocked = blockedDates.filter((date) => !periods.some((p) => isoFromDate(date) === p.pickup_date && pickup && pickup < p.pickup_date));
  return <div className="mx-auto max-w-6xl px-4 py-10">
    <nav className="text-sm text-muted-foreground">{isMoto(car) ? <Link to="/motos" className="hover:text-primary">Motos</Link> : <Link to="/frota" className="hover:text-primary">Carros</Link>} <span className="mx-1">/</span> {car.name}</nav>
    <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <div><div className="neon-edge overflow-hidden rounded-2xl"><img src={photo.src} alt={photo.alt} className="aspect-[4/3] w-full object-cover" /></div>
        <div className="mt-4 grid grid-cols-3 gap-3">{car.photos.map((p, i) => <button key={p.src} type="button" onClick={() => setActive(i)} aria-label={`Ver foto ${i + 1} de 3`} aria-pressed={active === i} className={`overflow-hidden rounded-xl border-2 transition ${active === i ? "border-primary ring-2 ring-primary/30" : "border-transparent opacity-75 hover:opacity-100"}`}><img src={p.src} alt="" className="aspect-[4/3] w-full object-cover" /></button>)}</div>
        <p className="mt-3 text-xs text-muted-foreground">Foto: <a href={photo.credit.url} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-primary">{photo.credit.author}</a> ({photo.credit.license}), via Wikimedia Commons</p>
      </div>
      <div className="space-y-6"><div><p className="ornament">{tierLabelFor(car)} · {car.category}</p><h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">{car.name}</h1><p className="mt-3 text-lg text-muted-foreground">{car.description}</p></div>
        <div className="flex flex-wrap gap-2"><span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm"><Users className="size-4" /> {car.seats} lugares</span><span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm"><Cog className="size-4" /> {car.transmission}</span><span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm"><Fuel className="size-4" /> {car.fuel}</span></div>
        <ul className="grid grid-cols-2 gap-2 text-sm">{car.features.map((f) => <li key={f} className="flex items-center gap-2"><Check className="size-4 text-aqua" /> {f}</li>)}</ul>
        <div className="neon-edge rounded-2xl bg-card p-6"><p><span className="font-display text-3xl font-bold text-primary">{formatBRL(car.dailyPriceCents)}</span><span className="text-muted-foreground"> por dia</span></p>
          <div className="mt-4 grid grid-cols-2 gap-3"><DatePicker label="Retirada" value={pickup} min={today} blocked={pickupBlocked} onChange={(v) => { setPickup(v); if (returnDate && returnDate <= v) setReturnDate(""); }} /><DatePicker label="Devolução" value={returnDate} min={pickup || today} blocked={returnBlocked} onChange={setReturnDate} /></div>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><span className="inline-block size-3 rounded-sm bg-destructive/20 line-through" /> Dias já reservados aparecem riscados.</div>
          {availabilityLoading ? <p className="mt-3 text-sm text-muted-foreground">Consultando disponibilidade…</p> : null}
          {check && pickup && returnDate ? (check.ok && !dateConflict ? <p className="mt-3 text-sm">{check.days} {check.days === 1 ? "diária" : "diárias"} · total <strong className="text-primary">{formatBRL(check.totalCents)}</strong></p> : <p className="mt-3 text-sm text-destructive">{dateConflict ? "Esse período contém dias já reservados. Escolha outras datas." : check.reason}</p>) : null}
          {canBook ? <Button asChild size="lg" className="mt-4 h-12 w-full text-base"><Link to="/pagamento" search={{ carro: car.id, retirada: pickup, devolucao: returnDate }}>Reservar e ir para o pagamento</Link></Button> : <Button size="lg" className="mt-4 h-12 w-full text-base" disabled>Escolha datas disponíveis para reservar</Button>}
        </div>
      </div>
    </div>
  </div>;
}

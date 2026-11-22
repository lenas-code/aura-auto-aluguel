import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Cog, Fuel, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isMoto, tierLabelFor, type Car } from "@/data/cars";
import { checkRental, formatBRL, todayIso } from "@/lib/pricing";

export function VehicleNotFound({ moto = false }: { moto?: boolean }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Veículo não encontrado</h1>
      <p className="mt-3 text-muted-foreground">Esse veículo não está mais na nossa frota.</p>
      <Button asChild className="mt-6 rounded-full">
        {moto ? <Link to="/motos">Ver as motos</Link> : <Link to="/frota">Ver os carros</Link>}
      </Button>
    </div>
  );
}

export function VehicleDetail({ car }: { car: Car }) {
  const [active, setActive] = useState(0);
  const [pickup, setPickup] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => setToday(todayIso()), []);

  const photo = car.photos[active] ?? car.photos[0];
  const check = today ? checkRental(pickup, returnDate, car.dailyPriceCents, today) : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav className="text-sm text-muted-foreground">
        {isMoto(car) ? (
          <Link to="/motos" className="hover:text-primary">Motos</Link>
        ) : (
          <Link to="/frota" className="hover:text-primary">Carros</Link>
        )}{" "}
        <span className="mx-1">/</span> {car.name}
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div>
          <div className="neon-edge overflow-hidden rounded-2xl">
            <img src={photo.src} alt={photo.alt} className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {car.photos.map((p, i) => (
              <button
                key={p.src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Ver foto ${i + 1} de 3`}
                aria-pressed={active === i}
                className={`overflow-hidden rounded-xl border-2 transition ${
                  active === i ? "border-primary ring-2 ring-primary/30" : "border-transparent opacity-75 hover:opacity-100"
                }`}
              >
                <img src={p.src} alt="" className="aspect-[4/3] w-full object-cover" />
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Foto:{" "}
            <a href={photo.credit.url} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-primary">
              {photo.credit.author}
            </a>{" "}
            ({photo.credit.license}), via Wikimedia Commons
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <p className="ornament">{tierLabelFor(car)} · {car.category}</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">{car.name}</h1>
            <p className="mt-3 text-lg text-muted-foreground">{car.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm"><Users className="size-4" /> {car.seats} lugares</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm"><Cog className="size-4" /> {car.transmission}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm"><Fuel className="size-4" /> {car.fuel}</span>
          </div>

          <ul className="grid grid-cols-2 gap-2 text-sm">
            {car.features.map((f) => (
              <li key={f} className="flex items-center gap-2"><Check className="size-4 text-aqua" /> {f}</li>
            ))}
          </ul>

          <div className="neon-edge rounded-2xl bg-card p-6">
            <p>
              <span className="font-display text-3xl font-bold text-primary">{formatBRL(car.dailyPriceCents)}</span>
              <span className="text-muted-foreground"> por dia</span>
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="pickup">Retirada</Label>
                <Input id="pickup" type="date" min={today || undefined} value={pickup} onChange={(e) => setPickup(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="return">Devolução</Label>
                <Input id="return" type="date" min={pickup || today || undefined} value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
              </div>
            </div>
            {check && pickup && returnDate ? (
              check.ok ? (
                <p className="mt-3 text-sm">
                  {check.days} {check.days === 1 ? "diária" : "diárias"} · total{" "}
                  <strong className="text-primary">{formatBRL(check.totalCents)}</strong>
                </p>
              ) : (
                <p className="mt-3 text-sm text-destructive">{check.reason}</p>
              )
            ) : null}
            {check?.ok ? (
              <Button asChild size="lg" className="mt-4 h-12 w-full text-base">
                <Link to="/pagamento" search={{ carro: car.id, retirada: pickup, devolucao: returnDate }}>
                  Reservar e ir para o pagamento
                </Link>
              </Button>
            ) : (
              <Button size="lg" className="mt-4 h-12 w-full text-base" disabled>
                Escolha as datas para reservar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

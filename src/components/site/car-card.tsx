import { Link } from "@tanstack/react-router";
import { Users, Fuel, Cog } from "lucide-react";
import { tierLabel, type Car } from "@/data/cars";
import { formatBRL } from "@/lib/pricing";

export function CarCard({ car }: { car: Car }) {
  return (
    <Link
      to="/frota/$carId"
      params={{ carId: car.id }}
      className="group flex flex-col overflow-hidden rounded-md border bg-card shadow-warm transition-transform hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={car.photos[0].src}
          alt={car.photos[0].alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-wood/85 px-2 py-1 text-xs font-semibold uppercase tracking-widest text-wood-foreground">
          {tierLabel(car.tier)}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{car.category}</p>
          <h3 className="text-2xl font-semibold">{car.name}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{car.tagline}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Users className="size-4" /> {car.seats} lugares</span>
          <span className="inline-flex items-center gap-1"><Cog className="size-4" /> {car.transmission}</span>
          <span className="inline-flex items-center gap-1"><Fuel className="size-4" /> {car.fuel}</span>
        </div>
        <div className="mt-auto flex items-end justify-between border-t border-dashed pt-4">
          <p>
            <span className="font-display text-2xl font-bold text-primary">{formatBRL(car.dailyPriceCents)}</span>
            <span className="text-sm text-muted-foreground"> /dia</span>
          </p>
          <span className="font-display text-primary underline-offset-4 group-hover:underline">Ver detalhes →</span>
        </div>
      </div>
    </Link>
  );
}

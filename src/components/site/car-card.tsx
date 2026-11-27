import { Link } from "@tanstack/react-router";
import { Users, Fuel, Cog, Car as CarIcon } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import { isMoto, tierLabelFor, type Car } from "@/data/cars";
import { formatBRL } from "@/lib/pricing";

export function CarCard({ car }: { car: Car }) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <CardLink
      car={car}
      className="neon-edge group flex flex-col overflow-hidden rounded-2xl bg-card transition-all hover:-translate-y-1 hover:shadow-neon"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {imageFailed ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-muted text-muted-foreground" role="img" aria-label={car.name}>
            <CarIcon className="size-12 opacity-60" />
            <span className="px-3 text-center text-sm font-medium">{car.name}</span>
          </div>
        ) : (
          <img
            src={car.photos[0].src}
            alt={car.photos[0].alt}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-night/80 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-aqua backdrop-blur-sm">
          {tierLabelFor(car)}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-aqua">{car.category}</p>
          <h3 className="text-xl font-semibold">{car.name}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{car.tagline}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Users className="size-4" /> {car.seats} lugares</span>
          <span className="inline-flex items-center gap-1"><Cog className="size-4" /> {car.transmission}</span>
          <span className="inline-flex items-center gap-1"><Fuel className="size-4" /> {car.fuel}</span>
        </div>
        <div className="mt-auto flex items-end justify-between border-t pt-4">
          <p>
            <span className="font-display text-2xl font-bold text-primary">{formatBRL(car.dailyPriceCents)}</span>
            <span className="text-sm text-muted-foreground"> /dia</span>
          </p>
          <span className="text-sm font-semibold text-primary underline-offset-4 group-hover:underline">Ver detalhes →</span>
        </div>
      </div>
    </CardLink>
  );
}

function CardLink({ car, className, children }: { car: Car; className: string; children: ReactNode }) {
  return isMoto(car) ? (
    <Link to="/motos/$motoId" params={{ motoId: car.id }} className={className}>
      {children}
    </Link>
  ) : (
    <Link to="/frota/$carId" params={{ carId: car.id }} className={className}>
      {children}
    </Link>
  );
}

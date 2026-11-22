import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { CarCard } from "@/components/site/car-card";
import type { Car, CarTier } from "@/data/cars";
import { formatBRL } from "@/lib/pricing";
import { searchCars } from "@/lib/car-search";

type Tier = { id: CarTier; label: string; description: string };

export type FleetBrowserProps = {
  vehicles: Car[];
  tiers: Tier[];
  initialQuery: string;
  onQueryChange: (query: string) => void;
  chips: readonly { label: string; query: string }[];
  noun: { one: string; many: string };
  placeholder: string;
  emptyHint: string;
};

export function FleetBrowser({ vehicles, tiers, initialQuery, onQueryChange, chips, noun, placeholder, emptyHint }: FleetBrowserProps) {
  const [term, setTerm] = useState(initialQuery);
  const query = term.trim();
  const results = useMemo(() => searchCars(vehicles, query), [vehicles, query]);
  const searching = query.length > 0;
  const count = (n: number) => `${n} ${n === 1 ? noun.one : noun.many}`;

  function update(value: string) {
    setTerm(value);
    onQueryChange(value.trim());
  }

  return (
    <>
      <div className="sticky top-20 z-30 border-b bg-background/85 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="neon-edge flex items-center gap-3 rounded-full bg-card px-5 py-3">
            <Search className="size-5 shrink-0 text-aqua" aria-hidden />
            <input
              type="search"
              value={term}
              onChange={(event) => update(event.target.value)}
              placeholder={placeholder}
              aria-label={placeholder}
              className="w-full min-w-0 bg-transparent text-base font-medium outline-hidden placeholder:text-muted-foreground"
            />
            {term ? (
              <button
                type="button"
                onClick={() => update("")}
                aria-label="Limpar pesquisa"
                className="shrink-0 rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            ) : null}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <p className="mr-2 text-sm text-muted-foreground" role="status">
              {searching ? `${count(results.length)} para "${query}"` : `${count(results.length)} na frota`}
            </p>
            {chips.map((chip) => (
              <button
                key={chip.query}
                type="button"
                onClick={() => update(chip.query)}
                className="rounded-full border px-3 py-1 text-sm transition-colors hover:border-primary hover:text-primary"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {!searching ? (
        <nav aria-label="Categorias" className="mx-auto flex max-w-6xl flex-wrap gap-3 px-4 pt-10">
          {tiers.map((t) => (
            <a key={t.id} href={`#${t.id}`} className="neon-edge rounded-full bg-card px-5 py-2 text-sm font-semibold uppercase tracking-[0.12em] hover:text-primary">
              {t.label}
            </a>
          ))}
        </nav>
      ) : null}

      {results.length === 0 ? (
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <p className="font-display text-2xl font-bold">Nada encontrado</p>
          <p className="mt-2 text-muted-foreground">
            Não achamos nada para "{query}". {emptyHint}
          </p>
          <button
            type="button"
            onClick={() => update("")}
            className="mt-6 rounded-full border px-5 py-2 font-semibold hover:border-primary hover:text-primary"
          >
            Limpar pesquisa
          </button>
        </div>
      ) : (
        tiers.map((t) => {
          const group = results.filter((c) => c.tier === t.id);
          if (group.length === 0) return null;
          const from = Math.min(...group.map((c) => c.dailyPriceCents));
          return (
            <section key={t.id} id={t.id} className="mx-auto max-w-6xl scroll-mt-44 px-4 py-12">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-2 border-b pb-4">
                <div>
                  <h2 className="text-2xl font-bold md:text-3xl">{t.label}</h2>
                  <p className="text-muted-foreground">
                    {t.description} · {count(group.length)}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  a partir de <span className="font-display text-lg font-bold text-primary">{formatBRL(from)}</span>/dia
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            </section>
          );
        })
      )}
    </>
  );
}

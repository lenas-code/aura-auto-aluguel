import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { PageBanner } from "@/components/site/page-banner";
import { CarCard } from "@/components/site/car-card";
import { cars, tiers } from "@/data/cars";
import { formatBRL } from "@/lib/pricing";
import { searchCars } from "@/lib/car-search";

type FrotaSearch = { q?: string };

const typeChips = [
  { label: "Sedã", query: "sedan" },
  { label: "SUV", query: "suv" },
  { label: "Picape", query: "picape" },
  { label: "Hatch", query: "hatch" },
  { label: "Esportivo", query: "esportivo" },
  { label: "Cupê", query: "coupe" },
] as const;

export const Route = createFileRoute("/frota/")({
  head: () => ({
    meta: [
      { title: "Frota — Aura Aluguel de Automóveis" },
      { name: "description", content: "Carros econômicos, intermediários e esportivos: pesquise por marca, nome ou tipo e veja fotos, detalhes e o valor da diária de cada carro da Aura." },
      { property: "og:title", content: "Frota — Aura Aluguel de Automóveis" },
      { property: "og:description", content: "Pesquise por marca, nome ou tipo e veja fotos e o valor da diária de cada carro." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): FrotaSearch => {
    const raw = search["q"];
    return typeof raw === "string" && raw.trim() ? { q: raw } : {};
  },
  component: FrotaPage,
});

function FrotaPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const [term, setTerm] = useState(q ?? "");
  const query = term.trim();
  const results = useMemo(() => searchCars(cars, query), [query]);
  const searching = query.length > 0;

  function update(value: string) {
    const clean = value.trim();
    setTerm(value);
    void navigate({ to: "/frota", search: clean ? { q: clean } : {}, replace: true });
  }

  return (
    <>
      <PageBanner kicker="Nossa frota" title="Um carro para cada caminho">
        Todos revisados, limpos e com tanque cheio. Pesquise por marca, nome do carro ou tipo e clique para ver as fotos e reservar.
      </PageBanner>

      <div className="sticky top-20 z-30 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="neon-edge flex items-center gap-3 rounded-sm bg-card px-4 py-3">
            <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden />
            <input
              type="search"
              value={term}
              onChange={(event) => update(event.target.value)}
              placeholder="Pesquisar por marca, nome ou tipo: sedã, SUV, picape…"
              aria-label="Pesquisar carro por marca, nome ou tipo"
              className="w-full bg-transparent font-display text-lg outline-none placeholder:text-muted-foreground"
            />
            {term ? (
              <button
                type="button"
                onClick={() => update("")}
                aria-label="Limpar pesquisa"
                className="shrink-0 rounded-sm p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            ) : null}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <p className="mr-2 text-sm text-muted-foreground" role="status">
              {searching
                ? `${results.length} ${results.length === 1 ? "carro" : "carros"} para "${query}"`
                : `${results.length} carros na frota`}
            </p>
            {typeChips.map((chip) => (
              <button
                key={chip.query}
                type="button"
                onClick={() => update(chip.query)}
                className="rounded-sm border px-3 py-1 text-sm hover:text-primary"
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
            <a key={t.id} href={`#${t.id}`} className="neon-edge rounded-sm bg-card px-4 py-2 font-display text-lg hover:text-primary">
              {t.label}
            </a>
          ))}
        </nav>
      ) : null}

      {results.length === 0 ? (
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <p className="font-display text-3xl font-bold">Nenhum carro encontrado</p>
          <p className="mt-2 text-muted-foreground">
            Não achamos nada para "{query}". Tente outra marca, outro nome ou um tipo como sedã, SUV ou picape.
          </p>
          <button
            type="button"
            onClick={() => update("")}
            className="mt-6 rounded-sm border px-5 py-2 font-display text-lg hover:text-primary"
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
                  <h2 className="text-3xl font-bold">{t.label}</h2>
                  <p className="text-muted-foreground">
                    {t.description} · {group.length} {group.length === 1 ? "carro" : "carros"}
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

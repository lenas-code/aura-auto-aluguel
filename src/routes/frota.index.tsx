import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/site/page-banner";
import { CarCard } from "@/components/site/car-card";
import { cars, tiers } from "@/data/cars";
import { formatBRL } from "@/lib/pricing";

export const Route = createFileRoute("/frota/")({
  head: () => ({
    meta: [
      { title: "Frota — Aura Aluguel de Automóveis" },
      { name: "description", content: "Carros econômicos, intermediários e esportivos: veja fotos, detalhes e o valor da diária de cada carro da Aura." },
      { property: "og:title", content: "Frota — Aura Aluguel de Automóveis" },
      { property: "og:description", content: "Carros econômicos, intermediários e esportivos: veja fotos e o valor da diária." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FrotaPage,
});

function FrotaPage() {
  return (
    <>
      <PageBanner kicker="Nossa frota" title="Um carro para cada caminho">
        Todos revisados, limpos e com tanque cheio. Clique em um carro para ver as fotos e reservar.
      </PageBanner>
      <nav aria-label="Categorias" className="mx-auto flex max-w-6xl flex-wrap gap-3 px-4 pt-10">
        {tiers.map((t) => (
          <a key={t.id} href={`#${t.id}`} className="stitched rounded-sm bg-card px-4 py-2 font-display text-lg hover:text-primary">
            {t.label}
          </a>
        ))}
      </nav>
      {tiers.map((t) => {
        const group = cars.filter((c) => c.tier === t.id);
        const from = Math.min(...group.map((c) => c.dailyPriceCents));
        return (
          <section key={t.id} id={t.id} className="mx-auto max-w-6xl scroll-mt-28 px-4 py-12">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-2 border-b border-dashed pb-4">
              <div>
                <h2 className="text-3xl font-bold">{t.label}</h2>
                <p className="text-muted-foreground">
                  {t.description} · {group.length} carros
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
      })}
    </>
  );
}

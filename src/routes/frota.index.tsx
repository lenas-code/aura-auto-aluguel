import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/site/page-banner";
import { CarCard } from "@/components/site/car-card";
import { cars } from "@/data/cars";

export const Route = createFileRoute("/frota/")({
  head: () => ({
    meta: [
      { title: "Frota — Aura Aluguel de Automóveis" },
      { name: "description", content: "Picape 4x4, jipe, SUV, sedã e compacto: veja fotos, detalhes e o valor da diária de cada carro da Aura." },
      { property: "og:title", content: "Frota — Aura Aluguel de Automóveis" },
      { property: "og:description", content: "Picape 4x4, jipe, SUV, sedã e compacto: veja fotos, detalhes e o valor da diária." },
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
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>
    </>
  );
}

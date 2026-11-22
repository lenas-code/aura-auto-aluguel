import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageBanner } from "@/components/site/page-banner";
import { FleetBrowser } from "@/components/site/fleet-browser";
import { cars, tiers } from "@/data/cars";

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
      { title: "Carros — Aura Aluguel de Automóveis" },
      { name: "description", content: "Carros econômicos, intermediários e esportivos: pesquise por marca, nome ou tipo e veja fotos, detalhes e o valor da diária de cada carro da Aura." },
      { property: "og:title", content: "Carros — Aura Aluguel de Automóveis" },
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

  return (
    <>
      <PageBanner kicker="Nossos carros" title="Um carro para cada rolê">
        Todos revisados, limpos e com tanque cheio. Pesquise por marca, nome do carro ou tipo e clique para ver as fotos e reservar.
      </PageBanner>
      <FleetBrowser
        vehicles={cars}
        tiers={tiers}
        initialQuery={q ?? ""}
        onQueryChange={(clean) => void navigate({ to: "/frota", search: clean ? { q: clean } : {}, replace: true })}
        chips={typeChips}
        noun={{ one: "carro", many: "carros" }}
        placeholder="Pesquisar por marca, nome ou tipo: sedã, SUV, picape…"
        emptyHint="Tente outra marca, outro nome ou um tipo como sedã, SUV ou picape."
      />
    </>
  );
}

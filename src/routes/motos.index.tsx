import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageBanner } from "@/components/site/page-banner";
import { FleetBrowser } from "@/components/site/fleet-browser";
import { motos, motoTiers } from "@/data/cars";

type MotosSearch = { q?: string };

const typeChips = [
  { label: "Scooter", query: "scooter" },
  { label: "Street", query: "street" },
  { label: "Naked", query: "naked" },
  { label: "Trail", query: "trail" },
  { label: "Superesportiva", query: "superesportiva" },
  { label: "Custom", query: "custom" },
] as const;

export const Route = createFileRoute("/motos/")({
  head: () => ({
    meta: [
      { title: "Motos — Aura Aluguel de Automóveis" },
      { name: "description", content: "Alugue motos reais na Aura: scooters, street, trail, naked e superesportivas. Veja fotos, detalhes e o valor da diária de cada moto." },
      { property: "og:title", content: "Motos — Aura Aluguel de Automóveis" },
      { property: "og:description", content: "Scooters, trail, naked e superesportivas para alugar, com fotos e valor da diária." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): MotosSearch => {
    const raw = search["q"];
    return typeof raw === "string" && raw.trim() ? { q: raw } : {};
  },
  component: MotosPage,
});

function MotosPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();

  return (
    <>
      <PageBanner kicker="Nossas motos" title="Duas rodas, vento na cara">
        Da scooter para o dia a dia à superesportiva para o fim de semana. Pesquise por marca, nome ou estilo e clique para ver as fotos e reservar.
      </PageBanner>
      <FleetBrowser
        vehicles={motos}
        tiers={motoTiers}
        initialQuery={q ?? ""}
        onQueryChange={(clean) => void navigate({ to: "/motos", search: clean ? { q: clean } : {}, replace: true })}
        chips={typeChips}
        noun={{ one: "moto", many: "motos" }}
        placeholder="Pesquisar por marca, nome ou estilo: scooter, trail, naked…"
        emptyHint="Tente outra marca, outro nome ou um estilo como scooter, trail ou naked."
      />
    </>
  );
}

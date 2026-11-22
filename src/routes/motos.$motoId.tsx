import { createFileRoute, notFound } from "@tanstack/react-router";
import { VehicleDetail, VehicleNotFound } from "@/components/site/vehicle-detail";
import { getCar, isMoto } from "@/data/cars";

export const Route = createFileRoute("/motos/$motoId")({
  loader: ({ params }) => {
    const car = getCar(params.motoId);
    if (!car || !isMoto(car)) throw notFound();
    return { carId: car.id, name: car.name, tagline: car.tagline };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Aura Aluguel de Automóveis` },
          { name: "description", content: loaderData.tagline },
          { property: "og:title", content: `${loaderData.name} — Aura` },
          { property: "og:description", content: loaderData.tagline },
          { property: "og:type", content: "product" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Veículo não encontrado — Aura" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: MotoNotFound,
  errorComponent: MotoNotFound,
  component: MotoPage,
});

function MotoNotFound() {
  return <VehicleNotFound moto />;
}

function MotoPage() {
  const { carId } = Route.useLoaderData();
  const car = getCar(carId);
  if (!car) return <VehicleNotFound moto />;
  return <VehicleDetail car={car} />;
}

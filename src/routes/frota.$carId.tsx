import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { VehicleDetail, VehicleNotFound } from "@/components/site/vehicle-detail";
import { getCar, isMoto } from "@/data/cars";

export const Route = createFileRoute("/frota/$carId")({
  loader: ({ params }) => {
    const car = getCar(params.carId);
    if (!car) throw notFound();
    // Motorcycles live under /motos; keep old links working.
    if (isMoto(car)) throw redirect({ to: "/motos/$motoId", params: { motoId: car.id }, statusCode: 301 });
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
  notFoundComponent: CarNotFound,
  errorComponent: CarNotFound,
  component: CarPage,
});

function CarNotFound() {
  return <VehicleNotFound />;
}

function CarPage() {
  const { carId } = Route.useLoaderData();
  const car = getCar(carId);
  if (!car) return <VehicleNotFound />;
  return <VehicleDetail car={car} />;
}

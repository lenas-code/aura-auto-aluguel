import { createFileRoute, Link } from "@tanstack/react-router";
import { CarFront, ClipboardCheck, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CarCard } from "@/components/site/car-card";
import { cars } from "@/data/cars";
import hero from "@/assets/hero-estrada.jpg";

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aura — Aluguel rápido de automóveis" },
      {
        name: "description",
        content: "Alugue picapes, jipes, SUVs e carros de passeio na Aura. Cadastro rápido, reserva online e chave na mão.",
      },
      { property: "og:title", content: "Aura — Aluguel rápido de automóveis" },
      {
        property: "og:description",
        content: "Alugue picapes, jipes, SUVs e carros de passeio na Aura. Cadastro rápido, reserva online e chave na mão.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const steps = [
  { icon: CarFront, title: "Escolha o carro", text: "Veja a frota, as fotos e o valor da diária de cada veículo." },
  { icon: ClipboardCheck, title: "Faça seu cadastro", text: "Nome, telefone, CPF e CNH. Leva menos de dois minutos." },
  { icon: KeyRound, title: "Reserve e retire", text: "Escolha as datas, confirme o pagamento e pegue a chave." },
];

function Index() {
  const featured = cars.slice(0, 3);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={hero} alt="Estrada de terra ao pôr do sol com celeiro de madeira" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-wood/90 via-wood/60 to-transparent" />
        <div className="mx-auto max-w-6xl px-4 py-24 text-wood-foreground md:py-36">
          <p className="ornament text-wood-foreground">Locadora de veículos</p>
          <h1 className="mt-5 max-w-2xl text-5xl font-bold leading-[1.05] md:text-7xl">
            Aura
            <span className="mt-2 block text-3xl font-medium text-wood-foreground/90 md:text-4xl">
              aluguel rápido de automóveis
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-wood-foreground/85">
            Do asfalto à estrada de terra: carros revisados, atendimento de gente da terra e chave na mão sem burocracia.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <Link to="/frota">Ver a frota</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-wood-foreground/60 bg-transparent px-8 text-base text-wood-foreground hover:bg-wood-foreground/10 hover:text-wood-foreground"
            >
              <Link to="/cadastro">Criar cadastro</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="ornament justify-center">Como funciona</p>
        <h2 className="mt-3 text-center text-4xl font-bold">Três passos e pé na estrada</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="stitched relative rounded-md border bg-card p-8 shadow-warm">
              <span className="absolute right-6 top-4 font-display text-5xl font-bold text-primary/15">{i + 1}</span>
              <step.icon className="size-9 text-primary" />
              <h3 className="mt-4 text-2xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="ornament">Destaques da frota</p>
            <h2 className="mt-3 text-4xl font-bold">Prontos para rodar</h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/frota">Ver todos os carros</Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-4">
        <div className="wood-grain rounded-md p-10 text-wood-foreground shadow-warm md:p-14">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">Primeira vez na Aura?</h2>
              <p className="mt-3 max-w-xl text-wood-foreground/80">
                Faça seu cadastro uma vez e suas próximas reservas ficam ainda mais rápidas.
              </p>
            </div>
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <Link to="/cadastro">Quero me cadastrar</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

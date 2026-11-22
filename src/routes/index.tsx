import { createFileRoute, Link } from "@tanstack/react-router";
import { Bike, ClipboardCheck, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CarCard } from "@/components/site/car-card";
import { cars, getCar, motos, type Car } from "@/data/cars";
import hero from "@/assets/hero-miami.jpg";

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aura — Aluguel rápido de carros e motos" },
      {
        name: "description",
        content: "Alugue carros e motos na Aura: econômicos, SUVs, esportivos, scooters e superesportivas. Cadastro rápido, reserva online e chave na mão.",
      },
      { property: "og:title", content: "Aura — Aluguel rápido de carros e motos" },
      {
        property: "og:description",
        content: "Carros e motos para alugar com cadastro rápido, reserva online e chave na mão.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const featuredCarIds = ["fiat-mobi", "volkswagen-t-cross", "chevrolet-camaro-ss"];
const featuredMotoIds = ["honda-pcx-160", "yamaha-tenere-700", "ducati-panigale-v4"];

const steps = [
  { icon: Bike, title: "Escolha o veículo", text: "Carro ou moto: veja as fotos, os detalhes e o valor da diária." },
  { icon: ClipboardCheck, title: "Faça seu cadastro", text: "Nome, telefone, CPF e CNH. Leva menos de dois minutos." },
  { icon: KeyRound, title: "Reserve e retire", text: "Escolha as datas, confirme a reserva e pegue a chave." },
];

function Index() {
  const featuredCars = featuredCarIds.flatMap((id) => getCar(id) ?? []);
  const featuredMotos = featuredMotoIds.flatMap((id) => getCar(id) ?? []);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={hero}
          alt="Carro esportivo branco e moto estacionados numa avenida à beira-mar com palmeiras, prédios com neon rosa e azul e o pôr do sol"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-night/50 md:bg-linear-to-r md:from-night/90 md:via-night/55 md:to-transparent md:bg-transparent" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-background to-transparent" />
        <div className="mx-auto max-w-6xl px-4 py-24 md:py-36">
          <p className="ornament">Carros &amp; motos</p>
          <h1 className="mt-5 max-w-2xl font-display leading-none">
            <span className="inline-block text-6xl font-extrabold text-gradient-sunset md:text-8xl">AURA</span>
            <span className="mt-4 block text-xl font-semibold text-night-foreground md:text-3xl">
              aluguel rápido de automóveis
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-night-foreground/85">
            Carros e motos revisados, reserva online em minutos e chave na mão. É só escolher e curtir a estrada.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 rounded-full px-8 text-base shadow-neon">
              <Link to="/frota">Ver carros</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-aqua bg-transparent px-8 text-base text-aqua hover:bg-aqua/10 hover:text-aqua"
            >
              <Link to="/motos">Ver motos</Link>
            </Button>
          </div>
          <dl className="mt-12 flex flex-wrap gap-8 text-night-foreground">
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-night-muted">Carros</dt>
              <dd className="font-display text-3xl font-bold">{cars.length}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-night-muted">Motos</dt>
              <dd className="font-display text-3xl font-bold">{motos.length}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="ornament justify-center">Como funciona</p>
        <h2 className="mt-3 text-center text-3xl font-bold md:text-4xl">Três passos e pé na estrada</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="neon-edge relative rounded-2xl bg-card p-8">
              <span className="absolute right-6 top-4 font-display text-5xl font-extrabold text-primary/20">{i + 1}</span>
              <step.icon className="size-9 text-aqua" />
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <FeaturedRow kicker="Carros em destaque" title="Prontos para rodar" vehicles={featuredCars} link={{ to: "/frota", label: "Ver todos os carros" }} />
      <div className="h-20" />
      <FeaturedRow kicker="Motos em destaque" title="Duas rodas, muito estilo" vehicles={featuredMotos} link={{ to: "/motos", label: "Ver todas as motos" }} />

      <section className="mx-auto mt-24 max-w-6xl px-4">
        <div className="miami-night neon-edge relative overflow-hidden rounded-3xl p-10 text-night-foreground md:p-14">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 opacity-60" aria-hidden="true">
            <div className="synth-grid h-full w-full" />
          </div>
          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-2xl font-bold md:text-4xl">Primeira vez na Aura?</h2>
              <p className="mt-3 max-w-xl text-night-foreground/80">
                Faça seu cadastro uma vez e suas próximas reservas ficam ainda mais rápidas.
              </p>
            </div>
            <Button asChild size="lg" className="h-12 rounded-full px-8 text-base shadow-neon">
              <Link to="/cadastro">Quero me cadastrar</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function FeaturedRow({
  kicker,
  title,
  vehicles,
  link,
}: {
  kicker: string;
  title: string;
  vehicles: Car[];
  link: { to: "/frota" | "/motos"; label: string };
}) {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="ornament">{kicker}</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">{title}</h2>
        </div>
        <Button asChild variant="outline" className="rounded-full">
          <Link to={link.to}>{link.label}</Link>
        </Button>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((v) => (
          <CarCard key={v.id} car={v} />
        ))}
      </div>
    </section>
  );
}

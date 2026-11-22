import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartHandshake, ShieldCheck, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageBanner } from "@/components/site/page-banner";
import tcrossRear from "@/assets/fleet/tcross-2.jpg.asset.json";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Aura Aluguel de Automóveis" },
      { name: "description", content: "Conheça a Aura: locadora de carros e motos com estilo, veículos revisados e aluguel sem burocracia." },
      { property: "og:title", content: "Sobre a Aura" },
      { property: "og:description", content: "Locadora de carros e motos com estilo, veículos revisados e aluguel sem burocracia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SobrePage,
});

const values = [
  { icon: Timer, title: "Rapidez", text: "Cadastro online e reserva em poucos cliques. Na retirada, é só conferir o carro e sair." },
  { icon: ShieldCheck, title: "Carro revisado", text: "Cada veículo passa por revisão e limpeza antes de cada locação." },
  { icon: HeartHandshake, title: "Atendimento de perto", text: "Atendimento rápido pelo WhatsApp, de gente que trata você pelo nome." },
];

function SobrePage() {
  return (
    <>
      <PageBanner kicker="Nossa história" title="Sol, estrada e a chave na mão">
        A Aura nasceu para quem quer um carro ou uma moto rápido, sem papelada demais e com muito estilo.
      </PageBanner>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2">
        <img src={tcrossRear.url} alt="Volkswagen T-Cross branco numa estrada de serra" className="neon-edge rounded-3xl" />
        <div className="space-y-4 text-lg text-muted-foreground">
          <h2 className="text-3xl font-bold text-foreground">Para cada rolê, um veículo</h2>
          <p>
            Montamos uma frota para cada bolso e cada ocasião: econômicos para a cidade, SUVs e sedãs para viajar
            com a família, esportivos para os dias especiais e motos, da scooter à superesportiva.
          </p>
          <p>
            Nosso jeito é simples: você escolhe o carro ou a moto, faz seu cadastro uma vez e reserva quando precisar.
          </p>
          <Button asChild size="lg" className="rounded-full">
            <Link to="/frota">Conhecer a frota</Link>
          </Button>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="neon-edge rounded-2xl bg-card p-8">
              <v.icon className="size-9 text-aqua" />
              <h3 className="mt-4 text-xl font-semibold">{v.title}</h3>
              <p className="mt-2 text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

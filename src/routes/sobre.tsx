import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartHandshake, ShieldCheck, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageBanner } from "@/components/site/page-banner";
import barn from "@/assets/cars/picape-3.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Aura Aluguel de Automóveis" },
      { name: "description", content: "Conheça a Aura: locadora de veículos com jeito de interior, carros revisados e aluguel sem burocracia." },
      { property: "og:title", content: "Sobre a Aura" },
      { property: "og:description", content: "Locadora de veículos com jeito de interior, carros revisados e aluguel sem burocracia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SobrePage,
});

const values = [
  { icon: Timer, title: "Rapidez", text: "Cadastro online e reserva em poucos cliques. Na retirada, é só conferir o carro e sair." },
  { icon: ShieldCheck, title: "Carro revisado", text: "Cada veículo passa por revisão e limpeza antes de cada locação." },
  { icon: HeartHandshake, title: "Atendimento de perto", text: "Gente que conhece as estradas da região e indica o melhor caminho." },
];

function SobrePage() {
  return (
    <>
      <PageBanner kicker="Nossa história" title="Uma locadora com cheiro de estrada de terra">
        A Aura nasceu para quem precisa de um carro rápido, sem papelada demais e com o cuidado de quem trata cliente pelo nome.
      </PageBanner>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2">
        <img src={barn} alt="Picape estacionada ao lado de um celeiro" className="rounded-md border-4 border-card shadow-warm" />
        <div className="space-y-4 text-lg text-muted-foreground">
          <h2 className="text-3xl font-bold text-foreground">Do asfalto ao cascalho</h2>
          <p>
            Montamos uma frota pensada para o dia a dia e para a aventura: picape para a fazenda, jipe para a trilha,
            SUV para a família e carros econômicos para a cidade.
          </p>
          <p>
            Nosso jeito é simples: você escolhe o carro, faz seu cadastro uma vez e reserva quando precisar.
          </p>
          <Button asChild size="lg">
            <Link to="/frota">Conhecer a frota</Link>
          </Button>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-md border bg-card p-8 shadow-warm">
              <v.icon className="size-9 text-moss" />
              <h3 className="mt-4 text-2xl font-semibold">{v.title}</h3>
              <p className="mt-2 text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

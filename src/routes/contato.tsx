import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, Phone } from "lucide-react";
import { PageBanner } from "@/components/site/page-banner";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Aura Aluguel de Automóveis" },
      { name: "description", content: "Fale com a Aura: telefone, WhatsApp, e-mail e horário de atendimento da locadora." },
      { property: "og:title", content: "Contato — Aura" },
      { property: "og:description", content: "Telefone, WhatsApp, e-mail e horário de atendimento da locadora Aura." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContatoPage,
});

const items = [
  { icon: Phone, title: "Telefone e WhatsApp", lines: ["(31) 98595-5189"], href: "https://wa.me/5531985955189" },
  { icon: Mail, title: "E-mail", lines: ["hellena.main1@gmail.com"], href: "mailto:hellena.main1@gmail.com" },
  { icon: Clock, title: "Horário", lines: ["Segunda a sábado, 7h às 19h", "Domingos e feriados, 8h às 13h"] },
];

function ContatoPage() {
  return (
    <>
      <PageBanner kicker="Fale com a gente" title="Chama a gente no WhatsApp">
        Dúvidas sobre um carro, uma reserva ou um caminho? Chame a gente.
      </PageBanner>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="neon-edge flex gap-5 rounded-2xl bg-card p-8">
              <item.icon className="size-8 shrink-0 text-primary" />
              <div className="min-w-0">
                <h2 className="text-2xl font-semibold">{item.title}</h2>
                {item.lines.map((line) =>
                  "href" in item && item.href ? (
                    <a
                      key={line}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="mt-1 block break-words text-lg text-primary underline-offset-4 hover:underline"
                    >
                      {line}
                    </a>
                  ) : (
                    <p key={line} className="mt-1 break-words text-muted-foreground">{line}</p>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

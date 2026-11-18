import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
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
  { icon: Phone, title: "Telefone e WhatsApp", lines: ["(00) 00000-0000"] },
  { icon: Mail, title: "E-mail", lines: ["contato@seudominio.com.br"] },
  { icon: MapPin, title: "Endereço", lines: ["Endereço a informar", "Retirada e devolução no local"] },
  { icon: Clock, title: "Horário", lines: ["Segunda a sábado, 7h às 20h", "Domingos e feriados, 8h às 14h"] },
];

function ContatoPage() {
  return (
    <>
      <PageBanner kicker="Fale com a gente" title="Estamos na beira da estrada">
        Dúvidas sobre um carro, uma reserva ou um caminho? Chame a gente.
      </PageBanner>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.title} className="stitched flex gap-5 rounded-md border bg-card p-8 shadow-warm">
              <item.icon className="size-8 shrink-0 text-primary" />
              <div className="min-w-0">
                <h2 className="text-2xl font-semibold">{item.title}</h2>
                {item.lines.map((line) => (
                  <p key={line} className="mt-1 break-words text-muted-foreground">{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

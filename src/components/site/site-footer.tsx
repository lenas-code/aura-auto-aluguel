import { Link } from "@tanstack/react-router";
import { AuraMark } from "./logo";

export function SiteFooter() {
  return (
    <footer className="miami-night mt-24 text-night-foreground">
      <div className="h-0.5 bg-sunset" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <AuraMark className="size-14" />
            <span className="font-display text-2xl font-extrabold text-sunset">AURA</span>
          </div>
          <p className="max-w-xs text-sm text-night-muted">
            Aluguel rápido de carros e motos. Escolha, reserve e saia curtindo a estrada.
          </p>
        </div>
        <div>
          <h3 className="mb-3 font-script text-xl text-aqua">Navegue</h3>
          <ul className="space-y-2 text-sm text-night-muted">
            <li><Link to="/frota" className="hover:text-night-foreground">Carros</Link></li>
            <li><Link to="/motos" className="hover:text-night-foreground">Motos</Link></li>
            <li><Link to="/sobre" className="hover:text-night-foreground">Sobre a Aura</Link></li>
            <li><Link to="/contato" className="hover:text-night-foreground">Contato</Link></li>
            <li><Link to="/cadastro" className="hover:text-night-foreground"> Cadastro</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-script text-xl text-aqua">Atendimento</h3>
          <ul className="space-y-2 text-sm text-night-muted">
            <li>Segunda a sábado, 7h às 19h</li>
            <li>Domingos e feriados, 8h às 13h</li>
            <li>
              <a href="https://wa.me/5531985955189" target="_blank" rel="noreferrer" className="hover:text-night-foreground">
                WhatsApp (31) 98595-5189
              </a>
            </li>
            <li>
              <a href="mailto:hellena.main1@gmail.com" className="break-all hover:text-night-foreground">
                hellena.main1@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-night-foreground/15 py-5 text-center text-xs text-night-muted">
        © Aura Aluguel de Automóveis
      </div>
    </footer>
  );
}

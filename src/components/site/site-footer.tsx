import { Link } from "@tanstack/react-router";
import { AuraMark } from "./logo";

export function SiteFooter() {
  return (
    <footer className="wood-grain mt-24 border-t-4 border-primary text-wood-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <AuraMark className="size-8" />
            <span className="font-display text-2xl font-bold">Aura</span>
          </div>
          <p className="max-w-xs text-sm text-wood-muted">
            Aluguel rápido de automóveis, do asfalto à estrada de terra. Escolha, reserve e pegue a chave.
          </p>
        </div>
        <div>
          <h3 className="mb-3 font-display text-lg">Navegue</h3>
          <ul className="space-y-2 text-sm text-wood-muted">
            <li><Link to="/frota" className="hover:text-wood-foreground">Nossa frota</Link></li>
            <li><Link to="/sobre" className="hover:text-wood-foreground">Sobre a Aura</Link></li>
            <li><Link to="/contato" className="hover:text-wood-foreground">Contato</Link></li>
            <li><Link to="/cadastro" className="hover:text-wood-foreground">Criar cadastro</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-display text-lg">Atendimento</h3>
          <ul className="space-y-2 text-sm text-wood-muted">
            <li>Segunda a sábado, 7h às 20h</li>
            <li>Domingos e feriados, 8h às 14h</li>
            <li>
              <a href="https://wa.me/5531985955189" target="_blank" rel="noreferrer" className="hover:text-wood-foreground">
                WhatsApp (31) 98595-5189
              </a>
            </li>
            <li>
              <a href="mailto:hellena.main1@gmail.com" className="break-all hover:text-wood-foreground">
                hellena.main1@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-wood-foreground/15 py-5 text-center text-xs text-wood-muted">
        © Aura Aluguel de Automóveis
      </div>
    </footer>
  );
}

import { Link } from "@tanstack/react-router";
import logoSrc from "@/assets/aura-logo.png";

export function AuraMark({ className = "size-12" }: { className?: string }) {
  return <img src={logoSrc} alt="" aria-hidden="true" className={`${className} shrink-0`} />;
}

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Aura — página inicial">
      <AuraMark />
      <span className="leading-none">
        <span className="block font-display text-2xl font-bold tracking-wide">Aura</span>
        <span className="block text-[0.65rem] uppercase tracking-[0.22em] opacity-75">
          Aluguel rápido de automóveis
        </span>
      </span>
    </Link>
  );
}

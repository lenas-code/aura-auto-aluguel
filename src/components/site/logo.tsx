import { Link } from "@tanstack/react-router";
import logoSrc from "@/assets/aura-logo.png";

export function AuraMark({ className = "size-12" }: { className?: string }) {
  return <img src={logoSrc} alt="" aria-hidden="true" className={`${className} shrink-0 rounded-[22%] shadow-neon`} />;
}

export function Logo() {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Aura — página inicial">
      <AuraMark />
      <span className="min-w-0 leading-none">
        <span className="inline-block font-display text-2xl font-extrabold tracking-wide text-gradient-sunset">AURA</span>
        <span className="mt-1 block truncate text-[0.62rem] uppercase tracking-[0.24em] text-night-muted">
          Aluguel rápido de automóveis
        </span>
      </span>
    </Link>
  );
}

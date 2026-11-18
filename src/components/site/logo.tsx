import { Link } from "@tanstack/react-router";

export function AuraMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" className="fill-primary" />
      <path
        d="M19 48 L32 15 L45 48 M24.5 35 H39.5"
        className="stroke-primary-foreground"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
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

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, UserRound, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { Logo } from "./logo";

const links = [
  { to: "/", label: "Início" },
  { to: "/frota", label: "Carros" },
  { to: "/motos", label: "Motos" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
] as const;

export function SiteHeader() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="miami-night sticky top-0 z-40 text-night-foreground shadow-neon">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              className="rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-night-foreground/75 transition-colors hover:text-aqua"
              activeProps={{ className: "bg-primary/15 text-primary neon-text" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <Button asChild variant="ghost" className="text-night-foreground hover:bg-night-foreground/10 hover:text-night-foreground">
                <Link to="/conta">
                  <UserRound /> Minha conta
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Sair"
                onClick={() => void signOut()}
                className="text-night-foreground hover:bg-night-foreground/10 hover:text-night-foreground"
              >
                <LogOut />
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" className="text-night-foreground hover:bg-night-foreground/10 hover:text-night-foreground">
                <Link to="/entrar">Entrar</Link>
              </Button>
              <Button asChild>
                <Link to="/cadastro">Cadastre-se</Link>
              </Button>
            </>
          )}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-night-foreground hover:bg-night-foreground/10 hover:text-night-foreground md:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background">
            <SheetHeader>
              <SheetTitle className="font-display text-2xl">Menu</SheetTitle>
            </SheetHeader>
            <nav className="mt-4 flex flex-col gap-1 px-4">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: link.to === "/" }}
                  className="rounded-sm px-3 py-3 font-display text-lg hover:bg-secondary"
                  activeProps={{ className: "bg-secondary text-primary" }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="my-3 border-t" />
              {user ? (
                <>
                  <Link to="/conta" onClick={() => setOpen(false)} className="rounded-sm px-3 py-3 font-display text-lg hover:bg-secondary">
                    Minha conta
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      void signOut();
                    }}
                    className="rounded-sm px-3 py-3 text-left font-display text-lg hover:bg-secondary"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link to="/entrar" onClick={() => setOpen(false)} className="rounded-sm px-3 py-3 font-display text-lg hover:bg-secondary">
                    Entrar
                  </Link>
                  <Button asChild size="lg" className="mt-2">
                    <Link to="/cadastro" onClick={() => setOpen(false)}>
                      Cadastre-se
                    </Link>
                  </Button>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <div className="h-0.5 bg-sunset" aria-hidden="true" />
    </header>
  );
}

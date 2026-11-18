import { useEffect, useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialSignIn } from "@/components/site/social-sign-in";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/entrar")({
  validateSearch: (s: Record<string, unknown>): { redirect?: string } => {
    const r = s["redirect"];
    return typeof r === "string" && r.startsWith("/") && !r.startsWith("//") ? { redirect: r } : {};
  },
  head: () => ({
    meta: [
      { title: "Entrar — Aura Aluguel de Automóveis" },
      { name: "description", content: "Entre na sua conta Aura para reservar e acompanhar seus aluguéis." },
      { property: "og:title", content: "Entrar — Aura" },
      { property: "og:description", content: "Entre na sua conta Aura para reservar e acompanhar seus aluguéis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EntrarPage,
});

function EntrarPage() {
  const search = Route.useSearch();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const target = search.redirect ?? "/conta";

  useEffect(() => {
    if (!authLoading && user) router.history.push(target);
  }, [authLoading, user, router, target]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError(
        signInError.message.toLowerCase().includes("confirm")
          ? "Confirme seu e-mail pelo link que enviamos antes de entrar."
          : "E-mail ou senha incorretos.",
      );
      return;
    }
    router.history.push(target);
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <p className="ornament justify-center">Área do cliente</p>
      <h1 className="mt-3 text-center text-4xl font-bold">Entrar</h1>
      {search.redirect?.startsWith("/pagamento") ? (
        <p className="mt-3 text-center text-muted-foreground">Entre ou cadastre-se para concluir sua reserva.</p>
      ) : null}
      <div className="stitched mt-8 rounded-md border bg-card p-6 shadow-warm md:p-8">
        <SocialSignIn redirectTo={target} />
        <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> ou com e-mail <span className="h-px flex-1 bg-border" />
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" size="lg" className="h-11 w-full" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Ainda não tem cadastro?{" "}
          <Link to="/cadastro" className="font-medium text-primary underline-offset-4 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}

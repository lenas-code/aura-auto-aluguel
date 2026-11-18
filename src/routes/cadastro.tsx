import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MailCheck } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialSignIn } from "@/components/site/social-sign-in";
import { supabase } from "@/integrations/supabase/client";
import { profileSchema } from "@/lib/profile-schema";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Cadastro — Aura Aluguel de Automóveis" },
      { name: "description", content: "Crie seu cadastro na Aura para reservar carros online de forma rápida." },
      { property: "og:title", content: "Cadastro — Aura" },
      { property: "og:description", content: "Crie seu cadastro na Aura para reservar carros online." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CadastroPage,
});

const signupSchema = profileSchema.extend({
  email: z.string().trim().email("E-mail inválido"),
  password: z.string().min(8, "A senha precisa ter pelo menos 8 caracteres"),
});

type Values = z.input<typeof signupSchema>;
const empty: Values = { full_name: "", phone: "", cpf: "", cnh: "", email: "", password: "" };

function CadastroPage() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [sentTo, setSentTo] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    const result = signupSchema.safeParse(values);
    if (!result.success) {
      const next: Partial<Record<keyof Values, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof Values | undefined;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setLoading(true);
    const { email, password, ...profile } = result.data;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin, data: profile },
    });
    setLoading(false);
    if (error) {
      setFormError(
        error.message.toLowerCase().includes("registered")
          ? "Este e-mail já tem cadastro. Tente entrar."
          : "Não foi possível criar o cadastro. Confira os dados e tente de novo.",
      );
      return;
    }
    setSentTo(email);
  };

  if (sentTo) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <MailCheck className="mx-auto size-14 text-moss" />
        <h1 className="mt-4 text-4xl font-bold">Confira seu e-mail</h1>
        <p className="mt-3 text-muted-foreground">
          Enviamos um link de confirmação para <strong>{sentTo}</strong>. Clique nele para ativar seu cadastro e depois entre na sua conta.
        </p>
        <Button asChild className="mt-6">
          <Link to="/entrar">Ir para o login</Link>
        </Button>
      </div>
    );
  }

  const field = (key: keyof Values, label: string, props: React.ComponentProps<typeof Input> = {}) => (
    <div className="space-y-1">
      <Label htmlFor={`cad-${key}`}>{label}</Label>
      <Input
        id={`cad-${key}`}
        value={values[key]}
        onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
        aria-invalid={errors[key] ? true : undefined}
        {...props}
      />
      {errors[key] ? <p className="text-sm text-destructive">{errors[key]}</p> : null}
    </div>
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <p className="ornament justify-center">Cadastro de cliente</p>
      <h1 className="mt-3 text-center text-4xl font-bold md:text-5xl">Crie seu cadastro</h1>
      <p className="mt-3 text-center text-muted-foreground">
        Com o cadastro feito, suas reservas ficam prontas em poucos cliques.
      </p>

      <div className="stitched mt-10 rounded-md border bg-card p-6 shadow-warm md:p-10">
        <SocialSignIn redirectTo="/conta" />
        <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> ou preencha <span className="h-px flex-1 bg-border" />
        </div>
        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2" noValidate>
          <div className="sm:col-span-2">{field("full_name", "Nome completo", { autoComplete: "name" })}</div>
          {field("phone", "Telefone (com DDD)", { inputMode: "tel", autoComplete: "tel" })}
          {field("cpf", "CPF", { inputMode: "numeric" })}
          <div className="sm:col-span-2">{field("cnh", "Número da CNH", { inputMode: "numeric" })}</div>
          {field("email", "E-mail", { type: "email", autoComplete: "email" })}
          {field("password", "Senha", { type: "password", autoComplete: "new-password" })}
          {formError ? <p className="text-sm text-destructive sm:col-span-2">{formError}</p> : null}
          <div className="sm:col-span-2">
            <Button type="submit" size="lg" className="h-12 w-full text-base" disabled={loading}>
              {loading ? "Criando cadastro..." : "Criar cadastro"}
            </Button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Já tem cadastro?{" "}
          <Link to="/entrar" className="font-medium text-primary underline-offset-4 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}

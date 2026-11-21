import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { BadgeCheck, CreditCard, Banknote, QrCode } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ProfileForm } from "@/components/site/profile-form";
import { supabase } from "@/integrations/supabase/client";
import { getCar } from "@/data/cars";
import { profileQuery } from "@/lib/account";
import { isProfileComplete } from "@/lib/profile-schema";
import { checkRental, formatBRL, formatDateBR, todayIso } from "@/lib/pricing";

type PaymentSearch = { carro?: string; retirada?: string; devolucao?: string };

export const Route = createFileRoute("/_authenticated/pagamento")({
  validateSearch: (s: Record<string, unknown>): PaymentSearch => {
    const out: PaymentSearch = {};
    const carro = s["carro"];
    const retirada = s["retirada"];
    const devolucao = s["devolucao"];
    if (typeof carro === "string") out.carro = carro;
    if (typeof retirada === "string") out.retirada = retirada;
    if (typeof devolucao === "string") out.devolucao = devolucao;
    return out;
  },
  loader: ({ context }) => context.queryClient.ensureQueryData(profileQuery(context.userId)),
  head: () => ({
    meta: [
      { title: "Pagamento — Aura Aluguel de Automóveis" },
      { name: "description", content: "Confira sua reserva e escolha a forma de pagamento." },
      { property: "og:title", content: "Pagamento — Aura" },
      { property: "og:description", content: "Confira sua reserva e escolha a forma de pagamento." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  errorComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Não foi possível carregar o pagamento</h1>
      <Button asChild className="mt-6"><Link to="/frota">Voltar à frota</Link></Button>
    </div>
  ),
  notFoundComponent: () => null,
  component: PagamentoPage,
});

const methods = [
  { value: "pix_retirada", label: "Pix na retirada", icon: QrCode },
  { value: "cartao_retirada", label: "Cartão na retirada", icon: CreditCard },
  { value: "dinheiro_retirada", label: "Dinheiro na retirada", icon: Banknote },
] as const;

function PagamentoPage() {
  const { userId } = Route.useRouteContext();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const queryClient = useQueryClient();
  const { data: profile } = useSuspenseQuery(profileQuery(userId));
  const [method, setMethod] = useState<string>("pix_retirada");
  const [today, setToday] = useState("");
  const [done, setDone] = useState<{ id: string } | null>(null);

  useEffect(() => setToday(todayIso()), []);

  const car = search.carro ? getCar(search.carro) : undefined;
  const pickup = search.retirada ?? "";
  const returnDate = search.devolucao ?? "";
  const check = car && today ? checkRental(pickup, returnDate, car.dailyPriceCents, today) : null;
  const profileOk = isProfileComplete(profile);

  const reserve = useMutation({
    mutationFn: async () => {
      if (!car || !check?.ok) throw new Error("invalid");
      const { data, error } = await supabase
        .from("reservations")
        .insert({
          user_id: userId,
          car_id: car.id,
          car_name: car.name,
          pickup_date: pickup,
          return_date: returnDate,
          days: check.days,
          daily_price_cents: car.dailyPriceCents,
          total_cents: check.totalCents,
          payment_method: method,
        })
        .select("id")
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["reservations", userId] });
      setDone({ id: data.id });
    },
    onError: () => toast.error("Não foi possível registrar a reserva. Tente novamente."),
  });

  if (!car) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-4xl font-bold">Escolha um carro primeiro</h1>
        <p className="mt-3 text-muted-foreground">Selecione o veículo e as datas na frota para chegar ao pagamento.</p>
        <Button asChild className="mt-6"><Link to="/frota">Ver a frota</Link></Button>
      </div>
    );
  }

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <BadgeCheck className="mx-auto size-16 text-aqua" />
        <h1 className="mt-4 text-4xl font-bold">Reserva registrada!</h1>
        <p className="mt-3 text-muted-foreground">
          Código <strong className="font-mono">{done.id.slice(0, 8).toUpperCase()}</strong> · {car.name} de{" "}
          {formatDateBR(pickup)} a {formatDateBR(returnDate)}.
        </p>
        <p className="mt-2 text-muted-foreground">O pagamento será feito na retirada do carro.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild><Link to="/conta">Ver minhas reservas</Link></Button>
          <Button asChild variant="outline"><Link to="/frota">Voltar à frota</Link></Button>
        </div>
      </div>
    );
  }

  const setDates = (next: { retirada?: string; devolucao?: string }) =>
    void navigate({ to: ".", search: (prev) => ({ ...prev, ...next }), replace: true });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="ornament">Pagamento</p>
      <h1 className="mt-3 text-4xl font-bold md:text-5xl">Finalize sua reserva</h1>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="space-y-8">
          {!profileOk ? (
            <section className="rounded-md border bg-card p-6 shadow-neon">
              <h2 className="text-2xl font-semibold">1. Complete seu cadastro</h2>
              <p className="mt-1 text-sm text-muted-foreground">Precisamos desses dados para liberar o carro.</p>
              <div className="mt-5">
                <ProfileForm
                  userId={userId}
                  initial={{
                    full_name: profile?.full_name ?? "",
                    phone: profile?.phone ?? "",
                    cpf: profile?.cpf ?? "",
                    cnh: profile?.cnh ?? "",
                  }}
                  submitLabel="Salvar e continuar"
                />
              </div>
            </section>
          ) : (
            <section className="rounded-md border bg-card p-6 shadow-neon">
              <h2 className="text-2xl font-semibold">1. Seus dados</h2>
              <p className="mt-2 text-muted-foreground">
                {profile?.full_name} · CPF ***.{profile?.cpf.slice(3, 6)}.***-{profile?.cpf.slice(9)}
              </p>
              <Link to="/conta" className="mt-1 inline-block text-sm text-primary underline-offset-4 hover:underline">
                Alterar dados
              </Link>
            </section>
          )}

          <section className="rounded-md border bg-card p-6 shadow-neon">
            <h2 className="text-2xl font-semibold">2. Datas</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="pg-pickup">Retirada</Label>
                <Input id="pg-pickup" type="date" min={today || undefined} value={pickup} onChange={(e) => setDates({ retirada: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="pg-return">Devolução</Label>
                <Input id="pg-return" type="date" min={pickup || today || undefined} value={returnDate} onChange={(e) => setDates({ devolucao: e.target.value })} />
              </div>
            </div>
            {check && !check.ok ? <p className="mt-3 text-sm text-destructive">{check.reason}</p> : null}
          </section>

          <section className="rounded-md border bg-card p-6 shadow-neon">
            <h2 className="text-2xl font-semibold">3. Forma de pagamento</h2>
            <RadioGroup value={method} onValueChange={setMethod} className="mt-4 grid gap-3">
              {methods.map((m) => (
                <Label
                  key={m.value}
                  htmlFor={`pm-${m.value}`}
                  className="flex cursor-pointer items-center gap-3 rounded-md border bg-background p-4 font-normal has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-secondary/60"
                >
                  <RadioGroupItem id={`pm-${m.value}`} value={m.value} />
                  <m.icon className="size-5 text-primary" />
                  <span className="text-base">{m.label}</span>
                </Label>
              ))}
              <div className="flex items-center gap-3 rounded-md border p-4 text-muted-foreground">
                <CreditCard className="size-5" />
                <span>Cartão online — em breve</span>
              </div>
            </RadioGroup>
          </section>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="neon-edge overflow-hidden rounded-md border bg-card shadow-neon">
            <img src={car.photos[0].src} alt={car.photos[0].alt} className="aspect-[16/9] w-full object-cover" />
            <div className="space-y-4 p-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{car.category}</p>
                <h2 className="text-2xl font-semibold">{car.name}</h2>
              </div>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Retirada</dt><dd>{pickup ? formatDateBR(pickup) : "—"}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Devolução</dt><dd>{returnDate ? formatDateBR(returnDate) : "—"}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Diária</dt><dd>{formatBRL(car.dailyPriceCents)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Diárias</dt><dd>{check?.ok ? check.days : "—"}</dd></div>
              </dl>
              <div className="flex items-end justify-between border-t pt-4">
                <span className="font-display text-lg">Total</span>
                <span className="font-display text-3xl font-bold text-primary">{check?.ok ? formatBRL(check.totalCents) : "—"}</span>
              </div>
              <Button
                size="lg"
                className="h-12 w-full text-base"
                disabled={!check?.ok || !profileOk || reserve.isPending}
                onClick={() => reserve.mutate()}
              >
                {reserve.isPending ? "Registrando..." : "Confirmar reserva"}
              </Button>
              {!profileOk ? <p className="text-center text-xs text-muted-foreground">Complete seu cadastro para confirmar.</p> : null}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

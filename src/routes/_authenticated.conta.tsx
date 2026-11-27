import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ProfileForm } from "@/components/site/profile-form";
import { getCar } from "@/data/cars";
import { paymentMethodLabels, profileQuery, reservationsQuery, statusLabels } from "@/lib/account";
import { formatBRL, formatDateBR } from "@/lib/pricing";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/conta")({
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(profileQuery(context.userId)),
      context.queryClient.ensureQueryData(reservationsQuery(context.userId)),
    ]);
  },
  head: () => ({
    meta: [
      { title: "Minha conta — Aura Aluguel de Automóveis" },
      { name: "description", content: "Seus dados de cadastro e suas reservas na Aura." },
      { property: "og:title", content: "Minha conta — Aura" },
      { property: "og:description", content: "Seus dados de cadastro e suas reservas na Aura." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  errorComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Não foi possível carregar sua conta</h1>
      <Button asChild className="mt-6"><Link to="/">Voltar ao início</Link></Button>
    </div>
  ),
  notFoundComponent: () => null,
  component: ContaPage,
});

function ContaPage() {
  const { userId, email } = Route.useRouteContext();
  const queryClient = useQueryClient();
  const { data: profile } = useSuspenseQuery(profileQuery(userId));
  const { data: reservations } = useSuspenseQuery(reservationsQuery(userId));

  const cancelReservation = useMutation({
    mutationFn: async (reservationId: string) => {
      const { error } = await supabase.from("reservations").update({ status: "cancelada" }).eq("id", reservationId).eq("user_id", userId).eq("status", "pendente");
      if (error) throw error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["reservations", userId] });
      toast.success("Reserva cancelada com sucesso.");
    },
    onError: () => toast.error("Não foi possível cancelar. Tente novamente."),
  });

  const handleCancel = (id: string) => {
    if (window.confirm("Deseja realmente cancelar esta reserva?")) cancelReservation.mutate(id);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="ornament">Minha conta</p>
      <h1 className="mt-3 text-4xl font-bold md:text-5xl">
        Olá{profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}!
      </h1>
      <p className="mt-2 text-muted-foreground">{email}</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <section className="neon-edge rounded-2xl bg-card p-6">
          <h2 className="text-2xl font-semibold">Meus dados</h2>
          <div className="mt-5">
            <ProfileForm userId={userId} initial={{
              full_name: profile?.full_name ?? "",
              phone: profile?.phone ?? "",
              cpf: profile?.cpf ?? "",
              cnh: profile?.cnh ?? "",
            }} />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Minhas reservas</h2>
          {reservations.length === 0 ? (
            <div className="mt-4 rounded-md border p-8 text-center">
              <p className="text-muted-foreground">Você ainda não tem reservas.</p>
              <Button asChild className="mt-4"><Link to="/frota">Escolher um veículo</Link></Button>
            </div>
          ) : (
            <ul className="mt-4 space-y-4">
              {reservations.map((r) => {
                const car = getCar(r.car_id);
                return (
                  <li key={r.id} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 neon-edge rounded-2xl bg-card p-4">
                    {car ? <img src={car.photos[0].src} alt="" className="size-20 shrink-0 rounded-sm object-cover sm:h-20 sm:w-28" /> : <div className="size-20 rounded-sm bg-muted" />}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="truncate text-xl font-semibold">{r.car_name}</h3>
                        <span className="rounded-sm bg-secondary px-2 py-0.5 text-xs font-semibold uppercase tracking-wider">{statusLabels[r.status] ?? r.status}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{formatDateBR(r.pickup_date)} a {formatDateBR(r.return_date)} · {r.days} {r.days === 1 ? "diária" : "diárias"}</p>
                      <p className="mt-1 text-sm"><strong className="text-primary">{formatBRL(r.total_cents)}</strong><span className="text-muted-foreground"> · {paymentMethodLabels[r.payment_method] ?? r.payment_method}</span></p>
                      <p className="mt-1 font-mono text-xs text-muted-foreground">Código {r.id.slice(0, 8).toUpperCase()}</p>
                      {r.status === "pendente" && <Button variant="destructive" size="sm" className="mt-3" disabled={cancelReservation.isPending} onClick={() => handleCancel(r.id)}>Cancelar reserva</Button>}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

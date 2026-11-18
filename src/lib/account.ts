import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const profileQuery = (userId: string) =>
  queryOptions({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, phone, cpf, cnh")
        .eq("id", userId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

export const reservationsQuery = (userId: string) =>
  queryOptions({
    queryKey: ["reservations", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reservations")
        .select("id, car_id, car_name, pickup_date, return_date, days, total_cents, payment_method, status, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export const paymentMethodLabels: Record<string, string> = {
  pix_retirada: "Pix na retirada",
  cartao_retirada: "Cartão na retirada",
  dinheiro_retirada: "Dinheiro na retirada",
};

export const statusLabels: Record<string, string> = {
  pendente: "Aguardando pagamento",
  paga: "Paga",
  cancelada: "Cancelada",
};

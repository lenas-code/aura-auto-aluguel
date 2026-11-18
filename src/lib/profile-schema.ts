import { z } from "zod";

const digits = (value: string) => value.replace(/\D/g, "");

export const profileSchema = z.object({
  full_name: z.string().trim().min(3, "Informe seu nome completo").max(120),
  phone: z
    .string()
    .transform(digits)
    .refine((v) => v.length === 10 || v.length === 11, "Telefone com DDD, ex.: (11) 98888-7777"),
  cpf: z.string().transform(digits).refine((v) => v.length === 11, "CPF precisa ter 11 números"),
  cnh: z.string().transform(digits).refine((v) => v.length === 11, "CNH precisa ter 11 números"),
});

export type ProfileInput = z.input<typeof profileSchema>;
export type ProfileData = z.output<typeof profileSchema>;

export function isProfileComplete(p: { full_name: string; phone: string; cpf: string; cnh: string } | null | undefined) {
  if (!p) return false;
  return profileSchema.safeParse(p).success;
}

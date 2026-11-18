import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { profileSchema, type ProfileInput } from "@/lib/profile-schema";

type Props = {
  userId: string;
  initial: ProfileInput;
  submitLabel?: string;
  onSaved?: () => void;
};

export function ProfileForm({ userId, initial, submitLabel = "Salvar dados", onSaved }: Props) {
  const queryClient = useQueryClient();
  const [values, setValues] = useState<ProfileInput>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof ProfileInput, string>>>({});

  const save = useMutation({
    mutationFn: async (input: ProfileInput) => {
      const parsed = profileSchema.parse(input);
      const { error } = await supabase.from("profiles").upsert({ id: userId, ...parsed });
      if (error) throw error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile", userId] });
      toast.success("Dados salvos!");
      onSaved?.();
    },
    onError: () => toast.error("Não foi possível salvar. Tente novamente."),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = profileSchema.safeParse(values);
    if (!result.success) {
      const next: Partial<Record<keyof ProfileInput, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ProfileInput | undefined;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    save.mutate(values);
  };

  const field = (key: keyof ProfileInput, label: string, props: React.ComponentProps<typeof Input> = {}) => (
    <div className="space-y-1">
      <Label htmlFor={`pf-${key}`}>{label}</Label>
      <Input
        id={`pf-${key}`}
        value={values[key]}
        onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
        aria-invalid={errors[key] ? true : undefined}
        {...props}
      />
      {errors[key] ? <p className="text-sm text-destructive">{errors[key]}</p> : null}
    </div>
  );

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">{field("full_name", "Nome completo", { autoComplete: "name" })}</div>
      {field("phone", "Telefone (com DDD)", { inputMode: "tel", autoComplete: "tel" })}
      {field("cpf", "CPF", { inputMode: "numeric" })}
      <div className="sm:col-span-2">{field("cnh", "Número da CNH", { inputMode: "numeric" })}</div>
      <div className="sm:col-span-2">
        <Button type="submit" disabled={save.isPending}>
          {save.isPending ? "Salvando..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

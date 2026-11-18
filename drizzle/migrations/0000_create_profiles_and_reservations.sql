CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  cpf text NOT NULL DEFAULT '',
  cnh text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own profile select" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, cpf, cnh)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'cpf', ''),
    COALESCE(NEW.raw_user_meta_data->>'cnh', '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;
CREATE TRIGGER profiles_touch BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  car_id text NOT NULL,
  car_name text NOT NULL,
  pickup_date date NOT NULL,
  return_date date NOT NULL,
  days integer NOT NULL,
  daily_price_cents integer NOT NULL,
  total_cents integer NOT NULL,
  payment_method text NOT NULL DEFAULT 'cartao',
  status text NOT NULL DEFAULT 'pendente',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX reservations_user_idx ON public.reservations(user_id);
GRANT SELECT, INSERT ON public.reservations TO authenticated;
GRANT ALL ON public.reservations TO service_role;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own reservations select" ON public.reservations FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Own reservations insert pending" ON public.reservations FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND status = 'pendente');

CREATE OR REPLACE FUNCTION public.validate_reservation()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.return_date <= NEW.pickup_date THEN
    RAISE EXCEPTION 'A devolução deve ser depois da retirada';
  END IF;
  IF NEW.days <> (NEW.return_date - NEW.pickup_date) THEN
    RAISE EXCEPTION 'Número de diárias inválido';
  END IF;
  IF NEW.total_cents <> NEW.days * NEW.daily_price_cents THEN
    RAISE EXCEPTION 'Total inválido';
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER reservations_validate BEFORE INSERT ON public.reservations
FOR EACH ROW EXECUTE FUNCTION public.validate_reservation();
-- Allow authenticated users to cancel only their own pending reservations.
CREATE POLICY "Own pending reservations cancel"
ON public.reservations
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id AND status = 'pendente')
WITH CHECK (auth.uid() = user_id AND status = 'cancelada');

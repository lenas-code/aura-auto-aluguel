-- Prevent simultaneous/overlapping rentals of the same vehicle at the database level.
-- Return dates are exclusive: a rental ending on a date permits pickup that same date.
CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE public.reservations
  ADD CONSTRAINT reservations_car_dates_no_overlap
  EXCLUDE USING gist (
    car_id WITH =,
    daterange(pickup_date, return_date, '[)') WITH &&
  )
  WHERE (status NOT IN ('cancelado', 'cancelled', 'canceled'));

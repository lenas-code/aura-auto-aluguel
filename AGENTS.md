<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

<!-- AGENT-MEMORY:BEGIN -->
## Project rules
- Fleet data (cars, tiers, prices, 3 photos each) lives in `src/data/cars.ts` (original cars) plus `src/data/cars-extra.ts`, `src/data/cars-extra2.ts` and `src/data/motos.ts` (photos resolved via `import.meta.glob` on `src/assets/fleet`), not the database — fixed catalog edited with the code; `src/test/fleet.test.ts` guards 3 photos per vehicle.
- Motorcycles reuse the `Car` type with `kind: "moto"`; `cars` excludes them, `vehicles` holds both and `getCar` searches both, because reservations reference any vehicle by id. Moto pages are `/motos` and `/motos/$motoId` (old `/frota/<moto>` links redirect); both detail routes render `components/site/vehicle-detail.tsx`.
- Design tokens live in `src/styles.css` (Miami night palette, `neon-edge`, `miami-night`, `ornament`, `text-gradient-sunset`); gradient utilities avoid names like `text-sunset` because `--color-sunset` would generate a same-named color utility that overrides them.
- Car photos are real free-licensed Wikimedia Commons photos hosted as `src/assets/fleet/*.asset.json` CDN pointers; each photo keeps its author/license credit, shown on the car page, because CC licenses require attribution.
- Rental math (days, total, date rules) lives in `src/lib/pricing.ts` with tests in `src/test/pricing.test.ts`; the DB trigger `validate_reservation` re-checks days/total on insert.
- Signed-in pages live under the pathless `_authenticated` layout with `ssr: false`, because the Supabase session is in browser storage; data is protected by RLS.
- Reservations are inserted by the client only with status `pendente`; any status change (e.g. paid) must come from server code, never the browser.
- Route files use dot naming (`frota.$carId.tsx`, `_authenticated.conta.tsx`), not folders.
- Fleet search (brand, name, type) lives in `src/lib/car-search.ts` with tests in `src/test/car-search.test.ts`; it matches only identifying facts (name, brand, category, tier, kind, features, fuel, transmission); "moto" maps to the marker word "motocicleta" because "moto" is inside "motor" — never tagline/description, because marketing prose calls a pickup an SUV.
<!-- AGENT-MEMORY:END -->

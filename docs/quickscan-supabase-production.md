# Quickscan naar productie

Dit project gebruikt voor de quickscan:

- Vite frontend
- Supabase database
- Supabase Edge Function `quickscan-submit`

De lokale flow is nu:

- frontend -> Edge Function
- Edge Function -> `public.quickscan_submissions`

## 1. Frontend env-vars

Maak in productie deze frontend-variabelen beschikbaar:

```bash
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<publishable-key>
```

Gebruik lokaal `.env.local` en in productie je hostingprovider-envs.

## 2. Supabase project koppelen

```bash
npx supabase login
npx supabase link --project-ref <project-ref>
```

## 3. Database schema deployen

De quickscan gebruikt deze migration:

- `supabase/migrations/20260415153000_create_quickscan_submissions.sql`

Deploy naar je gekoppelde project:

```bash
npx supabase db push
```

## 4. Edge Function deployen

De quickscan submit loopt via:

- `supabase/functions/quickscan-submit/index.ts`

Omdat de quickscan publiek toegankelijk is, deploy je deze function zonder JWT-verificatie:

```bash
npx supabase functions deploy quickscan-submit --no-verify-jwt
```

## 5. Secrets

Voor deze function zijn op productie geen extra custom secrets nodig zolang de function alleen:

- de payload valideert
- in dezelfde Supabase-projectdatabase schrijft

De function leest in productie eerst:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Lokaal valt hij terug op:

- `LOCAL_SUPABASE_URL`
- `LOCAL_SUPABASE_SERVICE_ROLE_KEY`

Die lokale waarden staan in:

- `supabase/functions/.env.local`

## 6. Wat lokaal blijft

Lokaal gebruik je:

- `npx supabase start`
- `npx supabase db reset`
- `npx supabase functions serve quickscan-submit --env-file supabase/functions/.env.local`

Frontend lokaal:

```bash
npm run dev
```

## 7. Productie-checklist

Voor livegang controleren:

1. Frontend env-vars staan goed.
2. Migration is gepusht.
3. Function is gedeployed met `--no-verify-jwt`.
4. Quickscan submission komt binnen in `quickscan_submissions`.
5. `recommended_next_step`, `main_ai_opportunity`, `total_score` en `classification` worden correct opgeslagen.
6. Directe inserts naar de tabel zijn niet meer toegestaan buiten de function.

## 8. Volgende uitbreiding

De huidige productieklare basis is:

- payload validatie
- Edge Function submit
- veilige insert via backendlaag

Latere uitbreidingen kunnen hierop voortbouwen:

- website scraping
- AI-analyse op site-inhoud
- CRM/webhook push
- rate limiting / anti-spam
- extra leadstatusvelden

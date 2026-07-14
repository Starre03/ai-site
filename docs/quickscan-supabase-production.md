# Funnel naar productie

De contactformulieren en quickscan gebruiken dezelfde productieketen:

- Vite-frontend
- Supabase Edge Functions `intake-submit` en `quickscan-submit`
- Supabase-tabellen `intake_submissions` en `quickscan_submissions`
- Resend voor de interne melding en bevestiging aan de bezoeker

## 1. Frontendvariabelen

Zet deze waarden in Vercel Production:

```bash
VITE_SUPABASE_URL=https://ncotqxnyhmntyovaqfcg.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<production-publishable-key>
```

`.env.local` wijst bewust naar de lokale Supabase-omgeving en hoort niet in productie te worden gebruikt.

## 2. Supabase koppelen

```bash
npx supabase login
npx supabase link --project-ref ncotqxnyhmntyovaqfcg
```

## 3. Database

Voor deze release is geen database migration nodig. De frontend stuurt een idempotency-key mee en de Edge Function zet die via SHA-256 om in een geldige, deterministische UUID. De bestaande primary key van de submissiontabel blokkeert daardoor dubbele rijen atomair.

Een oudere gecachete frontend zonder idempotency-key blijft compatibel: in dat geval gebruikt de database de bestaande `gen_random_uuid()` default.

## 4. E-mailsecrets controleren

Beide functions gebruiken:

```bash
RESEND_API_KEY=<resend-api-key>
NOTIFICATION_EMAIL=<intern-ontvangstadres>
```

Supabase levert `SUPABASE_URL` en `SUPABASE_SERVICE_ROLE_KEY` zelf aan hosted Edge Functions. Zet de Resend-secrets alleen als ze nog niet in het gekoppelde project staan:

```bash
npx supabase secrets set RESEND_API_KEY=<resend-api-key> NOTIFICATION_EMAIL=<intern-ontvangstadres>
```

## 5. Functions deployen

Beide endpoints zijn publiek en valideren de payload zelf. Deploy ze daarom zonder JWT-verificatie:

```bash
npx supabase functions deploy intake-submit --no-verify-jwt
npx supabase functions deploy quickscan-submit --no-verify-jwt
```

## 6. Frontend publiceren

Pas na de secretcheck en functions wordt de frontend naar `main` gemerged/gepusht. Vercel publiceert `main` automatisch naar `starreai.com`.

De veilige volgorde is dus:

1. Supabase-secrets controleren;
2. beide Edge Functions deployen;
3. frontend naar `main`;
4. gecontroleerde productietest.

## 7. Productietest

Gebruik per formulier een herkenbaar testadres en controleer:

1. intake/contact toont pas succes na een geslaagde serverresponse;
2. de rij staat één keer in `intake_submissions`;
3. quickscan toont bij een serverfout een retry en nog geen resultaat;
4. een geslaagde quickscan staat één keer in `quickscan_submissions`;
5. opnieuw versturen met dezelfde idempotency-key maakt geen dubbele rij of dubbele mail;
6. `recommended_next_step`, `main_ai_opportunity`, `total_score` en `classification` zijn opgeslagen;
7. de interne melding komt aan op `NOTIFICATION_EMAIL`;
8. de bevestigingsmail komt aan bij de bezoeker;
9. browserconsole en functionlogs bevatten geen naam, e-mailadres, telefoonnummer of antwoorden.

## 8. Rollback

Als de productietest mislukt, rol dan eerst alleen de frontenddeployment terug in Vercel. De nieuwe functions blijven compatibel met de vorige frontend; er is geen schemawijziging die teruggedraaid hoeft te worden.

## 9. Lokaal ontwikkelen

Met een draaiende Docker/Supabase-installatie:

```bash
npx supabase start
npx supabase db reset
npx supabase functions serve intake-submit --env-file supabase/functions/.env.local
npx supabase functions serve quickscan-submit --env-file supabase/functions/.env.local
npm run dev
```

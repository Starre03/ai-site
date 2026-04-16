# CLAUDE.md — starre.ai project context

## Project
Marketing-site voor **starre.ai** — AI audit, integraties en OpenClaw agents voor bedrijven.
React SPA, gehost op Vercel, domein: `starreai.com`.

## Commands
- `npm run dev` — lokale dev server (Vite, port 5173)
- `npm run build` — productie build
- `npm run preview` — preview productie build lokaal
- `npx supabase functions serve` — lokaal Edge Functions draaien

## Tech stack
- **React 18** + **React Router v6** (SPA, client-side routing)
- **Vite 5** — bundler, dev server, env injection via `import.meta.env.VITE_*`
- **Supabase** — Edge Functions + Postgres (project: `ncotqxnyhmntyovaqfcg`)
- **Vercel** — hosting, auto-deploy op push naar `main`
- Geen CSS framework — inline styles met gedeelde theme tokens

## Architecture
Alle styling is inline met gedeelde constanten uit `src/lib/theme.js`:
- `C` — kleurenpalet (dark + light variants)
- `BODY` / `DISPLAY` — font stacks
- `shell` — layout containers (content, sectionText)

Homepage secties wisselen af: **dark** (`C.bg`) en **light** (`C.lightBg`).
Componenten accepteren een `light` prop om kleuren om te keren.

### Key directories
```
src/
  pages/          — route-niveau pagina's (Home, Audit, Agents, QuickscanPage, etc.)
  components/     — herbruikbare UI (ui.jsx, Faq.jsx, InteractiveDemo.jsx, etc.)
  components/quickscan/  — quickscan-specifieke form components
  lib/theme.js    — design tokens en kleuren
  lib/quickscan/  — quickscan scoring, config, flow-logica
  lib/supabase/   — Supabase client + quickscan submission helper
  styles/         — global.css (card grids, base resets)
supabase/
  functions/      — Edge Functions (quickscan-submit)
  migrations/     — SQL migraties
```

### Key files
| Bestand | Wat |
|---|---|
| `src/lib/theme.js` | Alle kleuren, fonts, layout tokens |
| `src/components/ui.jsx` | SmoothSection, GlowCard, PrimaryButton, SectionHeading, BulletList |
| `src/pages/Home.jsx` | Homepage met alle secties |
| `src/pages/QuickscanPage.jsx` | Quickscan flow (multi-step form → scoring → result) |
| `src/lib/supabase/quickscan.js` | Submission naar Edge Function met retry-logica (3 pogingen) |
| `src/lib/quickscan/config.js` | Alle vragen, opties, labels, versie |
| `src/lib/quickscan/index.js` | Scoring, savings berekening, payload builder |
| `supabase/functions/quickscan-submit/index.ts` | Edge Function: validatie → mapping → insert |
| `index.html` | SEO meta tags, JSON-LD schema |

## Environment variables
Vite injecteert env vars **at build time**. Na wijziging in Vercel → redeploy nodig.

| Var | Waar |
|---|---|
| `VITE_SUPABASE_URL` | Vercel env (alle environments) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Vercel env (alle environments) |

Lokaal: maak `.env` aan met dezelfde keys (staat in `.gitignore`).

## Deployment
- Push naar `main` → Vercel auto-deploy naar productie
- Edge Functions apart deployen: `npx supabase functions deploy quickscan-submit --no-verify-jwt`
- Bij env-wijzigingen in Vercel: handmatig redeploy triggeren (of nieuwe commit pushen)

## Design patterns
- **SmoothSection**: sticky sections met scroll-driven fade-out animatie
- **GlowCard**: kaarten met mouse-following radial gradient glow
- **Light/dark alternating**: secties wisselen af, `light` prop schakelt kleuren
- **TyperText**: rotating text in hero met typewriter effect
- Quickscan submission: `functions.invoke()` met 3x retry + backoff

## Gotchas
- Vite env vars moeten `VITE_` prefix hebben, anders niet beschikbaar in browser
- Na Vercel env wijziging moet je redeployen (of "Redeploy" zonder cache in dashboard)
- Supabase publishable key is NIET een JWT — `--no-verify-jwt` is vereist op de Edge Function
- RLS staat aan op `quickscan_submissions` — browser kan niet direct inserten, alleen via Edge Function met service role

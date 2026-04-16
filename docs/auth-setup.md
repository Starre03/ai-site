# Auth setup

De frontend heeft nu een minimale Supabase auth-flow:

- `/login` verstuurt een magic link naar bestaande accounts.
- `/auth/callback` wisselt de PKCE code om voor een sessie.
- `/admin` is beschermd en alleen bereikbaar met een geldige sessie.

## Vereist

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

## Redirect URLs

Zet in Supabase Auth exact deze callback URLs op de allow-list:

- `http://localhost:5173/auth/callback`
- `http://127.0.0.1:5173/auth/callback`
- `https://starreai.com/auth/callback`
- `https://www.starreai.com/auth/callback`

## Gedrag

- De login gebruikt `signInWithOtp()` met `shouldCreateUser: false`, dus onbekende e-mailadressen worden niet als nieuw account aangemaakt.
- Sessies worden lokaal opgeslagen zodat beschermde routes blijven werken na een refresh.

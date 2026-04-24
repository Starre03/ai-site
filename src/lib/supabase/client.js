import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const authStorageKey = "starleo-auth";
const isLocal =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

export function hasSupabaseConfig() {
  return Boolean(supabaseUrl && supabasePublishableKey);
}

export const supabase = hasSupabaseConfig()
  ? createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
        // PKCE vereist dat de magic link in dezelfde browser geopend wordt als
        // waar hij aangevraagd is (verifier zit in localStorage). Lokaal opent
        // macOS links soms in een andere browser → implicit flow vermijdt dit.
        flowType: isLocal ? "implicit" : "pkce",
        storageKey: authStorageKey,
      },
    })
  : null;

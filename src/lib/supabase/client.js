import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (typeof window !== "undefined") {
  console.log("[supabase] config present:", {
    hasUrl: Boolean(supabaseUrl),
    hasKey: Boolean(supabasePublishableKey),
    urlPreview: supabaseUrl ? `${supabaseUrl.slice(0, 30)}…` : null,
  });
}

export function hasSupabaseConfig() {
  return Boolean(supabaseUrl && supabasePublishableKey);
}

export const supabase = hasSupabaseConfig()
  ? createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

import { hasSupabaseConfig, supabase } from "./client.js";

export async function saveQuickscanSubmission(payload) {
  if (!hasSupabaseConfig() || !supabase) {
    return {
      ok: false,
      skipped: true,
      reason: "missing_supabase_env",
    };
  }

  const { data, error } = await supabase.functions.invoke("quickscan-submit", {
    body: payload,
  });

  if (error) {
    return {
      ok: false,
      skipped: false,
      error,
    };
  }

  return {
    ok: true,
    skipped: false,
    data: {
      id: data?.id || null,
    },
  };
}

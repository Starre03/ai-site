import { hasSupabaseConfig, supabase } from "./client.js";

const MAX_ATTEMPTS = 3;
const BASE_DELAY_MS = 600;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function invokeOnce(payload) {
  const { data, error } = await supabase.functions.invoke("intake-submit", {
    body: payload,
  });

  return { data, error };
}

export async function saveIntakeSubmission(payload) {
  if (!hasSupabaseConfig() || !supabase) {
    return {
      ok: false,
      skipped: true,
      reason: "missing_supabase_env",
    };
  }

  let lastError = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const { data, error } = await invokeOnce(payload);

      if (!error) {
        return {
          ok: true,
          skipped: false,
          attempts: attempt,
          data: {
            id: data?.id || null,
          },
        };
      }

      lastError = error;
    } catch (thrown) {
      lastError = thrown;
    }

    if (attempt < MAX_ATTEMPTS) {
      await delay(BASE_DELAY_MS * attempt);
    }
  }

  return {
    ok: false,
    skipped: false,
    attempts: MAX_ATTEMPTS,
    error: lastError,
  };
}

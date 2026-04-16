import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { buildAuthCallbackUrl, DEFAULT_AUTH_REDIRECT, normalizeAuthRedirectPath } from "../lib/supabase/auth.js";
import { hasSupabaseConfig, supabase } from "../lib/supabase/client.js";

const AuthContext = createContext({
  authError: "",
  isAuthenticated: false,
  isConfigured: false,
  session: null,
  signInWithMagicLink: async () => ({ error: new Error("Supabase auth is not configured.") }),
  signOut: async () => ({ error: new Error("Supabase auth is not configured.") }),
  status: "unavailable",
  user: null,
});

export function AuthProvider({ children }) {
  const [status, setStatus] = useState(hasSupabaseConfig() ? "loading" : "unavailable");
  const [session, setSession] = useState(null);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    if (!hasSupabaseConfig() || !supabase) {
      setStatus("unavailable");
      return undefined;
    }

    let active = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;

      if (error) {
        setAuthError(error.message);
      }

      setSession(data.session ?? null);
      setStatus("ready");
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
      setAuthError("");
      setStatus("ready");
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      authError,
      isAuthenticated: Boolean(session?.user),
      isConfigured: hasSupabaseConfig(),
      session,
      signInWithMagicLink: async (email, next = DEFAULT_AUTH_REDIRECT) => {
        if (!supabase) {
          return { error: new Error("Supabase auth is not configured.") };
        }

        return supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: buildAuthCallbackUrl(normalizeAuthRedirectPath(next)),
            shouldCreateUser: false,
          },
        });
      },
      signOut: async () => {
        if (!supabase) {
          return { error: new Error("Supabase auth is not configured.") };
        }

        return supabase.auth.signOut({ scope: "local" });
      },
      status,
      user: session?.user ?? null,
    }),
    [authError, session, status],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

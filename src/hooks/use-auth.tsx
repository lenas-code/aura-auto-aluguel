import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "@tanstack/react-router";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

const AFTER_LOGIN_KEY = "aura:after-login";

type AuthState = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState>({
  user: null,
  loading: true,
  signOut: async () => {},
});

/** Remember where to go after a social sign-in round-trip (same-origin paths only). */
export function rememberAfterLogin(path: string | undefined) {
  if (path && path.startsWith("/") && !path.startsWith("//")) {
    sessionStorage.setItem(AFTER_LOGIN_KEY, path);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (event === "SIGNED_IN") {
        const next = sessionStorage.getItem(AFTER_LOGIN_KEY);
        if (next) {
          sessionStorage.removeItem(AFTER_LOGIN_KEY);
          router.history.push(next);
        }
      }
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        void router.invalidate();
      }
    });
    void supabase.auth.getSession().then(({ data: sessionData }) => {
      setUser(sessionData.session?.user ?? null);
      setLoading(false);
    });
    return () => data.subscription.unsubscribe();
  }, [router]);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.history.push("/");
  };

  return <AuthContext.Provider value={{ user, loading, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

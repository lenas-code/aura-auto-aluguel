import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

// The session lives in browser storage, so this gate runs only in the browser.
// It protects the screens; the data itself is protected by row-level security.
export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (!user) {
      throw redirect({ to: "/entrar", search: { redirect: location.href } });
    }
    return { userId: user.id, email: user.email ?? "" };
  },
  pendingComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-24 text-center text-muted-foreground">Carregando...</div>
  ),
  component: () => <Outlet />,
});

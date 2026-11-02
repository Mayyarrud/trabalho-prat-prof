import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createRouter,
  createHashHistory,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider, useAuth } from "@/auth/AuthProvider";
import { resolveAuthCallback } from "@/auth/auth-redirect";
import { supabase } from "@/lib/supabase";
import { Toaster } from "@/components/toast";
import { routeTree } from "./routeTree.gen";
import "./styles.css";

function createAppRouter() {
  return createRouter({
    routeTree,
    history: createHashHistory(),
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createAppRouter>;
  }
}

const queryClient = new QueryClient();
const root = createRoot(document.getElementById("root")!);

function AppRouter({ router }: { router: ReturnType<typeof createAppRouter> }) {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      void router.invalidate();
    }
  }, [router, user?.id, isLoading]);

  if (isLoading) {
    return (
      <p role="status" className="p-6 text-center">
        Carregando sua sessão...
      </p>
    );
  }

  return <RouterProvider router={router} />;
}

async function startApp() {
  const target = await resolveAuthCallback(window.location.href, (code) =>
    supabase.auth.exchangeCodeForSession(code),
  );

  if (target) {
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}#${target}`,
    );
  }

  const router = createAppRouter();

  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Toaster limit={3}>
          <AuthProvider>
            <AppRouter router={router} />
          </AuthProvider>
        </Toaster>
      </QueryClientProvider>
    </StrictMode>,
  );
}

root.render(
  <p role="status" className="p-6 text-center">
    Carregando...
  </p>,
);
void startApp();

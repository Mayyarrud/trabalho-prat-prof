import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/login-form";
import { safeNextPath } from "@/lib/safe-next-path";
import AuthPage from "@/pages/auth";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    next: safeNextPath(search.next),
  }),
  component: LoginPage,
});

function LoginPage() {
  const { next } = Route.useSearch();

  return (
    <AuthPage>
      <LoginForm next={next} />
    </AuthPage>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { SignUpForm } from "@/components/sign-up-form";
import { safeNextPath } from "@/lib/safe-next-path";
import AuthPage from "@/pages/auth";

export const Route = createFileRoute("/sign-up")({
  validateSearch: (search: Record<string, unknown>) => ({
    next: safeNextPath(search.next),
  }),
  component: SignUpPage,
});

function SignUpPage() {
  const { next } = Route.useSearch();

  return (
    <AuthPage>
      <SignUpForm next={next} />
    </AuthPage>
  );
}

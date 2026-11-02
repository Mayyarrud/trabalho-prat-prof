import { createFileRoute, redirect } from "@tanstack/react-router";
import { UpdatePasswordForm } from "@/components/update-password-form";
import { supabase } from "@/lib/supabase";
import AuthPage from "@/pages/auth";

export const Route = createFileRoute("/update-password")({
  beforeLoad: async () => {
    const { data, error } =
      await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    if (error || !data?.currentLevel) {
      throw redirect({
        to: "/login",
        search: { next: "/update-password" },
        replace: true,
      });
    }

    const isRecovery = data.currentAuthenticationMethods.some(
      (entry) =>
        (typeof entry === "string" ? entry : entry.method) === "recovery",
    );

    return { isRecovery };
  },
  component: UpdatePasswordPage,
});

function UpdatePasswordPage() {
  const { isRecovery } = Route.useRouteContext();

  return (
    <AuthPage>
      <UpdatePasswordForm
        key={isRecovery ? "recovery" : "change"}
        isRecovery={isRecovery}
      />
    </AuthPage>
  );
}

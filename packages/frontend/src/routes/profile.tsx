import { createFileRoute, redirect } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import ProfilePage from "@/pages/profile";

export const Route = createFileRoute("/profile")({
  beforeLoad: async ({ location }) => {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) {
      throw redirect({ to: "/login", search: { next: location.href }, replace: true });
    }
  },
  component: ProfilePage,
});

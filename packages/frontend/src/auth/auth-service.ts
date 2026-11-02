import { supabase } from "@/lib/supabase";
import { authRedirectUrl } from "./auth-redirect";

export function login(email: string, password: string, captchaToken: string) {
  return supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
    options: { captchaToken },
  });
}

export function register(
  name: string,
  email: string,
  password: string,
  surfLevel: string,
  captchaToken: string,
  next = "/",
) {
  return supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      captchaToken,
      data: {
        name: name.trim(),
        surf_level: surfLevel,
      },
      emailRedirectTo: authRedirectUrl(window.location.href, "signup", next),
    },
  });
}

export function logout() {
  return supabase.auth.signOut({ scope: "local" });
}

export function recoverPassword(email: string, captchaToken: string) {
  return supabase.auth.resetPasswordForEmail(email.trim(), {
    captchaToken,
    redirectTo: authRedirectUrl(window.location.href, "recovery"),
  });
}

export function reauthenticate() {
  return supabase.auth.reauthenticate();
}

export function updatePassword(
  password: string,
  options: { currentPassword?: string; nonce?: string } = {},
) {
  return supabase.auth.updateUser({
    password,
    current_password: options.currentPassword,
    nonce: options.nonce?.trim() || undefined,
  });
}

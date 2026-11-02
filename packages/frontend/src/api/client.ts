import { supabase } from "@/lib/supabase";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const headers = new Headers(options.headers);

  if (session) {
    headers.set("Authorization", `Bearer ${session.access_token}`);
  }

  return fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    ...options,
    headers,
  });
}

import { createClient } from "@supabase/supabase-js";
import validator from "validator";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_PUBLISHABLE_KEY;

if (!url) throw new Error("SUPABASE_URL não configurada.");
if (!key) throw new Error("SUPABASE_PUBLISHABLE_KEY não configurada.");

export const supabase = createClient(url, key, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

const issuer = `${url.replace(/\/$/, "")}/auth/v1`;

export interface AuthUser {
  id: string;
  email: string | null;
}

export async function getAuthUser(token: string): Promise<AuthUser | null> {
  try {
    const { data, error } = await supabase.auth.getClaims(token);
    if (error || !data) return null;

    const { sub, email, iss, aud, exp } = data.claims;
    const audiences = Array.isArray(aud) ? aud : [aud];

    if (!validator.isUUID(sub)) return null;
    if (iss !== issuer) return null;
    if (!audiences.includes("authenticated")) return null;
    if (typeof exp !== "number" || exp <= Date.now() / 1000) return null;

    return {
      id: sub.toLowerCase(),
      email: typeof email === "string" ? email : null,
    };
  } catch {
    return null;
  }
}

export function isProfileOwner(user: AuthUser | null, profileId: string) {
  return user !== null && user.id === profileId.toLowerCase();
}

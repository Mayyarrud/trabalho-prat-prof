import { apiFetch } from "./client";
import type { ProfileUpdate, UserProfile } from "@/models/user";

async function profileRequest(path: string, options: RequestInit = {}) {
  const response = await apiFetch(path, options);
  if (!response.ok) {
    if (response.status === 401) throw new Error("Sua sessão expirou. Entre novamente.");
    const data = await response.json().catch(() => null);
    throw new Error(data?.message ?? "Não foi possível atualizar seu perfil. Tente novamente.");
  }
  return response.json() as Promise<UserProfile>;
}

export function getMe(signal?: AbortSignal) {
  return profileRequest("/me", { signal });
}

export function updateMe(data: ProfileUpdate) {
  return profileRequest("/me", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function setFavouriteBeach(beachId: string | null) {
  return profileRequest("/me/favourite-beach", beachId === null
    ? { method: "DELETE" }
    : {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ beachId }),
    });
}

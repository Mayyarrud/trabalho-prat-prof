import type { Beach, BeachDetail } from "@/models/beach";

const API_URL = import.meta.env.VITE_API_URL;

export async function getBeach(
  id: string,
  signal?: AbortSignal,
): Promise<BeachDetail> {
  const response = await fetch(`${API_URL}/beaches/${encodeURIComponent(id)}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<BeachDetail>;
}

export async function searchBeaches(
  value?: string,
  signal?: AbortSignal,
): Promise<Beach[]> {
  const params = new URLSearchParams();

  if (value) {
    params.set("search", value);
  }

  const query = params.size > 0 ? `?${params.toString()}` : "";

  const response = await fetch(`${API_URL}/beaches${query}`, { signal });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<Beach[]>;
}

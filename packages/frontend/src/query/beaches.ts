import { queryOptions } from "@tanstack/react-query";

import { getBeach, searchBeaches } from "@/api/beaches";
import type { SurfLevel } from "@/enums/surf-level";

export function searchBeachesQueryOptions(search?: string) {
  return queryOptions({
    queryKey: ["beaches", { search }],
    queryFn: ({ signal }) => searchBeaches(search, signal),
  });
}

export function beachQueryOptions(id: string, surfLevel?: SurfLevel | null) {
  return queryOptions({
    queryKey: ["beaches", id, { surfLevel: surfLevel ?? null }],
    queryFn: ({ signal }) => getBeach(id, signal, surfLevel),
    placeholderData: (previous, query) => query?.queryKey[1] === id ? previous : undefined,
  });
}

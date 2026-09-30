import { queryOptions } from "@tanstack/react-query";

import { getBeach, searchBeaches } from "@/api/beaches";

export function searchBeachesQueryOptions(search?: string) {
  return queryOptions({
    queryKey: ["beaches", { search }],
    queryFn: ({ signal }) => searchBeaches(search, signal),
  });
}

export function beachQueryOptions(id: string) {
  return queryOptions({
    queryKey: ["beaches", id],
    queryFn: ({ signal }) => getBeach(id, signal),
  });
}

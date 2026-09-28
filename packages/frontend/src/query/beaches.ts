import { queryOptions } from "@tanstack/react-query";

import { getBeach, searchBeaches } from "@/api/beaches";

export function searchBeachesQueryOptions(search?: string) {
  return queryOptions({
    queryKey: ["beaches", { search }],
    queryFn: () => searchBeaches(search),
  });
}

export function beachQueryOptions(id: string) {
  return queryOptions({
    queryKey: ["beaches", id],
    queryFn: () => getBeach(id),
  });
}
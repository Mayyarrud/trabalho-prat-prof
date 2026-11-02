import { beachesCache, forecastsCache } from "../cache/data.ts";
import type { SurfLevel } from "../enums/surf-level.ts";
import normalizeString from "../utils/normalize-string.ts";
import { calculateSurfability } from "./surfability.ts";

export function searchBeaches(search?: string) {
  if (search === undefined) return beachesCache;

  const searchValue = normalizeString(search);
  return beachesCache.filter((beach) => normalizeString(beach.name).includes(searchValue));
}

export function getBeach(id: string, surfLevel?: SurfLevel) {
  const beach = beachesCache.find((beach) => beach.id === id);
  if (!beach) return null;

  const forecast = forecastsCache
  .filter((item) => item.idBeach === id)
  .sort(
    (a, b) =>
      a.forecastTime.getTime() -
      b.forecastTime.getTime(),
  );

  return {
    ...beach,
    forecast: surfLevel
      ? forecast.map((item) => ({
          ...item,
          surfability: calculateSurfability(
            item,
            surfLevel,
          ),
        }))
      : forecast,
  };
}

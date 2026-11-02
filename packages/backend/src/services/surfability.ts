import type { beaches, forecasts } from "../db/schema.ts";
import { surfLevels, type SurfLevel } from "../enums/surf-level.ts";

// MOCK: será substituido pelo serviço de calculo real.
export function simulateSurfability(
  beach: Pick<typeof beaches.$inferSelect, "id">,
  forecast: Pick<typeof forecasts.$inferSelect, "forecastTime">,
  surfLevel: SurfLevel,
) {
  const seed = `${beach.id}:${forecast.forecastTime.toISOString()}`;
  let hash = 0;
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  const score = (hash % 101 + surfLevels.indexOf(surfLevel) * 23) % 101;
  return {
    score,
    classification: score >= 70 ? "Favorável" : score >= 40 ? "Regular" : "Desfavorável",
    simulated: true as const,
  };
}

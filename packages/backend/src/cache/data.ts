import { db } from "../db/index.ts";
import { beaches, forecasts } from "../db/schema.ts";

type Beach = typeof beaches.$inferSelect;
type Forecast = typeof forecasts.$inferSelect;

export let beachesCache: Beach[] = [];
export let forecastsCache: Forecast[] = [];

export async function loadCache() {
  beachesCache = await db.select().from(beaches);
  forecastsCache = await db.select().from(forecasts);

  console.log(
    `Cache carregado: ${beachesCache.length} praias e ${forecastsCache.length} previsões.`,
  );
}
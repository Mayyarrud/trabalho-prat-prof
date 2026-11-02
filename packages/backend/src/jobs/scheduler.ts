import cron from "node-cron";
import { max } from "drizzle-orm";

import { app } from "../app.ts";
import { db } from "../db/index.ts";
import { forecasts } from "../db/schema.ts";
import { loadCache } from "../cache/data.ts";
import { syncForecasts } from "./sync-forecast.ts";

const INTERVAL_MS = 4 * 60 * 60 * 1000;

let running = false;

async function refreshForecasts(): Promise<void> {
  if (running) {
    return;
  }

  running = true;

  try {
    const result = await syncForecasts();

    await loadCache();

    console.info(
      `Sincronização concluída: ${result.forecasts} previsões para ${result.beaches} praias.`
    );
  } catch (error) {
    app.log.error(
      { err: error },
      "Erro na sincronização das previsões",
    );
  } finally {
    running = false;
  }
}

async function refreshIfStale(): Promise<void> {
  const [result] = await db
    .select({
      lastUpdated: max(forecasts.updatedAt),
    })
    .from(forecasts);

  const lastUpdated = result?.lastUpdated;

  const stale =
    !lastUpdated ||
    Date.now() - lastUpdated.getTime() >= INTERVAL_MS;

  if (stale) {
    await refreshForecasts();
  }
}

export function startScheduler(): void {
  cron.schedule(
    "0 */4 * * *",
    refreshForecasts,
    {
      name: "sync-forecasts",
      timezone: "America/Sao_Paulo",
      noOverlap: true,
    },
  );

  void refreshIfStale().catch((error) => {
    app.log.error(
      { err: error },
      "Falha ao verificar atualização das previsões",
    );
  });
}
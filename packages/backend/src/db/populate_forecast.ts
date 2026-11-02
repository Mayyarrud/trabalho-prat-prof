import { client } from "./index.ts";
import { syncForecasts } from "../jobs/sync-forecast.ts";

try {
  const result = await syncForecasts();

  console.info(
    `Sincronização concluída: ` +
    `${result.forecasts} previsões para ` +
    `${result.beaches} praias.`,
  );
} catch (error) {
  console.error(
    "Falha na sincronização manual:",
    error,
  );

  process.exitCode = 1;
} finally {
  await client.end();
}
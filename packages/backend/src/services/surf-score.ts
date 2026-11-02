import type { forecasts } from "../db/schema.ts";

type ForecastInput = Pick<
  typeof forecasts.$inferSelect,
  "waveHeight" | "wavePeriod" | "windSpeed"
>;

function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}

export function calculateSurfScore(
  forecast: ForecastInput,
): number | null {
  const { waveHeight, wavePeriod, windSpeed } = forecast;

  if (
    waveHeight == null ||
    wavePeriod == null ||
    windSpeed == null ||
    !Number.isFinite(waveHeight) ||
    !Number.isFinite(wavePeriod) ||
    !Number.isFinite(windSpeed) ||
    waveHeight < 0 ||
    wavePeriod <= 0 ||
    windSpeed < 0
  ) {
    return null;
  }

  if (waveHeight < 0.25 || wavePeriod < 5) {
    return 0;
  }

  const heightScore = clamp(
    ((waveHeight - 0.25) / 0.95) * 100,
  );

  const periodScore = clamp(
    ((wavePeriod - 6) / 6) * 100,
  );

  const windScore = clamp(
    ((30 - windSpeed) / 22) * 100,
  );

  const wavePotential = Math.sqrt(
    heightScore * periodScore,
  );

  const windFactor = 0.25 + 0.75 * (windScore / 100);

  return Math.round(
    wavePotential * windFactor,
  );
}
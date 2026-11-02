import type { forecasts } from "../db/schema.ts";
import {
  SurfLevel,
  type SurfLevel as SurfLevelType,
} from "../enums/surf-level.ts";

type ForecastInput = Pick<
  typeof forecasts.$inferSelect,
  "surfScore" | "waveHeight" | "wavePeriod"
>;

type Range = {
  min: number;
  idealMin: number;
  idealMax: number;
  max: number;
};

type Profile = {
  height: Range;
  period: Range;
};

const profiles: Record<SurfLevelType, Profile> = {
  [SurfLevel.Iniciante]: {
    height: {
      min: 0.2,
      idealMin: 0.5,
      idealMax: 0.9,
      max: 1.5,
    },
    period: {
      min: 5,
      idealMin: 7,
      idealMax: 10,
      max: 15,
    },
  },

  [SurfLevel.Intermediario]: {
    height: {
      min: 0.3,
      idealMin: 0.9,
      idealMax: 1.6,
      max: 2.7,
    },
    period: {
      min: 6,
      idealMin: 9,
      idealMax: 13,
      max: 19,
    },
  },

  [SurfLevel.Avancado]: {
    height: {
      min: 0.5,
      idealMin: 1.3,
      idealMax: 2.6,
      max: 4.5,
    },
    period: {
      min: 7,
      idealMin: 11,
      idealMax: 17,
      max: 23,
    },
  },
};

function rangeScore(
  value: number,
  range: Range,
): number {
  const { min, idealMin, idealMax, max } = range;

  if (value <= min || value >= max) {
    return 0;
  }

  if (value < idealMin) {
    return (
      (100 * (value - min)) /
      (idealMin - min)
    );
  }

  if (value <= idealMax) {
    return 100;
  }

  return (
    (100 * (max - value)) /
    (max - idealMax)
  );
}

export function calculateSurfability(
  forecast: ForecastInput,
  surfLevel: SurfLevelType,
) {
  const {
    surfScore,
    waveHeight,
    wavePeriod,
  } = forecast;

  if (
    surfScore == null ||
    waveHeight == null ||
    wavePeriod == null ||
    !Number.isFinite(surfScore) ||
    !Number.isFinite(waveHeight) ||
    !Number.isFinite(wavePeriod)
  ) {
    return null;
  }

  const profile = profiles[surfLevel];

  const heightFit = rangeScore(
    waveHeight,
    profile.height,
  );

  const periodFit = rangeScore(
    wavePeriod,
    profile.period,
  );

  const suitability = Math.min(
    heightFit,
    periodFit,
  ) / 100;

  const score = Math.round(
    surfScore * suitability,
  );

  return {
    score,
    classification:
      score >= 70
        ? ("Favorável" as const)
        : score >= 40
          ? ("Regular" as const)
          : ("Desfavorável" as const),
  };
}
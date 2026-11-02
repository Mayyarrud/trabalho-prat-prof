import { lt, sql } from "drizzle-orm";

import { db } from "../db/index.ts";
import { beaches, forecasts } from "../db/schema.ts";
import { calculateSurfScore } from "../services/surf-score.ts";

const URLS = {
  MARINE: "https://marine-api.open-meteo.com/v1/marine",
  WEATHER: "https://api.open-meteo.com/v1/forecast",
};

type MarineData = {
  hourly: {
    time: string[];
    wave_height: (number | null)[];
    wave_period: (number | null)[];
    wave_direction: (number | null)[];
  };
};

type WeatherData = {
  hourly: {
    time: string[];
    temperature_2m: (number | null)[];
    visibility: (number | null)[];
    weather_code: (number | null)[];
    wind_speed_10m: (number | null)[];
    wind_direction_10m: (number | null)[];
  };
};

function getWeatherCondition(
  code: number | null | undefined,
): string | null {
  switch (code) {
    case 0:
      return "clear";

    case 1:
      return "mainly_clear";

    case 2:
      return "partly_cloudy";

    case 3:
      return "overcast";

    case 45:
    case 48:
      return "fog";

    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return "drizzle";

    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return "rain";

    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return "snow";

    case 95:
    case 96:
    case 97:
    case 99:
      return "thunderstorm";

    default:
      return null;
  }
}

async function fetchJson<T>(
  url: URL,
): Promise<T> {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(
      `Open-Meteo HTTP ${response.status}: ${url.origin}`,
    );
  }

  return (await response.json()) as T;
}

export async function syncForecasts() {
  const beachRows = await db
    .select({
      id: beaches.id,
      latitude: beaches.latitude,
      longitude: beaches.longitude,
    })
    .from(beaches);

  if (beachRows.length === 0) {
    throw new Error(
      "Não existem praias cadastradas no banco.",
    );
  }

  const values: (typeof forecasts.$inferInsert)[] = [];

  for (const beach of beachRows) {
    const coordinates = {
      latitude: String(beach.latitude),
      longitude: String(beach.longitude),
      forecast_hours: "72",
      timezone: "UTC",
    };

    const marineUrl = new URL(URLS.MARINE);

    marineUrl.search = new URLSearchParams({
      ...coordinates,
      hourly:
        "wave_height,wave_period,wave_direction",
    }).toString();

    const weatherUrl = new URL(URLS.WEATHER);

    weatherUrl.search = new URLSearchParams({
      ...coordinates,
      hourly:
        "temperature_2m,visibility,weather_code,wind_speed_10m,wind_direction_10m",
      wind_speed_unit: "kmh",
    }).toString();

    const [marine, weather] = await Promise.all([
      fetchJson<MarineData>(marineUrl),
      fetchJson<WeatherData>(weatherUrl),
    ]);

    if (
      !Array.isArray(marine.hourly?.time) ||
      !Array.isArray(weather.hourly?.time)
    ) {
      throw new Error(
        `Resposta inválida da Open-Meteo para a praia ${beach.id}`,
      );
    }

    const weatherIndex = new Map(
      weather.hourly.time.map(
        (time, index) => [time, index] as const,
      ),
    );

    const previousCount = values.length;

    for (
      let i = 0;
      i < marine.hourly.time.length;
      i++
    ) {
      const time = marine.hourly.time[i];

      if (!time) {
        continue;
      }

      const index = weatherIndex.get(time);

      if (index === undefined) {
        continue;
      }

      const forecastTime = new Date(`${time}Z`);

      if (Number.isNaN(forecastTime.getTime())) {
        throw new Error(
          `Horário de previsão inválido: ${time}`,
        );
      }

      const metrics = {
        waveHeight:
          marine.hourly.wave_height[i] ?? null,

        wavePeriod:
          marine.hourly.wave_period[i] ?? null,

        waveDirection:
          marine.hourly.wave_direction[i] ?? null,

        windSpeed:
          weather.hourly.wind_speed_10m[index] ?? null,
      };

      values.push({
        idBeach: beach.id,
        forecastTime,

        ...metrics,

        windDirection:
          weather.hourly.wind_direction_10m[index] ?? null,

        temperature:
          weather.hourly.temperature_2m[index] ?? null,

        visibility:
          weather.hourly.visibility[index] ?? null,

        weatherCondition: getWeatherCondition(
          weather.hourly.weather_code[index],
        ),

        surfScore: calculateSurfScore(metrics),
      });
    }

    if (values.length === previousCount) {
      throw new Error(
        `Nenhuma previsão válida para a praia ${beach.id}`,
      );
    }
  }

  const cutoff = new Date();
  cutoff.setUTCMinutes(0, 0, 0);

  await db.transaction(async (tx) => {
    await tx
      .insert(forecasts)
      .values(values)
      .onConflictDoUpdate({
        target: [
          forecasts.idBeach,
          forecasts.forecastTime,
        ],

        set: {
          waveHeight:
            sql`excluded.wave_height`,

          wavePeriod:
            sql`excluded.wave_period`,

          waveDirection:
            sql`excluded.wave_direction`,

          windSpeed:
            sql`excluded.wind_speed`,

          windDirection:
            sql`excluded.wind_direction`,

          temperature:
            sql`excluded.temperature`,

          visibility:
            sql`excluded.visibility`,

          weatherCondition:
            sql`excluded.weather_condition`,

          surfScore:
            sql`excluded.surf_score`,

          updatedAt:
            sql`now()`,
        },
      });

    await tx
      .delete(forecasts)
      .where(
        lt(forecasts.forecastTime, cutoff),
      );
  });

  return {
    beaches: beachRows.length,
    forecasts: values.length,
  };
}
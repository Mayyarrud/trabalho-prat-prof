import { db, client } from "./index.ts";
import { beaches, forecasts } from "./schema.ts";

const existing_forecast = await db
  .select({ id: forecasts.id })
  .from(forecasts)
  .limit(1);

if (existing_forecast.length > 0) {
  console.log("A tabela de previsões já está populada.");
  await client.end();
  process.exit(0);
}

function getWeatherCondition(code: number | null | undefined) {
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
} // tradução dos códigos WMO. Fonte: https://open-meteo.com/en/docs#weather_variable_documentation


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

const beaches_data = await db
  .select({
    id: beaches.id,
    latitude: beaches.latitude,
    longitude: beaches.longitude,
  })
  .from(beaches);

const values = [];

for (const beach of beaches_data) {
  const marine_params = new URLSearchParams({
    latitude: String(beach.latitude),
    longitude: String(beach.longitude),
    hourly: "wave_height,wave_period,wave_direction",
    forecast_hours: "72",
    timezone: "UTC",
  });

  const weather_params = new URLSearchParams({
    latitude: String(beach.latitude),
    longitude: String(beach.longitude),
    hourly:
      "temperature_2m,visibility,weather_code,wind_speed_10m,wind_direction_10m",
    forecast_hours: "72",
    timezone: "UTC",
  });

  const marine_data = await fetch(
    `${URLS.MARINE}?${marine_params}`,
  ).then((response) => response.json()) as MarineData;

  const weather_data = await fetch(
    `${URLS.WEATHER}?${weather_params}`,
  ).then((response) => response.json()) as WeatherData;

  for (let i = 0; i < marine_data.hourly.time.length; i++) {
    const time = marine_data.hourly.time[i];

    const weather_index =
      weather_data.hourly.time.indexOf(time!);

    if (weather_index === -1) {
      continue;
    }

    values.push({
      idBeach: beach.id,

      forecastTime: new Date(`${time}Z`),

      waveHeight: marine_data.hourly.wave_height[i],
      wavePeriod: marine_data.hourly.wave_period[i],
      waveDirection: marine_data.hourly.wave_direction[i],

      windSpeed:
        weather_data.hourly.wind_speed_10m[weather_index],

      windDirection:
        weather_data.hourly.wind_direction_10m[weather_index],

      temperature:
        weather_data.hourly.temperature_2m[weather_index],

      visibility:
        weather_data.hourly.visibility[weather_index],

      weatherCondition:
        getWeatherCondition(weather_data.hourly.weather_code[weather_index]),

      surfScore: null,
    });
  }
}

await db.insert(forecasts).values(values);

console.log(
  `${values.length} previsões inseridas para ${beaches_data.length} praias.`,
);

await client.end();
import type { Forecast } from "@/models/forecast";

const numberFormat = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 1,
});

const directions = ["N", "NE", "L", "SE", "S", "SO", "O", "NO"];

const weatherConditions: Record<string, string> = {
  clear: "Céu limpo",
  mainly_clear: "Predomínio de sol",
  partly_cloudy: "Parcialmente nublado",
  overcast: "Nublado",
  fog: "Neblina",
  drizzle: "Garoa",
  rain: "Chuva",
  snow: "Neve",
  thunderstorm: "Trovoadas",
};

export function formatValue(value: number | null, unit = "") {
  if (value === null) return "Sem dados";

  return `${numberFormat.format(value)}${unit ? ` ${unit}` : ""}`;
}

export function formatDirection(value: number | null) {
  if (value === null) return "Sem dados";

  const degrees = ((value % 360) + 360) % 360;
  const direction = directions[Math.round(degrees / 45) % directions.length];

  return `${direction} · ${numberFormat.format(degrees)}°`;
}

export function formatWeather(value: string | null) {
  return value ? (weatherConditions[value] ?? "Sem dados") : "Sem dados";
}

export function getCurrentForecast(forecasts: Forecast[], now = new Date()) {
  const currentHour = now.getTime() - (now.getTime() % 3_600_000);

  return (
    forecasts.find(
      (forecast) => Date.parse(forecast.forecastTime) >= currentHour,
    ) ?? forecasts.at(-1)
  );
}

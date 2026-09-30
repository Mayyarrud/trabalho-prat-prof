export interface Forecast {
  forecastTime: string;
  waveHeight: number | null;
  wavePeriod: number | null;
  waveDirection: number | null;
  windSpeed: number | null;
  windDirection: number | null;
  temperature: number | null;
  visibility: number | null;
  weatherCondition: string | null;
  surfScore: number | null;
}
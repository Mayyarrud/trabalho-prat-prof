import { useState } from "react";

import ForecastMetric from "@/components/ForecastMetric";
import type { Forecast } from "@/models/forecast";
import {
  formatDirection,
  formatValue,
  formatWeather,
  getCurrentForecast,
} from "@/utils/forecast";

const dateFormat = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  weekday: "short",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export default function BeachForecast({
  forecasts,
}: {
  forecasts: Forecast[];
}) {
  const [selectedTime, setSelectedTime] = useState("");
  const forecast =
    forecasts.find((item) => item.forecastTime === selectedTime) ??
    getCurrentForecast(forecasts);

  if (!forecast) {
    return (
      <section className="mt-5 rounded-2xl bg-[#FFFDF2] p-6 text-center">
        <h2 className="text-base font-semibold">Previsão indisponível</h2>
        <p className="mt-2 text-sm text-[#6B665C]">
          Ainda não temos previsões para esta praia. Tente novamente mais tarde.
        </p>
      </section>
    );
  }

  const isPastForecast =
    Date.parse(forecast.forecastTime) + 3_600_000 <= Date.now();

  return (
    <section className="mt-5 rounded-2xl bg-[#FFFDF2] p-5">
      <h2 className="text-base font-semibold">Previsão</h2>

      <label
        htmlFor="forecast-time"
        className="mt-4 block text-xs text-[#6B665C]"
      >
        Data e horário (Brasília)
      </label>
      <select
        id="forecast-time"
        value={forecast.forecastTime}
        onChange={(event) => setSelectedTime(event.target.value)}
        className="mt-2 w-full min-w-0 rounded-xl border border-[#DDD6C4] bg-[#FFFDF2] px-3 py-3 text-sm focus:border-[#9D83CE] focus:outline-none focus:ring-2 focus:ring-[#CDB4FF]"
      >
        {forecasts.map((item) => (
          <option key={item.forecastTime} value={item.forecastTime}>
            {dateFormat.format(new Date(item.forecastTime))}
          </option>
        ))}
      </select>

      {isPastForecast && (
        <p className="mt-3 rounded-lg bg-[#FFF3CF] p-3 text-xs text-[#6B665C]">
          Esta previsão é de um horário passado. Confira a data antes de
          planejar sua ida.
        </p>
      )}

      <div className="mt-6">
        <h3 className="text-sm font-medium">Condições principais</h3>
        <dl className="mt-3 grid grid-cols-2 gap-3">
          <ForecastMetric
            label="Surfabilidade"
            value={
              forecast.surfScore === null
                ? "Sem avaliação"
                : formatValue(forecast.surfScore)
            }
            className="bg-[#E9E2FF]"
          />
          <ForecastMetric
            label="Visibilidade"
            value={formatValue(
              forecast.visibility === null ? null : forecast.visibility / 1000,
              "km",
            )}
            className="bg-[#E5F7ED]"
          />
        </dl>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium">Ondas</h3>
        <dl className="mt-3 grid grid-cols-2 gap-2 min-[380px]:grid-cols-3">
          <ForecastMetric
            label="Altura"
            value={formatValue(forecast.waveHeight, "m")}
            className="bg-[#EEF5FC]"
          />
          <ForecastMetric
            label="Período"
            value={formatValue(forecast.wavePeriod, "s")}
            className="bg-[#EEF5FC]"
          />
          <ForecastMetric
            label="Direção"
            value={formatDirection(forecast.waveDirection)}
            className="bg-[#EEF5FC]"
          />
        </dl>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium">Vento</h3>
        <dl className="mt-3 grid grid-cols-2 gap-3">
          <ForecastMetric
            label="Velocidade"
            value={formatValue(forecast.windSpeed, "km/h")}
            className="bg-[#E5F7ED]"
          />
          <ForecastMetric
            label="Direção"
            value={formatDirection(forecast.windDirection)}
            className="bg-[#E5F7ED]"
          />
        </dl>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium">Clima</h3>
        <dl className="mt-3 grid grid-cols-2 gap-3">
          <ForecastMetric
            label="Temperatura"
            value={formatValue(forecast.temperature, "°C")}
            className="bg-[#FFF3CF]"
          />
          <ForecastMetric
            label="Condição"
            value={formatWeather(forecast.weatherCondition)}
            className="bg-[#FFF3CF]"
          />
        </dl>
      </div>
    </section>
  );
}

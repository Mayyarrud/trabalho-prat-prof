import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import BeachIllustration from "@/components/BeachIllustration";
import ForecastMetric from "@/components/ForecastMetric";
import type { Beach } from "@/models/beach";
import { beachQueryOptions } from "@/query/beaches";
import { formatValue, getCurrentForecast } from "@/utils/forecast";

const dateFormat = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export default function FeaturedBeach({ beach }: { beach: Beach }) {
  const { data, isPending, isFetching, error, refetch } = useQuery(
    beachQueryOptions(beach.id),
  );
  const forecast = data ? getCurrentForecast(data.forecast) : undefined;

  return (
    <section className="mt-6 overflow-hidden rounded-2xl bg-[#FFFDF2]">
      <div className="relative">
        <BeachIllustration className="h-[150px]" />
        <div
          className="absolute inset-0 bg-linear-to-b from-[#222A31]/40 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute left-4 right-4 top-5 text-white">
          <p className="text-[10px] font-semibold uppercase tracking-wide">
            Praia em destaque
          </p>
          <h2 className="mt-1 text-lg font-semibold leading-tight">
            {beach.name}
          </h2>
        </div>
      </div>

      <div className="p-4">
        {isPending ? (
          <p
            role="status"
            className="py-6 text-center text-sm text-[#6B665C] motion-safe:animate-pulse"
          >
            Carregando condições da praia...
          </p>
        ) : error ? (
          <div
            role="alert"
            className="rounded-xl bg-[#FFF3CF] p-4 text-sm text-[#6B665C]"
          >
            <p>Não foi possível carregar a previsão.</p>
            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="mt-2 font-medium underline disabled:opacity-50"
            >
              {isFetching ? "Carregando..." : "Tentar novamente"}
            </button>
          </div>
        ) : forecast ? (
          <>
            <p className="text-xs text-[#6B665C]">
              <time dateTime={forecast.forecastTime}>
                {dateFormat.format(new Date(forecast.forecastTime))}
              </time>
              {" · Horário de Brasília"}
            </p>
            {Date.parse(forecast.forecastTime) + 3_600_000 <= Date.now() && (
              <p className="mt-2 text-xs text-[#6B665C]">
                Previsão de um horário passado.
              </p>
            )}

            <dl className="mt-4 grid grid-cols-2 gap-2 min-[380px]:grid-cols-3">
              <ForecastMetric
                label="Ondas"
                value={formatValue(forecast.waveHeight, "m")}
                className="bg-[#EEF5FC]"
              />
              <ForecastMetric
                label="Vento"
                value={formatValue(forecast.windSpeed, "km/h")}
                className="bg-[#E5F7ED]"
              />
              <ForecastMetric
                label="Temp."
                value={formatValue(forecast.temperature, "°C")}
                className="bg-[#FFF3CF]"
              />
            </dl>

            <dl className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-[#E9E2FF] px-3 py-3">
              <dt className="text-xs text-[#6B665C]">Surfabilidade</dt>
              <dd className="text-sm font-semibold">
                {forecast.surfScore === null
                  ? "Sem avaliação"
                  : formatValue(forecast.surfScore)}
              </dd>
            </dl>
          </>
        ) : (
          <p className="py-4 text-sm text-[#6B665C]">
            Ainda não temos previsões para esta praia.
          </p>
        )}

        <Link
          to="/beach/$id"
          params={{ id: beach.id }}
          className="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-[#222A31] text-sm font-semibold text-white transition hover:opacity-90"
        >
          Ver previsão →
        </Link>
      </div>
    </section>
  );
}

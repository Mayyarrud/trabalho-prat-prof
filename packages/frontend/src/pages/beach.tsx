import { Link } from "@tanstack/react-router";

import { mockBeaches } from "@/data/mockBeaches";

type BeachPageProps = {
  beachId?: string;
};

export default function BeachPage({ beachId }: BeachPageProps) {
  const beach = mockBeaches.find((item) => item.id === beachId);

  if (!beach) {
    return (
      <main className="min-h-screen bg-[#F5F0DD] text-[#222A31]">
        <div className="mx-auto w-full max-w-[480px] px-6 py-10">
          <Link to="/" className="text-sm text-[#6B665C]">
            ← Voltar
          </Link>

          <div className="mt-10 rounded-2xl bg-[#FFFDF2] p-6 text-center">
            <h1 className="text-lg font-semibold">Praia não encontrada</h1>

            <p className="mt-2 text-sm text-[#6B665C]">
              Não encontramos os dados dessa praia.
            </p>

            <Link
              to="/"
              className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-[#222A31] text-sm font-medium text-white"
            >
              Voltar para início
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F0DD] text-[#222A31]">
      <div className="mx-auto w-full max-w-[480px] px-6 pb-10">
        {/* Header */}
        <header className="flex items-center justify-between py-6">
          <Link to="/" className="text-sm text-[#6B665C]" aria-label="Voltar">
            ‹
          </Link>

          <div className="text-center">
            <h1 className="text-sm font-semibold">{beach.name}</h1>

            <p className="mt-1 text-xs text-[#6B665C]">
              {beach.city} · {beach.state}
            </p>
          </div>

          <button
            type="button"
            aria-label="Abrir menu"
            className="text-sm text-[#6B665C]"
          >
            ≡
          </button>
        </header>

        {/* Beach visual */}
        <section className="overflow-hidden rounded-2xl bg-[#FFFDF2]">
          <div className="relative h-[190px] overflow-hidden bg-gradient-to-br from-[#7CC7E5] via-[#9ED1D4] to-[#D5BE82]">
            <div className="absolute right-8 top-6 h-14 w-14 rounded-full bg-[#FFFDF2]/40" />

            <svg
              viewBox="0 0 480 180"
              preserveAspectRatio="none"
              className="absolute bottom-0 left-0 h-[115px] w-full"
              aria-hidden="true"
            >
              <path
                d="M0 105 C75 58 135 48 205 80 C275 112 325 115 392 84 C425 69 452 61 480 57 L480 180 L0 180 Z"
                fill="#B8AD8F"
              />

              <path
                d="M0 135 C90 105 150 100 225 116 C295 131 365 129 480 102 L480 180 L0 180 Z"
                fill="#C9BE9F"
              />
            </svg>

            <button
              type="button"
              aria-label="Adicionar aos favoritos"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#FFFDF2]/90 text-lg text-[#6B665C]"
            >
              ♡
            </button>
          </div>

          <div className="p-4">
            <h2 className="text-base font-semibold">{beach.name}</h2>

            <p className="mt-1 text-xs text-[#6B665C]">
              {beach.city} · {beach.state}
            </p>

            <p className="mt-3 text-sm leading-5 text-[#6B665C]">
              {beach.description}
            </p>

            {/* Tabs */}
            <div className="mt-5 flex items-center gap-2">
              <button
                type="button"
                className="rounded-full bg-[#CDB4FF] px-4 py-2 text-xs font-medium text-[#222A31]"
              >
                Hoje
              </button>

              <button
                type="button"
                className="rounded-full px-4 py-2 text-xs text-[#6B665C]"
              >
                5 dias
              </button>

              <button
                type="button"
                className="rounded-full px-4 py-2 text-xs text-[#6B665C]"
              >
                Mapa
              </button>

              <button
                type="button"
                className="rounded-full px-4 py-2 text-xs text-[#6B665C]"
              >
                Espectral
              </button>
            </div>
          </div>
        </section>

        {/* Main conditions */}
        <section className="mt-5">
          <h2 className="text-sm font-medium">Condições principais</h2>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-[#E9E2FF] p-3">
              <p className="text-xs text-[#6B665C]">Surfabilidade</p>

              <p className="mt-2 text-sm font-semibold">{beach.surfability}</p>
            </div>

            <div className="rounded-xl bg-[#E5F7ED] p-3">
              <p className="text-xs text-[#6B665C]">Condição</p>

              <p className="mt-2 text-sm font-semibold">
                {beach.beachCondition}
              </p>
            </div>
          </div>
        </section>

        {/* Waves */}
        <section className="mt-6">
          <h2 className="text-sm font-medium">Ondas</h2>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-[#EEF5FC] p-3">
              <p className="text-[11px] text-[#6B665C]">Altura</p>

              <p className="mt-2 text-sm font-medium">{beach.waveHeight}</p>
            </div>

            <div className="rounded-xl bg-[#EEF5FC] p-3">
              <p className="text-[11px] text-[#6B665C]">Período</p>

              <p className="mt-2 text-sm font-medium">{beach.wavePeriod}</p>
            </div>

            <div className="rounded-xl bg-[#EEF5FC] p-3">
              <p className="text-[11px] text-[#6B665C]">Direção</p>

              <p className="mt-2 text-sm font-medium">{beach.waveDirection}</p>
            </div>
          </div>
        </section>

        {/* Wind */}
        <section className="mt-6">
          <h2 className="text-sm font-medium">Vento</h2>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-[#E5F7ED] p-3">
              <p className="text-[11px] text-[#6B665C]">Velocidade</p>

              <p className="mt-2 text-sm font-medium">{beach.windSpeed}</p>
            </div>

            <div className="rounded-xl bg-[#E5F7ED] p-3">
              <p className="text-[11px] text-[#6B665C]">Direção</p>

              <p className="mt-2 text-sm font-medium">{beach.windDirection}</p>
            </div>
          </div>
        </section>

        {/* Climate */}
        <section className="mt-6">
          <h2 className="text-sm font-medium">Clima</h2>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-[#FFF3CF] p-3">
              <p className="text-[11px] text-[#6B665C]">Temperatura</p>

              <p className="mt-2 text-sm font-medium">{beach.temperature}</p>
            </div>

            <div className="rounded-xl bg-[#FFF3CF] p-3">
              <p className="text-[11px] text-[#6B665C]">Condição</p>

              <p className="mt-2 text-sm font-medium">
                {beach.weatherCondition}
              </p>
            </div>
          </div>
        </section>

        {/* Detailed forecast */}
        <section className="mt-6">
          <Link
            to="/"
            className="flex h-12 w-full items-center justify-center rounded-xl bg-[#222A31] text-sm font-medium text-white transition hover:opacity-90"
          >
            Retornar para início
          </Link>
        </section>

        <p className="mt-6 text-center text-[11px] text-[#8B877E]">
          Dados demonstrativos para desenvolvimento do Front-end.
        </p>
      </div>
    </main>
  );
}

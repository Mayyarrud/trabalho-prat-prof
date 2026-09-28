import { useState } from "react";

type Beach = {
  id: string;
  name: string;
  city: string;
  state: string;
  waveHeight: string;
  windSpeed: string;
  temperature: string;
};

const beaches: Beach[] = [
  {
    id: "1",
    name: "Praia da Baleia",
    city: "São Sebastião",
    state: "SP",
    waveHeight: "1,2 m",
    windSpeed: "12 km/h",
    temperature: "24°C",
  },
  {
    id: "2",
    name: "Praia de Barequeçaba",
    city: "São Sebastião",
    state: "SP",
    waveHeight: "0,8 m",
    windSpeed: "10 km/h",
    temperature: "24°C",
  },
  {
    id: "3",
    name: "Praia da Barra do Una",
    city: "São Sebastião",
    state: "SP",
    waveHeight: "1,0 m",
    windSpeed: "14 km/h",
    temperature: "23°C",
  },
  {
    id: "4",
    name: "Praia de Boiçucanga",
    city: "São Sebastião",
    state: "SP",
    waveHeight: "1,1 m",
    windSpeed: "11 km/h",
    temperature: "24°C",
  },
  {
    id: "5",
    name: "Praia Brava",
    city: "São Sebastião",
    state: "SP",
    waveHeight: "1,5 m",
    windSpeed: "16 km/h",
    temperature: "23°C",
  },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("Brasil");
  const [selectedCity, setSelectedCity] = useState("São Paulo");
  const [selectedRegion, setSelectedRegion] = useState("São Sebastião");

  const featuredBeach = beaches[0];

  const filteredBeaches = beaches.filter((beach) =>
    beach.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-[#F5F0DD] text-[#222A31]">
      <div className="mx-auto w-full max-w-[480px] px-6 pb-10">
        {/* Header */}
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-2">
            <span className="text-base">◉</span>

            <span className="text-base font-semibold tracking-[-0.02em]">
              Vai Dar Onda
            </span>
          </div>

          <button
            type="button"
            aria-label="Abrir menu"
            className="text-sm text-[#6B665C]"
          >
            ≡
          </button>
        </header>

        {/* Hero */}
        <section className="pt-6">
          <h1 className="text-[32px] font-bold leading-[40px] tracking-[-0.03em]">
            Encontre sua praia
          </h1>

          <p className="mt-3 max-w-[340px] text-base leading-6 text-[#6B665C]">
            Consulte as condições de ondas e clima da sua praia.
          </p>
        </section>

        {/* Beach search */}
        <section className="mt-8 space-y-3">
          <label className="relative block">
            <span className="sr-only">Buscar praia</span>

            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#6B665C]">
              ⌕
            </span>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar praia..."
              className="h-12 w-full rounded-xl border border-[#D7D3C8] bg-[#FFFDF2] pl-10 pr-4 text-sm text-[#222A31] outline-none transition placeholder:text-[#8B877E] focus:border-[#4D63FF]"
            />
          </label>

          {/* Select Brasil */}
          <label className="relative block">
            <span className="sr-only">País</span>

            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#6B665C]">
              □
            </span>

            <select
              value={selectedState}
              onChange={(event) => setSelectedState(event.target.value)}
              className="h-12 w-full appearance-none rounded-xl border border-[#D7D3C8] bg-[#FFFDF2] pl-10 pr-10 text-sm text-[#222A31] outline-none focus:border-[#4D63FF]"
            >
              <option>Brasil</option>
            </select>

            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#6B665C]">
              ⌄
            </span>
          </label>

          {/* Select Estado */}
          <label className="relative block">
            <span className="sr-only">Estado</span>

            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#6B665C]">
              □
            </span>

            <select
              value={selectedCity}
              onChange={(event) => setSelectedCity(event.target.value)}
              className="h-12 w-full appearance-none rounded-xl border border-[#D7D3C8] bg-[#FFFDF2] pl-10 pr-10 text-sm text-[#222A31] outline-none focus:border-[#4D63FF]"
            >
              <option>São Paulo</option>
            </select>

            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#6B665C]">
              ⌄
            </span>
          </label>

          {/* Select região */}
          <label className="relative block">
            <span className="sr-only">Região</span>

            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#6B665C]">
              ◇
            </span>

            <select
              value={selectedRegion}
              onChange={(event) => setSelectedRegion(event.target.value)}
              className="h-12 w-full appearance-none rounded-xl border border-[#D7D3C8] bg-[#FFFDF2] pl-10 pr-10 text-sm text-[#222A31] outline-none focus:border-[#4D63FF]"
            >
              <option>São Sebastião</option>
            </select>

            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#6B665C]">
              ⌄
            </span>
          </label>
        </section>

        {/* Featured beach */}
        <section className="mt-6">
          <div className="overflow-hidden rounded-2xl bg-[#FFFDF2]">
            {/* Image / visual da praia */}
            <div className="relative h-[148px] overflow-hidden bg-gradient-to-br from-[#7CC7E5] via-[#9ED1D4] to-[#D5BE82]">
              {/* Sol */}
              <div className="absolute right-8 top-5 h-12 w-12 rounded-full bg-[#FFFDF2]/40" />

              {/* Onda estilizada */}
              <svg
                viewBox="0 0 480 180"
                preserveAspectRatio="none"
                className="absolute bottom-0 left-0 h-[100px] w-full"
                aria-hidden="true"
              >
                <path
                  d="M0 100 C80 55 130 45 200 78 C270 110 325 110 390 82 C425 67 450 60 480 55 L480 180 L0 180 Z"
                  fill="#B8AD8F"
                />
              </svg>

              <div className="absolute left-4 top-4">
                <p className="text-[10px] font-medium uppercase tracking-wide text-white">
                  Praia em destaque
                </p>

                <h2 className="mt-1 text-xl font-semibold text-white">
                  {featuredBeach.name}
                </h2>
              </div>
            </div>

            {/* Beach information */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-medium">{featuredBeach.name}</h3>

                  <p className="mt-1 text-xs text-[#6B665C]">
                    {featuredBeach.city} · {featuredBeach.state}
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Adicionar praia aos favoritos"
                  className="text-lg text-[#6B665C]"
                >
                  ♡
                </button>
              </div>

              {/* Metrics */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-[#EEF5FC] p-3">
                  <p className="text-[11px] text-[#6B665C]">Ondas</p>
                  <p className="mt-1 text-sm font-medium">
                    {featuredBeach.waveHeight}
                  </p>
                </div>

                <div className="rounded-xl bg-[#EAF7F0] p-3">
                  <p className="text-[11px] text-[#6B665C]">Vento</p>
                  <p className="mt-1 text-sm font-medium">
                    {featuredBeach.windSpeed}
                  </p>
                </div>

                <div className="rounded-xl bg-[#FFF3CF] p-3">
                  <p className="text-[11px] text-[#6B665C]">Temp.</p>
                  <p className="mt-1 text-sm font-medium">
                    {featuredBeach.temperature}
                  </p>
                </div>
              </div>

              {/* Surfability */}
              <div className="mt-3 flex items-center justify-between rounded-xl bg-[#EAF7F0] px-3 py-3">
                <span className="text-xs text-[#6B665C]">Surfabilidade</span>

                <span className="text-sm font-semibold text-[#24784A]">
                  Alta
                </span>
              </div>

              <button
                type="button"
                className="mt-4 h-12 w-full rounded-xl bg-[#222A31] text-sm font-medium text-white transition hover:opacity-90"
              >
                Ver previsão →
              </button>
            </div>
          </div>
        </section>

        {/* Search results */}
        {search.length > 0 && (
          <section className="mt-4 rounded-2xl border border-[#D7D3C8] bg-[#FFFDF2] p-3">
            <p className="px-2 pb-2 text-xs font-medium text-[#6B665C]">
              Praias encontradas
            </p>

            <div className="space-y-1">
              {filteredBeaches.length > 0 ? (
                filteredBeaches.map((beach) => (
                  <button
                    key={beach.id}
                    type="button"
                    className="flex w-full items-center justify-between rounded-lg px-2 py-3 text-left text-sm transition hover:bg-[#F0EDFF]"
                    onClick={() => setSearch(beach.name)}
                  >
                    <span>{beach.name}</span>

                    <span className="text-xs text-[#6B665C]">{beach.city}</span>
                  </button>
                ))
              ) : (
                <p className="px-2 py-3 text-sm text-[#6B665C]">
                  Nenhuma praia encontrada.
                </p>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

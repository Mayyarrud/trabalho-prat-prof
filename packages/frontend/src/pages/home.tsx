import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";

import VaiDarOndaIcon from "@/assets/VaiDarOndaIcon.svg";
import { mockBeaches, type Beach } from "@/data/mockBeaches";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedBeach, setSelectedBeach] = useState<Beach>(mockBeaches[0]);

  const filteredBeaches = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return mockBeaches;
    }

    return mockBeaches.filter((beach) =>
      beach.name.toLowerCase().includes(term),
    );
  }, [search]);

  function handleBeachSelect(beach: Beach) {
    setSelectedBeach(beach);
    setSearch("");
  }

  return (
    <main className="min-h-screen bg-[#F5F0DD] text-[#222A31]">
      <div className="mx-auto flex min-h-screen w-full max-w-[520px] flex-col px-6 pb-8">
        {/* Header */}
        <header className="flex items-center justify-between py-6">
          <div className="flex flex-1 items-center justify-center gap-3">
            <img
              src={VaiDarOndaIcon}
              alt="Vai Dar Onda"
              className="h-12 w-12 object-contain"
            />

            <span className="text-[26px] font-bold leading-none tracking-[-0.035em] text-[#222A31]">
              Vai Dar Onda
            </span>
          </div>

          <button
            type="button"
            aria-label="Abrir menu"
            className="absolute right-6 text-sm text-[#6B665C]"
          >
            ≡
          </button>
        </header>

        {/* Intro */}
        <section className="pt-6">
          <h1 className="text-[28px] font-bold leading-tight tracking-[-0.03em]">
            Encontre sua praia
          </h1>

          <p className="mt-3 max-w-[360px] text-sm leading-5 text-[#6B665C]">
            Consulte as condições de ondas e clima da sua praia.
          </p>
        </section>

        {/* Search and filters */}
        <section className="relative mt-8">
          {/* Search */}
          <div className="relative">
            <span
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[11px] text-[#6B665C]"
              aria-hidden="true"
            >
              ⌕
            </span>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar praia..."
              className="h-12 w-full rounded-xl border border-[#D8D4C9] bg-[#FFFDF2] pl-10 pr-4 text-sm text-[#222A31] outline-none placeholder:text-[#8B877E] focus:border-[#B9B2A4]"
            />
          </div>

          {/* Dropdown */}
          {search.trim() !== "" && (
            <div className="absolute left-0 right-0 top-14 z-20 max-h-[360px] overflow-y-auto rounded-xl border border-[#D8D4C9] bg-[#FFFDF2] p-2 shadow-[0_8px_24px_rgba(34,42,49,0.08)]">
              {filteredBeaches.length > 0 ? (
                filteredBeaches.map((beach) => {
                  const isSelected = beach.id === selectedBeach.id;

                  return (
                    <button
                      key={beach.id}
                      type="button"
                      onClick={() => handleBeachSelect(beach)}
                      className={`flex w-full items-center rounded-lg px-3 py-3 text-left text-sm transition ${
                        isSelected
                          ? "bg-[#E1E9FF] font-semibold text-[#222A31]"
                          : "text-[#6B665C] hover:bg-[#F5F0DD]"
                      }`}
                    >
                      {beach.name}
                    </button>
                  );
                })
              ) : (
                <p className="px-3 py-4 text-sm text-[#6B665C]">
                  Nenhuma praia encontrada.
                </p>
              )}
            </div>
          )}

          {/* Country */}
          <button
            type="button"
            className="mt-3 flex h-12 w-full items-center justify-between rounded-xl border border-[#D8D4C9] bg-[#FFFDF2] px-4 text-sm"
          >
            <span className="flex items-center gap-3">
              <span className="text-[11px] text-[#6B665C]" aria-hidden="true">
                □
              </span>
              Brasil
            </span>

            <span className="text-[10px] text-[#6B665C]">⌄</span>
          </button>

          {/* State */}
          <button
            type="button"
            className="mt-3 flex h-12 w-full items-center justify-between rounded-xl border border-[#D8D4C9] bg-[#FFFDF2] px-4 text-sm"
          >
            <span className="flex items-center gap-3">
              <span className="text-[11px] text-[#6B665C]" aria-hidden="true">
                □
              </span>
              São Paulo
            </span>

            <span className="text-[10px] text-[#6B665C]">⌄</span>
          </button>

          {/* City */}
          <button
            type="button"
            className="mt-3 flex h-12 w-full items-center justify-between rounded-xl border border-[#D8D4C9] bg-[#FFFDF2] px-4 text-sm"
          >
            <span className="flex items-center gap-3">
              <span className="text-[11px] text-[#6B665C]" aria-hidden="true">
                ◇
              </span>
              São Sebastião
            </span>

            <span className="text-[10px] text-[#6B665C]">⌄</span>
          </button>
        </section>

        {/* Featured beach */}
        <section className="mt-6 overflow-hidden rounded-2xl bg-[#FFFDF2]">
          {/* Hero image */}
          <div className="relative h-[150px] overflow-hidden bg-gradient-to-br from-[#7CC7E5] via-[#9ED1D4] to-[#D5BE82]">
            <div className="absolute right-8 top-5 h-12 w-12 rounded-full bg-[#FFFDF2]/45" />

            <svg
              viewBox="0 0 480 180"
              preserveAspectRatio="none"
              className="absolute bottom-0 left-0 h-[105px] w-full"
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

            <div className="absolute left-4 top-5">
              <p className="text-[9px] font-semibold uppercase tracking-wide text-white">
                Praia em destaque
              </p>

              <h2 className="mt-1 text-lg font-semibold leading-tight text-white">
                {selectedBeach.name}
              </h2>
            </div>
          </div>

          {/* Card content */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold">{selectedBeach.name}</h3>

                <p className="mt-1 text-xs text-[#6B665C]">
                  {selectedBeach.city} · {selectedBeach.state}
                </p>
              </div>

              <button
                type="button"
                aria-label="Adicionar aos favoritos"
                className="text-lg leading-none text-[#6B665C]"
              >
                ♡
              </button>
            </div>

            {/* Main metrics */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-[#EEF5FC] p-3">
                <p className="text-[11px] text-[#6B665C]">Ondas</p>

                <p className="mt-2 text-sm font-semibold">
                  {selectedBeach.waveHeight}
                </p>
              </div>

              <div className="rounded-xl bg-[#E5F7ED] p-3">
                <p className="text-[11px] text-[#6B665C]">Vento</p>

                <p className="mt-2 text-sm font-semibold">
                  {selectedBeach.windSpeed}
                </p>
              </div>

              <div className="rounded-xl bg-[#FFF3CF] p-3">
                <p className="text-[11px] text-[#6B665C]">Temp.</p>

                <p className="mt-2 text-sm font-semibold">
                  {selectedBeach.temperature}
                </p>
              </div>
            </div>

            {/* Surfability */}
            <div className="mt-3 flex items-center justify-between rounded-xl bg-[#E5F7ED] px-3 py-3">
              <span className="text-xs text-[#6B665C]">Surfabilidade</span>

              <span className="text-sm font-semibold">
                {selectedBeach.surfability}
              </span>
            </div>

            {/* CTA */}
            <Link
              to="/praia/$id"
              params={{ id: selectedBeach.id }}
              className="mt-3 flex h-12 w-full items-center justify-center rounded-xl bg-[#222A31] text-sm font-semibold text-white transition hover:opacity-90"
            >
              Ver previsão →
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto pt-10 text-center">
          <p className="text-[11px] text-[#8B877E]">Vai Dar Onda</p>
        </footer>
      </div>
    </main>
  );
}

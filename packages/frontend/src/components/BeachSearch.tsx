import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import type { Beach } from "@/models/beach";
import { searchBeachesQueryOptions } from "@/query/beaches";

type BeachSearchProps = {
  selectedBeachId?: string;
  onSelect: (beach: Beach) => void;
};

export default function BeachSearch({
  selectedBeachId,
  onSelect,
}: BeachSearchProps) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const isTyping = search.trim() !== debouncedSearch;

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search.trim()), 350);
    return () => clearTimeout(timeout);
  }, [search]);

  const {
    data: beaches = [],
    isPending,
    error,
    refetch,
  } = useQuery({
    ...searchBeachesQueryOptions(debouncedSearch || undefined),
    enabled: isOpen && !isTyping,
    staleTime: 60_000,
  });

  function selectBeach(beach: Beach) {
    onSelect(beach);
    setSearch("");
    setIsOpen(false);
  }

  return (
    <section
      className="relative mt-8"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setIsOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setIsOpen(false);
      }}
    >
      <label htmlFor="beach-search" className="sr-only">
        Buscar praia
      </label>
      <div className="relative">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B665C]"
        >
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m16 16 4 4" strokeLinecap="round" />
        </svg>
        <input
          id="beach-search"
          type="search"
          autoComplete="off"
          maxLength={80}
          value={search}
          onFocus={() => setIsOpen(true)}
          onChange={(event) => {
            setSearch(event.target.value);
            setIsOpen(true);
          }}
          aria-controls={isOpen ? "beach-results" : undefined}
          placeholder="Buscar praia..."
          className="h-12 w-full rounded-xl border border-[#D8D4C9] bg-[#FFFDF2] pl-10 pr-4 text-sm outline-none placeholder:text-[#8B877E] focus:border-[#9D83CE] focus:ring-2 focus:ring-[#CDB4FF]"
        />
      </div>

      {isOpen && (
        <div
          id="beach-results"
          className="absolute left-0 right-0 top-14 z-20 max-h-[360px] overflow-y-auto rounded-xl border border-[#D8D4C9] bg-[#FFFDF2] p-2 shadow-[0_8px_24px_rgba(34,42,49,0.08)]"
        >
          {isTyping || isPending ? (
            <p role="status" className="px-3 py-4 text-sm text-[#6B665C]">
              Buscando praias...
            </p>
          ) : error ? (
            <div role="alert" className="px-3 py-4 text-sm text-[#6B665C]">
              <p>Não foi possível buscar as praias.</p>
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-2 font-medium underline"
              >
                Tentar novamente
              </button>
            </div>
          ) : beaches.length === 0 ? (
            <p role="status" className="px-3 py-4 text-sm text-[#6B665C]">
              Nenhuma praia encontrada.
            </p>
          ) : (
            <ul aria-label="Praias encontradas">
              {beaches.map((beach) => (
                <li key={beach.id}>
                  <button
                    type="button"
                    onClick={() => selectBeach(beach)}
                    aria-pressed={beach.id === selectedBeachId}
                    className={`w-full rounded-lg px-3 py-3 text-left text-sm transition ${
                      beach.id === selectedBeachId
                        ? "bg-[#E1E9FF] font-semibold"
                        : "text-[#6B665C] hover:bg-[#F5F0DD]"
                    }`}
                  >
                    {beach.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

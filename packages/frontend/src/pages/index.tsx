import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import BeachSearch from "@/components/BeachSearch";
import FeaturedBeach from "@/components/FeaturedBeach";
import Header from "@/components/Header";
import type { Beach } from "@/models/beach";
import { searchBeachesQueryOptions } from "@/query/beaches";

export default function HomePage() {
  const [selectedBeach, setSelectedBeach] = useState<Beach | null>(null);
  const {
    data: beaches = [],
    isPending,
    isFetching,
    error,
    refetch,
  } = useQuery(searchBeachesQueryOptions());
  const beach = selectedBeach ?? beaches[0];

  return (
    <main className="min-h-screen bg-[#F5F0DD] text-[#222A31]">
      <div className="mx-auto flex min-h-screen w-full max-w-[520px] flex-col px-6 pb-8">
        <Header showBack={false} />

        <section className="pt-6">
          <h1 className="text-[28px] font-bold leading-tight tracking-[-0.03em]">
            Encontre sua praia
          </h1>
          <p className="mt-3 max-w-[360px] text-sm leading-5 text-[#6B665C]">
            Consulte as condições de ondas e clima da sua praia.
          </p>
        </section>

        <BeachSearch selectedBeachId={beach?.id} onSelect={setSelectedBeach} />

        {beach ? (
          <FeaturedBeach beach={beach} />
        ) : isPending ? (
          <p
            role="status"
            className="mt-6 rounded-2xl bg-[#FFFDF2] p-6 text-center text-sm text-[#6B665C]"
          >
            Carregando praias...
          </p>
        ) : error ? (
          <section
            role="alert"
            className="mt-6 rounded-2xl bg-[#FFFDF2] p-6 text-center"
          >
            <h2 className="text-base font-semibold">
              Não foi possível carregar as praias
            </h2>
            <p className="mt-2 text-sm text-[#6B665C]">
              Tente novamente em instantes.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="mt-4 rounded-xl bg-[#222A31] px-4 py-3 text-sm font-medium text-white disabled:opacity-50"
            >
              {isFetching ? "Carregando..." : "Tentar novamente"}
            </button>
          </section>
        ) : (
          <p
            role="status"
            className="mt-6 rounded-2xl bg-[#FFFDF2] p-6 text-center text-sm text-[#6B665C]"
          >
            Nenhuma praia disponível no momento.
          </p>
        )}

        <footer className="mt-auto pt-10 text-center">
          <p className="text-[11px] text-[#8B877E]">Vai Dar Onda</p>
        </footer>
      </div>
    </main>
  );
}

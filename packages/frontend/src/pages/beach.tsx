import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";

import BeachForecast from "@/components/BeachForecast";
import BeachSummary from "@/components/BeachSummary";
import Error from "@/components/Error";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { beachQueryOptions } from "@/query/beaches";

export default function BeachPage() {
  const { id } = useParams({ from: "/beach/$id" });
  const { data: beach, isPending, error } = useQuery(beachQueryOptions(id));

  if (isPending) return <Loading />;

  if (error) {
    return (
      <Error
        message="Não foi possível carregar a praia"
        description="Tente novamente em instantes ou escolha outra praia."
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F0DD] text-[#222A31]">
      <div className="mx-auto w-full max-w-[520px] px-6 pb-10">
        <Header />
        <BeachSummary beach={beach} />
        <BeachForecast key={beach.id} forecasts={beach.forecast} />

        <Link
          to="/"
          className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-[#222A31] text-sm font-medium text-white transition hover:opacity-90"
        >
          Retornar para início
        </Link>
      </div>
    </main>
  );
}

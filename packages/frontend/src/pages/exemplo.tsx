import { useQuery } from "@tanstack/react-query";

import { Exemplo } from "@/components/exemplo";
import { searchBeachesQueryOptions } from "@/query/beaches";

export default function ExemploPage() {
  const { data, isPending, error } = useQuery(searchBeachesQueryOptions());

  if (isPending) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro ao carregar praias: {error.message}</p>;
  }

  return (
    <div>
      <Exemplo nomes={data.map((beach) => beach.name)} />
    </div>
  );
}
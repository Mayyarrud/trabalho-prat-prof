import type { Surfability } from "@/models/forecast";
import type { SurfLevel } from "@/enums/surf-level";

export default function SurfabilityIndicator({
  evaluation,
  surfLevel,
  surfScore,
  isLoading = false,
}: {
  evaluation?: Surfability | null;
  surfLevel?: SurfLevel | null;
  surfScore?: number | null;
  isLoading?: boolean;
}) {
  const complete = evaluation && Number.isFinite(evaluation.score) &&
    evaluation.score >= 0 && evaluation.score <= 100 &&
    ["Favorável", "Regular", "Desfavorável"].includes(evaluation.classification);
  const legacyScore = !surfLevel && !evaluation && surfScore != null && Number.isFinite(surfScore);

  return (
    <section aria-label="Surfabilidade" className="mt-3 rounded-xl bg-[#E9E2FF] p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xs text-[#6B665C]">Surfabilidade{surfLevel ? ` · ${surfLevel}` : ""}</h3>
      </div>
      <p className="mt-2 text-sm font-semibold" aria-live="polite">
        {isLoading ? "Atualizando avaliação..." : complete ? `${evaluation.score}/100 · ${evaluation.classification}` :
          legacyScore ? `${surfScore}/100` : "Sem avaliação disponível"}
      </p>
      {!surfLevel && (
        <p className="mt-1 text-xs text-[#6B665C]">Defina seu nível no perfil para ver a avaliação personalizada.</p>
      )}
    </section>
  );
}

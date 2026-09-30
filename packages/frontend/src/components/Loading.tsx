import { Link } from "@tanstack/react-router";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#F5F0DD] text-[#222A31]">
      <div className="mx-auto w-full max-w-[480px] px-6 py-8">
        <Link to="/" className="text-sm text-[#6B665C]">
          ← Voltar
        </Link>

        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="mt-10 rounded-2xl bg-[#FFFDF2] px-6 py-10 text-center"
        >
          <div
            aria-hidden="true"
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F0DD] text-[#6B665C] motion-safe:animate-pulse"
          >
            <svg
              viewBox="0 0 40 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-10 w-10"
            >
              <path d="M5 24c8 0 8-15 18-15 6 0 10 4 10 9-2-3-6-4-9-2s-3 6 1 8h10" />
              <path d="M5 30c3 0 3 2 6 2s3-2 6-2 3 2 6 2 3-2 6-2 3 2 6 2" />
            </svg>
          </div>

          <h1 className="text-lg font-semibold">Carregando...</h1>
          <p className="mt-2 text-sm leading-relaxed text-[#6B665C]">
            Só um instante, estamos buscando as informações para você.
          </p>
        </div>
      </div>
    </main>
  );
}

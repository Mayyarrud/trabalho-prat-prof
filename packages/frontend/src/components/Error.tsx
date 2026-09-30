import { Link } from "@tanstack/react-router";

export default function Error({ message, description }: { message: string; description: string }) {
    return (
      <main className="min-h-screen bg-[#F5F0DD] text-[#222A31]">
        <div className="mx-auto w-full max-w-[480px] px-6 py-8">
          <Link to="/" className="text-sm text-[#6B665C]">
            ← Voltar
          </Link>

          <div className="mt-10 rounded-2xl bg-[#FFFDF2] p-6 text-center">
            <h1 className="text-lg font-semibold">{message}</h1>

            <p className="mt-2 text-sm text-[#6B665C]">
              {description}
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

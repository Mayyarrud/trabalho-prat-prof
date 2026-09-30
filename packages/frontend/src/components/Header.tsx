import { Link } from "@tanstack/react-router";

import VaiDarOndaIcon from "@/public/VaiDarOndaIcon.svg";

export default function Header({ showBack = true }: { showBack?: boolean }) {
  return (
    <header className="grid grid-cols-[2.25rem_1fr_2.25rem] items-center py-6">
      {showBack && (
        <Link
          to="/"
          aria-label="Voltar para início"
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#6B665C] transition hover:bg-[#FFFDF2]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
          >
            <path
              d="m14 6-6 6 6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      )}

      <div className="col-start-2 flex items-center justify-center gap-2 sm:gap-3">
        <img
          src={VaiDarOndaIcon}
          alt=""
          className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12"
        />
        <span className="text-xl font-bold leading-none tracking-[-0.035em] sm:text-[26px]">
          Vai Dar Onda
        </span>
      </div>
    </header>
  );
}

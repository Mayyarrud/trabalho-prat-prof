import { useState } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";

import VaiDarOndaIcon from "@/public/VaiDarOndaIcon.svg";
import { useAuth } from "@/auth/AuthProvider";
import { logout } from "@/auth/auth-service";
import { notifyError } from "@/lib/notify-error";

export default function Header({ showBack = true }: { showBack?: boolean }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const next = location.pathname === "/login" || location.pathname === "/sign-up" ? "/" : location.href;
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleLogout() {
    setIsSigningOut(true);
    try {
      const { error } = await logout();
      if (error) throw error;
      await navigate({ to: "/", replace: true });
    } catch {
      notifyError("Não foi possível sair. Tente novamente.");
    } finally {
      setIsSigningOut(false);
    }
  }

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
      <nav aria-label="Conta" className="col-span-3 mt-4 flex flex-wrap items-center justify-end gap-4 text-xs text-[#6B665C]">
        {user ? (
          <>
            <span className="mr-auto max-w-[180px] truncate" title={user.email}>{user.email}</span>
            <Link to="/profile" className="underline underline-offset-4">Meu perfil</Link>
            <button type="button" onClick={handleLogout} disabled={isSigningOut} className="underline underline-offset-4 disabled:opacity-50">
              {isSigningOut ? "Saindo..." : "Sair"}
            </button>
          </>
        ) : (
          <>
            <Link to="/login" search={{ next }} className="underline underline-offset-4">Entrar</Link>
            <Link to="/sign-up" search={{ next }} className="underline underline-offset-4">Criar conta</Link>
          </>
        )}
      </nav>
    </header>
  );
}

import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import AuthPage from "@/pages/auth";
import { notifyError } from "@/lib/notify-error";

export const Route = createFileRoute("/auth/error")({
  component: AuthErrorPage,
});

function AuthErrorPage() {
  useEffect(() => {
    notifyError(
      "O link expirou, já foi usado ou foi aberto em outro navegador. Solicite um novo link.",
    );
  }, []);

  return (
    <AuthPage>
      <Card>
        <CardHeader>
          <CardTitle>
            <h1>Não foi possível confirmar o link</h1>
          </CardTitle>
          <CardDescription>
            O link pode ter expirado, já ter sido usado ou ter sido aberto em
            outro navegador.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 text-sm">
          <p>
            Solicite um novo link e abra no mesmo navegador em que iniciou o
            pedido.
          </p>
          <Link to="/forgot-password" className="underline underline-offset-4">
            Recuperar senha
          </Link>
          <Link
            to="/sign-up"
            search={{ next: "/" }}
            className="underline underline-offset-4"
          >
            Voltar ao cadastro
          </Link>
          <Link
            to="/login"
            search={{ next: "/" }}
            className="underline underline-offset-4"
          >
            Fazer login
          </Link>
        </CardContent>
      </Card>
    </AuthPage>
  );
}

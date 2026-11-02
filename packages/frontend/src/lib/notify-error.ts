import { toast } from "@/components/toast";

const messages: Record<string, string> = {
  invalid_credentials: "E-mail ou senha incorretos.",
  email_not_confirmed: "Confirme seu e-mail antes de entrar.",
  weak_password: "Escolha uma senha mais forte, com pelo menos 6 caracteres.",
  same_password: "Escolha uma senha diferente da senha atual.",
  current_password_required:
    "Informe sua senha atual para definir uma nova senha.",
  current_password_mismatch: "A senha atual está incorreta.",
  reauthentication_needed:
    "Confirme sua identidade com o código enviado por e-mail.",
  reauthentication_not_valid:
    "O código de confirmação é inválido ou expirou. Tente novamente ou solicite outro código.",
  over_email_send_rate_limit:
    "Aguarde alguns instantes antes de solicitar outro e-mail.",
  over_request_rate_limit:
    "Aguarde alguns instantes antes de tentar novamente.",
  session_not_found: "Sua sessão expirou. Entre novamente.",
  captcha_failed:
    "A verificação de segurança falhou ou expirou. Conclua a nova verificação e tente novamente.",
};

export function notifyError(
  error: unknown,
  fallback = "Não foi possível concluir. Tente novamente.",
) {
  let description = fallback;

  if (typeof error === "string") {
    description = error;
  } else if (error instanceof Error) {
    description = error.message;
  }

  if (error && typeof error === "object" && "code" in error) {
    const code = error.code;
    if (typeof code === "string" && Object.hasOwn(messages, code)) {
      description = messages[code];
    }
  }

  return toast.add({
    id: `error:${description}`,
    type: "error",
    title: "Não foi possível concluir",
    description,
    priority: "high",
    timeout: 7000,
  });
}

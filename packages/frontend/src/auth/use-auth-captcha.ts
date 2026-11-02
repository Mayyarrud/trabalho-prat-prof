import { useRef, useState } from "react";
import type { TurnstileInstance } from "@marsidev/react-turnstile";

export function useAuthCaptcha() {
  const widgetRef = useRef<TurnstileInstance | null>(null);
  const [token, setToken] = useState<string | null>(null);

  function getToken() {
    if (!token || !widgetRef.current || widgetRef.current.isExpired()) {
      setToken(null);
      throw new Error("Conclua a verificação de segurança para continuar.");
    }

    return token;
  }

  function reset() {
    setToken(null);
    widgetRef.current?.reset();
  }

  return { token, setToken, widgetRef, getToken, reset };
}

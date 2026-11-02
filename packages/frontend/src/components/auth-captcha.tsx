import type { RefObject } from 'react'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { notifyError } from '@/lib/notify-error'

const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim()

export function AuthCaptcha({ widgetRef, onTokenChange }: {
  widgetRef: RefObject<TurnstileInstance | null>
  onTokenChange: (token: string | null) => void
}) {
  function handleError(message: string) {
    onTokenChange(null)
    notifyError(message)
  }

  if (!siteKey) {
    return <p role="alert" className="text-sm text-destructive">A verificação de segurança está indisponível. Tente novamente mais tarde.</p>
  }

  return (
    <div className="flex justify-center">
      <Turnstile
        ref={widgetRef}
        siteKey={siteKey}
        options={{ theme: 'light', language: 'pt-br', size: 'normal', responseField: false, refreshExpired: 'auto' }}
        onSuccess={onTokenChange}
        onExpire={() => onTokenChange(null)}
        onTimeout={() => onTokenChange(null)}
        onError={() => handleError('Não foi possível verificar sua conexão. Aguarde e tente novamente.')}
        onUnsupported={() => handleError('Seu navegador não é compatível com a verificação. Tente outro navegador.')}
        scriptOptions={{ onError: () => handleError('Não foi possível carregar a verificação. Atualize a página e tente novamente.') }}
      />
    </div>
  )
}

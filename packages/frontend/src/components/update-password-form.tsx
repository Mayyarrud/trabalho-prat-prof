import { useState } from 'react'
import { Link } from '@tanstack/react-router'

import { cn } from '@/lib/utils'
import { notifyError } from '@/lib/notify-error'
import { reauthenticate, updatePassword } from '@/auth/auth-service'
import { Button } from '@/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/card'
import { Input } from '@/components/input'
import { Label } from '@/components/label'

export function UpdatePasswordForm({
  className,
  isRecovery = false,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & { isRecovery?: boolean }) {
  const [requiresCurrentPassword, setRequiresCurrentPassword] = useState(!isRecovery)
  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [requiresCode, setRequiresCode] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const [nonce, setNonce] = useState('')
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const isBusy = isLoading || isSendingCode

  async function sendConfirmationCode() {
    setIsSendingCode(true)
    try {
      const { error } = await reauthenticate()
      if (error) throw error
      setNonce('')
      setCodeSent(true)
    } catch (error: unknown) {
      notifyError(error, 'Não foi possível enviar o código. Tente novamente.')
    } finally {
      setIsSendingCode(false)
    }
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isBusy) return
    if (password !== repeatPassword) {
      notifyError('As senhas não coincidem.')
      return
    }
    setIsLoading(true)

    try {
      const { error } = await updatePassword(password, {
        currentPassword: requiresCurrentPassword ? currentPassword : undefined,
        nonce: requiresCode ? nonce : undefined,
      })
      if (error?.code === 'reauthentication_needed') {
        setRequiresCode(true)
        await sendConfirmationCode()
        return
      }
      if (error && ['current_password_required', 'current_password_mismatch'].includes(error.code ?? '')) {
        setRequiresCurrentPassword(true)
        setCurrentPassword('')
      }
      if (error?.code === 'reauthentication_not_valid') setNonce('')
      if (error) throw error
      setCurrentPassword('')
      setPassword('')
      setRepeatPassword('')
      setNonce('')
      setSuccess(true)
    } catch (error: unknown) {
      notifyError(error, 'Não foi possível atualizar a senha. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="font-medium text-lg tracking-normal"><h1>{success ? "Senha atualizada" : "Definir nova senha"}</h1></CardTitle>
          <CardDescription>Use uma senha com pelo menos 6 caracteres.</CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="grid gap-4 text-sm">
              <p role="status">Sua nova senha foi salva.</p>
              <Link to="/" className="underline underline-offset-4">Voltar para início</Link>
            </div>
          ) : (
            <form onSubmit={handleUpdatePassword}>
              <div className="flex flex-col gap-6">
                {requiresCurrentPassword && (
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Senha atual</Label>
                    <Input
                      id="current-password"
                      type="password"
                      autoComplete="current-password"
                      required
                      disabled={isBusy}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <Link to="/forgot-password" className="text-sm underline underline-offset-4">Esqueci minha senha</Link>
                  </div>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="password">Nova senha</Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    minLength={6}
                    placeholder="Nova senha"
                    required
                    disabled={isBusy}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="repeat-password">Confirmar nova senha</Label>
                  <Input id="repeat-password" type="password" autoComplete="new-password" minLength={6} required disabled={isBusy} value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                </div>
                {requiresCode && (
                  <div className="grid gap-2">
                    <Label htmlFor="confirmation-code">Código de confirmação</Label>
                    <p id="confirmation-code-help" role="status" className="text-sm text-muted-foreground">
                      {codeSent ? 'Enviamos um código para seu e-mail. Informe-o para salvar a nova senha.' : 'Confirme sua identidade solicitando um código por e-mail.'}
                    </p>
                    <Input
                      id="confirmation-code"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      aria-describedby="confirmation-code-help"
                      required
                      disabled={isBusy || !codeSent}
                      value={nonce}
                      onChange={(e) => setNonce(e.target.value)}
                    />
                    <Button type="button" variant="outline" disabled={isBusy} onClick={() => void sendConfirmationCode()}>
                      {isSendingCode ? 'Enviando código...' : codeSent ? 'Reenviar código' : 'Enviar código'}
                    </Button>
                  </div>
                )}
                <Button type="submit" className="w-full" disabled={isBusy || (requiresCode && (!codeSent || !nonce.trim()))}>
                  {isLoading ? 'Salvando...' : 'Salvar nova senha'}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

import { useState } from 'react'
import { Link } from '@tanstack/react-router'

import { cn } from '@/lib/utils'
import { notifyError } from '@/lib/notify-error'
import { recoverPassword } from '@/auth/auth-service'
import { useAuthCaptcha } from '@/auth/use-auth-captcha'
import { AuthCaptcha } from '@/components/auth-captcha'
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

export function ForgotPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const captcha = useAuthCaptcha()
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return
    setIsLoading(true)

    try {
      const { error } = await recoverPassword(email, captcha.getToken())
      if (error) throw error
      setSuccess(true)
    } catch (error: unknown) {
      notifyError(error, 'Não foi possível enviar o e-mail. Tente novamente.')
    } finally {
      captcha.reset()
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      {success ? (
        <Card>
          <CardHeader>
            <CardTitle className="font-medium text-lg tracking-normal"><h1>Confira seu e-mail</h1></CardTitle>
            <CardDescription>Confira as instruções de recuperação.</CardDescription>
          </CardHeader>
          <CardContent>
            <p role="status" className="text-sm text-muted-foreground">
              Se existir uma conta com este e-mail, você receberá um link para redefinir a senha.
              Abra o link neste mesmo navegador.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="font-medium text-lg tracking-normal">
              <h1>Recuperar senha</h1>
            </CardTitle>
            <CardDescription>
              Informe seu e-mail para receber um link de recuperação.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <AuthCaptcha widgetRef={captcha.widgetRef} onTokenChange={captcha.setToken} />
                <Button type="submit" className="w-full" disabled={isLoading || !captcha.token}>
                  {isLoading ? 'Enviando...' : 'Enviar link de recuperação'}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Lembrou sua senha?{' '}
                <Link to="/login" search={{ next: "/" }} className="underline underline-offset-4">
                  Fazer login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

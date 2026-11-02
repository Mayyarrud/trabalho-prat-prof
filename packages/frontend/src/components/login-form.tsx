import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'

import { cn } from '@/lib/utils'
import { notifyError } from '@/lib/notify-error'
import { safeNextPath } from '@/lib/safe-next-path'
import { login } from '@/auth/auth-service'
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

export function LoginForm({ next = '/', className, ...props }: React.ComponentPropsWithoutRef<'div'> & { next?: string }) {
  const navigate = useNavigate()
  const captcha = useAuthCaptcha()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return
    setIsLoading(true)

    try {
      const { error } = await login(email, password, captcha.getToken())
      if (error) throw error
      await navigate({ href: safeNextPath(next), replace: true })
    } catch (error: unknown) {
      notifyError(error, 'Não foi possível entrar. Tente novamente.')
    } finally {
      captcha.reset()
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="font-medium text-lg tracking-normal"><h1>Acesse sua conta</h1></CardTitle>
          <CardDescription>Informe seu e-mail e senha para entrar.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
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
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <AuthCaptcha widgetRef={captcha.widgetRef} onTokenChange={captcha.setToken} />
              <Button type="submit" className="w-full" disabled={isLoading || !captcha.token}>
                {isLoading ? 'Entrando...' : 'Fazer login'}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Ainda não tem conta?{' '}
              <Link to="/sign-up" search={{ next }} className="underline underline-offset-4">
                Criar sua conta
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

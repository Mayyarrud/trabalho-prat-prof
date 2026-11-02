import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'

import { cn } from '@/lib/utils'
import { notifyError } from '@/lib/notify-error'
import { register } from '@/auth/auth-service'
import { useAuthCaptcha } from '@/auth/use-auth-captcha'
import { AuthCaptcha } from '@/components/auth-captcha'
import { safeNextPath } from '@/lib/safe-next-path'
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
import { isSurfLevel, surfLevels, SurfLevel } from '@/enums/surf-level'

export function SignUpForm({ next = '/', className, ...props }: React.ComponentPropsWithoutRef<'div'> & { next?: string }) {
  const navigate = useNavigate()
  const captcha = useAuthCaptcha()
  const [name, setName] = useState('')
  const [surfLevel, setSurfLevel] = useState<SurfLevel>(SurfLevel.Iniciante)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return

    if (!name.trim()) {
      notifyError('Informe seu nome.')
      return
    }
    if (password !== repeatPassword) {
      notifyError('As senhas não coincidem.')
      return
    }
    setIsLoading(true)

    try {
      const { data, error } = await register(name, email, password, surfLevel, captcha.getToken(), next)
      if (error) throw error
      if (data.session) {
        await navigate({ href: safeNextPath(next), replace: true })
      } else {
        setSuccess(true)
      }
    } catch (error: unknown) {
      notifyError(error, 'Não foi possível cadastrar. Tente novamente.')
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
            <CardTitle className="font-medium text-lg tracking-normal">
              <h1>Confira seu e-mail</h1>
            </CardTitle>
            <CardDescription>Confirme seu cadastro para entrar.</CardDescription>
          </CardHeader>
          <CardContent>
            <p role="status" className="text-sm text-muted-foreground">
              Se o cadastro puder ser concluído, você receberá um link de confirmação.
              Abra o link neste mesmo navegador antes de fazer login.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="font-medium text-lg tracking-normal"><h1>Criar sua conta</h1></CardTitle>
            <CardDescription>Preencha seus dados. Use uma senha com pelo menos 6 caracteres.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" autoComplete="name" maxLength={100} required value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="surf-level">Nível de surf</Label>
                  <select id="surf-level" value={surfLevel} onChange={(e) => {
                    if (isSurfLevel(e.target.value)) setSurfLevel(e.target.value)
                  }} className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
                    {surfLevels.map((surfLevel) => <option key={surfLevel}>{surfLevel}</option>)}
                  </select>
                </div>
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
                  </div>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    minLength={6}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="repeat-password">Confirmar senha</Label>
                  </div>
                  <Input
                    id="repeat-password"
                    type="password"
                    autoComplete="new-password"
                    minLength={6}
                    required
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                  />
                </div>
                <AuthCaptcha widgetRef={captcha.widgetRef} onTokenChange={captcha.setToken} />
                <Button type="submit" className="w-full" disabled={isLoading || !captcha.token}>
                  {isLoading ? 'Criando conta...' : 'Fazer cadastro'}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Já tem conta?{' '}
                <Link to="/login" search={{ next }} className="underline underline-offset-4">
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

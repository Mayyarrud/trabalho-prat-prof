import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/auth/AuthProvider";
import Header from "@/components/Header";
import BeachSearch from "@/components/BeachSearch";
import { Button } from "@/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { notifyError } from "@/lib/notify-error";
import type { UserProfile } from "@/models/user";
import { isSurfLevel, surfLevels, type SurfLevel } from "@/enums/surf-level";
import { searchBeachesQueryOptions } from "@/query/beaches";
import { useMe, useUpdateMe, useFavouriteBeach } from "@/query/me";

function ProfileDetails({ profile }: { profile: UserProfile }) {
  const [name, setName] = useState<string | undefined>();
  const [surfLevel, setSurfLevel] = useState<SurfLevel | undefined>();
  const update = useUpdateMe();
  const favourite = useFavouriteBeach();
  const beaches = useQuery(searchBeachesQueryOptions());
  const favouriteBeach = beaches.data?.find((beach) => beach.id === profile.idFavouriteBeach);
  const currentName = name ?? profile.name;
  const currentSurfLevel = surfLevel ?? profile.surfLevel ?? "";
  const isSaving = update.isPending || favourite.isPending;

  function saveProfile(event: FormEvent) {
    event.preventDefault();
    if (!currentName.trim()) {
      notifyError("Informe seu nome.");
      return;
    }
    if (!currentSurfLevel) {
      notifyError("Selecione seu nível de surf.");
      return;
    }
    update.mutate({ name: currentName.trim(), surfLevel: currentSurfLevel }, {
      onSuccess: () => { setName(undefined); setSurfLevel(undefined); },
    });
  }

  return (
    <div className="mt-6 grid gap-5">
      <Card>
        <CardHeader><CardTitle><h2>Seus dados</h2></CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={saveProfile}>
            <fieldset disabled={isSaving} className="grid min-w-0 gap-5">
              <div className="grid gap-2">
                <Label htmlFor="profile-name">Nome</Label>
                <Input id="profile-name" autoComplete="name" required maxLength={100}
                  value={currentName} onChange={(event) => setName(event.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profile-email">E-mail</Label>
                <Input id="profile-email" type="email" readOnly value={profile.email ?? ""} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profile-level">Nível de surf</Label>
                <select id="profile-level" required value={currentSurfLevel}
                  onChange={(event) => {
                    if (isSurfLevel(event.target.value)) setSurfLevel(event.target.value);
                  }}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
                  <option value="" disabled>Selecione seu nível</option>
                  {surfLevels.map((value) => <option key={value}>{value}</option>)}
                </select>
              </div>
              <Button type="submit" disabled={isSaving || (currentName === profile.name && currentSurfLevel === profile.surfLevel)}>
                {update.isPending ? "Salvando..." : "Salvar alterações"}
              </Button>
            </fieldset>
          </form>
        </CardContent>
      </Card>

      <Card className="overflow-visible">
        <CardHeader><CardTitle><h2>Praia favorita</h2></CardTitle></CardHeader>
        <CardContent>
          {profile.idFavouriteBeach ? (
            <div className="grid gap-3">
              <Link to="/beach/$id" params={{ id: profile.idFavouriteBeach }} className="font-medium underline underline-offset-4">
                {favouriteBeach?.name ?? "Ver sua praia favorita"}
              </Link>
              {beaches.isPending && <p role="status" className="text-sm text-[#6B665C]">Carregando praia...</p>}
              {beaches.error && (
                <p role="alert" className="text-sm text-[#6B665C]">
                  Não foi possível carregar o nome da praia.{" "}
                  <button type="button" onClick={() => beaches.refetch()} className="underline">Tentar novamente</button>
                </p>
              )}
              <Button type="button" variant="outline" disabled={isSaving} onClick={() => favourite.mutate(null)}>
                Remover favorita
              </Button>
            </div>
          ) : <p className="text-sm text-[#6B665C]">Você ainda não escolheu uma praia favorita.</p>}
          <fieldset disabled={isSaving} className="min-w-0">
            <legend className="mt-5 text-sm text-[#6B665C]">Busque uma praia para salvar como favorita:</legend>
            <BeachSearch selectedBeachId={profile.idFavouriteBeach ?? undefined}
              onSelect={(beach) => favourite.mutate(beach.id)} />
          </fieldset>
          {favourite.isPending && <p role="status" className="mt-3 text-sm">Salvando favorita...</p>}
        </CardContent>
      </Card>

      <Link to="/update-password" className="text-center text-sm underline underline-offset-4">Alterar minha senha</Link>
    </div>
  );
}

export default function ProfilePage() {
  const { user } = useAuth();
  const profile = useMe();
  if (!user) return null;

  return (
    <main className="min-h-screen bg-[#F5F0DD] text-[#222A31]">
      <div className="mx-auto w-full max-w-[520px] px-6 pb-10">
        <Header />
        <h1 className="pt-6 text-[28px] font-bold tracking-[-0.03em]">Meu perfil</h1>
        {profile.isPending ? <p role="status" className="mt-6 text-sm">Carregando seu perfil...</p> :
          profile.error ? (
            <div role="alert" className="mt-6 grid gap-4 rounded-2xl bg-[#FFFDF2] p-5 text-sm">
              <p>{profile.error.message}</p>
              <Button onClick={() => profile.refetch()} disabled={profile.isFetching}>Tentar novamente</Button>
              <Link to="/login" search={{ next: "/profile" }} className="underline">Entrar novamente</Link>
            </div>
          ) : <ProfileDetails key={user.id} profile={profile.data} />}
      </div>
    </main>
  );
}

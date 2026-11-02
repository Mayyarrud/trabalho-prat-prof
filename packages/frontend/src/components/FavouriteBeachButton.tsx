import { Heart } from "lucide-react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/auth/AuthProvider";
import { useFavouriteBeach, useMe } from "@/query/me";
import { Button } from "@/components/button";

export default function FavouriteBeachButton({ beachId }: { beachId: string }) {
  const { user } = useAuth();
  const profile = useMe();
  const favourite = useFavouriteBeach();
  const navigate = useNavigate();
  const location = useLocation();
  const isFavourite = profile.data?.idFavouriteBeach === beachId;

  function toggleFavourite() {
    if (!user) {
      void navigate({ to: "/login", search: { next: location.href } });
      return;
    }
    favourite.mutate(isFavourite ? null : beachId);
  }

  return (
    <div className="mt-4">
      <Button
        type="button"
        variant="outline"
        aria-pressed={isFavourite}
        disabled={favourite.isPending || (!!user && (profile.isPending || !!profile.error))}
        onClick={toggleFavourite}
        className="w-full"
      >
        <Heart aria-hidden="true" className={isFavourite ? "fill-current text-[#8351B5]" : ""} />
        {favourite.isPending ? "Salvando..." : isFavourite ? "Remover dos favoritos" : "Favoritar praia"}
      </Button>
      {user && profile.error && (
        <p role="alert" className="mt-2 text-xs text-[#6B665C]">
          Não foi possível carregar sua favorita.{" "}
          <button type="button" onClick={() => profile.refetch()} className="underline">Tentar novamente</button>
        </p>
      )}
    </div>
  );
}

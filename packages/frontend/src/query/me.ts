import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, setFavouriteBeach, updateMe } from "@/api/me";
import { useAuth } from "@/auth/AuthProvider";
import { notifyError } from "@/lib/notify-error";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/toast";
import type { ProfileUpdate, UserProfile } from "@/models/user";

export function meQueryOptions(userId: string | null) {
  return queryOptions({
    queryKey: ["me", userId],
    queryFn: ({ signal }) => getMe(signal),
    enabled: userId !== null,
    staleTime: 60_000,
    retry: false,
  });
}

export function useMe() {
  const { user } = useAuth();
  return useQuery(meQueryOptions(user?.id ?? null));
}

function useProfileMutation<T>(action: (value: T) => Promise<UserProfile>, message: string) {
  const { user } = useAuth();
  const userId = user?.id;
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["me", userId],
    scope: { id: `me:${userId}` },
    mutationFn: action,
    onSuccess: async (profile) => {
      const key = meQueryOptions(profile.id).queryKey;
      await client.cancelQueries({ queryKey: key });
      const { data } = await supabase.auth.getSession();
      if (data.session?.user.id !== profile.id) return;
      client.setQueryData(key, profile);
      toast.add({ type: "success", title: message, timeout: 3500 });
      await client.invalidateQueries({ queryKey: key });
    },
    onError: (error) => { notifyError(error); },
  });
}

export function useUpdateMe() {
  return useProfileMutation<ProfileUpdate>(updateMe, "Perfil atualizado.");
}

export function useFavouriteBeach() {
  return useProfileMutation<string | null>(setFavouriteBeach, "Praia favorita atualizada.");
}

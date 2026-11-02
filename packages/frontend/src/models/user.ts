import type { SurfLevel } from "@/enums/surf-level";

export interface UserProfile {
  id: string;
  name: string;
  email: string | null;
  surfLevel: SurfLevel | null;
  idFavouriteBeach: string | null;
}

export interface ProfileUpdate {
  name?: string;
  surfLevel?: SurfLevel;
}

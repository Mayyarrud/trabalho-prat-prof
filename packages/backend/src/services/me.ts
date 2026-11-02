import { and, eq, isNull } from "drizzle-orm";
import { db } from "../db/index.ts";
import { beaches, users } from "../db/schema.ts";
import { isSurfLevel, type SurfLevel } from "../enums/surf-level.ts";
import { isProfileOwner, type AuthUser } from "../lib/auth.ts";

const profileFields = {
  id: users.id,
  name: users.name,
  surfLevel: users.surfLevel,
  idFavouriteBeach: users.idFavouriteBeach,
};

type Profile = Pick<typeof users.$inferSelect, keyof typeof profileFields>;

export interface ProfileUpdate {
  name?: string;
  surfLevel?: SurfLevel;
}

export type ProfileResult =
  | { profile: Profile & { email: string | null } }
  | { error: "profile_not_found" | "profile_forbidden" | "beach_not_found" };

function ownProfile(user: AuthUser) {
  return and(eq(users.id, user.id), isNull(users.deletedAt));
}

function profileResult(profile: Profile | undefined, user: AuthUser): ProfileResult {
  if (!profile) return { error: "profile_not_found" };
  if (!isProfileOwner(user, profile.id)) return { error: "profile_forbidden" };

  return {
    profile: {
      ...profile,
      surfLevel: isSurfLevel(profile.surfLevel) ? profile.surfLevel : null,
      email: user.email,
    },
  };
}

export async function getMe(user: AuthUser): Promise<ProfileResult> {
  const [profile] = await db.select(profileFields).from(users).where(ownProfile(user));
  return profileResult(profile, user);
}

export async function updateMe(user: AuthUser, changes: ProfileUpdate): Promise<ProfileResult> {
  const { name, surfLevel } = changes;
  const [profile] = await db.update(users).set({
    ...(name !== undefined ? { name: name.trim() } : {}),
    ...(surfLevel !== undefined ? { surfLevel } : {}),
  }).where(ownProfile(user)).returning(profileFields);
  return profileResult(profile, user);
}

export async function setFavouriteBeach(user: AuthUser, beachId: string): Promise<ProfileResult> {
  const [beach] = await db.select({ id: beaches.id }).from(beaches).where(eq(beaches.id, beachId));
  if (!beach) return { error: "beach_not_found" };

  const [profile] = await db.update(users).set({ idFavouriteBeach: beach.id })
    .where(ownProfile(user)).returning(profileFields);
  return profileResult(profile, user);
}

export async function removeFavouriteBeach(user: AuthUser): Promise<ProfileResult> {
  const [profile] = await db.update(users).set({ idFavouriteBeach: null })
    .where(ownProfile(user)).returning(profileFields);
  return profileResult(profile, user);
}

"use client";
import { authClient } from "@/lib/auth-client";

export type AuthUser = {
  email: string;
  name?: string | null;
  image?: string | null;
  isGuest?: boolean;
};

export function useAuth() {
  const { data: session, isPending, refetch } = authClient.useSession();

  const user: AuthUser | null = session?.user
    ? {
        email: session.user.email ?? "",
        name: session.user.name ?? null,
        image: session.user.image ?? null,
        isGuest: false,
      }
    : null;

  const refreshUser = async () => {
    try {
      await refetch();
    } catch (_) {
      // no-op
    }
  };

  return {
    user,
    loading: isPending,
    refreshUser,
  };
}

"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import type { PublicUser } from "@/lib/content-types";

export interface AuthContextValue {
  user: PublicUser | null;
  loading: boolean;
  refreshUser: () => Promise<PublicUser | null>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

async function fetchSession(): Promise<PublicUser | null> {
  try {
    const res = await fetch("/api/auth/session", { cache: "no-store", credentials: "same-origin" });
    if (!res.ok) return null;
    const json = (await res.json()) as { data?: PublicUser | null };
    return json.data ?? null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const next = await fetchSession();
    setUser(next);
    setLoading(false);
    return next;
  }, []);

  const signOut = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" }).catch(() => undefined);
    setUser(null);
  }, []);

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  const value = useMemo(() => ({ user, loading, refreshUser, signOut }), [user, loading, refreshUser, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

"use client";

import { authClient } from "@/lib/auth-client";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Subscribe to session changes without blocking render
  authClient.useSession();
  return <>{children}</>;
}
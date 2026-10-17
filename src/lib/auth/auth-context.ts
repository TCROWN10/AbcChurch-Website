"use client";
import { useContext } from "react";
import { AuthContext, type AuthContextValue } from "@/providers/auth-provider";
import type { PublicUser } from "@/lib/content-types";

export type AuthUser = PublicUser;

export function useAuth(): AuthContextValue & { isAdmin: boolean } {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>.");
  const isAdmin = ctx.user?.role === "ADMIN" || ctx.user?.role === "SUPER_ADMIN";
  return { ...ctx, isAdmin };
}

export function displayName(user: PublicUser) {
  return [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email;
}

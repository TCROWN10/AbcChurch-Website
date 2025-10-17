"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function SignOutButton({
  redirectTo = "/signin",
  className = "",
  children,
}: {
  redirectTo?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() =>
        startTransition(async () => {
          try {
            await authClient.signOut();
          } catch {}
          try {
            if (typeof window !== 'undefined') {
              window.localStorage.removeItem('is_guest');
            }
          } catch {}
          router.replace(redirectTo);
          router.refresh();
        })
      }
      className={className || "px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm disabled:opacity-50"}
      disabled={isPending}
      aria-busy={isPending}
    >
      {children ?? (isPending ? "Signing out..." : "Sign out")}
    </button>
  );
}

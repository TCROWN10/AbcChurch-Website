"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect home to an existing public page
    router.replace('/welcome');
  }, [router]);

  return (
    <span className="sr-only">Redirecting…</span>
  );
}

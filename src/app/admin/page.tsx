"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { displayName, useAuth } from '@/lib/auth/auth-context';
import { ToastProvider, Spinner } from './_components/ui';
import { isSectionId, SECTIONS, type SectionId } from './_lib/sections';
import Overview from './_sections/Overview';
import HeroEditor from './_sections/HeroEditor';
import DevotionalsManager from './_sections/DevotionalsManager';
import SermonsManager from './_sections/SermonsManager';
import GalleryManager from './_sections/GalleryManager';
import EventsManager from './_sections/EventsManager';
import DonationsView from './_sections/DonationsView';
import MembersManager from './_sections/MembersManager';
import PrayerRequestsManager from './_sections/PrayerRequestsManager';
import SubscribersManager from './_sections/SubscribersManager';

const ICONS: Record<SectionId, string> = {
  overview: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  hero: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 10l4-4 4 4 3-3 5 5',
  devotionals: 'M12 6.5C10.5 5.5 8.5 5 6 5H4v13h2c2.5 0 4.5.5 6 1.5m0-13c1.5-1 3.5-1.5 6-1.5h2v13h-2c-2.5 0-4.5.5-6 1.5m0-13v13',
  sermons: 'M19 11a7 7 0 01-14 0m7 7v3m-4 0h8M12 15a3 3 0 01-3-3V5a3 3 0 116 0v7a3 3 0 01-3 3z',
  gallery: 'M15 10l4.55-2.28A1 1 0 0121 8.62v6.76a1 1 0 01-1.45.9L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
  events: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  donations: 'M12 8c-1.66 0-3 .9-3 2s1.34 2 3 2 3 .9 3 2-1.34 2-3 2m0-8c1.11 0 2.08.4 2.6 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.4-2.6-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  members: 'M17 20h5v-2a3 3 0 00-5.36-1.86M17 20H7m10 0v-2c0-.66-.13-1.28-.36-1.86M7 20H2v-2a3 3 0 015.36-1.86M7 20v-2c0-.66.13-1.28.36-1.86m0 0a5 5 0 019.28 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  prayers: 'M4.32 6.32a4.5 4.5 0 000 6.36L12 20.36l7.68-7.68a4.5 4.5 0 00-6.36-6.36L12 7.64l-1.32-1.32a4.5 4.5 0 00-6.36 0z',
  subscribers: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
};

function SectionView({ id, go }: { id: SectionId; go: (id: SectionId) => void }) {
  switch (id) {
    case 'overview': return <Overview go={go} />;
    case 'hero': return <HeroEditor />;
    case 'devotionals': return <DevotionalsManager />;
    case 'sermons': return <SermonsManager />;
    case 'gallery': return <GalleryManager />;
    case 'events': return <EventsManager />;
    case 'donations': return <DonationsView />;
    case 'members': return <MembersManager />;
    case 'prayers': return <PrayerRequestsManager />;
    case 'subscribers': return <SubscribersManager />;
  }
}

export default function AdminPage() {
  const router = useRouter();
  const { user, loading, isAdmin, signOut } = useAuth();
  const [section, setSection] = useState<SectionId>('overview');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fromHash = () => {
      const hash = window.location.hash.slice(1);
      setSection(isSectionId(hash) ? hash : 'overview');
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  useEffect(() => {
    if (!loading && !user) router.replace('/signin?redirect=/admin');
  }, [loading, user, router]);

  const go = useCallback((id: SectionId) => {
    setSection(id);
    setMenuOpen(false);
    window.history.replaceState(null, '', `#${id}`);
    window.scrollTo({ top: 0 });
  }, []);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-[#FF602E]">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Admins only</h1>
          <p className="mt-2 text-sm text-gray-600">
            You&apos;re signed in as {user.email}, which doesn&apos;t have admin access. Ask the church administrator to give your account admin rights.
          </p>
          <div className="mt-6 flex justify-center gap-2">
            <Link href="/home" className="rounded-lg bg-[#FF602E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#E5552A]">Back to website</Link>
            <button
              type="button"
              onClick={async () => {
                await signOut();
                router.replace('/signin?redirect=/admin');
              }}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50"
            >
              Use another account
            </button>
          </div>
        </div>
      </div>
    );
  }

  const groups = Array.from(new Set(SECTIONS.map(s => s.group)));
  const current = SECTIONS.find(s => s.id === section)!;

  const nav = (
    <nav className="flex flex-col gap-6 px-3 py-4">
      {groups.map(group => (
        <div key={group}>
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">{group}</p>
          <ul className="space-y-0.5">
            {SECTIONS.filter(s => s.group === group).map(s => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => go(s.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    section === s.id ? 'bg-[#FF602E] text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={ICONS[s.id]} />
                  </svg>
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );

  const account = (
    <div className="border-t border-white/10 p-4">
      <p className="truncate text-sm font-semibold text-white">{displayName(user)}</p>
      <p className="truncate text-xs text-white/50">{user.email}</p>
      <div className="mt-3 flex gap-2">
        <Link href="/home" target="_blank" className="flex-1 rounded-lg bg-white/10 px-3 py-1.5 text-center text-xs font-semibold text-white hover:bg-white/20">
          View site
        </Link>
        <button
          type="button"
          onClick={async () => {
            await signOut();
            router.replace('/home');
          }}
          className="flex-1 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20"
        >
          Sign out
        </button>
      </div>
    </div>
  );

  const brand = (
    <div className="flex items-center gap-3 px-6 py-5">
      <Image src="/images/church-logo.png" alt="" width={36} height={36} className="rounded-full bg-white" />
      <div>
        <p className="text-sm font-bold text-white">ABC Church</p>
        <p className="text-xs text-white/50">Admin dashboard</p>
      </div>
    </div>
  );

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50">
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-[#0C232B] lg:flex">
          {brand}
          <div className="flex-1 overflow-y-auto">{nav}</div>
          {account}
        </aside>

        <header className="sticky top-0 z-30 flex items-center justify-between bg-[#0C232B] px-4 py-3 lg:hidden">
          <div className="flex items-center gap-2">
            <Image src="/images/church-logo.png" alt="" width={28} height={28} className="rounded-full bg-white" />
            <span className="text-sm font-semibold text-white">{current.label}</span>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="rounded-lg p-2 text-white hover:bg-white/10"
            aria-label="Open admin menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>

        {menuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMenuOpen(false)} />
            <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-[#0C232B]">
              <div className="flex items-center justify-between pr-3">
                {brand}
                <button type="button" onClick={() => setMenuOpen(false)} className="rounded-lg p-2 text-white hover:bg-white/10" aria-label="Close admin menu">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">{nav}</div>
              {account}
            </div>
          </div>
        )}

        <main className="lg:pl-64">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <SectionView id={section} go={go} />
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}

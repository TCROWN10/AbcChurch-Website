"use client";
import { useCallback, useEffect, useState } from 'react';
import type { CollectionMap, CollectionName, PublicUser } from '@/lib/content-types';
import { api } from './api';

type AdminRow<C extends CollectionName> = C extends 'users' ? PublicUser : CollectionMap[C];

export function useCollection<C extends CollectionName>(collection: C) {
  const [items, setItems] = useState<AdminRow<C>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await api<AdminRow<C>[]>(`/api/admin/${collection}`));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load data.');
    } finally {
      setLoading(false);
    }
  }, [collection]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const create = useCallback(
    async (data: unknown) => {
      const created = await api<AdminRow<C>>(`/api/admin/${collection}`, { method: 'POST', json: data });
      await reload();
      return created;
    },
    [collection, reload]
  );

  const update = useCallback(
    async (id: string, data: unknown) => {
      const updated = await api<AdminRow<C>>(`/api/admin/${collection}/${id}`, { method: 'PUT', json: data });
      setItems(prev => prev.map(item => (item.id === id ? updated : item)));
      return updated;
    },
    [collection]
  );

  const remove = useCallback(
    async (id: string) => {
      await api(`/api/admin/${collection}/${id}`, { method: 'DELETE' });
      setItems(prev => prev.filter(item => item.id !== id));
    },
    [collection]
  );

  return { items, loading, error, reload, create, update, remove };
}

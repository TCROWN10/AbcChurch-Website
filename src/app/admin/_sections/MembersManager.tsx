"use client";
import { useMemo, useState } from 'react';
import type { PublicUser, Role } from '@/lib/content-types';
import { displayName, useAuth } from '@/lib/auth/auth-context';
import { downloadCsv, formatDate, formatMoney } from '../_lib/api';
import { useCollection } from '../_lib/hooks';
import {
  Badge,
  Button,
  ConfirmDelete,
  Drawer,
  EmptyState,
  ErrorBlock,
  Field,
  LoadingBlock,
  PageHeader,
  SearchInput,
  Select,
  TextInput,
  useAction,
} from '../_components/ui';

const ROLE_LABEL: Record<Role, string> = { MEMBER: 'Member', ADMIN: 'Admin', SUPER_ADMIN: 'Super admin' };
const ROLE_TONE: Record<Role, 'gray' | 'orange' | 'blue'> = { MEMBER: 'gray', ADMIN: 'orange', SUPER_ADMIN: 'blue' };

function generatePassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  const bytes = crypto.getRandomValues(new Uint32Array(10));
  return Array.from(bytes, b => chars[b % chars.length]).join('');
}

export default function MembersManager() {
  const users = useCollection('users');
  const donations = useCollection('donations');
  const { user: me } = useAuth();
  const run = useAction();
  const isSuper = me?.role === 'SUPER_ADMIN';
  const [query, setQuery] = useState('');
  const [role, setRole] = useState<Role | 'all'>('all');
  const [selected, setSelected] = useState<PublicUser | null>(null);
  const [newRole, setNewRole] = useState<Role>('MEMBER');
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);

  const givenByEmail = useMemo(() => {
    const map = new Map<string, number>();
    for (const d of donations.items) {
      if (d.status !== 'completed') continue;
      const key = d.donorEmail.toLowerCase();
      map.set(key, (map.get(key) ?? 0) + d.amount);
    }
    return map;
  }, [donations.items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.items.filter(
      u => (role === 'all' || u.role === role) && (!q || u.email.toLowerCase().includes(q) || displayName(u).toLowerCase().includes(q))
    );
  }, [users.items, query, role]);

  function openUser(u: PublicUser) {
    setSelected(u);
    setNewRole(u.role);
    setPassword('');
  }

  async function saveRole() {
    if (!selected) return;
    setSaving(true);
    const ok = await run(() => users.update(selected.id, { role: newRole }), `${displayName(selected)} is now ${ROLE_LABEL[newRole].toLowerCase()}.`);
    setSaving(false);
    if (ok) setSelected(null);
  }

  async function savePassword() {
    if (!selected) return;
    setSaving(true);
    await run(() => users.update(selected.id, { newPassword: password }), 'Temporary password set. Share it with the member privately.');
    setSaving(false);
  }

  return (
    <>
      <PageHeader
        title="Members & Sign-ins"
        description="Everyone who has created an account, when they joined and when they last signed in."
        actions={
          <Button
            variant="secondary"
            disabled={filtered.length === 0}
            onClick={() =>
              downloadCsv(
                'members.csv',
                filtered.map(u => ({
                  first_name: u.firstName,
                  last_name: u.lastName,
                  email: u.email,
                  role: u.role,
                  joined: u.createdAt,
                  last_sign_in: u.lastLoginAt ?? '',
                  total_given: (givenByEmail.get(u.email.toLowerCase()) ?? 0).toFixed(2),
                }))
              )
            }
          >
            Export CSV
          </Button>
        }
      />

      <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
        <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput value={query} onChange={setQuery} placeholder="Search name or email" />
          <div className="flex items-center gap-3">
            <Select
              aria-label="Filter by role"
              value={role}
              onChange={setRole}
              className="w-40"
              options={[
                { value: 'all', label: 'All roles' },
                { value: 'MEMBER', label: 'Members' },
                { value: 'ADMIN', label: 'Admins' },
                { value: 'SUPER_ADMIN', label: 'Super admins' },
              ]}
            />
            <span className="whitespace-nowrap text-sm text-gray-500">{filtered.length} people</span>
          </div>
        </div>

        {users.error ? (
          <div className="p-4"><ErrorBlock message={users.error} onRetry={users.reload} /></div>
        ) : users.loading && users.items.length === 0 ? (
          <LoadingBlock />
        ) : users.items.length === 0 ? (
          <div className="p-4"><EmptyState title="No members yet" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Joined</th>
                  <th className="px-4 py-3">Last sign-in</th>
                  <th className="px-4 py-3">Total given</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">
                        {displayName(u)} {u.id === me?.id && <span className="text-xs text-gray-400">(you)</span>}
                      </p>
                      <a href={`mailto:${u.email}`} className="text-xs text-gray-500 hover:text-[#FF602E]">{u.email}</a>
                    </td>
                    <td className="px-4 py-3"><Badge tone={ROLE_TONE[u.role]}>{ROLE_LABEL[u.role]}</Badge></td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-500">{formatDate(u.createdAt)}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-500">{u.lastLoginAt ? formatDate(u.lastLoginAt, true) : 'Never'}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                      {givenByEmail.has(u.email.toLowerCase()) ? formatMoney(givenByEmail.get(u.email.toLowerCase())!) : '—'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      {isSuper && (
                        <Button variant="secondary" size="sm" onClick={() => openUser(u)}>Manage</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <p className="py-10 text-center text-sm text-gray-500">No one matches your search.</p>}
          </div>
        )}
      </div>

      {!isSuper && (
        <p className="mt-3 text-xs text-gray-500">Only super admins can change roles, reset passwords or remove accounts.</p>
      )}

      <Drawer open={selected !== null} onClose={() => setSelected(null)} title={selected ? displayName(selected) : ''}>
        {selected && (
          <div className="space-y-6">
            <div className="rounded-xl bg-white p-4 text-sm ring-1 ring-gray-200">
              <p className="text-gray-900">{selected.email}</p>
              <p className="mt-1 text-gray-500">Joined {formatDate(selected.createdAt)} · Last sign-in {selected.lastLoginAt ? formatDate(selected.lastLoginAt, true) : 'never'}</p>
            </div>

            <div className="space-y-3 rounded-xl bg-white p-4 ring-1 ring-gray-200">
              <Field label="Role" hint="Admins can manage all website content. Super admins can also manage people.">
                <Select<Role>
                  value={newRole}
                  onChange={setNewRole}
                  disabled={selected.id === me?.id}
                  options={[
                    { value: 'MEMBER', label: 'Member' },
                    { value: 'ADMIN', label: 'Admin' },
                    { value: 'SUPER_ADMIN', label: 'Super admin' },
                  ]}
                />
              </Field>
              <Button onClick={saveRole} loading={saving} disabled={newRole === selected.role || selected.id === me?.id}>Save role</Button>
              {selected.id === me?.id && <p className="text-xs text-gray-500">You can&apos;t change your own role.</p>}
            </div>

            <div className="space-y-3 rounded-xl bg-white p-4 ring-1 ring-gray-200">
              <Field label="Set a temporary password" hint="Use this when a member forgets their password. Share it privately; they can sign in with it right away.">
                <div className="flex gap-2">
                  <TextInput value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 8 characters" />
                  <Button variant="secondary" onClick={() => setPassword(generatePassword())}>Generate</Button>
                </div>
              </Field>
              <Button onClick={savePassword} loading={saving} disabled={password.length < 8}>Set password</Button>
            </div>

            {selected.id !== me?.id && (
              <div className="flex items-center justify-between rounded-xl bg-red-50 p-4 ring-1 ring-red-200">
                <p className="text-sm text-red-800">Remove this account permanently.</p>
                <ConfirmDelete
                  label="Remove account"
                  onConfirm={async () => {
                    const ok = await run(() => users.remove(selected.id), 'Account removed.');
                    if (ok) setSelected(null);
                  }}
                />
              </div>
            )}
          </div>
        )}
      </Drawer>
    </>
  );
}

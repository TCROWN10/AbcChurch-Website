"use client";
import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDownIcon } from '@/components/ui/Icons';

/* --------------------------------- Toasts --------------------------------- */

type Toast = { id: number; message: string; tone: 'success' | 'error' };
const ToastContext = createContext<(message: string, tone?: Toast['tone']) => void>(() => undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);
  const push = useCallback((message: string, tone: Toast['tone'] = 'success') => {
    const id = ++nextId.current;
    setToasts(prev => [...prev, { id, message, tone }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), tone === 'error' ? 6000 : 3500);
  }, []);
  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="fixed bottom-4 right-4 z-[60] flex w-[min(92vw,380px)] flex-col gap-2" aria-live="polite">
        {toasts.map(t => (
          <div
            key={t.id}
            role="status"
            className={`rounded-xl px-4 py-3 text-sm font-medium shadow-lg ring-1 ${
              t.tone === 'error' ? 'bg-red-50 text-red-800 ring-red-200' : 'bg-emerald-50 text-emerald-800 ring-emerald-200'
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

/** Runs an async action, toasting success or the error message. Returns true on success. */
export function useAction() {
  const toast = useToast();
  return useCallback(
    async (fn: () => Promise<unknown>, success?: string) => {
      try {
        await fn();
        if (success) toast(success);
        return true;
      } catch (e) {
        toast(e instanceof Error ? e.message : 'Something went wrong.', 'error');
        return false;
      }
    },
    [toast]
  );
}

/* ------------------------------- Primitives ------------------------------- */

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md';
  loading?: boolean;
};

export function Button({ variant = 'primary', size = 'md', loading, className = '', children, disabled, ...rest }: ButtonProps) {
  const styles = {
    primary: 'bg-[#FF602E] text-white hover:bg-[#E5552A] shadow-sm',
    secondary: 'bg-white text-gray-800 ring-1 ring-gray-300 hover:bg-gray-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'text-gray-600 hover:bg-gray-100',
  }[variant];
  const sizing = size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm';
  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${styles} ${sizing} ${className}`}
      {...rest}
    >
      {loading && <Spinner className="h-4 w-4" />}
      {children}
    </button>
  );
}

export function Spinner({ className = 'h-6 w-6' }: { className?: string }) {
  return <span className={`inline-block animate-spin rounded-full border-2 border-current border-t-transparent ${className}`} aria-hidden="true" />;
}

export function Field({ label, hint, children, className = '' }: { label: string; hint?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-gray-500">{hint}</span>}
    </label>
  );
}

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#FF602E] focus:ring-2 focus:ring-[#FF602E]/20';

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ''}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} ${props.className ?? ''}`} />;
}

export type SelectOption<T extends string> = { value: T; label: string };

export function Select<T extends string>({ value, onChange, options, disabled, className = '', placeholder = 'Select…', 'aria-label': ariaLabel }: {
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  'aria-label'?: string;
}) {
  const id = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState<{ left: number; width: number; top?: number; bottom?: number; maxHeight: number } | null>(null);
  const selectedIndex = options.findIndex(o => o.value === value);
  const selected = options[selectedIndex];

  const place = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const gap = 6;
    const below = window.innerHeight - r.bottom - gap - 8;
    const above = r.top - gap - 8;
    const flip = below < 200 && above > below;
    setPos({
      left: r.left,
      width: r.width,
      ...(flip ? { bottom: window.innerHeight - r.top + gap } : { top: r.bottom + gap }),
      maxHeight: Math.min(288, flip ? above : below),
    });
  }, []);

  const openMenu = () => {
    if (disabled) return;
    place();
    setActive(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  };

  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  };

  const choose = (i: number) => {
    const opt = options[i];
    if (opt && opt.value !== value) onChange(opt.value);
    close();
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!triggerRef.current?.contains(t) && !listRef.current?.contains(t)) close(false);
    };
    const onMove = (e: Event) => {
      if (listRef.current?.contains(e.target as Node)) return;
      place();
    };
    document.addEventListener('pointerdown', onDown);
    window.addEventListener('resize', onMove);
    window.addEventListener('scroll', onMove, true);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      window.removeEventListener('resize', onMove);
      window.removeEventListener('scroll', onMove, true);
    };
  }, [open, place]);

  useEffect(() => {
    if (open) listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [open, active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        openMenu();
      }
      return;
    }
    const last = options.length - 1;
    const moves: Record<string, () => void> = {
      ArrowDown: () => setActive(i => Math.min(last, i + 1)),
      ArrowUp: () => setActive(i => Math.max(0, i - 1)),
      Home: () => setActive(0),
      End: () => setActive(last),
      Enter: () => choose(active),
      ' ': () => choose(active),
      Escape: () => close(),
      Tab: () => close(false),
    };
    if (moves[e.key]) {
      if (e.key !== 'Tab') e.preventDefault();
      if (e.key === 'Escape') e.stopPropagation();
      moves[e.key]();
    } else if (e.key.length === 1) {
      const ch = e.key.toLowerCase();
      const start = active + 1;
      const order = [...options.slice(start), ...options.slice(0, start)];
      const hit = order.findIndex(o => o.label.toLowerCase().startsWith(ch));
      if (hit >= 0) setActive((start + hit) % options.length);
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? `${id}-list` : undefined}
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={onKeyDown}
        className={`flex w-full items-center justify-between gap-2 rounded-lg border bg-white px-3 py-2 text-left text-sm transition-colors disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 ${
          open ? 'border-[#FF602E] ring-2 ring-[#FF602E]/20' : 'border-gray-300 hover:border-gray-400'
        } ${className}`}
      >
        <span className={`truncate ${selected ? 'text-gray-900' : 'text-gray-400'}`}>{selected?.label ?? placeholder}</span>
        <ChevronDownIcon className={`h-[18px] w-[18px] shrink-0 transition-transform ${open ? 'rotate-180 text-[#FF602E]' : 'text-gray-500'}`} strokeWidth={3} />
      </button>
      {open && pos && createPortal(
        <ul
          ref={listRef}
          id={`${id}-list`}
          role="listbox"
          tabIndex={-1}
          style={{ position: 'fixed', left: pos.left, top: pos.top, bottom: pos.bottom, minWidth: pos.width, maxHeight: pos.maxHeight }}
          className="z-[70] overflow-y-auto rounded-xl bg-white p-1.5 shadow-xl ring-1 ring-gray-200"
        >
          {options.map((o, i) => {
            const isSelected = o.value === value;
            return (
              <li
                key={o.value}
                id={`${id}-opt-${i}`}
                data-index={i}
                role="option"
                aria-selected={isSelected}
                onPointerEnter={() => setActive(i)}
                onMouseDown={e => e.preventDefault()}
                onClick={() => choose(i)}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm ${
                  i === active ? 'bg-orange-50 text-[#E5552A]' : 'text-gray-700'
                } ${isSelected ? 'font-semibold' : ''}`}
              >
                <span className="whitespace-nowrap">{o.label}</span>
                {isSelected && (
                  <svg className="h-4 w-4 shrink-0 text-[#FF602E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>,
        document.body
      )}
    </>
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-3 text-sm text-gray-700"
    >
      <span className={`relative h-6 w-11 rounded-full transition-colors ${checked ? 'bg-[#FF602E]' : 'bg-gray-300'}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? 'left-[22px]' : 'left-0.5'}`} />
      </span>
      {label}
    </button>
  );
}

export function Badge({ tone = 'gray', children }: { tone?: 'gray' | 'green' | 'orange' | 'red' | 'blue'; children: React.ReactNode }) {
  const tones = {
    gray: 'bg-gray-100 text-gray-700',
    green: 'bg-emerald-100 text-emerald-800',
    orange: 'bg-orange-100 text-orange-800',
    red: 'bg-red-100 text-red-800',
    blue: 'bg-blue-100 text-blue-800',
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

export function Card({ title, actions, children, className = '' }: { title?: React.ReactNode; actions?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 sm:p-6 ${className}`}>
      {(title || actions) && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          {title && <h2 className="text-base font-semibold text-gray-900">{title}</h2>}
          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-gray-200 px-6 py-14 text-center">
      <p className="font-semibold text-gray-800">{title}</p>
      {description && <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function LoadingBlock() {
  return (
    <div className="flex items-center justify-center py-16 text-[#FF602E]">
      <Spinner className="h-8 w-8" />
    </div>
  );
}

export function ErrorBlock({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="rounded-xl bg-red-50 p-4 text-sm text-red-800 ring-1 ring-red-200">
      {message}
      {onRetry && (
        <button type="button" onClick={onRetry} className="ml-3 font-semibold underline">
          Try again
        </button>
      )}
    </div>
  );
}

/* ------------------------------- Overlays -------------------------------- */

export function Drawer({ open, onClose, title, children, footer, wide }: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-gray-900/40" onClick={onClose} />
      <div className={`relative flex h-full w-full flex-col bg-gray-50 shadow-2xl ${wide ? 'max-w-4xl' : 'max-w-xl'}`}>
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100" aria-label="Close">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
        {footer && <div className="flex flex-wrap justify-end gap-2 border-t border-gray-200 bg-white px-5 py-4">{footer}</div>}
      </div>
    </div>
  );
}

/** A delete button that asks for confirmation inline. */
export function ConfirmDelete({ onConfirm, label = 'Delete', confirmLabel = 'Yes, delete' }: {
  onConfirm: () => Promise<unknown> | void;
  label?: string;
  confirmLabel?: string;
}) {
  const [asking, setAsking] = useState(false);
  const [busy, setBusy] = useState(false);
  if (!asking) {
    return (
      <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => setAsking(true)}>
        {label}
      </Button>
    );
  }
  return (
    <span className="inline-flex items-center gap-1">
      <Button
        variant="danger"
        size="sm"
        loading={busy}
        onClick={async () => {
          setBusy(true);
          try {
            await onConfirm();
          } finally {
            setBusy(false);
            setAsking(false);
          }
        }}
      >
        {confirmLabel}
      </Button>
      <Button variant="ghost" size="sm" onClick={() => setAsking(false)}>
        Cancel
      </Button>
    </span>
  );
}

export function SearchInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="relative w-full sm:w-72">
      <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
      </svg>
      <TextInput type="search" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="pl-9" />
    </div>
  );
}

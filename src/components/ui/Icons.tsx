type IconProps = { className?: string; strokeWidth?: number };

function Icon({ className = 'h-5 w-5', strokeWidth = 2.75, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const ArrowRightIcon = (p: IconProps) => <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Icon>;
export const ArrowLeftIcon = (p: IconProps) => <Icon {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></Icon>;
export const ArrowUpIcon = (p: IconProps) => <Icon {...p}><path d="M12 19V5M6 11l6-6 6 6" /></Icon>;
export const ChevronRightIcon = (p: IconProps) => <Icon {...p}><path d="M9 5l7 7-7 7" /></Icon>;
export const ChevronLeftIcon = (p: IconProps) => <Icon {...p}><path d="M15 5l-7 7 7 7" /></Icon>;
export const ChevronDownIcon = (p: IconProps) => <Icon {...p}><path d="M5 9l7 7 7-7" /></Icon>;

/** Solid circular arrow badge used beside call-to-action text. Animates when an ancestor has the `group` class. */
export function ArrowBadge({ direction = 'right', className = '' }: { direction?: 'right' | 'left'; className?: string }) {
  const ArrowIcon = direction === 'right' ? ArrowRightIcon : ArrowLeftIcon;
  const nudge = direction === 'right' ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1';
  return (
    <span
      className={`inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#FF602E] text-white shadow-md shadow-[#FF602E]/30 transition-transform duration-300 ${nudge} ${className}`}
      aria-hidden="true"
    >
      <ArrowIcon className="h-[18px] w-[18px]" strokeWidth={3} />
    </span>
  );
}

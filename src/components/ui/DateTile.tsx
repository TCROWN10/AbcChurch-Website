const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** Parses `YYYY-MM-DD` as a local calendar date (avoids UTC day shifts). */
export function parseIsoDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function formatLongDate(iso: string): string {
  const date = parseIsoDate(iso);
  return `${WEEKDAYS[date.getDay()]}, ${MONTHS_LONG[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function formatMonthYear(iso: string): string {
  const date = parseIsoDate(iso);
  return `${MONTHS_LONG[date.getMonth()]} ${date.getFullYear()}`;
}

type DateTileProps = {
  date: string;
  size?: 'md' | 'lg';
  highlight?: boolean;
};

export default function DateTile({ date, size = 'md', highlight = false }: DateTileProps) {
  const d = parseIsoDate(date);
  const box = size === 'lg' ? 'w-20 h-20' : 'w-16 h-16';
  const day = size === 'lg' ? 'text-3xl' : 'text-2xl';

  return (
    <div
      className={`${box} flex-shrink-0 rounded-xl flex flex-col items-center justify-center leading-none transition-colors ${
        highlight
          ? 'bg-[#FF602E] text-white'
          : 'bg-[#FF602E]/10 text-[#FF602E] ring-1 ring-inset ring-[#FF602E]/30 group-hover:bg-[#FF602E] group-hover:text-white'
      }`}
    >
      <span className="text-[10px] font-semibold uppercase tracking-widest opacity-80">
        {MONTHS_SHORT[d.getMonth()]}
      </span>
      <span className={`${day} font-bold mt-1`}>{d.getDate()}</span>
      <span className="text-[10px] font-medium uppercase tracking-wider opacity-70 mt-1">
        {WEEKDAYS[d.getDay()].slice(0, 3)}
      </span>
    </div>
  );
}

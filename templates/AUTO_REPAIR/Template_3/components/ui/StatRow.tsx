import { cn } from "@/lib/cn";

type Stat = {
  value: string;
  label: string;
};

type StatRowProps = {
  stats?: Stat[];
  className?: string;
};

/**
 * Three-column promise stat display. Values default to ASE / OEM / 12-MO so
 * the row works for shops of any age (claude.md hard rule #11). Override
 * via the stats prop if needed.
 */
const DEFAULT_STATS: Stat[] = [
  { value: "ASE", label: "Certified technicians" },
  { value: "OEM", label: "Original parts" },
  { value: "12-MO", label: "Warranty on repairs" },
];

export default function StatRow({ stats = DEFAULT_STATS, className }: StatRowProps) {
  return (
    <dl className={cn("grid grid-cols-3 gap-6 md:gap-8", className)}>
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col">
          <dt className="font-display text-2xl font-bold text-primary md:text-3xl">
            {s.value}
          </dt>
          <dd className="mt-1 small-caps text-[10px] text-white/60 md:text-[11px]">
            {s.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}

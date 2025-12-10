import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtext?: string;
  gradient?: string;
  iconBg?: string;
  className?: string;
}

function StatsCard({
  icon: Icon,
  label,
  value,
  subtext,
  gradient = 'from-primary to-sky-500',
  iconBg,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl',
        'bg-card border border-border',
        'p-5 transition-all duration-300',
        'hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1',
        'dark:hover:shadow-primary/10',
        className
      )}
    >
      {/* Subtle gradient overlay on hover */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-5',
          gradient
        )}
      />

      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
          {subtext && (
            <p className="text-sm text-muted-foreground">{subtext}</p>
          )}
        </div>
        <div
          className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
            'bg-gradient-to-br shadow-lg transition-transform duration-300 group-hover:scale-110',
            gradient,
            iconBg
          )}
          style={{
            boxShadow: `0 8px 16px -4px hsl(var(--primary) / 0.3)`,
          }}
        >
          <Icon className="h-6 w-6 text-primary-foreground" />
        </div>
      </div>
    </div>
  );
}

export { StatsCard };

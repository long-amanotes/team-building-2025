import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  className?: string;
}

const variantStyles = {
  default: 'bg-primary/15 text-primary border-primary/25 dark:bg-primary/20 dark:text-primary dark:border-primary/30',
  secondary: 'bg-secondary text-secondary-foreground border-border',
  outline: 'bg-transparent text-muted-foreground border-border',
  success: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/25 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30',
  warning: 'bg-amber-500/15 text-amber-600 border-amber-500/25 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30',
  danger: 'bg-rose-500/15 text-rose-600 border-rose-500/25 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-0.5 text-xs',
};

function Badge({ children, variant = 'default', size = 'md', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}

export { Badge };

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface TabsProps {
  children: ReactNode;
  className?: string;
}

function Tabs({ children, className }: TabsProps) {
  return <div className={cn('w-full', className)}>{children}</div>;
}

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

function TabsList({ children, className }: TabsListProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-1 rounded-xl bg-muted/50 p-1',
        className
      )}
    >
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  children: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

function TabsTrigger({
  children,
  isActive = false,
  onClick,
  className,
}: TabsTriggerProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium',
        'transition-all duration-200 ease-out',
        isActive
          ? 'bg-gradient-to-r from-primary to-sky-500 text-primary-foreground shadow-lg shadow-primary/20'
          : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
        className
      )}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  children: ReactNode;
  className?: string;
}

function TabsContent({ children, className }: TabsContentProps) {
  return (
    <div className={cn('mt-6 animate-fade-in', className)}>
      {children}
    </div>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };

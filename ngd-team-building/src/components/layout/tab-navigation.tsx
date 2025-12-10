import {
  LayoutDashboard,
  Calendar,
  BedDouble,
  Users,
  UtensilsCrossed,
  Bus,
  Wallet,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TabId } from '@/types';

interface TabNavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard },
  { id: 'schedule', label: 'Lịch trình', icon: Calendar },
  { id: 'rooms', label: 'Xếp phòng', icon: BedDouble },
  { id: 'participants', label: 'Thành viên', icon: Users },
  { id: 'menu', label: 'Ăn uống', icon: UtensilsCrossed },
  { id: 'transport', label: 'Di chuyển', icon: Bus },
  { id: 'budget', label: 'Ngân sách', icon: Wallet },
];

function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="sticky top-16 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  'group relative flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium',
                  'transition-all duration-200 ease-out',
                  isActive
                    ? 'bg-gradient-to-r from-primary to-sky-500 text-primary-foreground shadow-lg shadow-primary/20 dark:shadow-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                )}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <Icon className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  isActive ? 'scale-110' : 'group-hover:scale-110'
                )} />
                <span className="hidden sm:inline">{tab.label}</span>

                {/* Active indicator for mobile */}
                {isActive && (
                  <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary sm:hidden" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export { TabNavigation };

import { useEffect, useRef, useState } from 'react';
import {
  LayoutDashboard,
  Calendar,
  BedDouble,
  Users,
  UtensilsCrossed,
  Bus,
  Wallet,
  ChevronLeft,
  ChevronRight,
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    if (activeTabRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const tab = activeTabRef.current;
      const containerRect = container.getBoundingClientRect();
      const tabRect = tab.getBoundingClientRect();

      if (tabRect.left < containerRect.left) {
        container.scrollTo({
          left: container.scrollLeft + (tabRect.left - containerRect.left) - 16,
          behavior: 'smooth',
        });
      } else if (tabRect.right > containerRect.right) {
        container.scrollTo({
          left: container.scrollLeft + (tabRect.right - containerRect.right) + 16,
          behavior: 'smooth',
        });
      }

      setTimeout(checkScrollButtons, 300);
    }
  }, [activeTab]);

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="sticky top-16 z-40 w-full border-b border-border/50 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative flex items-center">
          {showLeftButton && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-background border border-border md:hidden"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            className="flex flex-1 items-center gap-1 overflow-x-auto py-3 scrollbar-none scroll-smooth px-8 md:px-0"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={isActive ? activeTabRef : null}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    'relative flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium',
                    'transition-all duration-200',
                    'min-h-[40px] touch-manipulation',
                    isActive
                      ? 'bg-gradient-to-r from-[hsl(var(--monokai-green))] to-[hsl(var(--monokai-green)/0.8)] text-white shadow-lg shadow-[hsl(var(--monokai-green)/0.3)]'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  )}
                >
                  {isActive && (
                    <span className="absolute -top-1 -right-1 text-xs">✨</span>
                  )}
                  <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-white")} />
                  <span className="hidden sm:inline whitespace-nowrap">{tab.label}</span>
                  <span className="sm:hidden text-xs">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {showRightButton && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-background border border-border md:hidden"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export { TabNavigation };

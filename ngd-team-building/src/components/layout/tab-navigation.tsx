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

  // Check scroll position and update button visibility
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Scroll active tab into view on change
  useEffect(() => {
    if (activeTabRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const tab = activeTabRef.current;
      const containerRect = container.getBoundingClientRect();
      const tabRect = tab.getBoundingClientRect();

      // Check if tab is outside viewport
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

      // Update button visibility after scroll
      setTimeout(checkScrollButtons, 300);
    }
  }, [activeTab]);

  // Check scroll buttons on mount and resize
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
    <nav className="sticky top-16 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="relative flex items-center">
          {/* Left scroll button (mobile only) */}
          {showLeftButton && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 z-10 hidden h-8 w-8 items-center justify-center rounded-full bg-background/90 backdrop-blur-sm shadow-md hover:bg-accent md:hidden"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          {/* Tabs container */}
          <div
            ref={scrollContainerRef}
            className="flex flex-1 items-center gap-1.5 overflow-x-auto py-2.5 scrollbar-none scroll-smooth px-8 md:px-0"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={isActive ? activeTabRef : null}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    'group relative flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium',
                    'transition-all duration-200 ease-out',
                    'min-h-[44px] touch-manipulation', // Better touch target for mobile
                    'active:scale-95', // Touch feedback
                    isActive
                      ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/20 scale-105'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  )}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 shrink-0 transition-transform duration-200',
                      isActive ? 'scale-110' : 'group-hover:scale-110'
                    )}
                  />
                  <span className="hidden sm:inline whitespace-nowrap">{tab.label}</span>
                  <span className="sm:hidden text-xs">{tab.label}</span>

                  {/* Active indicator for mobile */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-primary sm:hidden" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right scroll button (mobile only) */}
          {showRightButton && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 z-10 hidden h-8 w-8 items-center justify-center rounded-full bg-background/90 backdrop-blur-sm shadow-md hover:bg-accent md:hidden"
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

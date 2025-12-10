import { useState, useEffect } from 'react';
import { Header, TabNavigation } from '@/components/layout';
import { OverviewSection } from '@/components/dashboard';
import { ScheduleSection } from '@/components/schedule';
import { RoomsSection } from '@/components/rooms';
import { ParticipantsSection } from '@/components/participants';
import { MenuSection } from '@/components/menu';
import { TransportSection } from '@/components/transport';
import { BudgetSection } from '@/components/budget';
import { useThemeStore } from '@/store';
import type { TabId } from '@/types';
import { cn } from '@/lib/utils';

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const { theme, setTheme } = useThemeStore();

  // Initialize theme on mount
  useEffect(() => {
    // Check if theme is already set, if not set to dark
    const storedTheme = localStorage.getItem('ngd-theme');
    if (storedTheme) {
      const parsed = JSON.parse(storedTheme);
      setTheme(parsed.state.theme);
    } else {
      setTheme('dark');
    }
  }, [setTheme]);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewSection />;
      case 'schedule':
        return <ScheduleSection />;
      case 'rooms':
        return <RoomsSection />;
      case 'participants':
        return <ParticipantsSection />;
      case 'menu':
        return <MenuSection />;
      case 'transport':
        return <TransportSection />;
      case 'budget':
        return <BudgetSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className={cn(
      'min-h-screen bg-background transition-colors duration-300',
      theme
    )}>
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={cn(
          'absolute -top-40 -right-40 h-96 w-96 rounded-full blur-3xl transition-colors duration-500',
          'bg-primary/10 dark:bg-primary/5'
        )} />
        <div className={cn(
          'absolute top-1/2 -left-40 h-96 w-96 rounded-full blur-3xl transition-colors duration-500',
          'bg-sky-500/10 dark:bg-sky-500/5'
        )} />
        <div className={cn(
          'absolute -bottom-40 right-1/4 h-96 w-96 rounded-full blur-3xl transition-colors duration-500',
          'bg-emerald-500/10 dark:bg-emerald-500/5'
        )} />
      </div>

      {/* Content */}
      <div className="relative">
        <Header />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="container mx-auto px-4 py-6">
          <div key={activeTab} className="animate-fade-in">
            {renderContent()}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">
                  NGD Team Building 2025 • Asteria Mui Ne Resort
                </p>
                <p className="text-xs text-muted-foreground/70">
                  18-19/12/2025 • Mũi Né, Phan Thiết, Bình Thuận
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs text-muted-foreground">
                  Made with 💙 by NGD Team
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;

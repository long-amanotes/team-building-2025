import { useState, useEffect } from 'react';
import { Header, TabNavigation } from '@/components/layout';
import { OverviewSection } from '@/components/dashboard';
import { ScheduleSection } from '@/components/schedule';
import { RoomsSection } from '@/components/rooms';
import { ParticipantsSection } from '@/components/participants';
import { MenuSection } from '@/components/menu';
import { TransportSection } from '@/components/transport';
import { BudgetSection } from '@/components/budget';
import { Snowfall, ChristmasBanner, MusicPlayer } from '@/components/christmas';
import type { TabId } from '@/types';

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  // Auto scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

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
    <div className="min-h-screen bg-background transition-colors duration-200">
      {/* Music Player */}
      <MusicPlayer />

      {/* Christmas Snowfall Effect */}
      <Snowfall />

      {/* Christmas Banner */}
      <ChristmasBanner />

      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div key={activeTab} className="animate-fade-in">
          {renderContent()}
        </div>
      </main>

      {/* Christmas Footer */}
      <footer className="border-t border-border/50 mt-12 relative overflow-hidden">
        {/* Festive background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--monokai-red)/0.03)] via-transparent to-[hsl(var(--monokai-green)/0.03)]" />

        <div className="container mx-auto px-4 sm:px-6 py-8 relative">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-center sm:text-left">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span>🎄</span>
                NGD Team Building 2025
                <span>🎄</span>
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                18-19/12/2025 • Asteria Mui Ne Resort
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🎁</span>
              <p className="text-xs text-muted-foreground/60">
                Made with <span className="text-[hsl(var(--monokai-red))]">❤️</span> by NGD Team
              </p>
              <span className="text-lg">⛄</span>
            </div>
          </div>

          {/* Christmas lights at bottom */}
          <div className="flex justify-center gap-3 mt-6">
            {['🔴', '🟢', '🟡', '🔴', '🟢', '🟡', '🔴', '🟢'].map((light, i) => (
              <span
                key={i}
                className="text-xs christmas-light"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {light}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

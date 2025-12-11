import { useState, useEffect } from 'react';
import { Header, TabNavigation } from '@/components/layout';
import { OverviewSection } from '@/components/dashboard';
import { ScheduleSection } from '@/components/schedule';
import { RoomsSection } from '@/components/rooms';
import { ParticipantsSection } from '@/components/participants';
import { MenuSection } from '@/components/menu';
import { TransportSection } from '@/components/transport';
import { BudgetSection } from '@/components/budget';
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
      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div key={activeTab} className="animate-fade-in">
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-12">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-center sm:text-left">
              <p className="text-sm text-muted-foreground">
                NGD Team Building 2025
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                18-19/12/2025 • Asteria Mui Ne Resort
              </p>
            </div>
            <p className="text-xs text-muted-foreground/60">
              Made with care by NGD Team
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

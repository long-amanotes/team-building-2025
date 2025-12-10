import { MapPin, ExternalLink } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { eventInfo } from '@/data';
import logo from '@/assets/logo.avif';

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-3 sm:px-4">
        {/* Logo & Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="relative h-9 w-9 sm:h-10 sm:w-10 shrink-0 overflow-hidden rounded-xl">
            <img
              src={logo}
              alt="NGD Team Building Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-foreground truncate">NGD Team Building</h1>
            <p className="text-[10px] sm:text-xs text-muted-foreground truncate">18-19/12/2025 • Mũi Né</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Resort Badge - Clickable to Google Maps */}
          <a
            href={eventInfo.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 sm:gap-2 rounded-full bg-secondary/50 px-2 sm:px-3 py-1.5 text-xs sm:text-sm lg:flex hover:bg-secondary/80 transition-colors group"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span className="text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">Asteria Mui Ne Resort</span>
            <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          </a>

          {/* Mobile Resort Link */}
          <a
            href={eventInfo.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex lg:hidden items-center justify-center h-9 w-9 rounded-full bg-secondary/50 hover:bg-secondary/80 transition-colors"
            aria-label="Asteria Mui Ne Resort"
          >
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </a>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export { Header };

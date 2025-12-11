import { MapPin, ExternalLink } from 'lucide-react';
import { ThemeSelector } from '@/components/ui/theme-selector';
import { eventInfo } from '@/data';
import logo from '@/assets/logo.avif';

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo & Title */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg">
            <img
              src={logo}
              alt="NGD Team Building Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h1 className="text-base font-semibold text-foreground truncate">
              NGD Team Building
            </h1>
            <p className="text-xs text-muted-foreground truncate">
              18-19/12/2025
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Resort Link - Desktop */}
          <a
            href={eventInfo.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm lg:flex hover:bg-secondary/80 transition-colors group"
          >
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground group-hover:text-foreground transition-colors">
              Asteria Mui Ne
            </span>
            <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          {/* Resort Link - Mobile */}
          <a
            href={eventInfo.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex lg:hidden items-center justify-center h-9 w-9 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            aria-label="Asteria Mui Ne Resort"
          >
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </a>

          {/* Theme Selector */}
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
}

export { Header };

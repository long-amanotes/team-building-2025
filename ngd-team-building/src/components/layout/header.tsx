import { MapPin, ExternalLink } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { eventInfo } from '@/data';
import logo from '@/assets/logo.avif';

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl">
            <img
              src={logo}
              alt="NGD Team Building Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">NGD Team Building</h1>
            <p className="text-xs text-muted-foreground">18-19/12/2025 • Mũi Né</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Resort Badge - Clickable to Google Maps */}
          <a
            href={eventInfo.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-secondary/50 px-3 py-1.5 text-sm sm:flex hover:bg-secondary/80 transition-colors group"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground group-hover:text-foreground transition-colors">Asteria Mui Ne Resort</span>
            <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export { Header };

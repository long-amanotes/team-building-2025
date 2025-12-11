import { useEffect } from 'react';
import { X, ExternalLink, TreePine, Gift, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuUrl: string;
  restaurantName: string;
}

function MenuModal({ isOpen, onClose, menuUrl, restaurantName }: MenuModalProps) {
  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-modal-title"
    >
      {/* Backdrop with Christmas gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--monokai-red)/0.3)] via-black/90 to-[hsl(var(--monokai-green)/0.3)] backdrop-blur-sm" />

      {/* Decorative Christmas lights on backdrop */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-1 flex justify-around">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-2 h-2 rounded-full christmas-light',
                i % 3 === 0 ? 'bg-[hsl(var(--monokai-red))]' :
                i % 3 === 1 ? 'bg-[hsl(var(--monokai-green))]' :
                'bg-[hsl(var(--monokai-yellow))]'
              )}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      {/* Modal Content - Fullscreen */}
      <div
        className="relative z-50 w-full h-full flex flex-col bg-background overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Christmas theme */}
        <div className="relative flex items-center justify-between p-4 sm:p-6 border-b-4 border-[hsl(var(--monokai-red))] bg-gradient-to-r from-[hsl(var(--monokai-red)/0.1)] via-card to-[hsl(var(--monokai-green)/0.1)] shrink-0 shadow-lg">
          {/* Decorative corner elements */}
          <div className="absolute top-2 left-2 text-lg opacity-60">
            <TreePine className="h-5 w-5 text-[hsl(var(--monokai-green))] christmas-glow" />
          </div>
          <div className="absolute top-2 right-2 text-lg opacity-60">
            <Gift className="h-5 w-5 text-[hsl(var(--monokai-red))] christmas-light" />
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[hsl(var(--monokai-red)/0.2)] to-[hsl(var(--monokai-green)/0.2)] border-2 border-[hsl(var(--monokai-yellow)/0.5)]">
              <ExternalLink className="h-5 w-5 text-[hsl(var(--monokai-yellow))] christmas-glow" />
              <Star className="absolute -top-1 -right-1 h-3 w-3 text-[hsl(var(--monokai-yellow))] christmas-light" />
            </div>
            <div>
              <h2 id="menu-modal-title" className="text-lg sm:text-xl font-bold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[hsl(var(--monokai-yellow))] christmas-glow" />
                <span className="text-[hsl(var(--monokai-red))]">Menu</span>
                <span className="text-foreground">-</span>
                <span className="text-[hsl(var(--monokai-green))]">{restaurantName}</span>
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 flex items-center gap-1">
                <Star className="h-3 w-3 text-[hsl(var(--monokai-yellow))] christmas-light" />
                Xem thực đơn chi tiết
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 relative z-10">
            <a
              href={menuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center gap-1.5 text-xs sm:text-sm',
                'px-2 sm:px-3 py-1.5 rounded-lg',
                'bg-gradient-to-r from-[hsl(var(--monokai-red)/0.2)] to-[hsl(var(--monokai-green)/0.2)]',
                'border-2 border-[hsl(var(--monokai-yellow)/0.5)]',
                'text-[hsl(var(--monokai-yellow))]',
                'hover:from-[hsl(var(--monokai-red)/0.3)] hover:to-[hsl(var(--monokai-green)/0.3)]',
                'hover:border-[hsl(var(--monokai-yellow))]',
                'transition-all duration-200 shadow-md hover:shadow-lg',
                'christmas-glow'
              )}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline font-bold">Mở trong tab mới</span>
              <span className="sm:hidden font-bold">Mở tab mới</span>
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className={cn(
                'h-12 w-12 rounded-full',
                'bg-gradient-to-br from-[hsl(var(--monokai-red)/0.2)] to-[hsl(var(--monokai-red)/0.1)]',
                'border-2 border-[hsl(var(--monokai-red)/0.5)]',
                'hover:from-[hsl(var(--monokai-red)/0.4)] hover:to-[hsl(var(--monokai-red)/0.3)]',
                'hover:border-[hsl(var(--monokai-red))]',
                'text-[hsl(var(--monokai-red))]',
                'hover:text-white hover:bg-[hsl(var(--monokai-red))]',
                'transition-all duration-200 shadow-md hover:shadow-lg hover:scale-110'
              )}
              aria-label="Đóng menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Menu Content - iframe with Christmas border */}
        <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-muted/30 via-muted/20 to-muted/30">
          {/* Decorative border corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[hsl(var(--monokai-green))] opacity-50" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[hsl(var(--monokai-red))] opacity-50" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[hsl(var(--monokai-green))] opacity-50" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[hsl(var(--monokai-red))] opacity-50" />

          <iframe
            src={menuUrl}
            className="w-full h-full border-0 relative z-10"
            title={`Menu - ${restaurantName}`}
            allow="fullscreen"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export { MenuModal };

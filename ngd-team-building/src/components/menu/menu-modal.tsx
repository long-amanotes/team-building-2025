import { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* Modal Content - Fullscreen */}
      <div
        className="relative z-50 w-full h-full flex flex-col bg-background overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border bg-card shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
              <ExternalLink className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 id="menu-modal-title" className="text-lg sm:text-xl font-bold text-foreground">
                Menu - {restaurantName}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Xem thực đơn chi tiết
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={menuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs sm:text-sm text-primary hover:underline px-2 sm:px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Mở trong tab mới</span>
              <span className="sm:hidden">Mở tab mới</span>
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-10 w-10"
              aria-label="Đóng menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Menu Content - iframe */}
        <div className="flex-1 relative overflow-hidden bg-muted/30">
          <iframe
            src={menuUrl}
            className="w-full h-full border-0"
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

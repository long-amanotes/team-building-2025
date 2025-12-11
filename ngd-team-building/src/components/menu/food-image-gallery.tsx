import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, TreePine, Gift, Sparkles, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FoodImageGalleryProps {
  images: string[];
  restaurantName: string;
  isOpen: boolean;
  onClose: () => void;
}

function FoodImageGallery({ images, restaurantName, isOpen, onClose }: FoodImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset to first image when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length, onClose]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (!isOpen) return null;

  const currentImage = images[currentImageIndex];

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={onClose}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
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

      {/* Modal Content */}
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
              <ImageIcon className="h-6 w-6 text-[hsl(var(--monokai-yellow))] christmas-glow" />
              <Star className="absolute -top-1 -right-1 h-3 w-3 text-[hsl(var(--monokai-yellow))] christmas-light" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[hsl(var(--monokai-yellow))] christmas-glow" />
                <span className="text-[hsl(var(--monokai-green))]">{restaurantName}</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-0.5 flex items-center gap-1">
                <Star className="h-3 w-3 text-[hsl(var(--monokai-yellow))] christmas-light" />
                {currentImageIndex + 1} / {images.length} ảnh
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={cn(
              'relative z-10 flex h-12 w-12 items-center justify-center rounded-full',
              'bg-gradient-to-br from-[hsl(var(--monokai-red)/0.2)] to-[hsl(var(--monokai-red)/0.1)]',
              'border-2 border-[hsl(var(--monokai-red)/0.5)]',
              'hover:from-[hsl(var(--monokai-red)/0.4)] hover:to-[hsl(var(--monokai-red)/0.3)]',
              'hover:border-[hsl(var(--monokai-red))]',
              'text-[hsl(var(--monokai-red))]',
              'hover:text-white hover:bg-[hsl(var(--monokai-red))]',
              'transition-all duration-200 shadow-md hover:shadow-lg hover:scale-110'
            )}
            aria-label="Đóng gallery"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Main Image Display */}
        <div className="relative flex-1 flex items-center justify-center bg-black/50 p-4 overflow-hidden">
          {/* Main Image */}
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={currentImage}
              alt={`${restaurantName} - Ảnh ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Navigation Arrows with Christmas theme */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className={cn(
                  'absolute left-4 top-1/2 -translate-y-1/2 z-10',
                  'flex h-12 w-12 items-center justify-center rounded-full',
                  'bg-gradient-to-br from-[hsl(var(--monokai-green)/0.6)] to-[hsl(var(--monokai-green)/0.4)]',
                  'border-2 border-[hsl(var(--monokai-green)/0.8)]',
                  'backdrop-blur-sm text-white',
                  'hover:from-[hsl(var(--monokai-green)/0.8)] hover:to-[hsl(var(--monokai-green)/0.6)]',
                  'hover:border-[hsl(var(--monokai-green))] hover:scale-110',
                  'transition-all duration-200 shadow-lg',
                  'christmas-glow'
                )}
                aria-label="Ảnh trước"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className={cn(
                  'absolute right-4 top-1/2 -translate-y-1/2 z-10',
                  'flex h-12 w-12 items-center justify-center rounded-full',
                  'bg-gradient-to-br from-[hsl(var(--monokai-red)/0.6)] to-[hsl(var(--monokai-red)/0.4)]',
                  'border-2 border-[hsl(var(--monokai-red)/0.8)]',
                  'backdrop-blur-sm text-white',
                  'hover:from-[hsl(var(--monokai-red)/0.8)] hover:to-[hsl(var(--monokai-red)/0.6)]',
                  'hover:border-[hsl(var(--monokai-red))] hover:scale-110',
                  'transition-all duration-200 shadow-lg',
                  'christmas-glow'
                )}
                aria-label="Ảnh sau"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Strip with Christmas theme */}
        {images.length > 1 && (
          <div className="border-t-4 border-[hsl(var(--monokai-green))] bg-gradient-to-r from-[hsl(var(--monokai-red)/0.1)] via-card to-[hsl(var(--monokai-green)/0.1)] p-4 shrink-0 shadow-lg">
            <div className="flex items-center justify-center gap-2 overflow-x-auto scrollbar-none">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToImage(index);
                  }}
                  className={cn(
                    'relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200',
                    'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--monokai-yellow))]',
                    index === currentImageIndex
                      ? 'border-[hsl(var(--monokai-yellow))] scale-105 shadow-lg shadow-[hsl(var(--monokai-yellow))/0.3]'
                      : 'border-[hsl(var(--monokai-green)/0.3)] opacity-60 hover:opacity-100 hover:border-[hsl(var(--monokai-green)/0.6)]'
                  )}
                  aria-label={`Xem ảnh ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {index === currentImageIndex && (
                    <div className="absolute inset-0 bg-[hsl(var(--monokai-yellow))/0.2] flex items-center justify-center">
                      <Star className="h-4 w-4 text-[hsl(var(--monokai-yellow))] christmas-glow" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Render modal using portal to body, outside of App component
  return createPortal(modalContent, document.body);
}

export { FoodImageGallery };

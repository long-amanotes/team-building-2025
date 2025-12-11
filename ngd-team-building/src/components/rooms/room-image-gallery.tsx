import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, Loader2, TreePine, Gift, Sparkles, Star } from 'lucide-react';
import { getRoomImages } from '@/data/room-images';
import { cn } from '@/lib/utils';

interface RoomImageGalleryProps {
  roomType: 'Twin' | 'Double';
  roomId: number;
  isOpen: boolean;
  onClose: () => void;
}

function RoomImageGallery({ roomType, roomId, isOpen, onClose }: RoomImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const roomImages = getRoomImages(roomType);

  // Reset to first image when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      setIsImageLoading(true);
    }
  }, [isOpen]);

  // Preload adjacent images
  useEffect(() => {
    if (!isOpen) return;

    const preloadIndices = [
      currentImageIndex,
      (currentImageIndex + 1) % roomImages.length,
      (currentImageIndex - 1 + roomImages.length) % roomImages.length,
    ];

    preloadIndices.forEach((idx) => {
      if (!loadedImages.has(idx)) {
        const img = new Image();
        img.src = roomImages[idx].src;
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, idx]));
        };
      }
    });
  }, [isOpen, currentImageIndex, roomImages, loadedImages]);

  const handleImageLoad = useCallback(() => {
    setIsImageLoading(false);
    setLoadedImages(prev => new Set([...prev, currentImageIndex]));
  }, [currentImageIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => (prev - 1 + roomImages.length) % roomImages.length);
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev + 1) % roomImages.length);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, roomImages.length, onClose]);

  const nextImage = () => {
    const nextIdx = (currentImageIndex + 1) % roomImages.length;
    if (!loadedImages.has(nextIdx)) {
      setIsImageLoading(true);
    }
    setCurrentImageIndex(nextIdx);
  };

  const prevImage = () => {
    const prevIdx = (currentImageIndex - 1 + roomImages.length) % roomImages.length;
    if (!loadedImages.has(prevIdx)) {
      setIsImageLoading(true);
    }
    setCurrentImageIndex(prevIdx);
  };

  const goToImage = (index: number) => {
    if (!loadedImages.has(index)) {
      setIsImageLoading(true);
    }
    setCurrentImageIndex(index);
  };

  if (!isOpen) return null;

  const currentImage = roomImages[currentImageIndex];

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
              <ImageIcon className="h-6 w-6 text-[hsl(var(--monokai-yellow))] christmas-glow" />
              <Star className="absolute -top-1 -right-1 h-3 w-3 text-[hsl(var(--monokai-yellow))] christmas-light" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[hsl(var(--monokai-yellow))] christmas-glow" />
                <span className="text-[hsl(var(--monokai-red))]">Phòng #{roomId}</span>
                <span className="text-foreground">-</span>
                <span className="text-[hsl(var(--monokai-green))]">{roomType}</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-0.5 flex items-center gap-1">
                <Star className="h-3 w-3 text-[hsl(var(--monokai-yellow))] christmas-light" />
                {currentImageIndex + 1} / {roomImages.length} ảnh
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
          {/* Main Image Container */}
          <div className="relative w-full h-full max-w-5xl flex items-center justify-center">
            {/* Blurred thumbnail as placeholder */}
            {isImageLoading && currentImage.thumbnail && (
              <img
                src={currentImage.thumbnail}
                alt=""
                aria-hidden="true"
                className="absolute max-w-full max-h-full object-contain rounded-lg blur-lg scale-105 opacity-50"
              />
            )}

            {/* Loading spinner with Christmas theme */}
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="relative bg-gradient-to-br from-[hsl(var(--monokai-red)/0.6)] to-[hsl(var(--monokai-green)/0.6)] backdrop-blur-sm rounded-full p-4 border-2 border-[hsl(var(--monokai-yellow)/0.5)]">
                  <Loader2 className="h-8 w-8 text-[hsl(var(--monokai-yellow))] animate-spin christmas-glow" />
                  <Star className="absolute -top-1 -right-1 h-4 w-4 text-[hsl(var(--monokai-yellow))] christmas-light" />
                </div>
              </div>
            )}

            {/* Main Image */}
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              onLoad={handleImageLoad}
              loading="eager"
              decoding="async"
              className={cn(
                'max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-opacity duration-300',
                isImageLoading ? 'opacity-0' : 'opacity-100'
              )}
            />
          </div>

          {/* Navigation Arrows with Christmas theme */}
          {roomImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className={cn(
                  'absolute left-4 top-1/2 -translate-y-1/2 z-10',
                  'flex h-12 w-12 items-center justify-center rounded-full',
                  'bg-gradient-to-br from-[hsl(var(--monokai-green)/0.6)] to-[hsl(var(--monokai-green)/0.4)]',
                  'border-2 border-[hsl(var(--monokai-green)/0.8)]',
                  'backdrop-blur-sm text-white',
                  'hover:from-[hsl(var(--monokai-green)/0.8)] hover:to-[hsl(var(--monokai-green)/0.6)]',
                  'hover:border-[hsl(var(--monokai-green))] hover:scale-110',
                  'transition-all duration-200 shadow-lg',
                  'focus:outline-none focus:ring-2 focus:ring-[hsl(var(--monokai-green))]',
                  'christmas-glow'
                )}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className={cn(
                  'absolute right-4 top-1/2 -translate-y-1/2 z-10',
                  'flex h-12 w-12 items-center justify-center rounded-full',
                  'bg-gradient-to-br from-[hsl(var(--monokai-red)/0.6)] to-[hsl(var(--monokai-red)/0.4)]',
                  'border-2 border-[hsl(var(--monokai-red)/0.8)]',
                  'backdrop-blur-sm text-white',
                  'hover:from-[hsl(var(--monokai-red)/0.8)] hover:to-[hsl(var(--monokai-red)/0.6)]',
                  'hover:border-[hsl(var(--monokai-red))] hover:scale-110',
                  'transition-all duration-200 shadow-lg',
                  'focus:outline-none focus:ring-2 focus:ring-[hsl(var(--monokai-red))]',
                  'christmas-glow'
                )}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Strip with Christmas theme */}
        {roomImages.length > 1 && (
          <div className="p-4 border-t-4 border-[hsl(var(--monokai-green))] bg-gradient-to-r from-[hsl(var(--monokai-red)/0.1)] via-card to-[hsl(var(--monokai-green)/0.1)] shrink-0 shadow-lg">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[hsl(var(--monokai-yellow))] scrollbar-track-transparent">
              {roomImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={cn(
                    'relative shrink-0 h-20 w-20 rounded-lg overflow-hidden border-2 transition-all duration-200',
                    'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--monokai-yellow))]',
                    currentImageIndex === index
                      ? 'border-[hsl(var(--monokai-yellow))] shadow-lg shadow-[hsl(var(--monokai-yellow))/0.3]'
                      : 'border-[hsl(var(--monokai-green)/0.3)] opacity-60 hover:opacity-100 hover:border-[hsl(var(--monokai-green)/0.6)]'
                  )}
                  aria-label={`View image ${index + 1}`}
                >
                  {/* Use thumbnail for gallery strip - much smaller file size */}
                  <img
                    src={img.thumbnail}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  {currentImageIndex === index && (
                    <div className="absolute inset-0 bg-[hsl(var(--monokai-yellow))/0.2] flex items-center justify-center">
                      <Star className="h-4 w-4 text-[hsl(var(--monokai-yellow))] christmas-glow" />
                    </div>
                  )}
                  {/* Loading indicator for unloaded images */}
                  {!loadedImages.has(index) && index !== currentImageIndex && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-[hsl(var(--monokai-yellow))] rounded-full animate-pulse christmas-light" />
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

export { RoomImageGallery };

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  const roomImages = getRoomImages(roomType);

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
    setCurrentImageIndex((prev) => (prev + 1) % roomImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + roomImages.length) % roomImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (!isOpen) return null;

  const currentImage = roomImages[currentImageIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        className="relative z-50 w-full h-full max-w-7xl max-h-[90vh] flex flex-col bg-background rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
              <ImageIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Phòng #{roomId} - {roomType}
              </h2>
              <p className="text-sm text-muted-foreground">
                {currentImageIndex + 1} / {roomImages.length} ảnh
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-10 w-10"
            aria-label="Close gallery"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Main Image Display */}
        <div className="relative flex-1 flex items-center justify-center bg-black/50 p-4 overflow-hidden">
          {/* Main Image */}
          <div className="relative w-full h-full max-w-5xl flex items-center justify-center">
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Navigation Arrows */}
          {roomImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className={cn(
                  'absolute left-4 top-1/2 -translate-y-1/2 z-10',
                  'flex h-12 w-12 items-center justify-center rounded-full',
                  'bg-black/60 backdrop-blur-sm text-white',
                  'hover:bg-black/80 hover:scale-110 transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-white/50'
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
                  'bg-black/60 backdrop-blur-sm text-white',
                  'hover:bg-black/80 hover:scale-110 transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-white/50'
                )}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Strip */}
        {roomImages.length > 1 && (
          <div className="p-4 border-t border-border bg-card">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              {roomImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={cn(
                    'relative shrink-0 h-20 w-20 rounded-lg overflow-hidden border-2 transition-all duration-200',
                    'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary',
                    currentImageIndex === index
                      ? 'border-primary shadow-lg shadow-primary/20'
                      : 'border-border opacity-60 hover:opacity-100'
                  )}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover"
                  />
                  {currentImageIndex === index && (
                    <div className="absolute inset-0 bg-primary/20" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { RoomImageGallery };

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, Loader2 } from 'lucide-react';
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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* Modal Content - Fullscreen */}
      <div
        className="relative z-50 w-full h-full flex flex-col bg-background overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border/50 bg-white dark:bg-gray-900 shrink-0 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
              <ImageIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Phòng #{roomId} - {roomType}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-0.5">
                {currentImageIndex + 1} / {roomImages.length} ảnh
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-red-500 hover:text-white text-gray-700 dark:text-gray-300 transition-all duration-200 shadow-md hover:shadow-lg"
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

            {/* Loading spinner */}
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="bg-black/60 backdrop-blur-sm rounded-full p-4">
                  <Loader2 className="h-8 w-8 text-white animate-spin" />
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
          <div className="p-4 border-t border-border/50 bg-white dark:bg-gray-900 shrink-0 shadow-lg">
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
                  {/* Use thumbnail for gallery strip - much smaller file size */}
                  <img
                    src={img.thumbnail}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  {currentImageIndex === index && (
                    <div className="absolute inset-0 bg-primary/20" />
                  )}
                  {/* Loading indicator for unloaded images */}
                  {!loadedImages.has(index) && index !== currentImageIndex && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" />
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

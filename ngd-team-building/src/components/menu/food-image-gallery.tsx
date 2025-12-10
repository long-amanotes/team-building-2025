import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* Modal Content */}
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
                {restaurantName}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-0.5">
                {currentImageIndex + 1} / {images.length} ảnh
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
          {/* Main Image */}
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={currentImage}
              alt={`${restaurantName} - Ảnh ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 backdrop-blur-sm p-3 text-white hover:bg-black/70 transition-colors z-10"
                aria-label="Ảnh trước"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 backdrop-blur-sm p-3 text-white hover:bg-black/70 transition-colors z-10"
                aria-label="Ảnh sau"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="border-t border-border/50 bg-white dark:bg-gray-900 p-4 shrink-0 shadow-lg">
            <div className="flex items-center justify-center gap-2 overflow-x-auto scrollbar-none">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToImage(index);
                  }}
                  className={cn(
                    'relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all',
                    index === currentImageIndex
                      ? 'border-primary scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  )}
                  aria-label={`Xem ảnh ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
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

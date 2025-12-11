import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  /**
   * Thumbnail source for progressive loading
   * Shows blurred thumbnail while main image loads
   */
  thumbnailSrc?: string;
  /**
   * Enable lazy loading (default: true)
   */
  lazy?: boolean;
  /**
   * Object fit style
   */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /**
   * Callback when image loads successfully
   */
  onLoad?: () => void;
  /**
   * Callback when image fails to load
   */
  onError?: () => void;
}

/**
 * OptimizedImage Component
 *
 * Features:
 * - Lazy loading with Intersection Observer
 * - Progressive loading with thumbnail blur effect
 * - Loading skeleton animation
 * - Smooth fade-in transition
 * - Error handling with fallback
 */
function OptimizedImage({
  src,
  alt,
  className,
  containerClassName,
  thumbnailSrc,
  lazy = true,
  objectFit = 'cover',
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before entering viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div
      ref={imgRef}
      className={cn(
        'relative overflow-hidden bg-muted',
        containerClassName
      )}
    >
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-muted via-muted-foreground/10 to-muted" />
      )}

      {/* Thumbnail (blurred) for progressive loading */}
      {thumbnailSrc && !isLoaded && isInView && (
        <img
          src={thumbnailSrc}
          alt=""
          aria-hidden="true"
          className={cn(
            'absolute inset-0 w-full h-full blur-lg scale-105 transition-opacity duration-300',
            isLoaded ? 'opacity-0' : 'opacity-100',
            `object-${objectFit}`
          )}
        />
      )}

      {/* Main image */}
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          loading={lazy ? 'lazy' : 'eager'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'w-full h-full transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0',
            `object-${objectFit}`,
            className
          )}
        />
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
          <div className="text-center p-4">
            <svg
              className="w-8 h-8 mx-auto mb-2 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs">Không thể tải ảnh</span>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Hook for preloading images
 */
export function useImagePreload(srcs: string[]) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (srcs.length === 0) {
      setIsComplete(true);
      return;
    }

    let mounted = true;
    let count = 0;

    srcs.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (mounted) {
          count++;
          setLoadedCount(count);
          if (count === srcs.length) {
            setIsComplete(true);
          }
        }
      };
      img.onerror = () => {
        if (mounted) {
          count++;
          setLoadedCount(count);
          if (count === srcs.length) {
            setIsComplete(true);
          }
        }
      };
    });

    return () => {
      mounted = false;
    };
  }, [srcs]);

  return {
    loadedCount,
    total: srcs.length,
    progress: srcs.length > 0 ? (loadedCount / srcs.length) * 100 : 100,
    isComplete,
  };
}

export { OptimizedImage };

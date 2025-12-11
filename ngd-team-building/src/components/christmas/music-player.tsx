import { useEffect, useRef } from 'react';
import { useThemeStore } from '@/store/theme-store';
import bgm from '@/assets/Music/bgm.mp3';

function MusicPlayer() {
  const { musicEnabled } = useThemeStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasTriedAutoplayRef = useRef(false);

  // Initialize audio element once
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(bgm);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5; // Set volume to 50%
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle music enabled state changes
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    if (musicEnabled) {
      // Try to play music, handle autoplay restrictions
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            hasTriedAutoplayRef.current = true;
          })
          .catch(() => {
            // Autoplay was prevented, will try on user interaction
            hasTriedAutoplayRef.current = false;
          });
      }
    } else {
      audio.pause();
    }
  }, [musicEnabled]);

  // Handle user interaction to start music if autoplay was blocked
  useEffect(() => {
    if (!musicEnabled || !audioRef.current) return;

    const handleUserInteraction = () => {
      if (audioRef.current && audioRef.current.paused && musicEnabled) {
        audioRef.current.play().catch(() => {
          // Ignore errors if still blocked
        });
      }
    };

    // Only add listeners if autoplay hasn't succeeded yet
    if (!hasTriedAutoplayRef.current || audioRef.current.paused) {
      // Listen for any user interaction
      const events = ['click', 'touchstart', 'keydown'];
      events.forEach((event) => {
        document.addEventListener(event, handleUserInteraction, { once: true });
      });

      return () => {
        events.forEach((event) => {
          document.removeEventListener(event, handleUserInteraction);
        });
      };
    }
  }, [musicEnabled]);

  // This component doesn't render anything
  return null;
}

export { MusicPlayer };

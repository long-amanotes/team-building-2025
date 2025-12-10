import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '@/store';
import { cn } from '@/lib/utils';

function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative flex h-10 w-10 items-center justify-center rounded-xl',
        'bg-secondary/50 hover:bg-secondary',
        'transition-all duration-300 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'group'
      )}
      aria-label={isDark ? 'Chuyển sang light mode' : 'Chuyển sang dark mode'}
    >
      <Sun
        className={cn(
          'absolute h-5 w-5 transition-all duration-300',
          isDark
            ? 'rotate-90 scale-0 opacity-0'
            : 'rotate-0 scale-100 opacity-100 text-amber-500'
        )}
      />
      <Moon
        className={cn(
          'absolute h-5 w-5 transition-all duration-300',
          isDark
            ? 'rotate-0 scale-100 opacity-100 text-sky-400'
            : '-rotate-90 scale-0 opacity-0'
        )}
      />
    </button>
  );
}

export { ThemeToggle };

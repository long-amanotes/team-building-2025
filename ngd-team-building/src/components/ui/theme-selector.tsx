import { useState, useRef, useEffect } from 'react';
import { Palette, Check, ChevronDown, Sun, Moon } from 'lucide-react';
import { useThemeStore, THEMES, type Theme } from '@/store/theme-store';
import { cn } from '@/lib/utils';

function ThemeSelector() {
  const { theme, setTheme, getThemeInfo } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentTheme = getThemeInfo();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleThemeSelect = (newTheme: Theme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 h-9 px-3 rounded-lg',
          'bg-secondary border border-border',
          'hover:bg-secondary/80 hover:border-primary/30',
          'transition-all duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50'
        )}
        aria-label="Chọn theme"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-1.5">
          {currentTheme.isDark ? (
            <Moon className="h-4 w-4 text-primary" />
          ) : (
            <Sun className="h-4 w-4 text-[hsl(var(--monokai-yellow))]" />
          )}
          <span className="text-sm font-medium text-foreground hidden sm:inline">
            {currentTheme.name}
          </span>
        </div>

        <div className="flex -space-x-0.5">
          <div
            className="h-3 w-3 rounded-full border border-background"
            style={{ backgroundColor: currentTheme.colors.primary }}
          />
          <div
            className="h-3 w-3 rounded-full border border-background"
            style={{ backgroundColor: currentTheme.colors.accent }}
          />
        </div>

        <ChevronDown className={cn(
          'h-4 w-4 text-muted-foreground transition-transform duration-150',
          isOpen && 'rotate-180'
        )} />
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute right-0 top-full mt-2 z-[100]',
            'w-64 p-2 rounded-xl',
            'bg-card border-2 border-border shadow-2xl shadow-black/20',
            'animate-scale-in origin-top-right'
          )}
          role="listbox"
          aria-label="Danh sách themes"
        >
          {/* Header */}
          <div className="px-2 py-2 mb-2 border-b border-border">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground uppercase tracking-wider">
              <Palette className="h-4 w-4 text-primary" />
              Chọn Theme
            </div>
          </div>

          {/* Theme options */}
          <div className="space-y-1 max-h-[320px] overflow-y-auto">
            {THEMES.map((themeOption) => {
              const isSelected = theme === themeOption.id;
              return (
                <button
                  key={themeOption.id}
                  onClick={() => handleThemeSelect(themeOption.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg',
                    'transition-all duration-150',
                    isSelected
                      ? 'bg-primary/15 border border-primary/30'
                      : 'hover:bg-secondary border border-transparent'
                  )}
                  role="option"
                  aria-selected={isSelected}
                >
                  {/* Theme preview */}
                  <div
                    className="relative h-8 w-12 rounded-md overflow-hidden shrink-0 border border-border shadow-sm"
                    style={{ backgroundColor: themeOption.colors.background }}
                  >
                    {/* Simulated content bars */}
                    <div className="absolute top-1 left-1 right-1 h-1 rounded-sm opacity-30"
                      style={{ backgroundColor: themeOption.colors.foreground }}
                    />
                    <div className="absolute bottom-1 left-1 right-1 flex gap-0.5">
                      <div
                        className="h-1.5 flex-1 rounded-sm"
                        style={{ backgroundColor: themeOption.colors.primary }}
                      />
                      <div
                        className="h-1.5 flex-1 rounded-sm"
                        style={{ backgroundColor: themeOption.colors.accent }}
                      />
                    </div>
                  </div>

                  {/* Theme info */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-sm font-medium",
                        isSelected ? "text-primary" : "text-foreground"
                      )}>
                        {themeOption.name}
                      </span>
                      {themeOption.isDark ? (
                        <Moon className="h-3.5 w-3.5 text-muted-foreground" />
                      ) : (
                        <Sun className="h-3.5 w-3.5 text-[hsl(var(--monokai-yellow))]" />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {themeOption.isDark ? 'Dark theme' : 'Light theme'}
                    </span>
                  </div>

                  {/* Check indicator */}
                  {isSelected && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer hint */}
          <div className="mt-2 pt-2 border-t border-border">
            <p className="text-xs text-center text-muted-foreground">
              🎄 Merry Christmas! 🎄
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export { ThemeSelector };

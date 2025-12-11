import { useState, useRef, useEffect } from 'react';
import { Palette, Check, ChevronDown, Sun, Moon } from 'lucide-react';
import { useThemeStore, THEMES, type Theme } from '@/store/theme-store';
import { cn } from '@/lib/utils';

function ThemeSelector() {
    const { theme, setTheme, getThemeInfo } = useThemeStore();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const currentTheme = getThemeInfo();

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close dropdown on escape key
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
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    'flex items-center gap-2 h-10 px-3 rounded-xl',
                    'bg-secondary/50 hover:bg-secondary',
                    'transition-all duration-200 ease-out',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    'group'
                )}
                aria-label="Chọn theme"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                {/* Current theme preview */}
                <div className="flex items-center gap-1.5">
                    {currentTheme.isDark ? (
                        <Moon className="h-4 w-4 text-muted-foreground" />
                    ) : (
                        <Sun className="h-4 w-4 text-amber-500" />
                    )}
                    <span className="text-sm font-medium text-foreground hidden sm:inline">
                        {currentTheme.name}
                    </span>
                </div>

                {/* Color dots preview */}
                <div className="flex -space-x-1">
                    <div
                        className="h-3 w-3 rounded-full border border-background/50"
                        style={{ backgroundColor: currentTheme.colors.primary }}
                    />
                    <div
                        className="h-3 w-3 rounded-full border border-background/50"
                        style={{ backgroundColor: currentTheme.colors.accent }}
                    />
                </div>

                <ChevronDown className={cn(
                    'h-4 w-4 text-muted-foreground transition-transform duration-200',
                    isOpen && 'rotate-180'
                )} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className={cn(
                        'absolute right-0 top-full mt-2 z-50',
                        'w-56 p-2 rounded-xl',
                        'bg-card border border-border shadow-lg',
                        'animate-scale-in origin-top-right'
                    )}
                    role="listbox"
                    aria-label="Danh sách themes"
                >
                    <div className="px-2 py-1.5 mb-1">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            <Palette className="h-3.5 w-3.5" />
                            Monokai Pro Themes
                        </div>
                    </div>

                    <div className="space-y-0.5">
                        {THEMES.map((themeOption) => (
                            <button
                                key={themeOption.id}
                                onClick={() => handleThemeSelect(themeOption.id)}
                                className={cn(
                                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg',
                                    'transition-all duration-150',
                                    'hover:bg-secondary/80',
                                    theme === themeOption.id && 'bg-secondary'
                                )}
                                role="option"
                                aria-selected={theme === themeOption.id}
                            >
                                {/* Theme preview box */}
                                <div
                                    className="relative h-8 w-12 rounded-md overflow-hidden border border-border/50 shrink-0"
                                    style={{ backgroundColor: themeOption.colors.background }}
                                >
                                    {/* Mini color bars */}
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
                                    {/* Text preview line */}
                                    <div
                                        className="absolute top-1.5 left-1.5 h-1 w-6 rounded-sm opacity-60"
                                        style={{ backgroundColor: themeOption.colors.foreground }}
                                    />
                                    <div
                                        className="absolute top-3.5 left-1.5 h-1 w-4 rounded-sm opacity-40"
                                        style={{ backgroundColor: themeOption.colors.foreground }}
                                    />
                                </div>

                                {/* Theme name and mode indicator */}
                                <div className="flex-1 text-left">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-foreground">
                                            {themeOption.name}
                                        </span>
                                        {themeOption.isDark ? (
                                            <Moon className="h-3 w-3 text-muted-foreground" />
                                        ) : (
                                            <Sun className="h-3 w-3 text-amber-500" />
                                        )}
                                    </div>
                                </div>

                                {/* Checkmark for selected */}
                                {theme === themeOption.id && (
                                    <Check className="h-4 w-4 text-primary shrink-0" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export { ThemeSelector };

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
                    'bg-secondary hover:bg-secondary/80',
                    'transition-colors duration-150',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                )}
                aria-label="Chọn theme"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <div className="flex items-center gap-1.5">
                    {currentTheme.isDark ? (
                        <Moon className="h-4 w-4 text-muted-foreground" />
                    ) : (
                        <Sun className="h-4 w-4 text-[hsl(var(--warning))]" />
                    )}
                    <span className="text-sm font-medium text-foreground hidden sm:inline">
                        {currentTheme.name}
                    </span>
                </div>

                <div className="flex -space-x-1">
                    <div
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: currentTheme.colors.primary }}
                    />
                    <div
                        className="h-2.5 w-2.5 rounded-full"
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
                        'absolute right-0 top-full mt-2 z-50',
                        'w-52 p-1.5 rounded-lg',
                        'bg-card border border-border',
                        'animate-scale-in origin-top-right'
                    )}
                    role="listbox"
                    aria-label="Danh sách themes"
                >
                    <div className="px-2 py-2 mb-1 border-b border-border">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            <Palette className="h-3.5 w-3.5" />
                            Themes
                        </div>
                    </div>

                    <div className="space-y-0.5">
                        {THEMES.map((themeOption) => (
                            <button
                                key={themeOption.id}
                                onClick={() => handleThemeSelect(themeOption.id)}
                                className={cn(
                                    'w-full flex items-center gap-3 px-2 py-2 rounded-md',
                                    'transition-colors duration-100',
                                    'hover:bg-secondary',
                                    theme === themeOption.id && 'bg-secondary'
                                )}
                                role="option"
                                aria-selected={theme === themeOption.id}
                            >
                                <div
                                    className="relative h-6 w-10 rounded overflow-hidden shrink-0"
                                    style={{ backgroundColor: themeOption.colors.background }}
                                >
                                    <div className="absolute bottom-0.5 left-0.5 right-0.5 flex gap-0.5">
                                        <div
                                            className="h-1 flex-1 rounded-sm"
                                            style={{ backgroundColor: themeOption.colors.primary }}
                                        />
                                        <div
                                            className="h-1 flex-1 rounded-sm"
                                            style={{ backgroundColor: themeOption.colors.accent }}
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 text-left">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-sm text-foreground">
                                            {themeOption.name}
                                        </span>
                                        {themeOption.isDark ? (
                                            <Moon className="h-3 w-3 text-muted-foreground" />
                                        ) : (
                                            <Sun className="h-3 w-3 text-[hsl(var(--warning))]" />
                                        )}
                                    </div>
                                </div>

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

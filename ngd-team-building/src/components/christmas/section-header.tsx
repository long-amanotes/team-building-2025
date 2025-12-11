import { type LucideIcon, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  emoji?: string;
  gradient?: string;
}

function SectionHeader({ icon: Icon, title, subtitle, emoji = '🎄', gradient = 'from-primary to-accent' }: SectionHeaderProps) {
  return (
    <div className="relative mb-8 rounded-2xl border border-border/50 bg-card p-6 overflow-hidden">
      {/* Festive decorations */}
      <div className="absolute top-2 right-2 text-2xl opacity-30">{emoji}</div>
      <div className="absolute bottom-2 left-2 text-xl opacity-20">❄️</div>

      {/* Christmas lights */}
      <div className="absolute top-0 left-0 right-0 h-1 flex justify-around">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-1.5 h-1.5 rounded-full christmas-light',
              i % 3 === 0 ? 'bg-[hsl(var(--monokai-red))]' :
              i % 3 === 1 ? 'bg-[hsl(var(--monokai-green))]' :
              'bg-[hsl(var(--monokai-yellow))]'
            )}
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className={cn(
          'flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg',
          gradient
        )}>
          <Icon className="h-7 w-7 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            {title}
            <Sparkles className="h-5 w-5 text-[hsl(var(--monokai-yellow))] christmas-glow" />
          </h2>
          {subtitle && (
            <p className="text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export { SectionHeader };

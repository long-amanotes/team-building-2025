import { Sparkles, TreePine, Gift, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

function ChristmasBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[hsl(var(--monokai-red)/0.1)] via-[hsl(var(--monokai-green)/0.1)] to-[hsl(var(--monokai-red)/0.1)]">
      {/* Decorative lights */}
      <div className="absolute top-0 left-0 right-0 h-1 flex justify-around">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-2 h-2 rounded-full christmas-light',
              i % 3 === 0 ? 'bg-[hsl(var(--monokai-red))]' :
              i % 3 === 1 ? 'bg-[hsl(var(--monokai-green))]' :
              'bg-[hsl(var(--monokai-yellow))]'
            )}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-3 text-sm">
          {/* Left decorations */}
          <div className="hidden sm:flex items-center gap-2">
            <TreePine className="h-4 w-4 text-[hsl(var(--monokai-green))] christmas-glow" />
            <Star className="h-3 w-3 text-[hsl(var(--monokai-yellow))] christmas-light" />
          </div>

          {/* Message */}
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[hsl(var(--monokai-yellow))] christmas-glow" />
            <span className="font-medium text-foreground">
              <span className="text-[hsl(var(--monokai-red))]">Merry</span>
              {' '}
              <span className="text-[hsl(var(--monokai-green))]">Christmas</span>
              {' '}
              <span className="text-muted-foreground">&</span>
              {' '}
              <span className="text-[hsl(var(--monokai-yellow))]">Happy New Year 2025!</span>
            </span>
            <Sparkles className="h-4 w-4 text-[hsl(var(--monokai-yellow))] christmas-glow" />
          </div>

          {/* Right decorations */}
          <div className="hidden sm:flex items-center gap-2">
            <Gift className="h-4 w-4 text-[hsl(var(--monokai-red))] christmas-light" />
            <TreePine className="h-4 w-4 text-[hsl(var(--monokai-green))] christmas-glow" />
          </div>
        </div>
      </div>
    </div>
  );
}

export { ChristmasBanner };

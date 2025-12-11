import { useState, useCallback } from 'react';
import { Bed, Users, Star, Crown, Heart, Sparkles, Snowflake, Gift, TreePine, Bell, Candy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { RoomAssignment } from '@/types';

interface RoomCardProps {
  room: RoomAssignment;
  className?: string;
}

// ===== DESIGN SYSTEM =====

// Color themes (6 options)
const colorThemes = [
  { primary: 'monokai-red', secondary: 'monokai-orange', accent: 'monokai-yellow', emoji: '🔴' },
  { primary: 'monokai-green', secondary: 'monokai-blue', accent: 'monokai-purple', emoji: '🟢' },
  { primary: 'monokai-purple', secondary: 'monokai-red', accent: 'monokai-orange', emoji: '🟣' },
  { primary: 'monokai-blue', secondary: 'monokai-green', accent: 'monokai-yellow', emoji: '🔵' },
  { primary: 'monokai-orange', secondary: 'monokai-yellow', accent: 'monokai-red', emoji: '🟠' },
  { primary: 'monokai-yellow', secondary: 'monokai-orange', accent: 'monokai-green', emoji: '🟡' },
];

// Border styles (5 options)
const borderStyles = [
  'border-2 rounded-2xl',
  'border-4 rounded-none',
  'border-l-8 rounded-r-xl',
  'border-t-8 rounded-b-2xl',
  'border-2 border-dashed rounded-xl',
];

// Background patterns (5 options)
const bgPatterns = [
  '',
  'bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))]',
  'bg-[conic-gradient(from_180deg,_var(--tw-gradient-stops))]',
  'bg-gradient-to-br',
  'bg-gradient-to-t',
];

// Decorative elements (8 options)
const decorElements = [
  { corner: '🎄', accent: '✨', icon: TreePine },
  { corner: '⭐', accent: '🌟', icon: Star },
  { corner: '🎁', accent: '🎀', icon: Gift },
  { corner: '❄️', accent: '☃️', icon: Snowflake },
  { corner: '🔔', accent: '🎵', icon: Bell },
  { corner: '🍬', accent: '🍭', icon: Candy },
  { corner: '💝', accent: '💫', icon: Heart },
  { corner: '👑', accent: '✨', icon: Crown },
];

// Avatar styles (5 options)
const avatarStyles = [
  'rounded-full',
  'rounded-lg rotate-45',
  'rounded-none',
  'rounded-full ring-2 ring-offset-2',
  'rounded-2xl',
];

// Number display styles (5 options)
const numberStyles = [
  'badge',
  'circle',
  'ribbon',
  'tag',
  'stamp',
];

// Escape messages when card runs away
const escapeMessages = [
  '🏃 Đừng bắt tôi!',
  '😱 Ối! Chạy thôi!',
  '🙈 Không thấy gì hết!',
  '💨 Biến mất~',
  '🎄 Noel vui vẻ!',
  '❄️ Lạnh quá chạy đây!',
  '🎁 Quà đâu rồi?',
  '⭐ Bay đi thôi~',
  '🦌 Tuần lộc đến rồi!',
  '🎅 Ho ho ho!',
];

// Generate deterministic random from room ID
const seededRandom = (seed: number, max: number) => {
  const x = Math.sin(seed * 9999) * 10000;
  return Math.floor((x - Math.floor(x)) * max);
};

// Get initials
const getInitials = (name: string) => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

// Get short name
const getShortName = (name: string) => {
  const parts = name.trim().split(' ');
  if (parts.length > 2) {
    return `${parts[0]} ${parts[parts.length - 1]}`;
  }
  return name;
};

function RoomCard({ room, className }: RoomCardProps) {
  const seed = room.roomId;
  const isFamily = room.type === 'Double';
  const hasSpecial = Boolean(room.special);

  // Escape state
  const [escapeOffset, setEscapeOffset] = useState({ x: 0, y: 0 });
  const [isEscaping, setIsEscaping] = useState(false);
  const [escapeMessage, setEscapeMessage] = useState('');
  const [escapeCount, setEscapeCount] = useState(0);

  // Handle click - make card "run away"
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    // Random direction to escape
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 150; // 100-250px

    const newX = Math.cos(angle) * distance;
    const newY = Math.sin(angle) * distance;

    // Clamp to not go too far off screen
    const clampedX = Math.max(-200, Math.min(200, escapeOffset.x + newX));
    const clampedY = Math.max(-150, Math.min(150, escapeOffset.y + newY));

    setEscapeOffset({ x: clampedX, y: clampedY });
    setIsEscaping(true);
    setEscapeMessage(escapeMessages[Math.floor(Math.random() * escapeMessages.length)]);
    setEscapeCount(prev => prev + 1);

    // Reset escaping animation state
    setTimeout(() => setIsEscaping(false), 300);

    // After 5 escapes, slowly return home
    if (escapeCount >= 4) {
      setTimeout(() => {
        setEscapeOffset({ x: 0, y: 0 });
        setEscapeCount(0);
        setEscapeMessage('😌 Về nhà thôi~');
        setTimeout(() => setEscapeMessage(''), 1500);
      }, 2000);
    }
  }, [escapeOffset, escapeCount]);

  // Double click to reset
  const handleDoubleClick = useCallback(() => {
    setEscapeOffset({ x: 0, y: 0 });
    setEscapeCount(0);
    setEscapeMessage('🏠 Về vị trí cũ!');
    setTimeout(() => setEscapeMessage(''), 1500);
  }, []);

  // Pick design elements based on room ID
  const colorTheme = colorThemes[seededRandom(seed, colorThemes.length)];
  const borderStyle = borderStyles[seededRandom(seed + 1, borderStyles.length)];
  const bgPattern = bgPatterns[seededRandom(seed + 2, bgPatterns.length)];
  const decorElement = decorElements[seededRandom(seed + 3, decorElements.length)];
  const avatarStyle = avatarStyles[seededRandom(seed + 4, avatarStyles.length)];
  const numberStyle = numberStyles[seededRandom(seed + 5, numberStyles.length)];

  const IconComponent = decorElement.icon;

  return (
    <div
      className="relative"
      style={{
        transform: `translate(${escapeOffset.x}px, ${escapeOffset.y}px)`,
        transition: isEscaping ? 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'transform 0.8s ease-out',
        zIndex: isEscaping ? 50 : 1,
      }}
    >
      {/* Escape message bubble */}
      {escapeMessage && (
        <div className={cn(
          'absolute -top-10 left-1/2 -translate-x-1/2 z-50',
          'px-3 py-1.5 rounded-full text-sm font-bold whitespace-nowrap',
          'bg-card border-2 shadow-lg animate-bounce',
          `border-[hsl(var(--${colorTheme.primary}))]`,
          `text-[hsl(var(--${colorTheme.primary}))]`
        )}>
          {escapeMessage}
        </div>
      )}

      <Card
        className={cn(
          'group transition-all duration-500 overflow-hidden relative cursor-pointer select-none',
          'hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02]',
          isEscaping && 'animate-pulse scale-95 rotate-3',
          borderStyle,
          `border-[hsl(var(--${colorTheme.primary}))]/40`,
          `hover:border-[hsl(var(--${colorTheme.primary}))]`,
          className
        )}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      >
        {/* Background gradient */}
        <div className={cn(
          'absolute inset-0 opacity-[0.08]',
          bgPattern || 'bg-gradient-to-br',
          `from-[hsl(var(--${colorTheme.primary}))]`,
          `via-[hsl(var(--${colorTheme.secondary}))]`,
          `to-[hsl(var(--${colorTheme.accent}))]`
        )} />

        {/* Corner decorations */}
        <div className="absolute top-2 left-2 text-lg opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all">
          {decorElement.corner}
        </div>
        <div className="absolute top-2 right-2 text-sm opacity-40 group-hover:opacity-80 transition-all christmas-light">
          {decorElement.accent}
        </div>
        <div className="absolute bottom-2 right-2 text-lg opacity-30 group-hover:opacity-60 group-hover:rotate-12 transition-all">
          {decorElement.corner}
        </div>


        <CardContent className="p-4 relative z-10">
          {/* Header with room number */}
          <div className="flex items-start justify-between mb-4">
            {/* Room number - various styles */}
            {numberStyle === 'badge' && (
              <div className={cn(
                'px-4 py-2 font-black text-xl text-white shadow-lg',
                'bg-gradient-to-r rounded-full',
                `from-[hsl(var(--${colorTheme.primary}))]`,
                `to-[hsl(var(--${colorTheme.secondary}))]`
              )}>
                {room.roomId}
              </div>
            )}

            {numberStyle === 'circle' && (
              <div className="relative">
                <div className={cn(
                  'w-14 h-14 flex items-center justify-center font-black text-2xl text-white shadow-xl',
                  'rounded-full bg-gradient-to-br',
                  `from-[hsl(var(--${colorTheme.primary}))]`,
                  `to-[hsl(var(--${colorTheme.secondary}))]`,
                  'group-hover:scale-110 group-hover:rotate-6 transition-all'
                )}>
                  {room.roomId}
                </div>
                <div className={cn(
                  'absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full',
                  `bg-[hsl(var(--${colorTheme.accent}))]`
                )} />
              </div>
            )}

            {numberStyle === 'ribbon' && (
              <div className={cn(
                'relative -ml-4 -mt-4 px-6 py-2 font-black text-xl text-white',
                'bg-gradient-to-r shadow-lg',
                `from-[hsl(var(--${colorTheme.primary}))]`,
                `to-[hsl(var(--${colorTheme.secondary}))]`
              )}
                style={{ clipPath: 'polygon(0 0, 100% 0, 95% 50%, 100% 100%, 0 100%, 5% 50%)' }}
              >
                #{room.roomId}
              </div>
            )}

            {numberStyle === 'tag' && (
              <div className={cn(
                'relative px-4 py-2 font-black text-xl text-white rounded-r-lg',
                'bg-gradient-to-r shadow-lg',
                `from-[hsl(var(--${colorTheme.primary}))]`,
                `to-[hsl(var(--${colorTheme.secondary}))]`
              )}>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-3 h-3 rounded-full bg-card" />
                {room.roomId}
              </div>
            )}

            {numberStyle === 'stamp' && (
              <div className={cn(
                'px-4 py-2 font-black text-xl border-4 rounded-lg',
                `text-[hsl(var(--${colorTheme.primary}))]`,
                `border-[hsl(var(--${colorTheme.primary}))]`,
                'rotate-[-3deg] group-hover:rotate-0 transition-transform'
              )}>
                №{room.roomId}
              </div>
            )}

            {/* Room type indicator */}
            <div className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold',
              'bg-card/80 backdrop-blur border',
              `border-[hsl(var(--${colorTheme.primary}))]/30`,
              `text-[hsl(var(--${colorTheme.primary}))]`
            )}>
              <IconComponent className="h-3.5 w-3.5" />
              {isFamily ? 'Family' : 'Twin'}
            </div>
          </div>

          {/* Title */}
          <h3 className={cn(
            'text-lg font-black mb-3 flex items-center gap-2',
            `text-[hsl(var(--${colorTheme.primary}))]`
          )}>
            <Bed className="h-4 w-4" />
            Phòng {room.roomId}
          </h3>

          {/* Occupants */}
          <div className="space-y-3">
            <div className={cn(
              'flex items-center gap-2 text-xs font-bold uppercase tracking-wider',
              `text-[hsl(var(--${colorTheme.secondary}))]`
            )}>
              <Users className="h-3.5 w-3.5" />
              <span>Thành viên ({room.occupants.length})</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {room.occupants.map((name, index) => (
                <div
                  key={index}
                  className={cn(
                    'group/person flex items-center gap-2 bg-card/60 backdrop-blur rounded-full pl-1 pr-3 py-1 border border-border/50 transition-colors',
                    `hover:border-[hsl(var(--${colorTheme.primary}))]/50`
                  )}
                >
                  {/* Avatar */}
                  <div className={cn(
                    'w-8 h-8 flex items-center justify-center font-bold text-xs text-white shadow-md',
                    'bg-gradient-to-br transition-transform group-hover/person:scale-110',
                    avatarStyle,
                    index % 3 === 0 && `from-[hsl(var(--${colorTheme.primary}))] to-[hsl(var(--${colorTheme.secondary}))]`,
                    index % 3 === 1 && `from-[hsl(var(--${colorTheme.secondary}))] to-[hsl(var(--${colorTheme.accent}))]`,
                    index % 3 === 2 && `from-[hsl(var(--${colorTheme.accent}))] to-[hsl(var(--${colorTheme.primary}))]`
                  )}>
                    <span className={avatarStyle.includes('rotate-45') ? '-rotate-45' : ''}>
                      {getInitials(name)}
                    </span>
                  </div>
                  {/* Name */}
                  <span className="text-sm font-medium text-foreground">{getShortName(name)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Special indicator */}
          {hasSpecial && (
            <div className={cn(
              'mt-4 flex items-center gap-2 px-3 py-2 rounded-lg',
              'bg-gradient-to-r from-[hsl(var(--monokai-yellow))]/20 to-[hsl(var(--monokai-orange))]/20',
              'border border-[hsl(var(--monokai-yellow))]/40'
            )}>
              <Star className="h-4 w-4 text-[hsl(var(--monokai-yellow))] christmas-light" />
              <span className="text-sm font-bold text-[hsl(var(--monokai-yellow))]">{room.special}</span>
              <Sparkles className="h-3 w-3 text-[hsl(var(--monokai-orange))] ml-auto" />
            </div>
          )}

          {/* Bottom accent line */}
          <div className={cn(
            'absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity',
            'bg-gradient-to-r',
            `from-transparent via-[hsl(var(--${colorTheme.primary}))] to-transparent`
          )} />
        </CardContent>
      </Card>
    </div>
  );
}

export { RoomCard };

import { Bed, Users, Star } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { RoomAssignment } from '@/types';

interface RoomCardProps {
  room: RoomAssignment;
  className?: string;
}

function RoomCard({ room, className }: RoomCardProps) {
  const isFamily = room.type === 'Double';
  const hasSpecial = Boolean(room.special);

  return (
    <Card
      className={cn(
        'group transition-all duration-300',
        'hover:shadow-xl hover:-translate-y-1',
        isFamily && 'border-amber-500/30 dark:border-amber-500/20',
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-xl shadow-lg',
              'transition-transform duration-300 group-hover:scale-110',
              isFamily
                ? 'bg-gradient-to-br from-amber-500 to-orange-500 shadow-amber-500/25'
                : 'bg-gradient-to-br from-primary to-sky-500 shadow-primary/25'
            )}
          >
            <Bed className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Phòng</p>
            <p className="text-lg font-bold text-foreground">#{room.roomId}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 pb-1 border-b border-border/50">
            <Users className="h-4 w-4 shrink-0 text-primary" />
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Người ở ({room.occupants.length})
            </p>
          </div>
          <div className="space-y-2">
            {room.occupants.map((name, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all',
                  'bg-muted/50 hover:bg-muted border border-border/50',
                  index === 0 && 'bg-primary/5 dark:bg-primary/10 border-primary/20'
                )}
              >
                <div
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                    index === 0
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted-foreground/20 text-foreground'
                  )}
                >
                  {index + 1}
                </div>
                <p
                  className={cn(
                    'flex-1 text-base font-semibold',
                    index === 0 ? 'text-foreground' : 'text-foreground'
                  )}
                >
                  {name}
                </p>
              </div>
            ))}
          </div>
        </div>
        {hasSpecial && (
          <div className="flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-2.5 dark:bg-amber-500/15 border border-amber-500/20">
            <Star className="h-4 w-4 text-amber-500 shrink-0" />
            <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">{room.special}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { RoomCard };

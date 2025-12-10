import { Bed, Users, Star } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
        <Badge variant={isFamily ? 'warning' : 'default'}>
          {room.type}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-start gap-2">
          <Users className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <div className="flex flex-wrap gap-1.5">
            {room.occupants.map((name, index) => (
              <span
                key={index}
                className={cn(
                  'inline-block rounded-md px-2 py-0.5 text-sm',
                  index === 0
                    ? 'bg-secondary text-foreground font-medium'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
        {hasSpecial && (
          <div className="flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-2 dark:bg-amber-500/15">
            <Star className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">{room.special}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { RoomCard };

import { Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Participant } from '@/types';

interface ParticipantCardProps {
  participant: Participant;
  divisionColor: string;
  className?: string;
}

function ParticipantCard({ participant, divisionColor, className }: ParticipantCardProps) {
  // Get initials from name
  const initials = participant.name
    .split(' ')
    .slice(-2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div
      className={cn(
        'group flex items-center gap-4 rounded-xl',
        'bg-card border border-border',
        'p-4 transition-all duration-300',
        'hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5',
        className
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold',
          'transition-transform duration-300 group-hover:scale-105',
          divisionColor
        )}
      >
        {initials}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-foreground">{participant.name}</p>
        <p className="truncate text-sm text-muted-foreground">{participant.designation}</p>
      </div>

      {/* Actions */}
      <a
        href={`mailto:${participant.email}`}
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
          'text-muted-foreground transition-all duration-200',
          'hover:bg-primary/10 hover:text-primary'
        )}
        title={participant.email}
      >
        <Mail className="h-4 w-4" />
      </a>
    </div>
  );
}

export { ParticipantCard };

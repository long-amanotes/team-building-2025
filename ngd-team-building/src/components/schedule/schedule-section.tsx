import { useState } from 'react';
import {
  Users,
  Bus,
  Car,
  UtensilsCrossed,
  Hotel,
  Umbrella,
  MapPin,
  Fish,
  Moon,
  Coffee,
  Sun,
  LogOut,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { schedule } from '@/data/schedule';
import type { ScheduleEvent, TimePeriod } from '@/types';

const iconMap: Record<string, typeof Users> = {
  Users,
  Bus,
  Car,
  UtensilsCrossed,
  Hotel,
  Umbrella,
  MapPin,
  Fish,
  Moon,
  Coffee,
  Sun,
  LogOut,
};

// Period gradient colors for light/dark mode
const periodGradients: Record<string, string> = {
  'SÁNG': 'from-amber-500 to-orange-500',
  'TRƯA': 'from-sky-500 to-cyan-500',
  'CHIỀU': 'from-teal-500 to-emerald-500',
  'TỐI': 'from-indigo-500 to-purple-500',
};

const periodTextColors: Record<string, string> = {
  'SÁNG': 'text-amber-600 dark:text-amber-400',
  'TRƯA': 'text-sky-600 dark:text-sky-400',
  'CHIỀU': 'text-teal-600 dark:text-teal-400',
  'TỐI': 'text-indigo-600 dark:text-indigo-400',
};

interface EventItemProps {
  event: ScheduleEvent;
  isLast: boolean;
  index: number;
}

function EventItem({ event, isLast, index }: EventItemProps) {
  const Icon = iconMap[event.icon] || MapPin;
  const periodGradient = periodGradients[event.period] || 'from-slate-400 to-slate-500';

  return (
    <div
      className="relative flex gap-4 animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-5 top-12 h-[calc(100%-24px)] w-0.5 bg-gradient-to-b from-border to-transparent" />
      )}

      {/* Icon */}
      <div
        className={cn(
          'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
          'bg-gradient-to-br shadow-lg transition-transform duration-300 hover:scale-110',
          periodGradient
        )}
      >
        <Icon className="h-5 w-5 text-white" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn('text-sm font-semibold', periodTextColors[event.period])}>
            {event.time}
          </span>
          <Badge variant="outline" size="sm">
            {event.period}
          </Badge>
        </div>
        <h4 className="mt-1 font-semibold text-foreground">{event.title}</h4>
        <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>
        {event.location && event.location !== '--- di chuyển ---' && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground/70">
            <MapPin className="h-3 w-3" />
            <span>{event.location}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ScheduleSection() {
  const [activeDay, setActiveDay] = useState<string>('day1');
  const currentDay = schedule.find((d) => d.id === activeDay) || schedule[0];

  // Group events by period
  const eventsByPeriod = currentDay.events.reduce((acc, event) => {
    if (!acc[event.period]) acc[event.period] = [];
    acc[event.period].push(event);
    return acc;
  }, {} as Record<TimePeriod, ScheduleEvent[]>);

  const periodOrder: TimePeriod[] = ['SÁNG', 'TRƯA', 'CHIỀU', 'TỐI'];

  return (
    <div className="space-y-6">
      {/* Day Selector */}
      <div className="flex gap-3">
        {schedule.map((day, index) => (
          <button
            key={day.id}
            onClick={() => setActiveDay(day.id)}
            className={cn(
              'flex-1 rounded-2xl border p-4 text-left transition-all duration-300',
              'animate-fade-in',
              activeDay === day.id
                ? day.id === 'day1'
                  ? 'border-sky-500/50 bg-gradient-to-br from-sky-500/10 to-cyan-500/10 shadow-lg shadow-sky-500/10'
                  : 'border-emerald-500/50 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 shadow-lg shadow-emerald-500/10'
                : 'border-border bg-card hover:border-border/80 hover:bg-accent/50'
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{day.date}</p>
                <p className="mt-1 text-lg font-bold text-foreground">{day.label}</p>
              </div>
              <Badge
                variant={activeDay === day.id ? 'default' : 'secondary'}
                className={cn(
                  activeDay === day.id &&
                    (day.id === 'day1'
                      ? 'bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/30'
                      : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30')
                )}
              >
                {day.events.length} hoạt động
              </Badge>
            </div>
          </button>
        ))}
      </div>

      {/* Timeline */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span
              className={cn(
                'h-3 w-3 rounded-full',
                activeDay === 'day1' ? 'bg-sky-500' : 'bg-emerald-500'
              )}
            />
            Lịch trình {currentDay.label} - {currentDay.date}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {periodOrder.map((period) => {
            const events = eventsByPeriod[period];
            if (!events?.length) return null;

            return (
              <div key={period}>
                <div className="mb-4 flex items-center gap-2">
                  <div
                    className={cn(
                      'h-1 w-8 rounded-full bg-gradient-to-r',
                      periodGradients[period]
                    )}
                  />
                  <h3 className={cn(
                    'text-sm font-semibold uppercase tracking-wider',
                    periodTextColors[period]
                  )}>
                    {period}
                  </h3>
                </div>
                <div className="space-y-0">
                  {events.map((event, index) => (
                    <EventItem
                      key={`${event.time}-${event.title}`}
                      event={event}
                      isLast={index === events.length - 1}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

export { ScheduleSection };

import { useState } from 'react';
import { UtensilsCrossed, Coffee, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MealCard } from './meal-card';
import { lunchDay18, dinnerDay18, lunchDay19 } from '@/data/menu';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

const days = [
  {
    id: 'day1',
    date: '18/12/2025',
    label: 'Ngày 18',
    meals: [lunchDay18, dinnerDay18],
    gradient: 'from-sky-500 to-cyan-500',
    gradientBg: 'from-sky-500/10 to-cyan-500/10',
    borderColor: 'border-sky-500/50',
    shadowColor: 'shadow-sky-500/10',
  },
  {
    id: 'day2',
    date: '19/12/2025',
    label: 'Ngày 19',
    meals: [lunchDay19],
    hasBuffet: true,
    gradient: 'from-emerald-500 to-teal-500',
    gradientBg: 'from-emerald-500/10 to-teal-500/10',
    borderColor: 'border-emerald-500/50',
    shadowColor: 'shadow-emerald-500/10',
  },
];

function MenuSection() {
  const [activeDay, setActiveDay] = useState<string>('day1');
  const currentDay = days.find((d) => d.id === activeDay) || days[0];

  const allMeals = days.flatMap(d => d.meals);
  const totalCost = allMeals.reduce((sum, meal) => sum + meal.totalCost, 0);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="sm:col-span-1" hover={false}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/25">
              <UtensilsCrossed className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{allMeals.length}</p>
              <p className="text-sm text-muted-foreground">Bữa ăn chính</p>
            </div>
          </CardContent>
        </Card>

        <Card className="sm:col-span-1" hover={false}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
              <Coffee className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{formatCurrency(totalCost)}</p>
              <p className="text-sm text-muted-foreground">Tổng chi phí ăn uống</p>
            </div>
          </CardContent>
        </Card>

        <Card className="sm:col-span-2 lg:col-span-1 border-primary/20 bg-gradient-to-r from-primary/5 to-sky-500/5" hover={false}>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15">
              <Coffee className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Buffet sáng 19/12</p>
              <p className="text-sm text-muted-foreground">
                Đã bao gồm trong gói BB resort
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Day Selector */}
      <div className="flex gap-3">
        {days.map((day, index) => (
          <button
            key={day.id}
            onClick={() => setActiveDay(day.id)}
            className={cn(
              'flex-1 rounded-2xl border p-4 text-left transition-all duration-300',
              'animate-fade-in',
              activeDay === day.id
                ? cn(day.borderColor, `bg-gradient-to-br ${day.gradientBg} shadow-lg`, day.shadowColor)
                : 'border-border bg-card hover:border-border/80 hover:bg-accent/50'
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br',
                  day.gradient
                )}>
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{day.date}</p>
                  <p className="font-bold text-foreground">{day.label}</p>
                </div>
              </div>
              <Badge
                variant={activeDay === day.id ? 'default' : 'secondary'}
                className={cn(
                  activeDay === day.id && day.id === 'day1'
                    ? 'bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/30'
                    : activeDay === day.id && day.id === 'day2'
                    ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                    : ''
                )}
              >
                {day.meals.length} bữa{day.hasBuffet ? ' + buffet' : ''}
              </Badge>
            </div>
          </button>
        ))}
      </div>

      {/* Meals for selected day */}
      <div className="space-y-6">
        {currentDay.meals.map((meal, index) => (
          <div
            key={meal.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <MealCard meal={meal} />
          </div>
        ))}

        {/* Buffet note for day 2 */}
        {currentDay.hasBuffet && (
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-sky-500/5 animate-fade-in" hover={false}>
            <CardContent className="flex items-start gap-4 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                <Coffee className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">🍳 Buffet sáng tại resort</p>
                <p className="mt-1 text-muted-foreground">
                  Đã bao gồm trong gói Bed & Breakfast của resort
                </p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span>⏰ 06:30 - 09:30</span>
                  <span>📍 Nhà hàng Sandora, Tầng 3, Toà nhà 1</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export { MenuSection };

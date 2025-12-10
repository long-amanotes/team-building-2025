import { UtensilsCrossed, Coffee } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { MealCard } from './meal-card';
import { meals } from '@/data/menu';
import { formatCurrency } from '@/lib/utils';

function MenuSection() {
  const totalCost = meals.reduce((sum, meal) => sum + meal.totalCost, 0);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex flex-wrap items-center gap-4">
        <Card className="flex-1 min-w-[200px]" hover={false}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/25">
              <UtensilsCrossed className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{meals.length}</p>
              <p className="text-sm text-muted-foreground">Bữa ăn chính</p>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 min-w-[200px]" hover={false}>
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
      </div>

      {/* Note about buffet */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-sky-500/5" hover={false}>
        <CardContent className="flex items-start gap-3 p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15">
            <Coffee className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">Buffet sáng ngày 19/12</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Đã bao gồm trong gói Bed & Breakfast của resort. Dùng tại Nhà hàng Sandora, Tầng 3,
              Toà nhà 1 từ 06:30 - 09:30.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Meal Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {meals.map((meal, index) => (
          <div
            key={meal.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <MealCard meal={meal} />
          </div>
        ))}
      </div>
    </div>
  );
}

export { MenuSection };

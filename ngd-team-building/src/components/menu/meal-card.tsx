import { MapPin, Clock, Users, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { Meal } from '@/types';

interface MealCardProps {
  meal: Meal;
}

function MealCard({ meal }: MealCardProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    meal.restaurant + ' ' + meal.address
  )}`;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <Badge variant="warning" className="mb-2">
              {meal.date}
            </Badge>
            <CardTitle className="text-xl">{meal.name}</CardTitle>
            <p className="mt-1 text-lg font-semibold text-amber-600 dark:text-amber-400">
              {meal.restaurant}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {/* Info */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{meal.time}</span>
          </div>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <MapPin className="h-4 w-4" />
            <span className="underline-offset-2 hover:underline">{meal.address}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Thực đơn
          </h4>
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Món</th>
                  <th className="px-4 py-2 text-center font-medium text-muted-foreground">SL</th>
                  <th className="hidden px-4 py-2 text-right font-medium text-muted-foreground sm:table-cell">
                    Đơn giá
                  </th>
                  <th className="px-4 py-2 text-right font-medium text-muted-foreground">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {meal.items.map((item, index) => (
                  <tr
                    key={index}
                    className={cn(
                      'border-b border-border/50 last:border-0',
                      'transition-colors hover:bg-muted/30'
                    )}
                  >
                    <td className="px-4 py-2.5 text-foreground">
                      {item.name}
                      {item.note && (
                        <span className="ml-1 text-xs text-muted-foreground">
                          ({item.note})
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-center text-muted-foreground">
                      {item.quantity}
                    </td>
                    <td className="hidden px-4 py-2.5 text-right text-muted-foreground sm:table-cell">
                      {formatCurrency(item.pricePerUnit)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-medium text-foreground">
                      {formatCurrency(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-4">
          <div>
            <p className="text-sm text-muted-foreground">Tổng cộng</p>
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(meal.totalCost)}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-card border border-border px-3 py-2">
            <Users className="h-4 w-4 text-amber-500" />
            <span className="text-sm text-muted-foreground">
              {formatCurrency(meal.perPaxCost)} / người
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { MealCard };

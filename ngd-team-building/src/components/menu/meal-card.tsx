import { useState } from 'react';
import { MapPin, Clock, Users, ExternalLink, Phone, Menu, Images, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { FoodImageGallery } from './food-image-gallery';
import type { Meal } from '@/types';

// Import food images for lunch day 18
import foodImage1 from '@/assets/Foods/image (1).png';
import foodImage2 from '@/assets/Foods/image (2).png';
import foodImage3 from '@/assets/Foods/image (3).png';

interface MealCardProps {
  meal: Meal;
}

const lunchDay18Images = [foodImage1, foodImage2, foodImage3];

function MealCard({ meal }: MealCardProps) {
  const [isImageGalleryOpen, setIsImageGalleryOpen] = useState(false);
  const [isMenuExpanded, setIsMenuExpanded] = useState(meal.items.length <= 3);

  const isLunchDay18 = meal.id === 'lunch-18';
  const images = isLunchDay18 ? lunchDay18Images : [];
  const hasImages = images.length > 0;
  const hasMultipleItems = meal.items.length > 3;

  const googleMapsUrl = meal.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    meal.restaurant + ' ' + meal.address
  )}`;

  const handleCardClick = () => {
    if (hasImages) {
      setIsImageGalleryOpen(true);
    }
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className={cn(
          hasImages && "cursor-pointer"
        )}
      >
      <Card className={cn(
        "overflow-hidden transition-all",
        hasImages && "hover:shadow-xl hover:scale-[1.02] hover:border-primary/30"
      )}>
      <CardHeader className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="warning">
                {meal.date}
              </Badge>
              {hasImages && (
                <Badge variant="outline" className="gap-1.5 text-xs border-primary/30 text-primary bg-primary/5">
                  <Images className="h-3 w-3" />
                  Click để xem hình ({images.length})
                </Badge>
              )}
            </div>
            <CardTitle className="text-xl">{meal.name}</CardTitle>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 text-lg font-semibold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1 group"
            >
              {meal.restaurant}
              <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
          {meal.menuUrl && (
            <a
              href={meal.menuUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-primary hover:underline px-2 py-1 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              <Menu className="h-3.5 w-3.5" />
              Xem Menu
            </a>
          )}
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
          {meal.phone && (
            <a
              href={`tel:${meal.phone.split('/')[0].replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <Phone className="h-4 w-4" />
              <span className="underline-offset-2 hover:underline">{meal.phone}</span>
            </a>
          )}
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Thực đơn ({meal.items.length} món)
            </h4>
            {hasMultipleItems && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuExpanded(!isMenuExpanded);
                }}
                className="gap-1 text-xs"
              >
                {isMenuExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Thu gọn
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    Xem chi tiết
                  </>
                )}
              </Button>
            )}
          </div>

          {isMenuExpanded ? (
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
          ) : (
            <div className="rounded-xl border border-border bg-muted/20 p-3">
              <div className="flex flex-wrap gap-2">
                {meal.items.slice(0, 4).map((item, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {item.name}
                  </Badge>
                ))}
                {meal.items.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{meal.items.length - 4} món khác
                  </Badge>
                )}
              </div>
            </div>
          )}
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
    </div>

    {/* Food Image Gallery Modal */}
    {hasImages && (
      <FoodImageGallery
        images={images}
        restaurantName={meal.restaurant}
        isOpen={isImageGalleryOpen}
        onClose={() => setIsImageGalleryOpen(false)}
      />
    )}
    </>
  );
}

export { MealCard };

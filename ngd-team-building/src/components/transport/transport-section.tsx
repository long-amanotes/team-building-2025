import {
  Bus,
  Car,
  Clock,
  Users,
  ArrowRight,
  Building2,
  ExternalLink,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/christmas';
import { cn } from '@/lib/utils';
import { vehicles, transportInfo } from '@/data/transport';
import { formatCurrency } from '@/lib/utils';

function TransportSection() {
  const mainBus = vehicles.find((v) => v.isMain);
  const privateCars = vehicles.filter((v) => !v.isMain);

  return (
    <div className="space-y-6">
      <SectionHeader
        icon={Bus}
        title="Di chuyển"
        subtitle="Sài Gòn → Mũi Né → Sài Gòn"
        emoji="🚌"
        gradient="from-rose-500 to-pink-500"
      />

      {/* Quick Info Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card hover={false} className="animate-fade-in" style={{ animationDelay: '0ms' }}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-sky-500 shadow-lg shadow-primary/25">
              <Bus className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">1</p>
              <p className="text-sm text-muted-foreground">Xe buýt chính</p>
            </div>
          </CardContent>
        </Card>

        <Card hover={false} className="animate-fade-in" style={{ animationDelay: '50ms' }}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
              <Car className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{privateCars.length}</p>
              <p className="text-sm text-muted-foreground">Xe riêng</p>
            </div>
          </CardContent>
        </Card>

        <Card hover={false} className="animate-fade-in" style={{ animationDelay: '100ms' }}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/25">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">39</p>
              <p className="text-sm text-muted-foreground">Tổng số chỗ</p>
              <p className="text-xs text-muted-foreground/70">(28 khách + 3 xe riêng)</p>
            </div>
          </CardContent>
        </Card>

        <Card hover={false} className="animate-fade-in" style={{ animationDelay: '150ms' }}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 shadow-lg shadow-rose-500/25">
              <span className="text-lg font-bold text-white">₫</span>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">
                {formatCurrency(transportInfo.busCost)}
              </p>
              <p className="text-sm text-muted-foreground">Chi phí xe buýt</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meeting Point */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-sky-500/5" hover={false}>
        <CardContent className="p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <a
              href={transportInfo.meetPointMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 group"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 group-hover:scale-110 transition-transform">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Điểm tập trung</p>
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                  {transportInfo.meetPoint}
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
              </div>
            </a>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-card border border-border px-3 py-2">
                <Clock className="h-4 w-4 text-amber-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Tập trung</p>
                  <p className="text-sm font-medium text-foreground">08:30</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-card border border-border px-3 py-2">
                <ArrowRight className="h-4 w-4 text-emerald-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Xuất phát</p>
                  <p className="text-sm font-medium text-foreground">09:00</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Bus */}
      {mainBus && (
        <Card className="overflow-hidden border-primary/30">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-sky-500/10">
            <CardTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
                <Bus className="h-5 w-5 text-primary" />
              </div>
              Xe chính - {mainBus.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="flex flex-wrap gap-2">
              <Badge className="gap-1">
                <Users className="h-3 w-3" />
                {mainBus.capacity} chỗ khách
              </Badge>
              {mainBus.note && (
                <Badge variant="outline" className="text-xs">
                  {mainBus.note}
                </Badge>
              )}
              <Badge variant="success">Khứ hồi Sài Gòn - Mũi Né</Badge>
            </div>
            <div className="rounded-xl bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground">{transportInfo.busCostNote}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-border p-3 bg-card">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15">
                  <ArrowRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Lượt đi</p>
                  <p className="text-sm font-medium text-foreground">
                    {transportInfo.departTime}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-border p-3 bg-card">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500/15">
                  <ArrowRight className="h-4 w-4 rotate-180 text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Lượt về</p>
                  <p className="text-sm font-medium text-foreground">
                    {transportInfo.returnTime}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Private Cars */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15">
              <Car className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            Xe riêng ({privateCars.length} xe)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {privateCars.map((car, index) => (
              <div
                key={car.id}
                className={cn(
                  'flex items-center gap-4 rounded-xl border border-border bg-card p-4',
                  'transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5',
                  'animate-fade-in'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/15">
                  <Car className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{car.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="outline" size="sm">
                      {car.capacity} chỗ
                    </Badge>
                    {car.note && (
                      <span className="text-xs text-muted-foreground">{car.note}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export { TransportSection };

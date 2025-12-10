import {
  MapPin,
  Calendar,
  Users,
  BedDouble,
  Clock,
  Sparkles,
  CheckCircle2,
  XCircle,
  Sun,
  Waves,
  PartyPopper,
  ExternalLink,
  Navigation,
  FileText,
  Download,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from './stats-card';
import { eventInfo, resortPackage } from '@/data';
import { schedule } from '@/data/schedule';
import { cn } from '@/lib/utils';
import bbServicePackPdf from '@/assets/services/BB-service-pack.pdf';

function OverviewSection() {
  const totalEvents = schedule.reduce((acc, day) => acc + day.events.length, 0);

  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <Card className="relative overflow-hidden border-primary/20" hover={false}>
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-sky-500/5" />
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br from-primary/20 to-sky-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-gradient-to-tr from-sky-500/20 to-primary/20 blur-3xl" />

        <CardHeader className="relative pb-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="gap-1">
              <Waves className="h-3 w-3" />
              {eventInfo.nightsLabel}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Calendar className="h-3 w-3" />
              {eventInfo.startDate} - {eventInfo.endDate}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="relative space-y-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                {eventInfo.eventName}
              </h1>
              <PartyPopper className="h-8 w-8 text-amber-500 animate-float" />
            </div>
            <p className="mt-2 text-lg font-medium text-primary">
              {eventInfo.themeTagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href={eventInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <div className={cn(
                'flex h-10 w-10 items-center justify-center rounded-xl',
                'bg-gradient-to-br from-amber-500 to-orange-500',
                'shadow-lg shadow-amber-500/20',
                'group-hover:scale-110 transition-transform'
              )}>
                <Sun className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Resort</p>
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                  {eventInfo.resortName}
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
              </div>
            </a>
            <a
              href={eventInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <div className={cn(
                'flex h-10 w-10 items-center justify-center rounded-xl',
                'bg-gradient-to-br from-rose-500 to-pink-500',
                'shadow-lg shadow-rose-500/20',
                'group-hover:scale-110 transition-transform'
              )}>
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Địa điểm</p>
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                  {eventInfo.location}
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
              </div>
            </a>
          </div>

          <div className="flex flex-wrap gap-4 border-t border-border pt-4">
            <div className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Check-in:</span>
              <span className="text-sm font-semibold text-foreground">{eventInfo.checkInTime}</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Check-out:</span>
              <span className="text-sm font-semibold text-foreground">{eventInfo.checkOutTime}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          icon={Users}
          label="Thành viên"
          value={eventInfo.totalPax}
          subtext="người tham gia"
          gradient="from-primary to-sky-500"
        />
        <StatsCard
          icon={BedDouble}
          label="Phòng nghỉ"
          value={eventInfo.totalRooms}
          subtext="phòng khách sạn"
          gradient="from-emerald-500 to-teal-500"
        />
        <StatsCard
          icon={Calendar}
          label="Hoạt động"
          value={totalEvents}
          subtext="sự kiện trong lịch trình"
          gradient="from-amber-500 to-orange-500"
        />
        <StatsCard
          icon={Sparkles}
          label="Thời gian"
          value="2 ngày"
          subtext="trải nghiệm tuyệt vời"
          gradient="from-rose-500 to-pink-500"
        />
      </div>

      {/* Resort Package Info */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-emerald-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              Gói BB bao gồm
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2.5">
              {resortPackage.includes.map((item, index) => {
                const isPickleball = item === 'Pickleball';
                return (
                  <li key={index} className="flex items-start gap-3 text-sm animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    <div className="flex-1">
                      <span className="text-muted-foreground">{item}</span>
                      {isPickleball && (
                        <Badge variant="outline" size="sm" className="ml-2 text-xs border-amber-500/30 text-amber-600 dark:text-amber-400">
                          Cần đặt trước
                        </Badge>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-rose-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/15">
                <XCircle className="h-5 w-5" />
              </div>
              Không bao gồm
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2.5">
              {resortPackage.notIncluded.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Google Maps */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/15 to-green-500/15">
              <Navigation className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            Vị trí trên bản đồ
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative w-full h-[300px] sm:h-[400px]">
            <iframe
              src="https://maps.google.com/maps?q=Asteria+Mui+Ne+Resort,+Mui+Ne,+Phan+Thiet,+Vietnam&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Asteria Mui Ne Resort - Google Maps"
              className="rounded-b-xl"
            />
          </div>
          <div className="p-4 bg-muted/30 border-t border-border">
            <a
              href={eventInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
            >
              <MapPin className="h-4 w-4" />
              Mở trong Google Maps
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </CardContent>
      </Card>

      {/* BB Service Pack PDF */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/15 to-pink-500/15">
              <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            Gói dịch vụ BB (Bed & Breakfast)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative w-full h-[600px] sm:h-[700px]">
            <iframe
              src={bbServicePackPdf}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              title="BB Service Pack PDF"
              className="rounded-b-xl"
            />
          </div>
          <div className="p-4 bg-muted/30 border-t border-border">
            <a
              href={bbServicePackPdf}
              target="_blank"
              rel="noopener noreferrer"
              download="BB-service-pack.pdf"
              className="flex items-center justify-center gap-2 text-sm text-primary hover:underline group"
            >
              <Download className="h-4 w-4 group-hover:scale-110 transition-transform" />
              Tải xuống file PDF
              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export { OverviewSection };

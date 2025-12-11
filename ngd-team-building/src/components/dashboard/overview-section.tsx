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
import bbServicePackPdf from '@/assets/services/BB-service-pack.pdf';

function OverviewSection() {
  const totalEvents = schedule.reduce((acc, day) => acc + day.events.length, 0);

  return (
    <div className="space-y-8">
      {/* Hero Card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="gap-1.5">
              <Waves className="h-3 w-3" />
              {eventInfo.nightsLabel}
            </Badge>
            <Badge variant="outline" className="gap-1.5">
              <Calendar className="h-3 w-3" />
              {eventInfo.startDate} - {eventInfo.endDate}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
              {eventInfo.eventName}
            </h1>
            <p className="mt-2 text-base text-primary">
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
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--warning))]/10">
                <Sun className="h-5 w-5 text-[hsl(var(--warning))]" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Resort</p>
                <p className="font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
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
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--danger))]/10">
                <MapPin className="h-5 w-5 text-[hsl(var(--danger))]" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Địa điểm</p>
                <p className="font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                  {eventInfo.location}
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
              </div>
            </a>
          </div>

          <div className="flex flex-wrap gap-3 border-t border-border pt-5">
            <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Check-in:</span>
              <span className="text-sm font-medium text-foreground">{eventInfo.checkInTime}</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Check-out:</span>
              <span className="text-sm font-medium text-foreground">{eventInfo.checkOutTime}</span>
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
        />
        <StatsCard
          icon={BedDouble}
          label="Phòng nghỉ"
          value={eventInfo.totalRooms}
          subtext="phòng khách sạn"
        />
        <StatsCard
          icon={Calendar}
          label="Hoạt động"
          value={totalEvents}
          subtext="sự kiện trong lịch trình"
        />
        <StatsCard
          icon={Sparkles}
          label="Thời gian"
          value="2 ngày"
          subtext="trải nghiệm tuyệt vời"
        />
      </div>

      {/* Resort Package Info */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[hsl(var(--success))]">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--success))]/10">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              Gói BB bao gồm
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {resortPackage.includes.map((item, index) => {
                const isPickleball = item === 'Pickleball';
                return (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--success))]" />
                    <div className="flex-1">
                      <span className="text-muted-foreground">{item}</span>
                      {isPickleball && (
                        <Badge variant="warning" size="sm" className="ml-2">
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[hsl(var(--danger))]">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--danger))]/10">
                <XCircle className="h-5 w-5" />
              </div>
              Không bao gồm
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {resortPackage.notIncluded.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--danger))]" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* BB Service Pack PDF */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
              <FileText className="h-5 w-5 text-accent" />
            </div>
            Gói dịch vụ BB (Bed & Breakfast)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative w-full h-[500px] sm:h-[600px]">
            <iframe
              src={bbServicePackPdf}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              title="BB Service Pack PDF"
            />
          </div>
          <div className="p-4 bg-secondary/50 border-t border-border">
            <a
              href={bbServicePackPdf}
              target="_blank"
              rel="noopener noreferrer"
              download="BB-service-pack.pdf"
              className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
            >
              <Download className="h-4 w-4" />
              Tải xuống file PDF
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Google Maps */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Navigation className="h-5 w-5 text-primary" />
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
            />
          </div>
          <div className="p-4 bg-secondary/50 border-t border-border">
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
    </div>
  );
}

export { OverviewSection };

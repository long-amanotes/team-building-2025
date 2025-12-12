import { useState } from 'react';
import { BedDouble, Users, Plus, Home, Images, TreePine, Gift, Sparkles, Clock, AlertCircle, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/christmas';
import { RoomCard } from './room-card';
import { RoomImageGallery } from './room-image-gallery';
import { FoodImageGallery } from '../menu/food-image-gallery';
import { getRoomPrimaryImage, getRoomImages } from '@/data/room-images';
import { roomAssignments, roomSummary } from '@/data/rooms';
import { policies } from '@/data/event-info';
import resortMap from '@/assets/Images/Map.png';
import { cn } from '@/lib/utils';

function RoomsSection() {
  const [galleryOpen, setGalleryOpen] = useState<{ type: 'Twin' | 'Double' | null; roomId: number | null }>({
    type: null,
    roomId: null,
  });
  const [isMapGalleryOpen, setIsMapGalleryOpen] = useState(false);

  const twinRooms = roomAssignments.filter((r) => r.type === 'Twin');
  const doubleRooms = roomAssignments.filter((r) => r.type === 'Double');

  const twinImages = getRoomImages('Twin');
  const doubleImages = getRoomImages('Double');
  const twinPrimary = getRoomPrimaryImage('Twin');
  const doublePrimary = getRoomPrimaryImage('Double');

  return (
    <div className="space-y-6 overflow-visible">
      <SectionHeader
        icon={BedDouble}
        title="Xếp phòng"
        subtitle={`${roomSummary.total} phòng cho 36 người lớn và 3 trẻ em`}
        emoji="🎄"
        gradient="from-[hsl(var(--monokai-green))] to-[hsl(var(--monokai-green)/0.7)]"
      />

      {/* Policies and Resort Map */}
      <div className="grid gap-6 lg:grid-cols-2 animate-fade-in" style={{ animationDelay: '0ms' }}>
        {/* Policies Card */}
        <Card className="border-[hsl(var(--monokai-yellow))]/20 bg-gradient-to-br from-[hsl(var(--monokai-yellow))]/5 to-[hsl(var(--monokai-orange))]/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[hsl(var(--monokai-yellow))]">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--monokai-yellow))]/15">
                <AlertCircle className="h-5 w-5" />
              </div>
              Nội quy resort
              <span className="text-lg">📋</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Check-in/Check-out */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground flex items-center gap-2">
                <Clock className="h-4 w-4 text-[hsl(var(--monokai-yellow))]" />
                THỜI GIAN NHẬN VÀ TRẢ PHÒNG:
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {policies.checkInOut}
              </p>
            </div>

            {/* Notes */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-[hsl(var(--monokai-yellow))]" />
                LƯU Ý:
              </h4>
              <ul className="space-y-2">
                {policies.notes.map((note, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--monokai-yellow))]" />
                    <span className="text-muted-foreground">{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Resort Map Card */}
        <Card
          className={cn(
            "border-[hsl(var(--monokai-blue))]/20 bg-gradient-to-br from-[hsl(var(--monokai-blue))]/5 to-[hsl(var(--monokai-green))]/5",
            "cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02] hover:border-[hsl(var(--monokai-blue))]/40"
          )}
          onClick={() => setIsMapGalleryOpen(true)}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[hsl(var(--monokai-blue))]">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--monokai-blue))]/15">
                <MapPin className="h-5 w-5" />
              </div>
              Sơ đồ resort
              <span className="text-lg">🗺️</span>
              <Badge variant="outline" className="gap-1.5 text-xs border-[hsl(var(--monokai-blue))]/30 text-[hsl(var(--monokai-blue))] bg-[hsl(var(--monokai-blue))]/5 ml-auto">
                <Images className="h-3 w-3" />
                Click để xem full
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full overflow-hidden rounded-lg">
              <img
                src={resortMap}
                alt="Sơ đồ resort Asteria Mui Ne"
                className="w-full h-auto object-contain"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Room Type Showcase */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Deluxe Twin Showcase */}
        <Card className="overflow-hidden border-[hsl(var(--monokai-green))]/30 group relative">
          {/* Christmas decorations */}
          <div className="absolute top-3 left-3 z-10 text-2xl opacity-80">🎄</div>
          <div className="absolute top-3 right-3 z-10 text-xl opacity-80">⭐</div>
          <div className="absolute bottom-3 left-3 z-10 text-xl opacity-60">❄️</div>

          <div className="relative h-64 w-full overflow-hidden bg-muted">
            <img
              src={twinPrimary.src}
              alt={twinPrimary.alt}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Christmas tinted gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--monokai-green))]/80 via-black/40 to-[hsl(var(--monokai-red))]/20" />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[hsl(var(--monokai-green))]/30 backdrop-blur-sm mb-4 border border-white/20">
                <BedDouble className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                Deluxe Twin
                <Sparkles className="h-5 w-5 text-[hsl(var(--monokai-yellow))] christmas-glow" />
              </h3>
              <p className="text-sm text-white/90 mb-4">
                {twinRooms.length} phòng • {twinImages.length} ảnh
              </p>
              <Button
                onClick={() => setGalleryOpen({ type: 'Twin', roomId: 1 })}
                variant="secondary"
                className="gap-2 bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-[hsl(var(--monokai-green))]/40"
              >
                <Images className="h-4 w-4" />
                Xem hình ảnh phòng
              </Button>
            </div>
          </div>
        </Card>

        {/* Deluxe Double Showcase */}
        <Card className="overflow-hidden border-[hsl(var(--monokai-red))]/30 group relative">
          {/* Christmas decorations */}
          <div className="absolute top-3 left-3 z-10 text-2xl opacity-80">🎁</div>
          <div className="absolute top-3 right-3 z-10 text-xl opacity-80">🌟</div>
          <div className="absolute bottom-3 right-3 z-10 text-xl opacity-60">❄️</div>

          <div className="relative h-64 w-full overflow-hidden bg-muted">
            <img
              src={doublePrimary.src}
              alt={doublePrimary.alt}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Christmas tinted gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--monokai-red))]/80 via-black/40 to-[hsl(var(--monokai-green))]/20" />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[hsl(var(--monokai-red))]/30 backdrop-blur-sm mb-4 border border-white/20">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                Deluxe Double
                <Gift className="h-5 w-5 text-[hsl(var(--monokai-yellow))] christmas-light" />
              </h3>
              <p className="text-sm text-white/90 mb-4">
                {doubleRooms.length} phòng • {doubleImages.length} ảnh
              </p>
              <Button
                onClick={() => setGalleryOpen({ type: 'Double', roomId: 15 })}
                variant="secondary"
                className="gap-2 bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-[hsl(var(--monokai-red))]/40"
              >
                <Images className="h-4 w-4" />
                Xem hình ảnh phòng
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Summary Cards - Christmas themed */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card hover={false} className="animate-fade-in relative overflow-hidden group" style={{ animationDelay: '100ms' }}>
          <div className="absolute top-1 right-1 text-sm opacity-60">🏠</div>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--monokai-green))] to-[hsl(var(--monokai-green)/0.7)] shadow-lg shadow-[hsl(var(--monokai-green))]/25 group-hover:scale-110 transition-transform">
              <Home className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{roomSummary.total}</p>
              <p className="text-sm text-muted-foreground">Tổng số phòng</p>
            </div>
          </CardContent>
        </Card>

        <Card hover={false} className="animate-fade-in relative overflow-hidden group" style={{ animationDelay: '150ms' }}>
          <div className="absolute top-1 right-1 text-sm opacity-60">🎄</div>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--monokai-blue))] to-[hsl(var(--monokai-blue)/0.7)] shadow-lg shadow-[hsl(var(--monokai-blue))]/25 group-hover:scale-110 transition-transform">
              <BedDouble className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{roomSummary.twin}</p>
              <p className="text-sm text-muted-foreground">Phòng Twin</p>
            </div>
          </CardContent>
        </Card>

        <Card hover={false} className="animate-fade-in relative overflow-hidden group" style={{ animationDelay: '200ms' }}>
          <div className="absolute top-1 right-1 text-sm opacity-60">🎁</div>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--monokai-red))] to-[hsl(var(--monokai-orange))] shadow-lg shadow-[hsl(var(--monokai-red))]/25 group-hover:scale-110 transition-transform">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{roomSummary.double}</p>
              <p className="text-sm text-muted-foreground">Phòng Double (Gia đình)</p>
            </div>
          </CardContent>
        </Card>

        <Card hover={false} className="animate-fade-in relative overflow-hidden group border-[hsl(var(--monokai-yellow))]/20" style={{ animationDelay: '250ms' }}>
          <div className="absolute top-1 right-1 text-sm opacity-60">⭐</div>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--monokai-yellow))] to-[hsl(var(--monokai-orange))] shadow-lg shadow-[hsl(var(--monokai-yellow))]/25 group-hover:scale-110 transition-transform">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{roomSummary.extraBed}</p>
              <p className="text-sm text-muted-foreground">Giường phụ</p>
              <p className="text-xs text-muted-foreground/70 mt-0.5">Có thể xếp ở phòng bất kỳ</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Twin Rooms - Christmas themed */}
      <Card className="animate-fade-in border-[hsl(var(--monokai-green))]/20 relative" style={{ animationDelay: '300ms' }}>
        {/* Subtle Christmas background */}
        <div className="absolute top-0 right-0 text-6xl opacity-5 pointer-events-none">🎄</div>

        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--monokai-green))]/15">
              <TreePine className="h-5 w-5 text-[hsl(var(--monokai-green))]" />
            </div>
            <span>Phòng Twin ({twinRooms.length} phòng)</span>
            <span className="text-lg">🎄</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-visible">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4">
            {twinRooms.map((room, index) => (
              <div
                key={room.roomId}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <RoomCard room={room} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Family/Double Rooms - Christmas themed */}
      <Card className="border-[hsl(var(--monokai-red))]/20 animate-fade-in relative" style={{ animationDelay: '400ms' }}>
        {/* Subtle Christmas background */}
        <div className="absolute top-0 right-0 text-6xl opacity-5 pointer-events-none">🎁</div>

        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--monokai-red))]/15">
              <Gift className="h-5 w-5 text-[hsl(var(--monokai-red))]" />
            </div>
            <span>Phòng Gia đình ({doubleRooms.length} phòng)</span>
            <span className="text-lg">🎁</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-visible">
          <div className="grid gap-6 sm:grid-cols-2 py-4">
            {doubleRooms.map((room, index) => (
              <div
                key={room.roomId}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <RoomCard room={room} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Image Gallery Modals */}
      {galleryOpen.type && galleryOpen.roomId && (
        <RoomImageGallery
          roomType={galleryOpen.type}
          roomId={galleryOpen.roomId}
          isOpen={true}
          onClose={() => setGalleryOpen({ type: null, roomId: null })}
        />
      )}

      {/* Resort Map Gallery Modal */}
      {isMapGalleryOpen && (
        <FoodImageGallery
          images={[resortMap]}
          restaurantName="Sơ đồ resort Asteria Mui Ne"
          isOpen={isMapGalleryOpen}
          onClose={() => setIsMapGalleryOpen(false)}
        />
      )}
    </div>
  );
}

export { RoomsSection };

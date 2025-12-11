import { useState } from 'react';
import { BedDouble, Users, Plus, Home, Images } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/christmas';
import { RoomCard } from './room-card';
import { RoomImageGallery } from './room-image-gallery';
import { getRoomPrimaryImage, getRoomImages } from '@/data/room-images';
import { roomAssignments, roomSummary } from '@/data/rooms';

function RoomsSection() {
  const [galleryOpen, setGalleryOpen] = useState<{ type: 'Twin' | 'Double' | null; roomId: number | null }>({
    type: null,
    roomId: null,
  });

  const twinRooms = roomAssignments.filter((r) => r.type === 'Twin');
  const doubleRooms = roomAssignments.filter((r) => r.type === 'Double');

  const twinImages = getRoomImages('Twin');
  const doubleImages = getRoomImages('Double');
  const twinPrimary = getRoomPrimaryImage('Twin');
  const doublePrimary = getRoomPrimaryImage('Double');

  return (
    <div className="space-y-6">
      <SectionHeader
        icon={BedDouble}
        title="Xếp phòng"
        subtitle={`${roomSummary.total} phòng cho ${roomSummary.twin * 2 + roomSummary.double * 2 + roomSummary.extraBed} người`}
        emoji="🏨"
        gradient="from-amber-500 to-orange-500"
      />

      {/* Room Type Showcase */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Deluxe Twin Showcase */}
        <Card className="overflow-hidden border-primary/20">
          <div className="relative h-64 w-full overflow-hidden bg-muted">
            <img
              src={twinPrimary.src}
              alt={twinPrimary.alt}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 backdrop-blur-sm mb-4">
                <BedDouble className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Deluxe Twin</h3>
              <p className="text-sm text-white/90 mb-4">
                {twinRooms.length} phòng • {twinImages.length} ảnh
              </p>
              <Button
                onClick={() => setGalleryOpen({ type: 'Twin', roomId: 1 })}
                variant="secondary"
                className="gap-2 bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
              >
                <Images className="h-4 w-4" />
                Xem hình ảnh phòng
              </Button>
            </div>
          </div>
        </Card>

        {/* Deluxe Double Showcase */}
        <Card className="overflow-hidden border-amber-500/20">
          <div className="relative h-64 w-full overflow-hidden bg-muted">
            <img
              src={doublePrimary.src}
              alt={doublePrimary.alt}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/20 backdrop-blur-sm mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Deluxe Double</h3>
              <p className="text-sm text-white/90 mb-4">
                {doubleRooms.length} phòng • {doubleImages.length} ảnh
              </p>
              <Button
                onClick={() => setGalleryOpen({ type: 'Double', roomId: 15 })}
                variant="secondary"
                className="gap-2 bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
              >
                <Images className="h-4 w-4" />
                Xem hình ảnh phòng
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card hover={false} className="animate-fade-in" style={{ animationDelay: '0ms' }}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-sky-500 shadow-lg shadow-primary/25">
              <Home className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{roomSummary.total}</p>
              <p className="text-sm text-muted-foreground">Tổng số phòng</p>
            </div>
          </CardContent>
        </Card>

        <Card hover={false} className="animate-fade-in" style={{ animationDelay: '50ms' }}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-500 shadow-lg shadow-sky-500/25">
              <BedDouble className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{roomSummary.twin}</p>
              <p className="text-sm text-muted-foreground">Phòng Twin</p>
            </div>
          </CardContent>
        </Card>

        <Card hover={false} className="animate-fade-in" style={{ animationDelay: '100ms' }}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/25">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{roomSummary.double}</p>
              <p className="text-sm text-muted-foreground">Phòng Double (Gia đình)</p>
            </div>
          </CardContent>
        </Card>

        <Card hover={false} className="animate-fade-in border-emerald-500/20" style={{ animationDelay: '150ms' }}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
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

      {/* Twin Rooms */}
      <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
              <BedDouble className="h-5 w-5 text-primary" />
            </div>
            Phòng Twin ({twinRooms.length} phòng)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

      {/* Family/Double Rooms */}
      <Card className="border-amber-500/20 animate-fade-in" style={{ animationDelay: '300ms' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15">
              <Users className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            Phòng Gia đình ({doubleRooms.length} phòng)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
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
    </div>
  );
}

export { RoomsSection };

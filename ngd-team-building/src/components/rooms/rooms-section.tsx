import { BedDouble, Users, Plus, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RoomCard } from './room-card';
import { roomAssignments, roomSummary } from '@/data/rooms';

function RoomsSection() {
  const twinRooms = roomAssignments.filter((r) => r.type === 'Twin');
  const doubleRooms = roomAssignments.filter((r) => r.type === 'Double');

  return (
    <div className="space-y-6">
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

        <Card hover={false} className="animate-fade-in" style={{ animationDelay: '150ms' }}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{roomSummary.extraBed}</p>
              <p className="text-sm text-muted-foreground">Giường phụ</p>
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
    </div>
  );
}

export { RoomsSection };

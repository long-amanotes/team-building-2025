import { useState, useMemo } from 'react';
import { Search, Users, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ParticipantCard } from './participant-card';
import { cn } from '@/lib/utils';
import {
  participants,
  participantsByDivision,
  divisionOrder,
} from '@/data/participants';

// Updated division colors for light/dark mode support
const divisionColorClasses: Record<string, string> = {
  Management: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/25',
  Core: 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/25',
  Rush: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25',
  Design: 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/25',
  Artist: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/25',
  Music: 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/25',
};

const divisionDotColors: Record<string, string> = {
  Management: 'bg-amber-500',
  Core: 'bg-cyan-500',
  Rush: 'bg-emerald-500',
  Design: 'bg-purple-500',
  Artist: 'bg-rose-500',
  Music: 'bg-blue-500',
};

function ParticipantsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);

  const filteredParticipants = useMemo(() => {
    let result = participants;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.designation.toLowerCase().includes(query) ||
          p.email.toLowerCase().includes(query)
      );
    }

    if (selectedDivision) {
      result = result.filter((p) => p.division === selectedDivision);
    }

    return result;
  }, [searchQuery, selectedDivision]);

  const groupedFiltered = useMemo(() => {
    if (selectedDivision) {
      return { [selectedDivision]: filteredParticipants };
    }

    return filteredParticipants.reduce((acc, p) => {
      if (!acc[p.division]) acc[p.division] = [];
      acc[p.division].push(p);
      return acc;
    }, {} as Record<string, typeof participants>);
  }, [filteredParticipants, selectedDivision]);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex flex-wrap items-center gap-4">
        <Card className="flex-1 min-w-[160px]" hover={false}>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-sky-500 shadow-lg shadow-primary/25">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{participants.length}</p>
              <p className="text-sm text-muted-foreground">Thành viên</p>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1 min-w-[160px]" hover={false}>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{divisionOrder.length}</p>
              <p className="text-sm text-muted-foreground">Teams</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter */}
      <Card hover={false}>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, chức vụ, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  'w-full rounded-xl border border-border bg-background',
                  'py-2.5 pl-10 pr-4 text-sm text-foreground',
                  'placeholder:text-muted-foreground',
                  'focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20',
                  'transition-all duration-200'
                )}
              />
            </div>

            {/* Team Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedDivision(null)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200',
                  selectedDivision === null
                    ? 'bg-gradient-to-r from-primary to-sky-500 text-white shadow-lg shadow-primary/20'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                )}
              >
                Tất cả
              </button>
              {divisionOrder.map((division) => (
                <button
                  key={division}
                  onClick={() =>
                    setSelectedDivision(
                      selectedDivision === division ? null : division
                    )
                  }
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200',
                    selectedDivision === division
                      ? divisionColorClasses[division]
                      : 'bg-secondary text-muted-foreground hover:text-foreground'
                  )}
                >
                  {division} ({participantsByDivision[division]?.length || 0})
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      {searchQuery && (
        <p className="text-sm text-muted-foreground animate-fade-in">
          Tìm thấy <span className="font-semibold text-foreground">{filteredParticipants.length}</span>{' '}
          kết quả
        </p>
      )}

      {/* Grouped List */}
      <div className="space-y-6">
        {divisionOrder.map((division) => {
          const divisionParticipants = groupedFiltered[division];
          if (!divisionParticipants?.length) return null;

          return (
            <Card key={division} className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={cn('h-3 w-3 rounded-full', divisionDotColors[division])} />
                    <span className="text-foreground">{division}</span>
                  </div>
                  <Badge variant="secondary">{divisionParticipants.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {divisionParticipants.map((p, index) => (
                    <div
                      key={p.employeeId}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <ParticipantCard
                        participant={p}
                        divisionColor={divisionColorClasses[division]}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export { ParticipantsSection };

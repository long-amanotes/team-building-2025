# Cursor Prompt: NGD Team Building 2025 Dashboard

## Project Overview

Build a modern, responsive React dashboard for NGD Team Building 2025 event management. The dashboard should display event information, schedule, room assignments, participant details, budget tracking, and dining plans.

---

## Tech Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI + Radix UI
- **State Management**: Zustand (for global state)
- **Form Validation**: Zod + React Hook Form
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Data Fetching**: TanStack Query (if needed for API)

---

## Project Structure

```
src/
├── app/
│   └── layout.tsx
├── components/
│   ├── ui/                    # Shadcn UI components
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   ├── footer.tsx
│   │   └── tab-navigation.tsx
│   ├── dashboard/
│   │   ├── overview-section.tsx
│   │   ├── stats-card.tsx
│   │   └── quick-summary.tsx
│   ├── schedule/
│   │   ├── schedule-section.tsx
│   │   ├── day-card.tsx
│   │   ├── timeline-event.tsx
│   │   └── event-item.tsx
│   ├── rooms/
│   │   ├── rooms-section.tsx
│   │   ├── room-card.tsx
│   │   └── room-assignment.tsx
│   ├── participants/
│   │   ├── participants-section.tsx
│   │   ├── participant-card.tsx
│   │   └── team-group.tsx
│   ├── menu/
│   │   ├── menu-section.tsx
│   │   ├── meal-card.tsx
│   │   └── food-item.tsx
│   ├── transport/
│   │   ├── transport-section.tsx
│   │   └── vehicle-card.tsx
│   └── budget/
│       ├── budget-section.tsx
│       ├── expense-row.tsx
│       └── payment-info.tsx
├── hooks/
│   ├── use-tab-navigation.ts
│   ├── use-participants.ts
│   └── use-budget-calculator.ts
├── lib/
│   ├── utils.ts
│   └── cn.ts
├── data/
│   ├── event-info.ts
│   ├── schedule.ts
│   ├── rooms.ts
│   ├── participants.ts
│   ├── menu.ts
│   ├── transport.ts
│   └── budget.ts
├── types/
│   ├── event.types.ts
│   ├── schedule.types.ts
│   ├── room.types.ts
│   ├── participant.types.ts
│   ├── menu.types.ts
│   ├── transport.types.ts
│   └── budget.types.ts
├── constants/
│   └── index.ts
└── store/
    └── app-store.ts
```

---

## Data Models (TypeScript Interfaces)

```typescript
// types/event.types.ts
interface EventInfo {
  eventName: string;
  resortName: string;
  location: string;
  startDate: string;
  endDate: string;
  nightsLabel: string;
  totalPax: number;
  totalRooms: number;
  themeTagline: string;
  checkInTime: string;
  checkOutTime: string;
}

// types/schedule.types.ts
interface ScheduleEvent {
  time: string;
  title: string;
  description: string;
  location: string;
  icon: string;
}

interface ScheduleDay {
  id: string;
  date: string;
  label: string;
  period: 'SÁNG' | 'TRƯA' | 'CHIỀU' | 'TỐI';
  events: ScheduleEvent[];
}

// types/room.types.ts
type RoomType = 'Twin' | 'Double';

interface RoomAssignment {
  roomId: number;
  type: RoomType;
  occupants: string[];
  special?: string; // e.g., "1 extra bed"
}

// types/participant.types.ts
interface Participant {
  employeeId: string;
  name: string;
  email: string;
  department: string;
  division: string;
  designation: string;
  reportingManager: string;
}

// types/menu.types.ts
interface MenuItem {
  name: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
  note?: string;
}

interface Meal {
  id: string;
  name: string;
  restaurant: string;
  address: string;
  date: string;
  time: string;
  items: MenuItem[];
  totalCost: number;
  perPaxCost: number;
}

// types/transport.types.ts
interface Vehicle {
  id: string;
  name: string;
  capacity: number;
  note?: string;
  isMain: boolean;
}

// types/budget.types.ts
interface BudgetItem {
  id: number;
  description: string;
  unitPrice: number;
  quantity: number;
  vat: number;
  total: number;
  note?: string;
}

interface BankInfo {
  accountName: string;
  bankName: string;
  accountNumber: string;
}
```

---

## Event Data (from Excel)

```typescript
// data/event-info.ts
export const eventInfo: EventInfo = {
  eventName: "NGD Team Building 2025",
  resortName: "Asteria Mui Ne Resort",
  location: "Mũi Né, Phan Thiết",
  startDate: "18/12/2025",
  endDate: "19/12/2025",
  nightsLabel: "2 ngày 1 đêm",
  totalPax: 34,
  totalRooms: 18,
  themeTagline: "Gió biển mát, team chill xả stress",
  checkInTime: "14:30",
  checkOutTime: "12:00",
};

// data/participants.ts
export const participants: Participant[] = [
  {
    employeeId: "AMA00001",
    name: "Nguyễn Việt Thắng",
    email: "thang.nguyen@amanotes.com",
    department: "New Games",
    division: "Management",
    designation: "Unit Manager",
    reportingManager: "Silver Nguyễn"
  },
  // ... 34 participants from Excel
];

// data/schedule.ts
export const schedule: ScheduleDay[] = [
  {
    id: "day1",
    date: "18/12/2025",
    label: "Ngày đi",
    events: [
      {
        time: "08:30 - 09:00",
        title: "Tập trung tại văn phòng",
        description: "Team có mặt từ 08:30 tại Amanotes Office. Tập trung để lên xe, 09:00 xuất phát",
        location: "Amanotes Office - 141-143 Nguyễn Cơ Thạch",
        icon: "Users"
      },
      {
        time: "09:00 - 12:00",
        title: "Di chuyển đến Mũi Né",
        description: "Di chuyển đến Mũi Né. Trên đường sẽ dừng chân ăn trưa tại Phan Thiết",
        location: "--- di chuyển ---",
        icon: "Bus"
      },
      // ... more events
    ]
  },
  // ... day 2
];

// data/rooms.ts
export const roomAssignments: RoomAssignment[] = [
  { roomId: 1, type: "Twin", occupants: ["Hoàng Mike", "M4"] },
  { roomId: 2, type: "Twin", occupants: ["Hải Đăng", "Thái NB"] },
  { roomId: 3, type: "Twin", occupants: ["Hồ Ngọc Minh", "Nguyễn Đăng Hải"] },
  // ... 18 rooms total (16 Twin, 2 Double)
  { roomId: 15, type: "Double", occupants: ["Vũ Hoàng", "Vợ", "Con"] },
  { roomId: 18, type: "Double", occupants: ["Tha Hồ", "Vợ", "Con 1", "Con 2"], special: "1 extra bed" },
];

// data/menu.ts - Dinner Day 18 at Thịnh Phát
export const dinnerMenu: Meal = {
  id: "dinner-18",
  name: "Ăn tối ngày 18",
  restaurant: "Thịnh Phát quán",
  address: "91 Huỳnh Tấn Phát, Khu phố 15, Thành phố Phan Thiết",
  date: "18/12/2025",
  time: "18:30 - 21:00",
  items: [
    { name: "Cơm chiên hải sản", quantity: 3, pricePerUnit: 170000, total: 510000 },
    { name: "Mì xào bò", quantity: 3, pricePerUnit: 150000, total: 450000 },
    { name: "Mực tươi hấp gừng", quantity: 6, pricePerUnit: 190000, total: 1140000 },
    { name: "Lẩu hải sản", quantity: 2, pricePerUnit: 380000, total: 760000 },
    { name: "Lẩu cá mú", quantity: 2, pricePerUnit: 380000, total: 760000 },
    { name: "Sò điệp nướng mỡ hành", quantity: 6, pricePerUnit: 150000, total: 900000 },
    { name: "Cá đục nướng", quantity: 6, pricePerUnit: 220000, total: 1320000 },
    { name: "Bạch tuột nướng", quantity: 6, pricePerUnit: 190000, total: 1140000 },
    { name: "Tôm sú", quantity: 2, pricePerUnit: 650000, total: 1300000, note: "Theo thời giá (kg)" },
    { name: "Bia Tiger Bạc", quantity: 72, pricePerUnit: 25000, total: 1800000 },
    { name: "Nước ngọt lộn xộn", quantity: 20, pricePerUnit: 18000, total: 360000 },
  ],
  totalCost: 10440000,
  perPaxCost: 290000
};

// data/budget.ts
export const budgetItems: BudgetItem[] = [
  { id: 1, description: "Xe 29 chỗ khứ hồi SG - MN", unitPrice: 10000000, quantity: 1, vat: 800000, total: 10800000, note: "Đã bao gồm full phí + tài xế" },
  { id: 2, description: "Resort - gói BB", unitPrice: 1440000, quantity: 18, vat: 0, total: 25920000, note: "Đã bao gồm thuế, phí" },
  { id: 3, description: "1 giường phụ", unitPrice: 1010000, quantity: 1, vat: 0, total: 1010000 },
  { id: 4, description: "Ăn trưa 18", unitPrice: 150000, quantity: 40, vat: 0, total: 6000000 },
  { id: 5, description: "Ăn tối 18", unitPrice: 290000, quantity: 35, vat: 0, total: 10150000 },
  { id: 6, description: "Ăn trưa 19", unitPrice: 150000, quantity: 40, vat: 0, total: 6000000 },
];

export const budgetSummary = {
  subtotal: 59880000,
  contingency: 2994000, // 5%
  total: 62874000,
  ngdHeadcount: 34,
  ngdBudget: 44536800,
  additionalCost: 15650533,
  additionalPerPax: 460310
};

export const bankInfo: BankInfo = {
  accountName: "Công ty TNHH Đầu Tư Bảo Thạch",
  bankName: "Ngân hàng TMCP Quân Đội - Chi nhánh Khánh Hòa",
  accountNumber: "3163436017463"
};
```

---

## Component Requirements

### 1. Overview Section
- Hero card with event name, resort, dates
- Stats cards: Total participants (34), Rooms (18), Schedule events count
- Quick summary with key highlights
- Resort amenities included in package (Bed & Breakfast)

### 2. Schedule Section
- Two-day timeline view (Day 1: 18/12, Day 2: 19/12)
- Time periods: SÁNG, TRƯA, CHIỀU, TỐI
- Each event shows: time, title, description, location, icon
- Visual timeline with connecting lines
- Color-coded by day

### 3. Room Assignment Section
- Grid of room cards (18 rooms)
- Room type badges (Twin/Double)
- Occupant names with avatars
- Special notes (family rooms, extra bed)
- Summary: 16 Twin, 2 Double, 1 extra bed

### 4. Participants Section
- Filterable/searchable participant list
- Group by Division: Management, Rush, Core, Artist, Design, Music
- Show: Name, Role, Email, Reporting Manager
- Team hierarchy visualization

### 5. Menu Section
- Dinner card (Thịnh Phát - Day 18)
- Lunch card (Phố Mũi Né - Day 19)
- Menu items with quantities and prices
- Per-person cost calculation
- Restaurant addresses with map link option

### 6. Transport Section
- Main bus card (29 seats)
- Private cars section (anh Thắng: 4, anh Mike: 4, anh Vũ: 1)
- Departure/Return times
- Meeting point info

### 7. Budget Section
- Expense table with all line items
- Summary cards: Subtotal, Contingency (5%), Total
- Per-person contribution calculation
- Bank transfer info card (copyable)
- Visual budget breakdown chart

---

## Design Guidelines

### Color Palette (Ocean Theme)
```css
/* Primary */
--primary: hsl(198, 93%, 60%);      /* Cyan */
--primary-foreground: hsl(222, 47%, 11%);

/* Backgrounds */
--background: hsl(222, 84%, 5%);    /* Deep navy */
--card: hsl(217, 33%, 12%);         /* Slate */

/* Accents */
--accent-emerald: hsl(160, 84%, 39%);
--accent-amber: hsl(45, 93%, 47%);
--accent-rose: hsl(350, 89%, 60%);

/* Gradients */
--gradient-day1: from-sky-400 to-cyan-500;
--gradient-day2: from-teal-400 to-emerald-500;
```

### Typography
- Headings: Bold, varied sizes (text-2xl to text-4xl)
- Body: Regular, text-sm to text-base
- Labels: Uppercase, tracking-wide, text-xs
- Vietnamese text support

### Spacing & Layout
- Mobile-first responsive design
- Card-based layout with rounded corners (rounded-2xl, rounded-3xl)
- Consistent padding (p-4 to p-6)
- Grid layouts for cards (1 col mobile, 2-3 cols desktop)

### Animations
- Subtle fade-in animations for sections
- Hover effects on interactive cards
- Tab switching transitions

---

## Implementation Guidelines

### Code Style (Cursor Rules)
1. **Functional Components**: Use `function` keyword, not arrow functions for components
2. **TypeScript**: Prefer interfaces over types, avoid enums
3. **Naming**:
   - Components: PascalCase (e.g., `RoomCard`)
   - Files: kebab-case (e.g., `room-card.tsx`)
   - Event handlers: prefix with `handle` (e.g., `handleTabChange`)
   - Booleans: prefix with `is/has/should` (e.g., `isLoading`)
4. **Early Returns**: Handle edge cases first
5. **No Classes**: Functional/declarative patterns only
6. **Tailwind**: Utility-first, no custom CSS unless necessary
7. **Accessibility**: ARIA labels, keyboard navigation, semantic HTML

### SOLID Principles
- **S**: Each component has single responsibility
- **O**: Components are open for extension (via props/composition)
- **L**: Child components can substitute parent expectations
- **I**: Interfaces are specific, not monolithic
- **D**: Components depend on abstractions (props interfaces)

### Design Patterns
- **Composition**: Build complex UIs from simple components
- **Container/Presentational**: Separate data logic from rendering
- **Custom Hooks**: Extract reusable logic
- **Provider Pattern**: For theme/global state (if needed)

---

## Feature Priorities

### Phase 1 (MVP)
- [ ] Tab navigation with 6 sections
- [ ] Overview dashboard
- [ ] Schedule timeline
- [ ] Room assignments grid
- [ ] Basic responsive design

### Phase 2
- [ ] Participants list with filtering
- [ ] Menu details with pricing
- [ ] Budget table and summary
- [ ] Transport info

### Phase 3 (Enhancements)
- [ ] Search functionality
- [ ] Export to PDF
- [ ] Dark/Light mode toggle
- [ ] Print-friendly styles
- [ ] Copy-to-clipboard for bank info

---

## Sample Component Structure

```tsx
// components/rooms/room-card.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Bed } from "lucide-react";
import type { RoomAssignment } from "@/types/room.types";
import { cn } from "@/lib/utils";

interface RoomCardProps {
  room: RoomAssignment;
  className?: string;
}

function RoomCard({ room, className }: RoomCardProps) {
  const isFamily = room.type === "Double";
  const hasSpecial = Boolean(room.special);

  return (
    <Card className={cn(
      "group transition-all hover:-translate-y-1 hover:border-cyan-400/70",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500">
            <Bed className="h-4 w-4 text-slate-950" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Phòng</p>
            <p className="text-sm font-semibold">#{room.roomId}</p>
          </div>
        </div>
        <Badge variant={isFamily ? "secondary" : "outline"}>
          {room.type}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-sky-300" />
          <span>{room.occupants.join(" • ")}</span>
        </div>
        {hasSpecial && (
          <div className="flex items-center gap-2 text-amber-200">
            <span className="text-xs font-medium">{room.special}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { RoomCard };
```

---

## Getting Started Commands

```bash
# Create project
npm create vite@latest ngd-team-building -- --template react-ts

# Install dependencies
npm install tailwindcss postcss autoprefixer
npm install @radix-ui/react-tabs @radix-ui/react-dialog
npm install lucide-react
npm install zustand
npm install date-fns
npm install clsx tailwind-merge
npm install class-variance-authority

# Add Shadcn UI
npx shadcn-ui@latest init
npx shadcn-ui@latest add card badge button tabs

# Run development
npm run dev
```

---

## Notes

- All data is static (no API calls needed for MVP)
- Vietnamese language throughout the UI
- Mobile-responsive is critical (team may check on phones)
- Keep bundle size minimal for fast loading
- Consider PWA for offline access (optional)

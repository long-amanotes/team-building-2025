// Event Info Types
export interface EventInfo {
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

export interface ResortPackage {
  name: string;
  description: string;
  pricePerRoom: number;
  pricePerPax: number;
  includes: string[];
  notIncluded: string[];
}

// Participant Types
export interface Participant {
  employeeId: string;
  name: string;
  email: string;
  department: string;
  division: string;
  designation: string;
  reportingManager: string;
}

// Room Types
export type RoomType = 'Twin' | 'Double';

export interface RoomAssignment {
  roomId: number;
  type: RoomType;
  occupants: string[];
  special?: string;
}

export interface RoomSummary {
  total: number;
  twin: number;
  double: number;
  extraBed: number;
  familyRooms: number;
}

// Schedule Types
export type TimePeriod = 'SÁNG' | 'TRƯA' | 'CHIỀU' | 'TỐI';

export interface ScheduleEvent {
  time: string;
  title: string;
  description: string;
  location: string;
  icon: string;
  period: TimePeriod;
}

export interface ScheduleDay {
  id: string;
  date: string;
  label: string;
  events: ScheduleEvent[];
}

// Menu Types
export interface MenuItem {
  name: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
  note?: string;
}

export interface Meal {
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

// Transport Types
export interface Vehicle {
  id: string;
  name: string;
  capacity: number;
  note?: string;
  isMain: boolean;
}

export interface TransportInfo {
  meetPoint: string;
  gatherTime: string;
  departTime: string;
  returnTime: string;
  busCost: number;
  busCostNote: string;
}

// Budget Types
export interface BudgetItem {
  id: number;
  description: string;
  unitPrice: number;
  quantity: number;
  vat: number;
  total: number;
  note?: string;
}

export interface BudgetSummary {
  subtotal: number;
  contingencyRate: number;
  contingency: number;
  total: number;
  ngdHeadcount: number;
  ngdBudget: number;
  totalExcludeFamily: number;
  additionalCost: number;
  additionalPerPax: number;
  familyMemberCount: number;
  perPaxFamily: number;
  familyTotal: number;
}

export interface BankInfo {
  accountName: string;
  bankName: string;
  accountNumber: string;
}

// Tab Types
export type TabId = 'overview' | 'schedule' | 'rooms' | 'participants' | 'menu' | 'transport' | 'budget';

export interface TabItem {
  id: TabId;
  label: string;
  icon: string;
}

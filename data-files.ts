// ===========================================
// data/participants.ts
// ===========================================

export interface Participant {
  employeeId: string;
  name: string;
  email: string;
  department: string;
  division: string;
  designation: string;
  reportingManager: string;
}

export const participants: Participant[] = [
  { employeeId: "AMA00001", name: "Nguyễn Việt Thắng", email: "thang.nguyen@amanotes.com", department: "New Games", division: "Management", designation: "Unit Manager", reportingManager: "Silver Nguyễn" },
  { employeeId: "AMA10003", name: "Đỗ Tiến Sỹ", email: "sy.do@amanotes.com", department: "New Games", division: "Rush", designation: "Tech Lead", reportingManager: "Nguyễn Việt Thắng" },
  { employeeId: "AMA10013", name: "Đinh Quốc Tuấn", email: "tuan.dinh@amanotes.com", department: "New Games", division: "Core", designation: "QC Specialist", reportingManager: "Đỗ Thị Tuyết Ngân" },
  { employeeId: "AMA10024", name: "Hoàng Trần Anh Vũ", email: "vu.hoang@amanotes.com", department: "New Games", division: "Artist", designation: "Artist Lead", reportingManager: "Nguyễn Việt Thắng" },
  { employeeId: "AMA10042", name: "Dương Đặng Đức Lợi", email: "loi.ddd@amanotes.com", department: "New Games", division: "Rush", designation: "Unity Developer", reportingManager: "Đỗ Tiến Sỹ" },
  { employeeId: "AMA10048", name: "Hồ Ngọc Minh", email: "minh.hn@amanotes.com", department: "New Games", division: "Rush", designation: "Unity Developer", reportingManager: "Đỗ Tiến Sỹ" },
  { employeeId: "AMA10060", name: "Phạm Nguyễn Phương Anh", email: "anh.pham@amanotes.com", department: "New Games", division: "Music", designation: "Music Specialist", reportingManager: "Ngô Hoàng Long" },
  { employeeId: "AMA10277", name: "Ngô Hoàng Long", email: "long.nh@amanotes.com", department: "New Games", division: "Music", designation: "Music Lead", reportingManager: "Nguyễn Việt Thắng" },
  { employeeId: "AMA10324", name: "Nguyễn Ngọc Luân", email: "luan.nn@amanotes.com", department: "New Games", division: "Music", designation: "Music Specialist", reportingManager: "Ngô Hoàng Long" },
  { employeeId: "AMA10427", name: "Huỳnh Trần Bảo Minh", email: "minh.htb@amanotes.com", department: "New Games", division: "Rush", designation: "Product Owner", reportingManager: "Lê Duy Luật" },
  { employeeId: "AMA10443", name: "Nguyễn Minh Sơn", email: "son.nm@amanotes.com", department: "New Games", division: "Rush", designation: "QC Specialist", reportingManager: "Đỗ Tiến Sỹ" },
  { employeeId: "AMA10486", name: "Triệu Minh Nhơn", email: "nhon.tm@amanotes.com", department: "New Games", division: "Artist", designation: "Artist Expert", reportingManager: "Hoàng Trần Anh Vũ" },
  { employeeId: "AMA10532", name: "Tăng Hải Quốc", email: "quoc.th@amanotes.com", department: "New Games", division: "Rush", designation: "QC Specialist", reportingManager: "Đỗ Tiến Sỹ" },
  { employeeId: "AMA10544", name: "Hồ Văn Thả", email: "tha.hv@amanotes.com", department: "New Games", division: "Artist", designation: "Artist", reportingManager: "Hoàng Trần Anh Vũ" },
  { employeeId: "AMA10570", name: "Nguyễn Đăng Hải", email: "hai.nd@amanotes.com", department: "New Games", division: "Rush", designation: "Unity Developer", reportingManager: "Đỗ Tiến Sỹ" },
  { employeeId: "AMA10584", name: "Phan Đình Thanh Trúc", email: "truc.pdt@amanotes.com", department: "New Games", division: "Design", designation: "Game Designer", reportingManager: "Lê Hải Đăng" },
  { employeeId: "AMA10594", name: "Châu Thục Nghi", email: "nghi.ct@amanotes.com", department: "New Games", division: "Core", designation: "Product Owner", reportingManager: "Vũ Hoàng Mai" },
  { employeeId: "AMA10595", name: "Trần Thị Kim Tuyến", email: "tuyen.ttk@amanotes.com", department: "New Games", division: "Core", designation: "QC Specialist", reportingManager: "Đỗ Thị Tuyết Ngân" },
  { employeeId: "AMA10603", name: "Nguyễn Hoàng Nam", email: "nam.nh@amanotes.com", department: "New Games", division: "Design", designation: "Music & Level Designer", reportingManager: "Lê Hải Đăng" },
  { employeeId: "AMA10604", name: "Huỳnh Thị Thảo Nhi", email: "nhi.htt@amanotes.com", department: "New Games", division: "Artist", designation: "Artist", reportingManager: "Hoàng Trần Anh Vũ" },
  { employeeId: "AMA10610", name: "Dương Lê Công Thuần", email: "thuan.dlc@amanotes.com", department: "New Games", division: "Music", designation: "Music Specialist", reportingManager: "Ngô Hoàng Long" },
  { employeeId: "AMA10612", name: "Nguyễn Hữu Đức", email: "duc.nh@amanotes.com", department: "New Games", division: "Core", designation: "Product Owner", reportingManager: "Vũ Hoàng Mai" },
  { employeeId: "AMA10622", name: "Nguyễn Bửu Thái", email: "thai.nb@amanotes.com", department: "New Games", division: "Design", designation: "Game Designer", reportingManager: "Lê Hải Đăng" },
  { employeeId: "AMA10634", name: "Lê Hải Đăng", email: "dang.lh@amanotes.com", department: "New Games", division: "Design", designation: "Acting Game Designer Lead", reportingManager: "Nguyễn Việt Thắng" },
  { employeeId: "AMA10639", name: "Lê Nguyễn Thành Long", email: "long.lnt@amanotes.com", department: "New Games", division: "Core", designation: "Unity Developer", reportingManager: "Đỗ Thị Tuyết Ngân" },
  { employeeId: "AMA10642", name: "Tăng Hoàng Anh", email: "anh.th@amanotes.com", department: "New Games", division: "Core", designation: "Unity Developer", reportingManager: "Đỗ Thị Tuyết Ngân" },
  { employeeId: "AMA10644", name: "Nguyễn Kim Ngân", email: "ngan.nk@amanotes.com", department: "New Games", division: "Artist", designation: "Artist", reportingManager: "Hoàng Trần Anh Vũ" },
  { employeeId: "AMA10650", name: "Đặng Nhật Anh", email: "anh.dn@amanotes.com", department: "New Games", division: "Rush", designation: "Unity Developer", reportingManager: "Đỗ Tiến Sỹ" },
  { employeeId: "AMA10652", name: "Đỗ Thị Tuyết Ngân", email: "ngan.dtt@amanotes.com", department: "New Games", division: "Core", designation: "Tech Lead", reportingManager: "Vũ Hoàng Mai" },
  { employeeId: "AMA10653", name: "Nguyễn Tiến Tâm", email: "tam.nt2@amanotes.com", department: "New Games", division: "Core", designation: "Unity Developer", reportingManager: "Đỗ Thị Tuyết Ngân" },
  { employeeId: "AMA10663", name: "Vũ Hoàng Mai", email: "mai.vu@amanotes.com", department: "New Games", division: "Core", designation: "Acting Unit Manager", reportingManager: "Nguyễn Việt Thắng" },
  { employeeId: "AMA10675", name: "Phạm Phúc Thịnh", email: "thinh.pp@amanotes.com", department: "New Games", division: "Core", designation: "Unity Developer", reportingManager: "Đỗ Thị Tuyết Ngân" },
  { employeeId: "AMA10679", name: "Nguyễn Trần Như Hạ", email: "ha.ntn@amanotes.com", department: "New Games", division: "Artist", designation: "Artist", reportingManager: "Hoàng Trần Anh Vũ" },
  { employeeId: "AMA10680", name: "Phạm Hoàng Phúc", email: "phuc.ph@amanotes.com", department: "New Games", division: "Artist", designation: "Artist", reportingManager: "Hoàng Trần Anh Vũ" },
  { employeeId: "AMA10681", name: "Mohammad Reza Hassanzadeh", email: "reza@amanotes.com", department: "New Games", division: "Core", designation: "Game Expert", reportingManager: "Nguyễn Việt Thắng" },
  { employeeId: "AMA10554", name: "Lê Duy Luật", email: "luat.ld@amanotes.com", department: "New Games", division: "Rush", designation: "Acting Product Lead", reportingManager: "Nguyễn Việt Thắng" },
];

// Group participants by division
export const participantsByDivision = participants.reduce((acc, p) => {
  if (!acc[p.division]) acc[p.division] = [];
  acc[p.division].push(p);
  return acc;
}, {} as Record<string, Participant[]>);

// ===========================================
// data/rooms.ts
// ===========================================

export type RoomType = 'Twin' | 'Double';

export interface RoomAssignment {
  roomId: number;
  type: RoomType;
  occupants: string[];
  special?: string;
}

export const roomAssignments: RoomAssignment[] = [
  { roomId: 1, type: "Twin", occupants: ["Hoàng Mike", "M4"] },
  { roomId: 2, type: "Twin", occupants: ["Hải Đăng", "Thái NB"] },
  { roomId: 3, type: "Twin", occupants: ["Hồ Ngọc Minh", "Nguyễn Đăng Hải"] },
  { roomId: 4, type: "Twin", occupants: ["Thuỵ Tuyến", "Kayen"] },
  { roomId: 5, type: "Twin", occupants: ["Thục Nghi", "Hoàng Anh"] },
  { roomId: 6, type: "Twin", occupants: ["Ngân Đỗ", "Trúc Gidi"] },
  { roomId: 7, type: "Twin", occupants: ["Nhi Kidz", "Như Hạ"] },
  { roomId: 8, type: "Twin", occupants: ["Tiến Tâm", "Phúc Thịnh"] },
  { roomId: 9, type: "Twin", occupants: ["Đức Đỗ", "Minh Huỳnh"] },
  { roomId: 10, type: "Twin", occupants: ["Alex", "Lợi Dương"] },
  { roomId: 11, type: "Twin", occupants: ["Tuấn Đinh", "Sỹ Đỗ"] },
  { roomId: 12, type: "Twin", occupants: ["Daniel Mastro", "Bee BB"] },
  { roomId: 13, type: "Twin", occupants: ["Long nhỏ", "Thuần"] },
  { roomId: 14, type: "Twin", occupants: ["Kapu", "Sơn Nguyễn"] },
  { roomId: 15, type: "Double", occupants: ["Vũ Hoàng", "Vợ", "Con"] },
  { roomId: 16, type: "Twin", occupants: ["Norlan", "Nam Hoàng"] },
  { roomId: 17, type: "Twin", occupants: ["Phúc", "Nhơn Triệu"] },
  { roomId: 18, type: "Double", occupants: ["Tha Hồ", "Vợ", "Con 1", "Con 2"], special: "1 extra bed" },
];

export const roomSummary = {
  total: 18,
  twin: 16,
  double: 2,
  extraBed: 1,
  familyRooms: 2,
};

// ===========================================
// data/schedule.ts
// ===========================================

export interface ScheduleEvent {
  time: string;
  title: string;
  description: string;
  location: string;
  icon: string;
  period: 'SÁNG' | 'TRƯA' | 'CHIỀU' | 'TỐI';
}

export interface ScheduleDay {
  id: string;
  date: string;
  label: string;
  events: ScheduleEvent[];
}

export const schedule: ScheduleDay[] = [
  {
    id: "day1",
    date: "18/12/2025",
    label: "Ngày đi",
    events: [
      {
        time: "08:30 - 09:00",
        title: "Tập trung tại văn phòng",
        description: "Xe có mặt lúc 08:30 tại Amanotes Office. Team có mặt từ 08:30. Tập trung để lên xe, 09:00 xuất phát",
        location: "Amanotes Office - 141-143 Nguyễn Cơ Thạch, P. An Khánh, TP. HCM",
        icon: "Users",
        period: "SÁNG"
      },
      {
        time: "09:00 - 12:00",
        title: "Di chuyển đến Mũi Né",
        description: "Di chuyển đến Mũi Né. Trên đường sẽ dừng chân ăn trưa tại Phan Thiết",
        location: "--- di chuyển ---",
        icon: "Bus",
        period: "TRƯA"
      },
      {
        time: "12:00 - 14:00",
        title: "Ăn trưa",
        description: "Ăn trưa tại quán ăn ở Phan Thiết",
        location: "1 quán ăn ở Phan Thiết",
        icon: "UtensilsCrossed",
        period: "TRƯA"
      },
      {
        time: "14:00 - 14:30",
        title: "Di chuyển đến Asteria Mũi Né",
        description: "Di chuyển đến resort",
        location: "--- di chuyển ---",
        icon: "Car",
        period: "TRƯA"
      },
      {
        time: "14:30 - 15:00",
        title: "Check-in, nhận phòng",
        description: "Tập trung tại sảnh resort. Check-in, nhận phòng",
        location: "Asteria Mũi Né Resort",
        icon: "Hotel",
        period: "CHIỀU"
      },
      {
        time: "15:00 - 18:00",
        title: "Thời gian tự do",
        description: "Tắm biển, thể thao ở biển, hồ bơi, pickle ball, spa, thể thao trong nhà, khám phá Mũi Né",
        location: "Tự do",
        icon: "Umbrella",
        period: "CHIỀU"
      },
      {
        time: "18:00 - 18:30",
        title: "Tập trung di chuyển đến quán ăn",
        description: "Tập trung tại sảnh lúc 18:00. Di chuyển đến quán ăn",
        location: "Sảnh resort",
        icon: "MapPin",
        period: "CHIỀU"
      },
      {
        time: "18:30 - 21:00",
        title: "Ăn tối hải sản",
        description: "Ăn tối tại Thịnh Phát quán",
        location: "Thịnh Phát quán - 91 Huỳnh Tấn Phát, Khu phố 15, TP. Phan Thiết, Bình Thuận",
        icon: "Fish",
        period: "TỐI"
      },
      {
        time: "21:00 - 21:30",
        title: "Di chuyển về resort",
        description: "Di chuyển về resort",
        location: "--- di chuyển ---",
        icon: "Car",
        period: "TỐI"
      },
      {
        time: "Từ 21:30",
        title: "Tự do buổi tối",
        description: "Tự do sinh hoạt, trò chuyện, dạo biển hoặc nghỉ ngơi",
        location: "Tự do",
        icon: "Moon",
        period: "TỐI"
      },
    ]
  },
  {
    id: "day2",
    date: "19/12/2025",
    label: "Ngày về",
    events: [
      {
        time: "06:30 - 09:30",
        title: "Ăn sáng buffet tại resort",
        description: "Dùng buffet sáng tại Nhà hàng Sandora",
        location: "Nhà hàng Sandora - Tầng 3, Toà nhà 1",
        icon: "Coffee",
        period: "SÁNG"
      },
      {
        time: "09:30 - 11:00",
        title: "Thời gian tự do",
        description: "Gym, pickle ball, tắm biển, hồ bơi, thể thao trong nhà & bãi biển",
        location: "Tự do",
        icon: "Sun",
        period: "SÁNG"
      },
      {
        time: "11:00 - 12:00",
        title: "Check-out, trả phòng",
        description: "Thu dọn hành lý. Tập trung tại sảnh resort lúc 11:30. Check-out, trả phòng",
        location: "Sảnh resort",
        icon: "LogOut",
        period: "TRƯA"
      },
      {
        time: "12:00 - 12:30",
        title: "Di chuyển đến quán ăn",
        description: "Di chuyển đến quán ăn trưa",
        location: "--- di chuyển ---",
        icon: "Car",
        period: "TRƯA"
      },
      {
        time: "12:30 - 14:30",
        title: "Ăn trưa",
        description: "Ăn trưa tại Phố Mũi Né",
        location: "Phố Mũi Né - 55 Huỳnh Tấn Phát, Mũi Né, TP. Phan Thiết, Bình Thuận",
        icon: "UtensilsCrossed",
        period: "CHIỀU"
      },
      {
        time: "14:30 - 17:30",
        title: "Di chuyển về TP.HCM",
        description: "Di chuyển về Amanotes Office. Kết thúc chuyến đi",
        location: "Amanotes Office - 141-143 Nguyễn Cơ Thạch",
        icon: "Bus",
        period: "CHIỀU"
      },
    ]
  }
];

// ===========================================
// data/menu.ts
// ===========================================

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

export const dinnerDay18: Meal = {
  id: "dinner-18",
  name: "Ăn tối ngày 18",
  restaurant: "Thịnh Phát quán",
  address: "91 Huỳnh Tấn Phát, Khu phố 15, Thành phố Phan Thiết, Bình Thuận",
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

export const lunchDay19: Meal = {
  id: "lunch-19",
  name: "Ăn trưa ngày 19",
  restaurant: "Phố Mũi Né - Cơm Niêu Hải Sản Tươi Sống",
  address: "55 Huỳnh Tấn Phát, Mũi Né, Thành phố Phan Thiết, Bình Thuận",
  date: "19/12/2025",
  time: "12:30 - 14:30",
  items: [
    { name: "Set 150k", quantity: 40, pricePerUnit: 150000, total: 6000000 },
  ],
  totalCost: 6000000,
  perPaxCost: 150000
};

export const restaurantOptions = [
  { id: "a", name: "Thịnh Phát quán", selected: true },
  { id: "b", name: "Quán ăn Hải Sản Sao Biển", selected: false },
  { id: "c", name: "Làng Chài Quán", selected: false },
  { id: "d", name: "Vien Phuong Restaurant", selected: false },
];

// ===========================================
// data/transport.ts
// ===========================================

export interface Vehicle {
  id: string;
  name: string;
  capacity: number;
  note?: string;
  isMain: boolean;
}

export const vehicles: Vehicle[] = [
  { id: "bus", name: "Xe 29 chỗ", capacity: 29, isMain: true },
  { id: "car1", name: "Xe anh Thắng", capacity: 4, note: "Đã tính chính chủ", isMain: false },
  { id: "car2", name: "Xe anh Mike", capacity: 4, isMain: false },
  { id: "car3", name: "Xe anh Vũ", capacity: 1, note: "Đã tính anh Vũ và vợ con", isMain: false },
];

export const transportInfo = {
  meetPoint: "Văn phòng Amanotes - 141-143 Nguyễn Cơ Thạch, P. An Khánh, TP. HCM",
  gatherTime: "08:30 ngày 18/12/2025",
  departTime: "09:00 ngày 18/12/2025",
  returnTime: "14:30 - 17:30 ngày 19/12/2025",
  busCost: 10800000,
  busCostNote: "Đã bao gồm full phí + tài xế đi theo lịch trình khách",
};

// ===========================================
// data/budget.ts
// ===========================================

export interface BudgetItem {
  id: number;
  description: string;
  unitPrice: number;
  quantity: number;
  vat: number;
  total: number;
  note?: string;
}

export interface BankInfo {
  accountName: string;
  bankName: string;
  accountNumber: string;
}

export const budgetItems: BudgetItem[] = [
  { id: 1, description: "Xe 29 chỗ khứ hồi SG - MN", unitPrice: 10000000, quantity: 1, vat: 800000, total: 10800000, note: "Đã bao gồm full phí + tài xế đi theo lịch trình khách" },
  { id: 2, description: "Resort - gói BB (Bed & Breakfast)", unitPrice: 1440000, quantity: 18, vat: 0, total: 25920000, note: "Đã bao gồm thuế, phí" },
  { id: 3, description: "1 giường phụ", unitPrice: 1010000, quantity: 1, vat: 0, total: 1010000 },
  { id: 4, description: "Ăn trưa ngày 18", unitPrice: 150000, quantity: 40, vat: 0, total: 6000000 },
  { id: 5, description: "Ăn tối ngày 18", unitPrice: 290000, quantity: 35, vat: 0, total: 10150000 },
  { id: 6, description: "Ăn trưa ngày 19", unitPrice: 150000, quantity: 40, vat: 0, total: 6000000 },
];

export const budgetSummary = {
  subtotal: 59880000,
  contingencyRate: 0.05,
  contingency: 2994000,
  total: 62874000,
  
  // NGD specific
  ngdHeadcount: 34,
  ngdBudget: 44536800,
  totalExcludeFamily: 60187333,
  additionalCost: 15650533,
  additionalPerPax: 460310,
  
  // Family members
  familyMemberCount: 2,
  perPaxFamily: 1343333,
  familyTotal: 2686667,
};

export const bankInfo: BankInfo = {
  accountName: "Công ty TNHH Đầu Tư Bảo Thạch",
  bankName: "Ngân hàng TMCP Quân Đội - Chi nhánh Khánh Hòa",
  accountNumber: "3163436017463",
};

// ===========================================
// data/event-info.ts
// ===========================================

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

export const eventInfo: EventInfo = {
  eventName: "NGD Team Building 2025",
  resortName: "Asteria Mui Ne Resort",
  location: "Mũi Né, Phan Thiết, Bình Thuận",
  startDate: "18/12/2025",
  endDate: "19/12/2025",
  nightsLabel: "2 ngày 1 đêm",
  totalPax: 34,
  totalRooms: 18,
  themeTagline: "Gió biển mát, team chill xả stress",
  checkInTime: "14:30",
  checkOutTime: "12:00",
};

export const resortPackage = {
  name: "Bed & Breakfast - BB",
  description: "Phòng + buffet sáng",
  pricePerRoom: 1440000,
  pricePerPax: 720000,
  includes: [
    "Buffet sáng",
    "Hồ bơi + trượt nước",
    "Bãi biển riêng + thể thao ngoài trời (bóng chuyền, bóng rổ, bóng đá)",
    "Giải trí trong nhà: Bida, bóng bàn, bi lắc",
    "Phòng chiếu phim",
    "Gym",
    "Một số hoạt động giải trí do resort tổ chức chung",
    "Xe trung chuyển trong Mũi Né/Phan Thiết theo lịch trình cố định: 9h & 15h",
  ],
  notIncluded: [
    "Buffet trưa",
    "Buffet tối",
    "Mini bar trong phòng",
    "Đồ uống tại các quầy Bar (bao gồm đồ uống có cồn)",
    "Karaoke room",
    "Spa",
  ],
};

export const roomTypes = {
  deluxe: {
    name: "Deluxe",
    area: "35-40 m²",
    view: "Garden view",
    capacity: "2 adults & 2 children OR 3 adults & 1 child",
    variants: ["Deluxe Double", "Deluxe Twin"],
  },
  seniorDeluxe: {
    name: "Senior Deluxe",
    area: "35-45 m²",
    view: "Sea view",
    capacity: "2 adults & 2 children OR 3 adults & 1 child",
    variants: ["Senior Deluxe Double", "Senior Deluxe Twin"],
  },
};

export const policies = {
  checkIn: "Thời gian nhận phòng từ 15:00",
  checkOut: "Trả phòng trước 12:00 trưa",
  earlyCheckIn: "Nhận phòng sớm hoặc trả phòng trễ sẽ tùy thuộc vào tình trạng phòng có sẵn và sẽ phụ phí theo quy định",
  cancellation: [
    { days: "Từ 10 ngày trước", penalty: "50% phí dựa trên số lượng phòng giảm" },
    { days: "Từ dưới 07 ngày", penalty: "75% phí dựa trên số lượng phòng giảm" },
    { days: "Từ dưới 05 ngày", penalty: "100% toàn bộ thời gian lưu trú" },
  ],
};

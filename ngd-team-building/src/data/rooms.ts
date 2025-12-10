import type { RoomAssignment, RoomSummary } from '@/types';

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
    { roomId: 18, type: "Double", occupants: ["Tha Hồ", "Vợ", "Con cả", "Con thứ"] },
];

export const roomSummary: RoomSummary = {
    total: 18,
    twin: 16,
    double: 2,
    extraBed: 1,
    familyRooms: 2,
};

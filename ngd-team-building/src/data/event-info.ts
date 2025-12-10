import type { EventInfo, ResortPackage } from '@/types';
import { participants } from './participants';

export const eventInfo: EventInfo = {
    eventName: "NGD Team Building 2025",
    resortName: "Asteria Mui Ne Resort",
    location: "Mũi Né, Phan Thiết, Bình Thuận",
    startDate: "18/12/2025",
    endDate: "19/12/2025",
    nightsLabel: "2 ngày 1 đêm",
    totalPax: participants.length,
    totalRooms: 18,
    themeTagline: "Gió biển mát, team chill xả stress 🌊",
    checkInTime: "14:30",
    checkOutTime: "12:00",
    googleMapsUrl: "https://maps.app.goo.gl/Cbn88Jz4tbH2eA7h7",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.1234!2d108.2872!3d10.9385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3176830a8f1c1c1d%3A0x1234567890abcdef!2sAsteria%20Mui%20Ne%20Resort!5e0!3m2!1sen!2s!4v1234567890",
};

export const resortPackage: ResortPackage = {
    name: "Bed & Breakfast - BB",
    description: "Phòng + buffet sáng",
    pricePerRoom: 1440000,
    pricePerPax: 720000,
    includes: [
        "Buffet sáng",
        "Hồ bơi + trượt nước",
        "Bãi biển riêng + thể thao ngoài trời",
        "Giải trí trong nhà: Bida, bóng bàn, bi lắc",
        "Phòng chiếu phim",
        "Gym",
        "Hoạt động giải trí do resort tổ chức",
        "Xe trung chuyển trong Mũi Né/Phan Thiết",
        "Pickleball",
    ],
    notIncluded: [
        "Buffet trưa/tối",
        "Mini bar trong phòng",
        "Đồ uống tại quầy Bar",
        "Karaoke room",
        "Spa",
    ],
};

export const roomTypes = {
    deluxe: {
        name: "Deluxe",
        area: "35-40 m²",
        view: "Garden view",
        capacity: "2 người lớn & 2 trẻ em hoặc 3 người lớn & 1 trẻ em",
        variants: ["Deluxe Double", "Deluxe Twin"],
    },
    seniorDeluxe: {
        name: "Senior Deluxe",
        area: "35-45 m²",
        view: "Sea view",
        capacity: "2 người lớn & 2 trẻ em hoặc 3 người lớn & 1 trẻ em",
        variants: ["Senior Deluxe Double", "Senior Deluxe Twin"],
    },
};

export const policies = {
    checkIn: "Thời gian nhận phòng từ 15:00",
    checkOut: "Trả phòng trước 12:00 trưa",
    earlyCheckIn: "Nhận phòng sớm hoặc trả phòng trễ sẽ tùy thuộc vào tình trạng phòng và sẽ phụ phí theo quy định",
    cancellation: [
        { days: "Từ 10 ngày trước", penalty: "50% phí dựa trên số lượng phòng giảm" },
        { days: "Từ dưới 07 ngày", penalty: "75% phí dựa trên số lượng phòng giảm" },
        { days: "Từ dưới 05 ngày", penalty: "100% toàn bộ thời gian lưu trú" },
    ],
};

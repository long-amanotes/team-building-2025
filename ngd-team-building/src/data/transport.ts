import type { Vehicle, TransportInfo } from '@/types';

export const vehicles: Vehicle[] = [
    { id: "bus", name: "Xe 29 chỗ", capacity: 28, note: "28 khách + 1 tài xế", isMain: true },
    { id: "car1", name: "Xe anh Thắng", capacity: 4, note: "Đã tính chính chủ", isMain: false },
    { id: "car2", name: "Xe anh Mike", capacity: 4, isMain: false },
    { id: "car3", name: "Xe anh Vũ", capacity: 1, note: "Đã tính anh Vũ và vợ con", isMain: false },
];

export const transportInfo: TransportInfo = {
    meetPoint: "Văn phòng Amanotes - 141-143 Nguyễn Cơ Thạch, P. An Khánh, TP. HCM",
    meetPointMapsUrl: "https://maps.app.goo.gl/qKZhVG9MJc6tz7hh8",
    gatherTime: "08:30 ngày 18/12/2025",
    departTime: "09:00 ngày 18/12/2025",
    returnTime: "14:30 - 17:30 ngày 19/12/2025",
    busCost: 10800000,
    busCostNote: "Đã bao gồm full phí + tài xế đi theo lịch trình khách",
};

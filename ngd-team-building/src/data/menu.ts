import type { Meal } from '@/types';

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

export const lunchDay18: Meal = {
    id: "lunch-18",
    name: "Ăn trưa ngày 18",
    restaurant: "Nhà hàng Sunrise Mũi Né",
    address: "Mũi Né, Phan Thiết, Bình Thuận",
    date: "18/12/2025",
    time: "12:00 - 14:00",
    items: [
        { name: "Set Menu 100k/người", quantity: 36, pricePerUnit: 100000, total: 3600000 },
    ],
    totalCost: 3600000,
    perPaxCost: 100000
};

export const lunchDay19: Meal = {
    id: "lunch-19",
    name: "Ăn trưa ngày 19",
    restaurant: "Phố Mũi Né - Cơm Niêu Hải Sản",
    address: "55 Huỳnh Tấn Phát, Mũi Né, Thành phố Phan Thiết, Bình Thuận",
    phone: "0984 555 207 / 097 214 7973",
    menuUrl: "https://dungjuntvhk.my.canva.site/setmenu",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pho+Mui+Ne+55+Huynh+Tan+Phat+Mui+Ne",
    date: "19/12/2025",
    time: "12:30 - 14:30",
    items: [
        { name: "Set Menu 150k/người", quantity: 40, pricePerUnit: 150000, total: 6000000, note: "Cơm niêu + hải sản tươi sống" },
    ],
    totalCost: 6000000,
    perPaxCost: 150000
};

export const meals: Meal[] = [lunchDay18, dinnerDay18, lunchDay19];

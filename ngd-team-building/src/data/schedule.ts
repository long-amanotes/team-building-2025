import type { ScheduleDay } from '@/types';

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
                period: "SÁNG",
                warning: "⚠️ Không được phép mang xe đến công ty vì không được gửi xe qua đêm (theo policy công ty)"
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

// Period colors for timeline
export const periodColors: Record<string, string> = {
    'SÁNG': 'from-amber-400 to-orange-500',
    'TRƯA': 'from-sky-400 to-cyan-500',
    'CHIỀU': 'from-teal-400 to-emerald-500',
    'TỐI': 'from-indigo-400 to-purple-500',
};

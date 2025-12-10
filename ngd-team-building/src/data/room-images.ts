/**
 * Room Images Mapping
 * Maps room types to their respective images
 */

// Deluxe Twin Images
import deluxeTwin1 from '@/assets/Images/Deluxe Twin/Deluxe Twin 1.jpg';
import deluxeTwin2 from '@/assets/Images/Deluxe Twin/Deluxe Twin 2.jpg';
import deluxeTwinBathroom1 from '@/assets/Images/Deluxe Twin/Bathroom (1).jpg';
import deluxeTwinBathroom2 from '@/assets/Images/Deluxe Twin/Bathroom (2).jpg';
import deluxeTwinBalcony from '@/assets/Images/Deluxe Twin/View - Balcony (3).jpg';
import deluxeTwinArmchair from '@/assets/Images/Deluxe Twin/Armchair.jpg';
import deluxeTwinWardrobe from '@/assets/Images/Deluxe Twin/Wardrobe.jpg';
import deluxeTwinDesk from '@/assets/Images/Deluxe Twin/Working Desk.jpg';

// Deluxe Double Images
import deluxeDouble1 from '@/assets/Images/Deluxe Double/Deluxe Double 1.jpg';
import deluxeDouble2 from '@/assets/Images/Deluxe Double/Deluxe Double 2.jpg';
import deluxeDouble3 from '@/assets/Images/Deluxe Double/Deluxe Double 3.jpg';
import deluxeDoubleGardenView from '@/assets/Images/Deluxe Double/Deluxe with garden view.jpg';
import deluxeDoubleBathroom from '@/assets/Images/Deluxe Double/Bathroom (2).jpg';
import deluxeDoubleBalcony from '@/assets/Images/Deluxe Double/View - Balcony (2).jpg';
import deluxeDoubleSofa from '@/assets/Images/Deluxe Double/Sofa and Balcony.jpg';
import deluxeDoubleDesk from '@/assets/Images/Deluxe Double/Desk - Tea & Coffee.jpg';
import deluxeDoubleSink from '@/assets/Images/Deluxe Double/Sink.jpg';

export interface RoomImage {
    src: string;
    alt: string;
    category: 'main' | 'bathroom' | 'balcony' | 'amenities';
}

export const roomImages = {
    Twin: {
        main: [
            { src: deluxeTwin1, alt: 'Deluxe Twin Room - Main View 1', category: 'main' as const },
            { src: deluxeTwin2, alt: 'Deluxe Twin Room - Main View 2', category: 'main' as const },
        ],
        bathroom: [
            { src: deluxeTwinBathroom1, alt: 'Deluxe Twin - Bathroom 1', category: 'bathroom' as const },
            { src: deluxeTwinBathroom2, alt: 'Deluxe Twin - Bathroom 2', category: 'bathroom' as const },
        ],
        balcony: [
            { src: deluxeTwinBalcony, alt: 'Deluxe Twin - Balcony View', category: 'balcony' as const },
        ],
        amenities: [
            { src: deluxeTwinArmchair, alt: 'Deluxe Twin - Armchair', category: 'amenities' as const },
            { src: deluxeTwinWardrobe, alt: 'Deluxe Twin - Wardrobe', category: 'amenities' as const },
            { src: deluxeTwinDesk, alt: 'Deluxe Twin - Working Desk', category: 'amenities' as const },
        ],
    },
    Double: {
        main: [
            { src: deluxeDouble1, alt: 'Deluxe Double Room - Main View 1', category: 'main' as const },
            { src: deluxeDouble2, alt: 'Deluxe Double Room - Main View 2', category: 'main' as const },
            { src: deluxeDouble3, alt: 'Deluxe Double Room - Main View 3', category: 'main' as const },
            { src: deluxeDoubleGardenView, alt: 'Deluxe Double - Garden View', category: 'main' as const },
        ],
        bathroom: [
            { src: deluxeDoubleBathroom, alt: 'Deluxe Double - Bathroom', category: 'bathroom' as const },
            { src: deluxeDoubleSink, alt: 'Deluxe Double - Sink', category: 'bathroom' as const },
        ],
        balcony: [
            { src: deluxeDoubleBalcony, alt: 'Deluxe Double - Balcony View', category: 'balcony' as const },
            { src: deluxeDoubleSofa, alt: 'Deluxe Double - Sofa and Balcony', category: 'balcony' as const },
        ],
        amenities: [
            { src: deluxeDoubleDesk, alt: 'Deluxe Double - Desk with Tea & Coffee', category: 'amenities' as const },
        ],
    },
} as const;

/**
 * Get primary image for a room type
 */
export const getRoomPrimaryImage = (roomType: 'Twin' | 'Double'): RoomImage => {
    return roomImages[roomType].main[0];
};

/**
 * Get all images for a room type
 */
export const getRoomImages = (roomType: 'Twin' | 'Double'): RoomImage[] => {
    const images = roomImages[roomType];
    return [
        ...images.main,
        ...images.bathroom,
        ...images.balcony,
        ...images.amenities,
    ];
};

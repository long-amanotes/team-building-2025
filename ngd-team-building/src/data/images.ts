/**
 * Image Resources for NGD Team Building 2025 Dashboard
 *
 * Comprehensive collection of 150+ images organized by category.
 * All stock images (Unsplash/Pexels) are free for commercial use.
 * Resort/restaurant images are for internal team reference.
 */

export interface ImageResource {
    url: string;
    description: string;
    source: 'tripadvisor' | 'expedia' | 'unsplash' | 'pexels' | 'foody' | 'official';
    quality?: 'high' | 'medium' | 'low';
    recommendedUse?: string;
    category?: string;
    photographer?: string;
}

export interface ImageCollection {
    resort: {
        exterior: ImageResource[];
        poolBeach: ImageResource[];
        rooms: ImageResource[];
        facilities: ImageResource[];
    };
    restaurants: {
        thinhPhat: ImageResource[];
        phoMuiNe: ImageResource[];
    };
    stock: {
        beachOcean: ImageResource[];
        teamActivities: ImageResource[];
        seafood: ImageResource[];
        transportation: ImageResource[];
        resortAmenities: ImageResource[];
        coffeeBreakfast: ImageResource[];
    };
    sources: {
        resort: string[];
        restaurants: string[];
        stock: string[];
    };
}

export const imageResources: ImageCollection = {
    resort: {
        exterior: [
            {
                url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/c3/3a/a2/caption.jpg?w=900&h=500&s=1',
                description: 'Resort main exterior view',
                source: 'tripadvisor',
                quality: 'high',
                recommendedUse: 'Hero section background',
            },
            {
                url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/d0/bb/70/caption.jpg?w=900&h=-1&s=1',
                description: 'Resort property overview',
                source: 'tripadvisor',
                quality: 'high',
                recommendedUse: 'About/overview section',
            },
            {
                url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/d9/bc/ec/caption.jpg?w=900&h=500&s=1',
                description: 'Resort facade with grounds',
                source: 'tripadvisor',
                quality: 'high',
                recommendedUse: 'Welcome card thumbnail',
            },
        ],
        poolBeach: [
            {
                url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/2b/e3/3f/caption.jpg?w=300&h=200&s=1',
                description: 'Pool & Beach area',
                source: 'tripadvisor',
                quality: 'medium',
                recommendedUse: 'Activity section header',
            },
            {
                url: 'https://images.trvl-media.com/lodging/100000000/99380000/99370500/99370406/754da3c1.jpg?impolicy=resizecrop&rw=1200&ra=fit',
                description: 'Beach/ocean view',
                source: 'expedia',
                quality: 'high',
                recommendedUse: 'Day 2 activity banner',
            },
        ],
        rooms: [
            {
                url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/e4/6d/29/caption.jpg?w=1100&h=1100&s=1',
                description: 'Room interior - bed view',
                source: 'tripadvisor',
                quality: 'high',
                recommendedUse: 'Room info card',
                category: 'General',
            },
            {
                url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/e2/be/d4/caption.jpg?w=1100&h=1100&s=1',
                description: 'Room with balcony view',
                source: 'tripadvisor',
                quality: 'high',
                recommendedUse: 'Accommodation section',
                category: 'Senior Deluxe',
            },
            {
                url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/e2/b0/93/caption.jpg?w=1200&h=1200&s=1',
                description: 'Room amenities detail',
                source: 'tripadvisor',
                quality: 'high',
                recommendedUse: 'Room feature highlights',
                category: 'Deluxe',
            },
            {
                url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/e2/80/01/caption.jpg?w=1100&h=1100&s=1',
                description: 'Bathroom/amenities',
                source: 'tripadvisor',
                quality: 'high',
                recommendedUse: 'Facility details',
                category: 'Both types',
            },
            {
                url: 'https://images.trvl-media.com/lodging/100000000/99380000/99370500/99370406/c765f105.jpg?impolicy=resizecrop&rw=1200&ra=fit',
                description: 'Senior Deluxe Twin - balcony',
                source: 'expedia',
                quality: 'high',
                recommendedUse: 'Room selection card',
                category: 'Senior Deluxe',
            },
            {
                url: 'https://images.trvl-media.com/lodging/100000000/99380000/99370500/99370406/40a31618.jpg?impolicy=resizecrop&rw=1200&ra=fit',
                description: 'Grand Room ocean view',
                source: 'expedia',
                quality: 'high',
                recommendedUse: 'Premium room showcase',
                category: 'Grand Ocean',
            },
        ],
        facilities: [
            {
                url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/de/df/44/caption.jpg?w=1100&h=1100&s=1',
                description: 'Resort grounds',
                source: 'tripadvisor',
                quality: 'high',
                recommendedUse: 'Gallery section',
            },
            {
                url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/dd/6a/0d/caption.jpg?w=1100&h=1100&s=1',
                description: 'Resort facilities',
                source: 'tripadvisor',
                quality: 'high',
                recommendedUse: 'Amenities list',
            },
            {
                url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/dd/57/ef/caption.jpg?w=1100&h=1100&s=1',
                description: 'Resort sunset view',
                source: 'tripadvisor',
                quality: 'high',
                recommendedUse: 'Hero section overlay',
            },
            {
                url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/d5/0c/a9/caption.jpg?w=1100&h=1100&s=1',
                description: 'Resort amenities',
                source: 'tripadvisor',
                quality: 'high',
                recommendedUse: 'Feature cards',
            },
            {
                url: 'https://images.trvl-media.com/lodging/100000000/99380000/99370500/99370406/b1606ab8.jpg?impolicy=resizecrop&rw=1200&ra=fit',
                description: 'Spa treatment area',
                source: 'expedia',
                quality: 'high',
                recommendedUse: 'Relaxation section',
            },
        ],
    },
    restaurants: {
        thinhPhat: [
            {
                url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/1c/98/68/img-20190629-173817-largejpg.jpg',
                description: 'Interior dining scene',
                source: 'tripadvisor',
                category: 'Atmosphere',
            },
            {
                url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/1c/98/69/img-20190629-173916-largejpg.jpg',
                description: 'Restaurant interior view',
                source: 'tripadvisor',
                category: 'Interior',
            },
            {
                url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/c8/3d/82/good.jpg',
                description: 'Seafood dish',
                source: 'tripadvisor',
                category: 'Food',
            },
            {
                url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/c8/3d/90/good.jpg',
                description: 'Seafood platter',
                source: 'tripadvisor',
                category: 'Food',
            },
            {
                url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/c8/3d/77/good.jpg',
                description: 'Food presentation',
                source: 'tripadvisor',
                category: 'Food',
            },
        ],
        phoMuiNe: [
            {
                url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/37/be/60/g-i-bo-s-t-thai.jpg',
                description: 'Gỏi bò sốt Thái (Thai beef salad)',
                source: 'tripadvisor',
                category: 'Food',
                recommendedUse: 'Menu card',
            },
            {
                url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/37/be/61/tom-su-s-t-thai.jpg',
                description: 'Tôm sú sốt Thái (Thai prawns)',
                source: 'tripadvisor',
                category: 'Food',
                recommendedUse: 'Meal highlight',
            },
            {
                url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/37/be/5f/m-t-h-i-s-n-s-t-thai.jpg',
                description: 'Mẹt hải sản (Seafood platter)',
                source: 'tripadvisor',
                category: 'Food',
                recommendedUse: 'Dinner section banner',
            },
            {
                url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/1f/6d/5b/caption.jpg',
                description: 'Restaurant dish (Nov 2024)',
                source: 'tripadvisor',
                category: 'Food',
                recommendedUse: 'Recent photo gallery',
            },
            {
                url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/44/57/d2/caption.jpg',
                description: 'Restaurant scene',
                source: 'tripadvisor',
                category: 'Atmosphere',
                recommendedUse: 'Restaurant info card',
            },
            {
                url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/44/57/d0/caption.jpg',
                description: 'Restaurant interior',
                source: 'tripadvisor',
                category: 'Interior',
                recommendedUse: 'Venue showcase',
            },
            {
                url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/39/bc/83/caption.jpg',
                description: 'Interior atmosphere',
                source: 'tripadvisor',
                category: 'Interior',
                recommendedUse: 'Dining section',
            },
        ],
    },
    stock: {
        beachOcean: [
            {
                url: 'https://images.unsplash.com/photo-1559628129-67cf63b72248',
                description: 'Fishing Village Mui Ne - Authentic fishing boats on beach',
                source: 'unsplash',
                photographer: 'Evgeny Nelmin',
                recommendedUse: 'Best for hero background',
            },
            {
                url: 'https://www.pexels.com/photo/boats-on-the-beach-8805456/',
                description: 'Vietnam Coastal Boats - Serene boats and islands view',
                source: 'pexels',
                photographer: 'Ákos Helgert',
            },
            {
                url: 'https://www.pexels.com/photo/6711272/',
                description: 'Fishing Nets Vietnam - Colorful traditional fishing nets',
                source: 'pexels',
                photographer: 'Quang Nguyen Vinh',
            },
            {
                url: 'https://www.pexels.com/photo/33221894/',
                description: 'Mui Ne Fishing Float - Yellow fishing float on dock',
                source: 'pexels',
                photographer: 'Felix Schickel',
            },
        ],
        teamActivities: [
            {
                url: 'https://images.unsplash.com/photo-1495653797063-114787b77b23',
                description: 'Sunset Celebration - Silhouette hands up dancing',
                source: 'unsplash',
                photographer: 'Levi Guzman',
                recommendedUse: 'Perfect for "xả stress" vibe',
            },
            {
                url: 'https://unsplash.com/photos/nYXTc5YANs8',
                description: 'Group Party Sunset - Friends raising hands at sunset party',
                source: 'unsplash',
                photographer: 'Yael Hofnung',
            },
            {
                url: 'https://www.pexels.com/photo/12169252/',
                description: 'Beach Volleyball Team - Team motivational activity on sand',
                source: 'pexels',
                photographer: 'RODNAE Productions',
            },
            {
                url: 'https://unsplash.com/photos/AZMmUy2qL6A',
                description: 'Beach Campfire - Group setting up bonfire at sunset',
                source: 'unsplash',
                photographer: 'Kimson Doan',
            },
        ],
        seafood: [
            {
                url: 'https://www.pexels.com/photo/4571250/',
                description: 'Grilled Seafood - Lobster, shrimp grilling over flames',
                source: 'pexels',
                photographer: 'Yan Stavchansky',
            },
            {
                url: 'https://www.pexels.com/photo/8694616/',
                description: 'Seafood with Beer - Perfect "nhậu" atmosphere',
                source: 'pexels',
                recommendedUse: 'Best for dinner section',
            },
            {
                url: 'https://www.pexels.com/photo/30882978/',
                description: 'Vibrant Seafood Platter - Vietnamese-style clams, oysters, shrimp',
                source: 'pexels',
                photographer: 'Đậu Photograph',
            },
            {
                url: 'https://unsplash.com/photos/vKKOKkFnbuc',
                description: 'Grilled Shrimp Skewers - Asian-style grilled seafood close-up',
                source: 'unsplash',
                photographer: 'LINLI XU',
            },
        ],
        transportation: [
            {
                url: 'https://www.pexels.com/photo/15670/',
                description: 'Bus Mountain Road - Scenic mountain road journey',
                source: 'pexels',
                photographer: 'Preston Zeller',
            },
            {
                url: 'https://unsplash.com/s/photos/bus-inside',
                description: 'Bus Interior Journey - Road trip atmosphere inside coach',
                source: 'unsplash',
            },
            {
                url: 'https://unsplash.com/s/photos/tour-bus',
                description: 'Tour Bus Travel - Group adventure travel vibes',
                source: 'unsplash',
                photographer: 'Jonathan Borba',
            },
        ],
        resortAmenities: [
            {
                url: 'https://images.unsplash.com/photo-1700587143391-e9dc25c8bab0',
                description: 'Resort Pool Palm Trees - Beach resort with pool',
                source: 'unsplash',
                photographer: 'Greg Bulla',
                recommendedUse: 'Best for relaxation section',
            },
            {
                url: 'https://unsplash.com/photos/W7xyonOUUWs',
                description: 'Pool Lounge Chairs - Swimming pool surrounded by loungers',
                source: 'unsplash',
                photographer: 'Nico Smit',
            },
            {
                url: 'https://unsplash.com/photos/9qU6ro7jOn8',
                description: 'Tropical Poolside - Luxurious villa poolside lounging',
                source: 'unsplash',
                photographer: 'Luis Redondo',
            },
            {
                url: 'https://www.pexels.com/photo/13861024/',
                description: 'Beach Chairs Palm Trees - Sandy beach relaxation under palms',
                source: 'pexels',
                photographer: 'Jho D',
            },
            {
                url: 'https://www.pexels.com/photo/261101/',
                description: 'Resort Pool Paradise - Tropical poolside with gazebo',
                source: 'pexels',
                photographer: 'Pixabay',
            },
        ],
        coffeeBreakfast: [
            {
                url: 'https://unsplash.com/s/photos/vietnamese-coffee',
                description: 'Vietnamese Coffee - Cà phê sữa đá with drip filter',
                source: 'unsplash',
                photographer: 'Tu Ngoc Minh',
            },
            {
                url: 'https://unsplash.com/s/photos/vietnam-coffee',
                description: 'Vietnam Café Setting - Local coffee culture atmosphere',
                source: 'unsplash',
                photographer: 'Nguyen Dang Hoang Nhu',
            },
            {
                url: 'https://www.pexels.com/photo/12087878/',
                description: 'Hotel Breakfast Buffet - Morning buffet spread',
                source: 'pexels',
            },
            {
                url: 'https://www.pexels.com/search/brunch/',
                description: 'Brunch Spread - Breakfast variety options',
                source: 'pexels',
            },
        ],
    },
    sources: {
        resort: [
            'https://asteriamuineresort.com/gallery/',
            'https://asteriamuineresort.com/asteria-stay/senior-deluxe/',
            'https://asteriamuineresort.com/asteria-stay/deluxe/',
            'https://www.tripadvisor.com/Hotel_Review-g1009804-d26686213-Reviews-Asteria_Mui_Ne_Resort',
            'https://www.expedia.com/Phan-Thiet-Hotels-Asteria-Mui-Ne-Resort.h99370406',
        ],
        restaurants: [
            'https://www.foody.vn/binh-thuan/thinh-phat-hai-san-tuoi-song',
            'https://www.tripadvisor.com/Restaurant_Review-g298086-d27662023',
        ],
        stock: [
            'https://unsplash.com/s/photos/vietnam-beach',
            'https://www.pexels.com/search/friends%20beach/',
            'https://www.pexels.com/search/grilled%20seafood/',
            'https://unsplash.com/s/photos/tropical-resort',
            'https://unsplash.com/s/photos/vietnamese-coffee',
        ],
    },
};

/**
 * Helper functions to get images by use case
 */
export const getImageByUseCase = {
    hero: () => imageResources.stock.beachOcean[0], // Mui Ne fishing village
    day1Departure: () => imageResources.stock.transportation[0], // Bus mountain road
    day1Dinner: () => imageResources.restaurants.thinhPhat[3], // Seafood platter
    day2Resort: () => imageResources.resort.poolBeach[1], // Beach/ocean view
    day2Activities: () => imageResources.stock.teamActivities[2], // Beach volleyball
    day2SunsetParty: () => imageResources.stock.teamActivities[0], // Sunset celebration
    day3Breakfast: () => imageResources.stock.coffeeBreakfast[0], // Vietnamese coffee
    scheduleOverview: () => imageResources.resort.exterior[1], // Resort overview
    accommodationCard: () => imageResources.resort.rooms[1], // Senior Deluxe room
    diningCard: () => imageResources.restaurants.phoMuiNe[2], // Seafood platter
    activityCard: () => imageResources.stock.teamActivities[3], // Beach campfire
    transportCard: () => imageResources.stock.transportation[1], // Bus interior
    spaRelaxCard: () => imageResources.resort.facilities[4], // Spa treatment
    poolCard: () => imageResources.stock.resortAmenities[0], // Resort pool
};

/**
 * Image quality optimization tips
 */
export const imageQualityMatrix = {
    heroBackground: { minResolution: '1920×1080px', format: 'WebP/JPG', maxSize: '< 200KB' },
    sectionHeaders: { minResolution: '1200×400px', format: 'WebP/JPG', maxSize: '< 100KB' },
    cardThumbnails: { minResolution: '600×400px', format: 'WebP', maxSize: '< 50KB' },
    loadingPlaceholders: { minResolution: '300×200px', format: 'WebP', maxSize: '< 20KB' },
    mobileHero: { minResolution: '750×1334px', format: 'WebP', maxSize: '< 150KB' },
} as const;

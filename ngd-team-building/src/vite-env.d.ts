/// <reference types="vite/client" />

// Type declarations for vite-imagetools with alias paths
// This allows importing images with query parameters for build-time optimization

declare module '@/assets/Images/*' {
    const src: string
    export default src
}

// Support for all common image formats with any query params
declare module '*.jpg' {
    const src: string
    export default src
}

declare module '*.jpeg' {
    const src: string
    export default src
}

declare module '*.png' {
    const src: string
    export default src
}

declare module '*.webp' {
    const src: string
    export default src
}

declare module '*.avif' {
    const src: string
    export default src
}


#!/bin/bash

# Image Optimization Script for NGD Team Building 2025
# This script optimizes images for web use:
# - Resizes images to max 1920px width (maintaining aspect ratio)
# - Creates WebP versions for modern browsers
# - Creates smaller thumbnail versions (400px width)
# - Compresses JPEG with 85% quality

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
MAX_WIDTH=1920
THUMB_WIDTH=400
JPEG_QUALITY=85
WEBP_QUALITY=85

# Source and output directories
SRC_DIR="src/assets/Images"
OUTPUT_DIR="src/assets/Images-optimized"

echo -e "${YELLOW}🖼️  NGD Team Building - Image Optimization Script${NC}"
echo "=================================================="

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo -e "${RED}❌ ImageMagick is not installed.${NC}"
    echo "Please install it using: brew install imagemagick"
    exit 1
fi

# Check if cwebp is installed (for WebP conversion)
if ! command -v cwebp &> /dev/null; then
    echo -e "${YELLOW}⚠️  cwebp not found. Installing via Homebrew...${NC}"
    brew install webp
fi

# Create output directory structure
echo -e "\n${GREEN}📁 Creating output directories...${NC}"
mkdir -p "$OUTPUT_DIR/Deluxe Twin"
mkdir -p "$OUTPUT_DIR/Deluxe Double"
mkdir -p "$OUTPUT_DIR/thumbnails/Deluxe Twin"
mkdir -p "$OUTPUT_DIR/thumbnails/Deluxe Double"

# Function to optimize a single image
optimize_image() {
    local src_file="$1"
    local output_base="$2"
    local filename=$(basename "$src_file")
    local name="${filename%.*}"

    echo -e "  Processing: ${YELLOW}$filename${NC}"

    # Create optimized JPEG (full size)
    convert "$src_file" \
        -resize "${MAX_WIDTH}x>" \
        -quality $JPEG_QUALITY \
        -strip \
        -interlace Plane \
        "${output_base}/${name}.jpg"

    # Create WebP version (full size)
    cwebp -q $WEBP_QUALITY "${output_base}/${name}.jpg" -o "${output_base}/${name}.webp" 2>/dev/null

    # Create thumbnail JPEG
    convert "$src_file" \
        -resize "${THUMB_WIDTH}x>" \
        -quality 80 \
        -strip \
        "${output_base}/../thumbnails/$(dirname "${output_base##*/}")/${name}-thumb.jpg"

    # Create thumbnail WebP
    cwebp -q 80 "${output_base}/../thumbnails/$(dirname "${output_base##*/}")/${name}-thumb.jpg" \
        -o "${output_base}/../thumbnails/$(dirname "${output_base##*/}")/${name}-thumb.webp" 2>/dev/null

    # Show size comparison
    local original_size=$(ls -la "$src_file" | awk '{print $5}')
    local optimized_size=$(ls -la "${output_base}/${name}.jpg" | awk '{print $5}')
    local webp_size=$(ls -la "${output_base}/${name}.webp" | awk '{print $5}')

    local original_mb=$(echo "scale=2; $original_size / 1048576" | bc)
    local optimized_kb=$(echo "scale=0; $optimized_size / 1024" | bc)
    local webp_kb=$(echo "scale=0; $webp_size / 1024" | bc)

    echo -e "    Original: ${RED}${original_mb}MB${NC} → JPEG: ${GREEN}${optimized_kb}KB${NC} → WebP: ${GREEN}${webp_kb}KB${NC}"
}

# Process Deluxe Twin images
echo -e "\n${GREEN}🛏️  Processing Deluxe Twin images...${NC}"
for img in "$SRC_DIR/Deluxe Twin"/*.jpg; do
    if [ -f "$img" ]; then
        optimize_image "$img" "$OUTPUT_DIR/Deluxe Twin"
    fi
done

# Process Deluxe Double images
echo -e "\n${GREEN}🛏️  Processing Deluxe Double images...${NC}"
for img in "$SRC_DIR/Deluxe Double"/*.jpg; do
    if [ -f "$img" ]; then
        optimize_image "$img" "$OUTPUT_DIR/Deluxe Double"
    fi
done

# Show summary
echo -e "\n${GREEN}✅ Optimization complete!${NC}"
echo "=================================================="

# Calculate total sizes
original_total=$(du -sh "$SRC_DIR" 2>/dev/null | awk '{print $1}')
optimized_total=$(du -sh "$OUTPUT_DIR" 2>/dev/null | awk '{print $1}')

echo -e "Original folder size:  ${RED}$original_total${NC}"
echo -e "Optimized folder size: ${GREEN}$optimized_total${NC}"
echo ""
echo "Output files are in: $OUTPUT_DIR"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Update src/data/room-images.ts to use optimized images"
echo "2. Delete original large images from src/assets/Images"



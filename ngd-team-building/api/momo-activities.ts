import type { VercelRequest, VercelResponse } from '@vercel/node';

interface MoMoActivity {
    name: string;
    date: string;
    amountText: string;
    amount: number;
    icon?: string | null;
}

/**
 * Parses HTML content from MoMo Fund page to extract Recent Activity
 * Based on browser script: find section, parse 3-line pattern, extract icons
 */
function parseMoMoActivities(html: string): MoMoActivity[] {
    const activities: MoMoActivity[] = [];

    // Step 1: Find the "Hoạt động gần đây" section in HTML
    // Look for the text "Hoạt động gần đây" and get its parent container
    const activitySectionMatch = html.match(/Hoạt động[\s\S]*?gần đây[\s\S]*?(?=©\s*2025|Trang chủ|Chuyển khoản vào Quỹ|<\/body|$)/i);

    if (!activitySectionMatch) {
        return [];
    }

    const activitySectionHTML = activitySectionMatch[0];

    // Step 2: Extract all images (icons/avatars) from the activity section
    // These will be matched with activities by index
    const iconMatches = activitySectionHTML.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi);
    const icons: string[] = [];
    for (const match of iconMatches) {
        const src = match[1];
        // Filter out common non-avatar images (logos, etc.)
        if (src && !src.match(/(logo|icon|favicon|og-image)/i)) {
            icons.push(src);
        }
    }

    // Step 3: Extract text content from the section (preserve line structure)
    // Convert block elements to newlines to preserve structure
    let textContent = activitySectionHTML
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '')
        .replace(/<\/?(div|p|li|tr|td|span|h[1-6]|article|section|header|footer|nav|main)[^>]*>/gi, '\n')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]+>/g, ' ') // Remove remaining HTML tags
        .replace(/[ \t]+/g, ' ') // Normalize spaces but keep newlines
        .replace(/\n\s*\n/g, '\n') // Remove empty lines
        .trim();

    // Step 4: Split into lines and find "Hoạt động gần đây"
    const lines = textContent
        .split('\n')
        .map(l => l.trim())
        .filter(Boolean);

    const idx = lines.findIndex(l => l.toLowerCase().includes('hoạt động gần đây'));
    if (idx === -1) {
        return [];
    }

    // Step 5: Get lines after "Hoạt động gần đây"
    const tail = lines.slice(idx + 1);

    // Stop at footer if present
    const stopIdx = tail.findIndex(l => l.startsWith('© ') || l.toLowerCase().includes('trang chủ'));
    const activityLines = stopIdx === -1 ? tail : tail.slice(0, stopIdx);

    // Step 6: Parse activities using 3-line pattern: [name, date, amount]
    // But be flexible - activities might not be exactly 3 lines apart
    for (let i = 0; i < activityLines.length; i++) {
        const line = activityLines[i];
        
        // Check if this line is a date
        const dateMatch = line.match(/(\d{1,2}\/\d{1,2}\/\d{4})/);
        if (!dateMatch) {
            continue;
        }

        const date = dateMatch[1];
        
        // Look for amount in current line or next line
        let amountText = '';
        const amountInLine = line.match(/([+-]\s*[\d.,]+đ)/);
        if (amountInLine) {
            amountText = amountInLine[1];
        } else if (i + 1 < activityLines.length) {
            const nextLine = activityLines[i + 1];
            const amountInNext = nextLine.match(/([+-]\s*[\d.,]+đ)/);
            if (amountInNext) {
                amountText = amountInNext[1];
            }
        }

        if (!amountText) {
            continue;
        }

        // Look for name before date (previous line or in current line before date)
        let name = '';
        if (i > 0) {
            const prevLine = activityLines[i - 1];
            // Name should be uppercase letters, possibly with asterisks, not a date or amount
            if (prevLine && 
                !prevLine.match(/\d{1,2}\/\d{1,2}\/\d{4}/) && 
                !prevLine.match(/[+-]\s*[\d.,]+đ/) &&
                prevLine.length > 1) {
                name = prevLine;
            }
        }

        // If no name in previous line, try to extract from current line before date
        if (!name) {
            const beforeDate = line.substring(0, dateMatch.index).trim();
            if (beforeDate && beforeDate.length > 1 && !beforeDate.match(/\d{1,2}\/\d{1,2}\/\d{4}/)) {
                name = beforeDate;
            }
        }

        // If still no name, skip this activity
        if (!name || name.length < 2) {
            continue;
        }

        // Parse amount
        const sign = amountText.includes('-') ? -1 : 1;
        const numeric = parseInt(amountText.replace(/[^\d]/g, ''), 10) * sign;

        // Get icon by index (0 → first activity, 1 → second, etc.)
        const icon = icons[activities.length] || null;

        // Keep name as-is, including asterisks (***)
        activities.push({
            name: name.trim(), // Keep asterisks in name
            date: date.trim(),
            amountText: amountText.trim(),
            amount: numeric,
            icon: icon || null,
        });
    }

    return activities;
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { url } = req.query;
    const fundUrl = (url as string) || 'https://quy.momo.vn/v2/N3lyQkiNmZ?e14fe';

    try {
        // Fetch the MoMo Fund page
        const response = await fetch(fundUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
            },
        });

        if (!response.ok) {
            return res.status(response.status).json({
                error: `Failed to fetch MoMo page: ${response.statusText}`
            });
        }

        const html = await response.text();
        const activities = parseMoMoActivities(html);

        // Debug logging (only in development or when no activities found)
        if (activities.length === 0) {
            console.log('No activities found. HTML length:', html.length);

            // Find and log the actual "Hoạt động gần đây" section
            const activitySectionMatch = html.match(/Hoạt động[\s\S]*?gần đây[\s\S]{0,2000}/i);
            if (activitySectionMatch) {
                const section = activitySectionMatch[0];
                console.log('Found activity section, length:', section.length);
                
                // Extract text content for debugging
                let debugText = section
                    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                    .replace(/<[^>]+>/g, ' ')
                    .replace(/\s+/g, ' ');
                console.log('Activity section text sample (first 500 chars):', debugText.substring(0, 500));

                // Try to find patterns in the section
                const dateInSection = section.match(/\d{1,2}\/\d{1,2}\/\d{4}/g);
                const amountInSection = section.match(/[+-]\s*[\d.,]+đ/g);
                console.log('Dates found in section:', dateInSection);
                console.log('Amounts found in section:', amountInSection);
            }

            // Also try to find any text that looks like "CHAU" or names with asterisks
            const namePattern = /([A-Z]{2,})\s*[*\\*]+/gi;
            const names = html.match(namePattern);
            if (names) {
                console.log('Potential names found:', names.slice(0, 10));
            }
        }

        // Set cache headers (cache for 5 minutes)
        res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

        return res.status(200).json({
            success: true,
            activities,
            count: activities.length,
            fetchedAt: new Date().toISOString(),
            debug: activities.length === 0 ? {
                htmlLength: html.length,
                hasActivitySection: html.includes('Hoạt động'),
            } : undefined,
        });
    } catch (error) {
        console.error('Error fetching MoMo activities:', error);
        return res.status(500).json({
            error: 'Failed to fetch activities',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

import type { VercelRequest, VercelResponse } from '@vercel/node';

interface MoMoActivity {
    name: string;
    date: string;
    amountText: string;
    amount: number;
}

/**
 * Parses HTML content from MoMo Fund page to extract Recent Activity
 * Based on the DOM parsing approach from the browser script
 */
function parseMoMoActivities(html: string): MoMoActivity[] {
    const activities: MoMoActivity[] = [];

    // Find the "Hoạt động gần đây" section
    // The section typically contains activity entries in a structured format
    const activitySectionRegex = /Hoạt động gần đây[\s\S]*?(?=©\s*2025|Trang chủ|Chuyển khoản vào Quỹ|$)/i;
    const sectionMatch = html.match(activitySectionRegex);

    if (!sectionMatch) {
        return [];
    }

    const activitySection = sectionMatch[0];

    // Normalize the HTML: remove scripts, styles, and convert to text-like structure
    // We'll extract text content while trying to preserve some structure
    let normalizedText = activitySection
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '');

    // Convert common block elements to newlines to preserve structure
    normalizedText = normalizedText
        .replace(/<\/?(div|p|li|tr|td|span|h[1-6])[^>]*>/gi, '\n')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/?[^>]+>/g, ' '); // Remove remaining HTML tags

    // Split into lines and clean up
    const lines = normalizedText
        .split('\n')
        .map(l => l.trim())
        .filter(Boolean);

    // Find the starting index of "Hoạt động gần đây"
    const startIdx = lines.findIndex(l =>
        l.toLowerCase().includes('hoạt động gần đây') ||
        l.toLowerCase().includes('hoat dong gan day')
    );

    if (startIdx === -1) {
        return [];
    }

    // Take lines after the label
    const tail = lines.slice(startIdx + 1);

    // Stop when reaching footer or other sections
    const stopIdx = tail.findIndex(l =>
        l.startsWith('© ') ||
        l.toLowerCase().includes('trang chủ') ||
        l.toLowerCase().includes('chuyển khoản')
    );

    const activityLines = stopIdx === -1 ? tail : tail.slice(0, stopIdx);

    // Each activity appears in a 3-line pattern:
    // [0] Name     (example: "CHAU ******")
    // [1] Date     (example: "10/12/2025")
    // [2] Amount   (example: "+ 500.000đ")
    for (let i = 0; i < activityLines.length; i += 3) {
        const name = activityLines[i];
        const date = activityLines[i + 1];
        const amountText = activityLines[i + 2] || '';

        // Validate: name should contain letters/asterisks, date should match pattern, amount should have +/-
        if (!name || !date || !amountText) {
            // Try to find date pattern in current line if structure is different
            const dateInLine = name?.match(/(\d{1,2}\/\d{1,2}\/\d{4})/);
            const amountInLine = date?.match(/([+-]\s*[\d.,]+đ)/);

            if (dateInLine && amountInLine && name && !name.match(/\d{1,2}\/\d{1,2}\/\d{4}/)) {
                // Alternative structure: name, then date+amount in same line
                const sign = amountInLine[1].includes('-') ? -1 : 1;
                const numeric = parseInt(amountInLine[1].replace(/[^\d]/g, ''), 10) * sign;

                activities.push({
                    name: name.trim(),
                    date: dateInLine[1].trim(),
                    amountText: amountInLine[1].trim(),
                    amount: numeric,
                });
                continue;
            }
            break;
        }

        // Validate date format
        if (!date.match(/\d{1,2}\/\d{1,2}\/\d{4}/)) {
            continue;
        }

        // Validate amount format
        if (!amountText.match(/[+-]\s*[\d.,]+đ/)) {
            continue;
        }

        const sign = amountText.includes('-') ? -1 : 1;
        const numeric = parseInt(amountText.replace(/[^\d]/g, ''), 10) * sign;

        activities.push({
            name: name.trim(),
            date: date.trim(),
            amountText: amountText.trim(),
            amount: numeric,
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

        // Set cache headers (cache for 5 minutes)
        res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

        return res.status(200).json({
            success: true,
            activities,
            count: activities.length,
            fetchedAt: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Error fetching MoMo activities:', error);
        return res.status(500).json({
            error: 'Failed to fetch activities',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

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

    // Strategy: Find element containing "Hoạt động gần đây" and extract from its parent container
    // This mimics the browser script approach: find anchor -> get parent -> parse text

    // Try to find the section using multiple approaches
    let activitySection = '';

    // Approach 1: Look for common HTML patterns around "Hoạt động gần đây"
    // Pattern: text "Hoạt động gần đây" followed by activity entries
    const patterns = [
        // Look for section with "Hoạt động gần đây" and capture until footer
        /(?:<[^>]*>[\s\S]*?)?Hoạt động[\s\S]*?gần đây[\s\S]*?(?:<\/[^>]*>[\s\S]*?)?([\s\S]*?)(?=©\s*2025|Trang chủ|Chuyển khoản vào Quỹ|<\/body|$)/i,
        // Simpler pattern
        /Hoạt động gần đây[\s\S]*?(?=©\s*2025|Trang chủ|Chuyển khoản vào Quỹ|$)/i,
        // Even simpler
        /Hoạt động[\s\S]*?gần đây[\s\S]*?(?=©|Trang chủ|Chuyển khoản|$)/i,
    ];

    for (const pattern of patterns) {
        const match = html.match(pattern);
        if (match && match[0]) {
            activitySection = match[0];
            // If pattern has capture group, use that
            if (match[1]) {
                activitySection = match[1];
            }
            break;
        }
    }

    if (!activitySection) {
        console.log('Could not find "Hoạt động gần đây" section');
        // Try to find any text containing both "Hoạt động" and dates
        const fallbackMatch = html.match(/([\s\S]{0,2000}Hoạt động[\s\S]{0,2000})/i);
        if (fallbackMatch) {
            activitySection = fallbackMatch[1];
            console.log('Using fallback section');
        } else {
            return [];
        }
    }

    // Normalize the HTML: remove scripts, styles, and convert to text-like structure
    // We'll extract text content while trying to preserve some structure
    let normalizedText = activitySection
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '');

    // Convert common block elements to newlines to preserve structure
    // Be more aggressive with line breaks to preserve structure
    normalizedText = normalizedText
        .replace(/<\/?(div|p|li|tr|td|span|h[1-6]|article|section|header|footer|nav|main)[^>]*>/gi, '\n')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/?[^>]+>/g, ' '); // Remove remaining HTML tags

    // Clean up escaped characters (like \* for asterisks, \n for newlines in text)
    normalizedText = normalizedText
        .replace(/\\\*/g, '*')
        .replace(/\\n/g, ' ')
        .replace(/\\t/g, ' ')
        .replace(/\\/g, '')
        .replace(/\s+/g, ' '); // Normalize whitespace

    // Split into lines - be smart about splitting
    // Split on newlines, dates, or amounts
    const lines = normalizedText
        .split(/\n|(?=\d{1,2}\/\d{1,2}\/\d{4})|(?=[+-]\s*\d)/)
        .map(l => l.trim())
        .filter(l => l.length > 0);

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

    // Parse activities using multiple strategies
    // Strategy 1: Look for date patterns and extract surrounding context
    const datePattern = /(\d{1,2}\/\d{1,2}\/\d{4})/g;
    const amountPattern = /([+-]\s*[\d.,]+đ)/g;

    // Find all dates and amounts with their positions
    const dateMatches: Array<{ date: string; index: number; lineIndex: number }> = [];
    const amountMatches: Array<{ amount: string; index: number; lineIndex: number }> = [];

    activityLines.forEach((line, lineIdx) => {
        let match;
        while ((match = datePattern.exec(line)) !== null) {
            dateMatches.push({
                date: match[1],
                index: match.index,
                lineIndex: lineIdx,
            });
        }
        datePattern.lastIndex = 0; // Reset regex

        while ((match = amountPattern.exec(line)) !== null) {
            amountMatches.push({
                amount: match[1].trim(),
                index: match.index,
                lineIndex: lineIdx,
            });
        }
        amountPattern.lastIndex = 0; // Reset regex
    });

    // Match dates with amounts (they should be close together)
    for (const dateInfo of dateMatches) {
        // Find the closest amount after this date (within 2 lines)
        const closestAmount = amountMatches.find(
            a => a.lineIndex >= dateInfo.lineIndex &&
                a.lineIndex <= dateInfo.lineIndex + 2
        );

        if (!closestAmount) continue;

        // Extract name - look backwards from date
        let name = '';
        if (dateInfo.lineIndex > 0) {
            const prevLine = activityLines[dateInfo.lineIndex - 1];
            // Name should contain letters and possibly asterisks, but not dates or amounts
            if (prevLine &&
                !prevLine.match(/\d{1,2}\/\d{1,2}\/\d{4}/) &&
                !prevLine.match(/[+-]\s*[\d.,]+đ/) &&
                prevLine.length > 1) {
                name = prevLine;
            }
        }

        // If no name found, try current line before date
        if (!name && dateInfo.index > 0) {
            const beforeDate = activityLines[dateInfo.lineIndex].substring(0, dateInfo.index).trim();
            if (beforeDate && beforeDate.length > 1 && !beforeDate.match(/\d{1,2}\/\d{1,2}\/\d{4}/)) {
                name = beforeDate;
            }
        }

        if (name && dateInfo.date && closestAmount.amount) {
            const sign = closestAmount.amount.includes('-') ? -1 : 1;
            const numeric = parseInt(closestAmount.amount.replace(/[^\d]/g, ''), 10) * sign;

            activities.push({
                name: name.trim(),
                date: dateInfo.date.trim(),
                amountText: closestAmount.amount.trim(),
                amount: numeric,
            });
        }
    }

    // Strategy 2: Try 3-line pattern if Strategy 1 didn't find anything
    if (activities.length === 0) {
        for (let i = 0; i < activityLines.length; i += 3) {
            const name = activityLines[i];
            const date = activityLines[i + 1];
            const amountText = activityLines[i + 2] || '';

            if (!name || !date || !amountText) continue;

            // Validate date format
            if (!date.match(/\d{1,2}\/\d{1,2}\/\d{4}/)) continue;

            // Validate amount format
            if (!amountText.match(/[+-]\s*[\d.,]+đ/)) continue;

            const sign = amountText.includes('-') ? -1 : 1;
            const numeric = parseInt(amountText.replace(/[^\d]/g, ''), 10) * sign;

            activities.push({
                name: name.trim(),
                date: date.trim(),
                amountText: amountText.trim(),
                amount: numeric,
            });
        }
    }

    // Strategy 3: Direct pattern matching in raw HTML (most reliable)
    // This works even if HTML structure is complex
    if (activities.length === 0) {
        // Method 3a: Find all dates, then look for name before and amount after
        const dateRegex = /(\d{1,2}\/\d{1,2}\/\d{4})/g;
        const dates: Array<{ date: string; index: number }> = [];
        let dateMatch;

        while ((dateMatch = dateRegex.exec(html)) !== null) {
            dates.push({ date: dateMatch[1], index: dateMatch.index });
        }

        // For each date, extract context (200 chars before, 100 chars after)
        for (const dateInfo of dates) {
            const start = Math.max(0, dateInfo.index - 200);
            const end = Math.min(html.length, dateInfo.index + 100);
            const context = html.substring(start, end);

            // Look for name before date (should have letters/asterisks)
            const nameBefore = context.match(/([A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ\s\*]{2,30})\s*$/);
            // Look for amount after date
            const amountAfter = context.match(/\d{1,2}\/\d{1,2}\/\d{4}\s*([+-]\s*[\d.,]+đ)/);

            if (nameBefore && amountAfter) {
                let name = nameBefore[1].trim();
                // Clean up name
                name = name.replace(/\\\*/g, '*').replace(/[<>]/g, '').trim();

                // Filter out common non-name patterns
                if (name.length > 1 &&
                    !name.match(/^(Tham gia|Góp quỹ|Chuyển khoản|Hoạt động|Trang chủ|Chủ quỹ|MOMO|BVBank)/i) &&
                    !name.match(/^\d+$/) && // Not just numbers
                    name.match(/[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/)) { // Has letters
                    const amountText = amountAfter[1].trim();
                    const sign = amountText.includes('-') ? -1 : 1;
                    const numeric = parseInt(amountText.replace(/[^\d]/g, ''), 10) * sign;

                    activities.push({
                        name,
                        date: dateInfo.date,
                        amountText,
                        amount: numeric,
                    });
                }
            }
        }

        // Method 3b: Look for pattern with escaped asterisks (CHAU \*\*\*\*\*\*)
        if (activities.length === 0) {
            const escapedPattern = /([A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]+)\s*\\?\*+.*?(\d{1,2}\/\d{1,2}\/\d{4}).*?([+-]\s*[\d.,]+đ)/gi;
            let match;
            while ((match = escapedPattern.exec(html)) !== null) {
                const name = match[1].trim();
                const date = match[2].trim();
                const amountText = match[3].trim();

                if (name && date && amountText && name.length > 1) {
                    const sign = amountText.includes('-') ? -1 : 1;
                    const numeric = parseInt(amountText.replace(/[^\d]/g, ''), 10) * sign;

                    activities.push({
                        name,
                        date,
                        amountText,
                        amount: numeric,
                    });
                }
            }
        }
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
            // Log a sample of the HTML around "Hoạt động"
            const sampleMatch = html.match(/Hoạt động[\s\S]{0,500}/i);
            if (sampleMatch) {
                console.log('Sample HTML around "Hoạt động":', sampleMatch[0].substring(0, 500));
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

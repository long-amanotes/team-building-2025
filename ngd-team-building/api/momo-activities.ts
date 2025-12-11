import type { VercelRequest, VercelResponse } from '@vercel/node';

interface MoMoActivity {
    name: string;
    date: string;
    amountText: string;
    amount: number;
}

/**
 * Parses HTML content from MoMo Fund page to extract Recent Activity
 * Simple approach: Extract text content and find patterns directly
 */
function parseMoMoActivities(html: string): MoMoActivity[] {
    const activities: MoMoActivity[] = [];

    // Step 1: Extract clean text content from HTML
    // Remove all HTML tags but preserve text structure
    let textContent = html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '')
        .replace(/<[^>]+>/g, ' ') // Remove all HTML tags
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();

    // Step 2: Find the "Hoạt động gần đây" section
    const activityIndex = textContent.toLowerCase().indexOf('hoạt động gần đây');
    if (activityIndex === -1) {
        return [];
    }

    // Step 3: Extract section after "Hoạt động gần đây" until footer
    let activitySection = textContent.substring(activityIndex);

    // Stop at footer or other sections
    const stopPatterns = [
        /©\s*2025/i,
        /trang chủ/i,
        /chuyển khoản vào quỹ/i,
    ];

    for (const pattern of stopPatterns) {
        const match = activitySection.match(pattern);
        if (match) {
            activitySection = activitySection.substring(0, match.index);
            break;
        }
    }

    // Step 4: Find all dates in the section
    const dateRegex = /(\d{1,2}\/\d{1,2}\/\d{4})/g;
    const dates: Array<{ date: string; index: number }> = [];
    let dateMatch;

    while ((dateMatch = dateRegex.exec(activitySection)) !== null) {
        dates.push({ date: dateMatch[1], index: dateMatch.index });
    }

    if (dates.length === 0) {
        return [];
    }

    // Step 5: For each date, extract name and amount from context
    for (const dateInfo of dates) {
        // Extract wider context: 150 chars before date, 100 chars after
        const start = Math.max(0, dateInfo.index - 150);
        const end = Math.min(activitySection.length, dateInfo.index + 100);
        const context = activitySection.substring(start, end);

        // Find amount after date (most reliable pattern)
        const amountMatch = context.match(/(\d{1,2}\/\d{1,2}\/\d{4})\s*([+-]\s*[\d.,]+đ)/);
        
        if (!amountMatch) {
            continue; // Skip if no amount found
        }

        const amountText = amountMatch[2].trim();
        const sign = amountText.includes('-') ? -1 : 1;
        const numeric = parseInt(amountText.replace(/[^\d]/g, ''), 10) * sign;

        // Try multiple strategies to find the name
        let name = '';

        // Strategy 1: Look for name before date in context (uppercase letters, possibly with asterisks)
        const nameBeforeDate = context.match(/([A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]{2,25})(?:\s*[*\\*]+)?\s*(\d{1,2}\/\d{1,2}\/\d{4})/);
        if (nameBeforeDate) {
            name = nameBeforeDate[1].trim();
        }

        // Strategy 2: If not found, look in wider context before date
        if (!name || name.length < 2) {
            const widerStart = Math.max(0, dateInfo.index - 300);
            const widerContext = activitySection.substring(widerStart, dateInfo.index);
            
            // Look for name pattern at the end of wider context
            const nameInWider = widerContext.match(/([A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]{2,25})(?:\s*[*\\*]+)?\s*$/);
            if (nameInWider) {
                name = nameInWider[1].trim();
            }
        }

        // Strategy 3: Look for any uppercase word before date (more flexible)
        if (!name || name.length < 2) {
            const beforeDate = activitySection.substring(Math.max(0, dateInfo.index - 200), dateInfo.index);
            // Match any sequence of uppercase letters (2-25 chars) that's not a date or amount
            const flexibleNameMatch = beforeDate.match(/([A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]{2,25})(?:\s*[*\\*]*)?\s*$/);
            if (flexibleNameMatch) {
                const candidate = flexibleNameMatch[1].trim();
                // Validate it's not a common word
                if (!candidate.match(/^(THAM|GÓP|CHUYỂN|HOẠT|TRANG|CHỦ|MOMO|BVBANK|NGÂN|HÀNG|QUỸ|TRÊN|GẦN|ĐÂY)/i) &&
                    !candidate.match(/^\d+$/) && // Not just numbers
                    candidate.match(/[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/)) {
                    name = candidate;
                }
            }
        }

        // If we found a valid name, add the activity
        if (name && name.length >= 2 &&
            !name.match(/^(THAM|GÓP|CHUYỂN|HOẠT|TRANG|CHỦ|MOMO|BVBANK|NGÂN|HÀNG|QUỸ|TRÊN|GẦN|ĐÂY)/i)) {
            activities.push({
                name: name.trim(),
                date: dateInfo.date,
                amountText,
                amount: numeric,
            });
        }
    }

    // Remove duplicates (same name + date + amount)
    const unique = activities.filter((activity, index, self) =>
        index === self.findIndex(a =>
            a.name === activity.name &&
            a.date === activity.date &&
            a.amount === activity.amount
        )
    );

    return unique;
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
                console.log('Activity section sample (first 1000 chars):', section.substring(0, 1000));

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

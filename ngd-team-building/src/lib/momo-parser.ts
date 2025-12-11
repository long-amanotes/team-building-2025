import type { MoMoActivity } from '@/types';

/**
 * Parses HTML content from MoMo Fund page to extract Recent Activity
 * Based on the DOM parsing approach since MoMo doesn't provide a public API
 */
export function parseMoMoActivities(html: string): MoMoActivity[] {
    // Use a simple regex-based approach since we're in Node.js environment
    // The HTML structure contains the activity data in a predictable format

    // Find the "Hoạt động gần đây" section
    const activitySectionRegex = /Hoạt động gần đây[\s\S]*?(?=©\s*2025|$)/i;
    const match = html.match(activitySectionRegex);

    if (!match) {
        return [];
    }

    const activitySection = match[0];

    // Extract text content and normalize
    // Remove HTML tags and normalize whitespace
    const textContent = activitySection
        .replace(/<[^>]+>/g, '\n')
        .replace(/\s+/g, ' ')
        .trim();

    // Split by common patterns that indicate activity entries
    // Pattern: Name (with asterisks), Date (DD/MM/YYYY), Amount (+/- X.XXXđ)
    const lines = textContent
        .split(/\n|(?=\d{1,2}\/\d{1,2}\/\d{4})|(?=[+-]\s*\d)/)
        .map(l => l.trim())
        .filter(Boolean);

    // Find the index after "Hoạt động gần đây"
    const startIdx = lines.findIndex(l =>
        l.toLowerCase().includes('hoạt động gần đây') ||
        l.toLowerCase().includes('hoat dong gan day')
    );

    if (startIdx === -1) {
        return [];
    }

    // Take lines after the label
    const activityLines = lines.slice(startIdx + 1);

    // Parse activities - each activity is typically 3 parts: name, date, amount
    const activities: MoMoActivity[] = [];

    // More robust parsing: look for date patterns (DD/MM/YYYY) and amount patterns (+/- X.XXXđ)
    for (let i = 0; i < activityLines.length; i++) {
        const line = activityLines[i];

        // Check if this line looks like a date (DD/MM/YYYY)
        const dateMatch = line.match(/(\d{1,2}\/\d{1,2}\/\d{4})/);
        if (dateMatch) {
            const date = dateMatch[1];

            // Look backwards for name (previous line or current line before date)
            let name = '';
            if (i > 0) {
                const prevLine = activityLines[i - 1];
                // Name typically contains asterisks or is a person's name
                if (prevLine && !prevLine.match(/\d{1,2}\/\d{1,2}\/\d{4}/) && !prevLine.match(/[+-]\s*\d/)) {
                    name = prevLine;
                }
            }

            // Look forwards for amount (next line or current line after date)
            let amountText = '';
            if (i + 1 < activityLines.length) {
                const nextLine = activityLines[i + 1];
                if (nextLine && nextLine.match(/[+-]\s*[\d.,]+đ/)) {
                    amountText = nextLine;
                }
            }

            // Also check if amount is in the same line as date
            const amountInLine = line.match(/([+-]\s*[\d.,]+đ)/);
            if (amountInLine && !amountText) {
                amountText = amountInLine[1];
            }

            if (name && date && amountText) {
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
    }

    return activities;
}

/**
 * Alternative parsing method using more specific HTML structure
 * This method looks for specific patterns in the HTML
 */
export function parseMoMoActivitiesAdvanced(html: string): MoMoActivity[] {
    const activities: MoMoActivity[] = [];

    // Try to find activity entries using various patterns
    // Pattern 1: Look for text that matches "Name ******" followed by date and amount
    const namePattern = /([A-Z\s]+(?:\*{3,})?)/g;
    const datePattern = /(\d{1,2}\/\d{1,2}\/\d{4})/g;
    const amountPattern = /([+-]\s*[\d.,]+đ)/g;

    // Extract all matches
    const names: string[] = [];
    const dates: string[] = [];
    const amounts: string[] = [];

    let match;
    while ((match = namePattern.exec(html)) !== null) {
        const text = match[1].trim();
        // Filter out common non-name patterns
        if (text.length > 2 && !text.match(/^(Tham gia|Góp quỹ|Chuyển khoản|Hoạt động)/i)) {
            names.push(text);
        }
    }

    while ((match = datePattern.exec(html)) !== null) {
        dates.push(match[1]);
    }

    while ((match = amountPattern.exec(html)) !== null) {
        amounts.push(match[1].trim());
    }

    // Match them up - typically they appear in order
    const minLength = Math.min(names.length, dates.length, amounts.length);
    for (let i = 0; i < minLength; i++) {
        const name = names[i];
        const date = dates[i];
        const amountText = amounts[i];

        if (name && date && amountText) {
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

    return activities;
}

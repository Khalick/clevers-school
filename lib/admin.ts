/**
 * Who is allowed into the admin area.
 *
 * Read from ADMIN_EMAILS (comma-separated) rather than hardcoded, because this
 * repository is public: a literal list in source told anyone on the internet
 * exactly which account to attack. It is not a password — admin still requires
 * signing in — but naming the target removes a layer for free.
 *
 * Also consolidates three separate copies of the same list that had to be kept
 * in sync by hand (middleware plus two API routes).
 *
 *   ADMIN_EMAILS=someone@example.com,another@example.com
 *
 * Comparison is case-insensitive and whitespace-tolerant, since these values are
 * pasted into hosting dashboards — a trailing newline on a credential has
 * already taken this site down once.
 */
export function getAdminEmails(): string[] {
    return (process.env.ADMIN_EMAILS ?? '')
        .split(',')
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
    if (!email) return false;
    const admins = getAdminEmails();
    // An empty list must never mean "allow everyone".
    if (admins.length === 0) return false;
    return admins.includes(email.trim().toLowerCase());
}

import { google } from 'googleapis';

/**
 * Shared Google service-account credentials.
 *
 * Every value is trimmed. This is not defensive padding — a trailing newline on
 * GOOGLE_CLIENT_EMAIL took the live site down: pasting the value into a hosting
 * dashboard appended "\n", Google received an account id of
 * "…gserviceaccount.com\n", and rejected every request with
 * "invalid_grant: Invalid grant: account not found" — an error that points at a
 * deleted account rather than at whitespace, which made it expensive to find.
 *
 * Env values arrive from humans pasting into web forms, so treat surrounding
 * whitespace as always possible and never meaningful.
 */
export function getGoogleCredentials() {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL?.trim();
    const privateKey = process.env.GOOGLE_PRIVATE_KEY
        ?.trim()
        // Dashboards store the key either with literal "\n" or with real
        // newlines, depending on how it was pasted. Normalise both to real ones.
        .replace(/\\n/g, '\n');

    return { clientEmail, privateKey };
}

/** A Drive client with read-only scope, or null if credentials are absent. */
export function getDriveClient() {
    const { clientEmail, privateKey } = getGoogleCredentials();
    if (!clientEmail || !privateKey) return null;

    const auth = new google.auth.GoogleAuth({
        // client_id is deliberately omitted: it plays no part in service-account
        // JWT auth, and passing a stale one only adds a way to go wrong.
        credentials: { client_email: clientEmail, private_key: privateKey },
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    return google.drive({ version: 'v3', auth });
}

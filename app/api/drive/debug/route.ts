import { google } from 'googleapis';
import { NextResponse } from 'next/server';

/**
 * Read-only diagnostic for the Google Drive credentials this deployment is
 * actually running with. Created to answer one question without guessing:
 * "is production using the new service account, or the old deleted one?"
 *
 * Exposes only the client email (not a secret — it identifies the account,
 * the way a username does) and the private key's length, never its contents.
 * Delete this route once the credential rollout is confirmed working.
 */
export async function GET() {
    const email = process.env.GOOGLE_CLIENT_EMAIL ?? null;
    const rawKey = process.env.GOOGLE_PRIVATE_KEY ?? null;

    const result: Record<string, unknown> = {
        GOOGLE_CLIENT_EMAIL: email,
        GOOGLE_PRIVATE_KEY_present: Boolean(rawKey),
        GOOGLE_PRIVATE_KEY_length: rawKey?.length ?? 0,
        expected_email: 'clevers-drive-reader@clevers-school-resources.iam.gserviceaccount.com',
    };
    result.email_matches_expected = email === result.expected_email;

    if (!email || !rawKey) {
        result.auth_test = 'skipped — a variable is missing';
        return NextResponse.json(result, { status: 200 });
    }

    try {
        const auth = new google.auth.GoogleAuth({
            credentials: { client_email: email, private_key: rawKey.replace(/\\n/g, '\n') },
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        });
        const client = await auth.getClient();
        await client.getAccessToken();
        result.auth_test = 'success — Google issued a token for this account';
    } catch (err) {
        result.auth_test = 'FAILED';
        result.auth_error = err instanceof Error ? err.message : String(err);
    }

    return NextResponse.json(result, { status: 200 });
}

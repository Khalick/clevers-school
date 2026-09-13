import { NextResponse, type NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';

import { authOptions } from '@/auth';
import { getAdminEmails, isAdminEmail } from '@/lib/admin';

/**
 * Read-only diagnostic for admin access.
 *
 * The admin gate is enforced in two different places using two different
 * mechanisms — middleware reads the JWT via getToken(), the API routes read the
 * session via getServerSession(). Either can fail independently, and both look
 * identical from the outside ("admin doesn't work"). This reports both.
 *
 * Exposes no secrets: only the signed-in email and the configured allowlist,
 * both of which the signed-in user already knows. Delete once admin is working.
 */
export async function GET(request: NextRequest) {
    const rawAdminEnv = process.env.ADMIN_EMAILS ?? null;

    let session = null;
    let sessionError: string | null = null;
    try {
        session = await getServerSession(authOptions);
    } catch (err) {
        sessionError = err instanceof Error ? err.message : String(err);
    }

    let token = null;
    let tokenError: string | null = null;
    try {
        token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    } catch (err) {
        tokenError = err instanceof Error ? err.message : String(err);
    }

    const sessionEmail = session?.user?.email ?? null;
    const tokenEmail = (token?.email as string | undefined) ?? null;

    return NextResponse.json({
        // --- what the allowlist looks like in this deployment ---
        ADMIN_EMAILS_raw: rawAdminEnv,
        ADMIN_EMAILS_parsed: getAdminEmails(),
        ADMIN_EMAILS_count: getAdminEmails().length,

        // --- path 1: middleware uses getToken() ---
        token_present: Boolean(token),
        token_email: tokenEmail,
        token_email_is_admin: isAdminEmail(tokenEmail),
        token_error: tokenError,

        // --- path 2: admin API routes use getServerSession() ---
        session_present: Boolean(session),
        session_email: sessionEmail,
        session_email_is_admin: isAdminEmail(sessionEmail),
        session_error: sessionError,

        // --- supporting env ---
        NEXTAUTH_SECRET_present: Boolean(process.env.NEXTAUTH_SECRET),
        NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? null,
    });
}

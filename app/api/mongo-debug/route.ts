import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

/**
 * Read-only diagnostic for the MongoDB connection this deployment is actually
 * using. Built to answer one question without guessing: "is production
 * pointed at the new cluster, or still at the dead Bahrain one?"
 *
 * Exposes only the hostname (not credentials) and the database name.
 * Delete this route once the credential rollout is confirmed working.
 */
export async function GET() {
    const uri = process.env.MONGODB_URI ?? null;
    const dbName = process.env.MONGODB_DB ?? null;

    let host: string | null = null;
    if (uri) {
        try {
            host = new URL(uri.replace(/^mongodb(\+srv)?:\/\//, 'https://')).hostname;
        } catch {
            host = '(could not parse)';
        }
    }

    const result: Record<string, unknown> = {
        MONGODB_URI_present: Boolean(uri),
        MONGODB_URI_host: host,
        expected_host: 'cluster0.rcreqgi.mongodb.net',
        host_matches_expected: host === 'cluster0.rcreqgi.mongodb.net',
        MONGODB_DB: dbName,
    };

    if (!uri) {
        result.connect_test = 'skipped — MONGODB_URI is not set';
        return NextResponse.json(result);
    }

    const start = Date.now();
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });
    try {
        await client.connect();
        await client.db(dbName || 'clevers_schools').command({ ping: 1 });
        result.connect_test = 'success';
        result.connect_ms = Date.now() - start;
    } catch (err) {
        result.connect_test = 'FAILED';
        result.connect_ms = Date.now() - start;
        result.connect_error = err instanceof Error ? err.message : String(err);
    } finally {
        await client.close().catch(() => {});
    }

    return NextResponse.json(result);
}

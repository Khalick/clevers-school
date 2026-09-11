/**
 * MongoDB connection checker.
 *
 * Tests MONGODB_URI / MONGODB_DB before you deploy, and translates common
 * connection errors into plain language.
 *
 *   node --env-file=.env.local scripts/check-mongo.mjs
 */
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'clevers_schools';

const ok = (m) => console.log(`  \x1b[32m✓\x1b[0m ${m}`);
const bad = (m) => console.log(`  \x1b[31m✗\x1b[0m ${m}`);
const info = (m) => console.log(`    ${m}`);

console.log('\nMongoDB connection check\n');

if (!uri) {
    bad('MONGODB_URI is not set');
    process.exit(1);
}

let hostShown = uri;
try {
    const u = new URL(uri.replace('mongodb+srv://', 'https://').replace('mongodb://', 'https://'));
    hostShown = u.hostname;
} catch {
    /* best-effort only */
}
ok(`MONGODB_URI is set (host: ${hostShown})`);
ok(`MONGODB_DB = ${dbName}`);

console.log('\nConnecting…\n');

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });

try {
    await client.connect();
    ok('Connected to the cluster');

    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    ok(`Database "${dbName}" is reachable — ${collections.length} collection(s)`);
    collections.forEach((c) => info(`• ${c.name}`));

    if (collections.length === 0) {
        console.log('');
        info('This is a brand-new, empty database — that is expected for a new');
        info('cluster. Collections (users, subscriptions, etc.) will be created');
        info('automatically the first time someone signs up or subscribes.');
    }
} catch (err) {
    const msg = String(err?.message ?? err);
    bad(`Connection failed: ${msg}`);
    console.log('');
    if (/bad auth|authentication failed/i.test(msg)) {
        info('MEANING: the username or password in the connection string is wrong.');
        info('FIX: check Database Access in Atlas, or reset the password there');
        info('     and paste the new one into the connection string.');
    } else if (/ENOTFOUND|querySrv|ETIMEDOUT/i.test(msg)) {
        info('MEANING: the hostname could not be reached — either the cluster');
        info('name is wrong, or the cluster is paused/unavailable (this is the');
        info('exact failure mode of the Bahrain cluster).');
    } else if (/whitelist|IP that isn.t whitelisted|not authorized/i.test(msg)) {
        info('MEANING: your current IP (or Vercel\'s) is not in Network Access.');
        info('FIX: in Atlas, Network Access -> Add IP Address -> 0.0.0.0/0');
        info('     (allow from anywhere) since Vercel has no fixed IP.');
    }
    console.log('');
    process.exit(1);
} finally {
    await client.close();
}
console.log('');

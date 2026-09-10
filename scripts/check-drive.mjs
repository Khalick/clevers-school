/**
 * Google Drive credential checker.
 *
 * Tests GOOGLE_CLIENT_EMAIL / GOOGLE_PRIVATE_KEY against Google before you
 * deploy, and translates Google's cryptic errors into what is actually wrong.
 *
 *   node --env-file=.env.local scripts/check-drive.mjs
 *   node --env-file=.env.local scripts/check-drive.mjs <folderId>
 */
import { google } from 'googleapis';

const email = process.env.GOOGLE_CLIENT_EMAIL;
const rawKey = process.env.GOOGLE_PRIVATE_KEY;
const folderId = process.argv[2];

const ok = (m) => console.log(`  \x1b[32m✓\x1b[0m ${m}`);
const bad = (m) => console.log(`  \x1b[31m✗\x1b[0m ${m}`);
const info = (m) => console.log(`    ${m}`);

console.log('\nGoogle Drive credential check\n');

/* --- 1. Are the variables present and shaped correctly? --- */
if (!email) {
    bad('GOOGLE_CLIENT_EMAIL is not set');
    process.exit(1);
}
ok(`GOOGLE_CLIENT_EMAIL = ${email}`);
if (!email.endsWith('.iam.gserviceaccount.com')) {
    bad('That does not look like a service-account address');
    info('It should end in .iam.gserviceaccount.com');
}

if (!rawKey) {
    bad('GOOGLE_PRIVATE_KEY is not set');
    process.exit(1);
}
const key = rawKey.replace(/\\n/g, '\n');
if (/^["']|["']$/.test(rawKey.trim())) {
    bad('GOOGLE_PRIVATE_KEY is wrapped in quotes — remove them');
    info('Vercel stores the value literally; the quotes become part of the key.');
}
if (!key.includes('-----BEGIN PRIVATE KEY-----')) {
    bad('GOOGLE_PRIVATE_KEY is missing the -----BEGIN PRIVATE KEY----- header');
    process.exit(1);
}
ok(`GOOGLE_PRIVATE_KEY looks well-formed (${key.split('\n').length} lines)`);

/* --- 2. Can we actually get a token? --- */
console.log('\nAuthenticating with Google…\n');
const auth = new google.auth.GoogleAuth({
    credentials: { client_email: email, private_key: key },
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

let drive;
async function tryAuth(attempt) {
    const client = await auth.getClient();
    await client.getAccessToken();
    return client;
}

let lastErr;
for (let attempt = 1; attempt <= 3; attempt++) {
    try {
        await tryAuth(attempt);
        drive = google.drive({ version: 'v3', auth });
        ok('Google issued an access token — the service account is valid and enabled');
        lastErr = null;
        break;
    } catch (err) {
        lastErr = err;
        const transient = /failed, reason:\s*$|ECONNRESET|ETIMEDOUT|EAI_AGAIN/.test(String(err?.message ?? ''));
        if (transient && attempt < 3) {
            info(`Network hiccup reaching Google (attempt ${attempt}/3) — retrying…`);
            await new Promise((r) => setTimeout(r, 1500 * attempt));
            continue;
        }
        break;
    }
}

if (lastErr) {
    const err = lastErr;
    const msg = String(err?.message ?? err);
    bad(`Authentication failed: ${msg}`);
    console.log('');
    if (msg.includes('account not found')) {
        info('MEANING: Google has no service account with that address.');
        info('It was deleted, or the whole Cloud project was deleted.');
        info('FIX: create a new service account and update the env vars.');
    } else if (msg.includes('Invalid JWT Signature')) {
        info('MEANING: the account exists but the private key does not match it.');
        info('FIX: download a fresh JSON key and copy client_email AND');
        info('     private_key from the SAME file — they are a matched pair.');
    } else if (msg.includes('invalid_grant')) {
        info('MEANING: Google rejected the credentials.');
        info('The key may have been disabled — Google auto-disables keys it');
        info('detects published on GitHub, which happened to this repo.');
    } else if (/decoder|DECODER|asn1/i.test(msg)) {
        info('MEANING: the private key text is malformed.');
        info('FIX: check the newlines survived. Paste the key exactly as it');
        info('     appears in the JSON file, including BEGIN/END lines.');
    }
    console.log('');
    process.exit(1);
}

/* --- 3. Can it actually see the folders? --- */
if (folderId) {
    console.log('');
    try {
        const res = await drive.files.list({
            q: `'${folderId}' in parents and trashed = false`,
            fields: 'files(id, name, mimeType)',
            pageSize: 5,
        });
        const files = res.data.files ?? [];
        if (files.length === 0) {
            bad(`Folder ${folderId} returned 0 files`);
            info('Either the folder is empty, or it is not shared with');
            info(`${email}. Share it with that address as Viewer.`);
        } else {
            ok(`Folder ${folderId} returned ${files.length} file(s):`);
            files.forEach((f) => info(`• ${f.name}`));
        }
    } catch (err) {
        bad(`Could not read folder ${folderId}: ${err?.message ?? err}`);
        info('A 404 here almost always means the folder has not been shared');
        info(`with ${email}.`);
    }
} else {
    console.log('');
    info('Tip: pass a folder id to also test read access, e.g.');
    info('  node --env-file=.env.local scripts/check-drive.mjs 1Bm1fp5Z-En0uR0aSHQq9vjvWDguyx6KO');
}
console.log('');

/**
 * Reads a downloaded Google service-account JSON key and writes the two env
 * vars into .env.local correctly, then prints Vercel-ready values.
 *
 * Copying a private key by hand is where this usually goes wrong — a lost
 * newline or a stray quote produces a "DECODER routines::unsupported" error
 * that looks nothing like its cause.
 *
 *   node scripts/setup-drive-env.mjs ~/Downloads/clevers-school-resources-abc123.json
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const jsonPath = process.argv[2];
if (!jsonPath) {
    console.error('\nUsage: node scripts/setup-drive-env.mjs <path-to-key.json>\n');
    console.error('Example:');
    console.error('  node scripts/setup-drive-env.mjs ~/Downloads/clevers-school-resources-1a2b3c.json\n');
    process.exit(1);
}
if (!existsSync(jsonPath)) {
    console.error(`\nNo file at: ${jsonPath}\n`);
    process.exit(1);
}

let key;
try {
    key = JSON.parse(readFileSync(jsonPath, 'utf8'));
} catch {
    console.error('\nThat file is not valid JSON. Make sure you picked the .json key file.\n');
    process.exit(1);
}

const { client_email, private_key, project_id, type } = key;
if (type !== 'service_account' || !client_email || !private_key) {
    console.error('\nThat JSON is not a service-account key (needs client_email and private_key).\n');
    process.exit(1);
}

// Update .env.local in place, replacing any existing values.
const envPath = '.env.local';
const existing = existsSync(envPath) ? readFileSync(envPath, 'utf8') : '';
const oneLine = private_key.replace(/\n/g, '\\n');

const lines = existing
    .split('\n')
    .filter((l) => !/^GOOGLE_(CLIENT_EMAIL|PRIVATE_KEY)=/.test(l));
lines.push(`GOOGLE_CLIENT_EMAIL=${client_email}`);
lines.push(`GOOGLE_PRIVATE_KEY="${oneLine}"`);
writeFileSync(envPath, lines.filter(Boolean).join('\n') + '\n');

console.log(`\n✓ Wrote GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY to ${envPath}`);
console.log(`  project: ${project_id}`);
console.log('\n─────────────────────────────────────────────────────');
console.log('SHARE YOUR DRIVE FOLDER WITH THIS ADDRESS (as Viewer):\n');
console.log(`  ${client_email}`);
console.log('\n─────────────────────────────────────────────────────');
console.log('FOR VERCEL — paste these two, no surrounding quotes:\n');
console.log('  Name:  GOOGLE_CLIENT_EMAIL');
console.log(`  Value: ${client_email}\n`);
console.log('  Name:  GOOGLE_PRIVATE_KEY');
console.log(`  Value: ${oneLine.slice(0, 60)}…  (full value written to ${envPath})`);
console.log('\nNext: node --env-file=.env.local scripts/check-drive.mjs\n');

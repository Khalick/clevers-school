/**
 * Regenerates lib/routes.generated.ts from the filesystem.
 *
 * The manifest lets client components check that a destination exists before
 * offering it as a suggestion, so a fallback link can never be a dead end.
 * Run after adding or removing a route:  npm run routes
 */
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const root = process.cwd();
const appDir = join(root, 'app');

function walk(dir, out = []) {
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        if (statSync(full).isDirectory()) walk(full, out);
        else if (entry === 'page.tsx') out.push(full);
    }
    return out;
}

const routes = [
    ...new Set(
        walk(appDir)
            .map((f) => '/' + relative(appDir, f).split(sep).slice(0, -1).join('/'))
            .map((r) => (r === '/' ? '/' : r.replace(/\/$/, '')))
            .filter((r) => !r.includes('['))
    ),
].sort();

writeFileSync(
    join(root, 'lib', 'routes.generated.ts'),
    `/**
 * Every static page route in app/, generated from the filesystem.
 *
 * Used at runtime to check a destination exists before offering it as a
 * suggestion, so a fallback link can never itself be a dead end.
 *
 * Regenerate with: npm run routes
 */
export const ALL_ROUTES: readonly string[] = [
${routes.map((r) => `    '${r}'`).join(',\n')},
] as const;

export const ROUTE_SET = new Set(ALL_ROUTES);

export function routeExists(path: string): boolean {
    return ROUTE_SET.has(path.split('?')[0].split('#')[0].replace(/\\/$/, '') || '/');
}
`
);

console.log(`lib/routes.generated.ts — ${routes.length} routes`);

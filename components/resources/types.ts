/**
 * Shared types for the resource browser.
 *
 * These replace `type FileItem = …` redeclared in 125 separate page files, in
 * two mutually incompatible shapes (Drive items keyed by `id`, Firebase items by
 * `url`), which is why documents under /college and /research could never be
 * opened — the paywall required an `id` those items never had.
 */

export interface ResourceFile {
    /** Google Drive file id. Absent for Firebase-backed items. */
    id?: string;
    name: string;
    mimeType?: string;
    webViewLink?: string;
    /** Firebase Storage download URL. Absent for Drive items. */
    url?: string;
    /** ISO timestamp, from the Drive API. */
    modifiedTime?: string;
    /** Bytes, as a string — the Drive API returns it that way. */
    size?: string;
    /** Which folder this came from, for grouped listings. */
    sectionId?: string;
}

export type ResourceSource =
    /** One Drive folder. */
    | { kind: 'drive'; folderId: string }
    /** Several Drive folders, fetched together and shown under headings. */
    | { kind: 'drive-multi'; folders: ResourceFolder[] }
    /** Several Drive folders as an accordion, each fetched when first opened. */
    | { kind: 'drive-lazy'; folders: ResourceFolder[] }
    /** One Firebase Storage path. */
    | { kind: 'firebase'; folderPath: string };

export interface ResourceFolder {
    id: string;
    label: string;
}

/** A stable key for a file, whichever backend it came from. */
export function fileKey(file: ResourceFile): string {
    return file.id ?? file.url ?? file.name;
}

/**
 * The document page URL. Centralised because the payload shape must stay
 * byte-compatible with what app/document/[name]/page.tsx parses.
 */
export function documentHref(file: ResourceFile): string {
    const segment = file.id ?? file.name;
    return `/document/${encodeURIComponent(segment)}?fileData=${encodeURIComponent(
        JSON.stringify(file),
    )}`;
}

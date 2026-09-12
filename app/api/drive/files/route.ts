// app/api/drive/files/route.ts
import { NextResponse } from 'next/server';

import { getDriveClient } from '@/lib/googleAuth';

export async function GET(request: Request) {
    try {
        const drive = getDriveClient();
        if (!drive) {
            return NextResponse.json(
                { error: 'Google Drive credentials are not configured' },
                { status: 503 }
            );
        }

        const { searchParams } = new URL(request.url);
        const folderId = searchParams.get('folderId');

        if (!folderId) {
            return NextResponse.json(
                { error: 'Folder ID is required' },
                { status: 400 }
            );
        }

        const response = await drive.files.list({
            // modifiedTime and size were not requested before, so every row's
            // "Last modified" line rendered undefined and was never shown.
            fields: 'files(id, name, mimeType, webViewLink, modifiedTime, size)',
            q: `'${folderId}' in parents and trashed = false`,
            orderBy: 'name',
            pageSize: 1000,
            // Without these two, a service account gets an EMPTY result for
            // folders it can otherwise see and open — no error, just zero
            // files — whenever the folder sits inside a structure Drive treats
            // as a shared/team context rather than a plain personal folder.
            // That is exactly what every folder in this project's Drive does:
            // files.get on the folder succeeds, but files.list on its contents
            // silently returns nothing without these flags.
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
        });

        return NextResponse.json({ files: response.data.files });
    } catch (error) {
        console.error('Error in GET /api/drive/files:', error);
        return NextResponse.json(
            { error: 'Failed to fetch files: ' + (error instanceof Error ? error.message : String(error)) },
            { status: 500 }
        );
    }
}
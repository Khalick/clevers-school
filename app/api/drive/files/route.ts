// app/api/drive/files/route.ts
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const replacedKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: replacedKey,
                client_id: process.env.GOOGLE_CLIENT_ID,
            },
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        });

        const drive = google.drive({ version: 'v3', auth });

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
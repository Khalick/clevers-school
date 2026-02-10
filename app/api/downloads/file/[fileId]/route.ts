import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { google } from 'googleapis';

import { authOptions } from '@/auth';
import { getUserSubscription } from '@/lib/subscription';

// Create a single Drive client instance (module-level caching)
let driveClient: ReturnType<typeof google.drive> | null = null;

function getDriveClient() {
    if (!driveClient) {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        });
        driveClient = google.drive({ version: 'v3', auth });
    }
    return driveClient;
}

// Constants for optimization
const CHUNK_SIZE = 256 * 1024; // 256KB chunks for optimal streaming

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ fileId: string }> }
) {
    try {
        // Early auth check before any Google API calls
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 });
        }

        // Check for active subscription
        const subscription = await getUserSubscription(session.user.id);
        if (!subscription) {
            return new Response('Payment Required: Premium subscription needed', { status: 402 });
        }

        // In Next.js 15+, params must be awaited
        const { fileId } = await context.params;
        const drive = getDriveClient();

        // Fetch file metadata
        let fileMetadata;
        try {
            const file = await drive.files.get({
                fileId: fileId,
                fields: 'name, mimeType, size',
            });

            if (!file.data) {
                return new Response('File not found', { status: 404 });
            }

            fileMetadata = file.data;
        } catch (metaError: unknown) {
            console.error('Failed to fetch file metadata:', metaError);
            const errorMessage = metaError instanceof Error ? metaError.message : String(metaError);
            if (errorMessage.includes('notFound') || errorMessage.includes('404')) {
                return new Response('File not found', { status: 404 });
            }
            return new Response('Failed to access file', { status: 502 });
        }

        // Set up headers
        const headers = new Headers({
            'Content-Type': fileMetadata.mimeType || 'application/octet-stream',
            'Content-Disposition': `attachment; filename="${encodeURIComponent(fileMetadata.name || 'download')}"`,
            'Cache-Control': 'public, max-age=3600',
        });

        if (fileMetadata.size) {
            headers.set('Content-Length', fileMetadata.size.toString());
        }

        // Stream the file content
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    const response = await drive.files.get(
                        {
                            fileId: fileId,
                            alt: 'media',
                        },
                        {
                            responseType: 'stream',
                            timeout: 60000, // 60s timeout for large files
                        }
                    );

                    let buffer = Buffer.alloc(0);

                    response.data.on('data', (chunk: Buffer) => {
                        buffer = Buffer.concat([buffer, chunk]);

                        // Enqueue when we have enough data
                        while (buffer.length >= CHUNK_SIZE) {
                            controller.enqueue(new Uint8Array(buffer.slice(0, CHUNK_SIZE)));
                            buffer = buffer.slice(CHUNK_SIZE);
                        }
                    });

                    response.data.on('end', () => {
                        // Enqueue any remaining data
                        if (buffer.length > 0) {
                            controller.enqueue(new Uint8Array(buffer));
                        }
                        controller.close();
                    });

                    response.data.on('error', (error: Error) => {
                        console.error('Stream error:', error);
                        controller.error(error);
                    });
                } catch (error) {
                    console.error('Stream initialization error:', error);
                    controller.error(error);
                }
            },
            cancel() {
                console.log('Download cancelled by client');
            }
        });

        return new Response(stream, { headers });
    } catch (error) {
        console.error('Download error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
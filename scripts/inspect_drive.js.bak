const { google } = require('googleapis');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function searchFolders(queryName) {
    try {
        const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: privateKey,
                client_id: process.env.GOOGLE_CLIENT_ID,
            },
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        });

        const drive = google.drive({ version: 'v3', auth });

        console.log(`Searching for folders matching: ${queryName}`);
        const response = await drive.files.list({
            q: `name contains '${queryName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
            fields: 'files(id, name)',
            orderBy: 'name',
        });

        const files = response.data.files;
        if (files.length) {
            files.forEach((file) => {
                console.log(`Found: ${file.name} (${file.id})`);
            });
        } else {
            console.log(`No folders found for ${queryName}`);
        }
    } catch (error) {
        console.error('Error searching folders:', error);
    }
}

async function main() {
    await searchFolders('Grade 7');
    await searchFolders('Grade 8');
    await searchFolders('Exams');
    await searchFolders('Schemes');
}

main();

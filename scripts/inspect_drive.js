const { google } = require('googleapis');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function checkFolder(drive, folderId, folderName) {
    try {
        console.log(`\nChecking folder: ${folderName} (${folderId})...`);
        const response = await drive.files.list({
            q: `'${folderId}' in parents and trashed = false`,
            fields: 'files(id, name, mimeType)',
            orderBy: 'name',
            pageSize: 10 // Limit output
        });

        const files = response.data.files;
        if (files.length) {
            console.log(`✅ Found ${files.length} files/folders. First few:`);
            files.slice(0, 5).forEach((file) => {
                console.log(`   - ${file.name} (${file.mimeType})`);
            });
        } else {
            console.log(`❌ Folder is EMPTY or not accessible.`);
        }
    } catch (error) {
        console.error(`❌ Error checking folder ${folderName}:`, error.message);
    }
}

async function searchFolders(drive, queryName) {
    try {
        console.log(`\nSearching for folders matching: "${queryName}"...`);
        const response = await drive.files.list({
            q: `name contains '${queryName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
            fields: 'files(id, name)',
            orderBy: 'name',
            pageSize: 10
        });

        const files = response.data.files;
        if (files.length) {
            files.forEach((file) => {
                console.log(`   found: ${file.name} (${file.id})`);
            });
        } else {
            console.log(`   No folders found for "${queryName}"`);
        }
    } catch (error) {
        console.error('Error searching folders:', error);
    }
}

async function main() {
    try {
        const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
        if (!privateKey) {
            console.error("Missing GOOGLE_PRIVATE_KEY");
            return;
        }

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: privateKey,
                client_id: process.env.GOOGLE_CLIENT_ID,
            },
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        });

        const drive = google.drive({ version: 'v3', auth });

        // Check specific folders
        await checkFolder(drive, '1SpaOayIHCjF9BDRlClok4afdT87u-opo', 'KCSE 2023');
        await checkFolder(drive, '1ULXQgHzDTOs3CfUUdZBc3t9Df7z97mzZ', 'KCSE 2022');
        await checkFolder(drive, '1rHkPMfKpAafugE7Goo5BnJ9yZzzNI6dJ', 'KCSE 2021');
        await checkFolder(drive, '1C6ix515PlY1rIFHBnylKstLB4kt4s99E', 'KCSE 2020');
        await checkFolder(drive, '13-OdW-pg2vHt4CmXVuZRmej9qM6oF-OS', 'SetBooks (TopMark)');
        await checkFolder(drive, '1hUSMU0iVJnW2eRZV52I2NIaHL7J7yBhV', 'SetBooks (KCSE Rev)');

        // Search for missing items
        await searchFolders(drive, 'Assignment');
        await searchFolders(drive, 'Set Books');
        await searchFolders(drive, 'Setbooks');
        await searchFolders(drive, '2024');
        await searchFolders(drive, 'KCSE 2024');

    } catch (error) {
        console.error("Main error:", error);
    }
}

main();

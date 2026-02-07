// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getStorage, FirebaseStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Lazy initialization - only initialize when explicitly called at runtime
let app: FirebaseApp | undefined;
let storageInstance: FirebaseStorage | undefined;

/**
 * Get the Firebase app instance. Only initializes when called.
 * Must be called from client-side code only.
 */
export function getFirebaseApp(): FirebaseApp {
    if (!app) {
        // Check if already initialized
        if (getApps().length > 0) {
            app = getApps()[0];
        } else {
            app = initializeApp(firebaseConfig);
        }
    }
    return app;
}

/**
 * Get Firebase Storage instance. Only initializes when called.
 * Must be called from client-side code only.
 */
export function getFirebaseStorage(): FirebaseStorage {
    if (!storageInstance) {
        storageInstance = getStorage(getFirebaseApp());
    }
    return storageInstance;
}
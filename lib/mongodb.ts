import { MongoClient, Db } from 'mongodb';

// Database Configuration - validation happens at runtime, not module load time
const MONGODB_URI = process.env.MONGODB_URI || '';
const DATABASE_NAME = process.env.MONGODB_DB || 'clevers_schools';

const options = {
    maxPoolSize: 10,
    minPoolSize: 5,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
    // eslint-disable-next-line no-var
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Interface for MongoDB error structure
interface MongoDBError {
    code: number;
    message: string;
}

// Type guard to check if an error is a MongoDB error
function isMongoDBError(error: unknown): error is MongoDBError {
    return (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        typeof (error as Record<string, unknown>).code === 'number' &&
        'message' in error &&
        typeof (error as Record<string, unknown>).message === 'string'
    );
}

// Initialize client lazily - only when actually needed
function getClientPromise(): Promise<MongoClient> {
    // Validate environment variable at runtime
    if (!MONGODB_URI) {
        return Promise.reject(new Error('Missing MONGODB_URI environment variable'));
    }

    if (process.env.NODE_ENV === 'development') {
        if (!global._mongoClientPromise) {
            client = new MongoClient(MONGODB_URI, options);
            global._mongoClientPromise = client.connect()
                .catch(err => {
                    console.error('Failed to connect to MongoDB:', err);
                    if (isMongoDBError(err) && err.code === 8000) {
                        console.error('Authentication failed. Please check your credentials.');
                    }
                    throw err;
                });
        }
        return global._mongoClientPromise;
    } else {
        if (!clientPromise) {
            client = new MongoClient(MONGODB_URI, options);
            clientPromise = client.connect()
                .catch(err => {
                    console.error('Failed to connect to MongoDB:', err);
                    if (isMongoDBError(err) && err.code === 8000) {
                        console.error('Authentication failed. Please check your credentials.');
                    }
                    throw err;
                });
        }
        return clientPromise;
    }
}

/**
 * Connects to the MongoDB database with authentication
 * @returns {Promise<{db: Db, client: MongoClient}>}
 */
export async function connectToDatabase(): Promise<{ db: Db; client: MongoClient }> {
    try {
        const client = await getClientPromise();
        const db = client.db(DATABASE_NAME);

        // Test the connection and authentication
        await db.command({ ping: 1 });
        console.log('Successfully connected to MongoDB with authentication.');

        return { db, client };
    } catch (error: unknown) {
        console.error('Error connecting to database:', error);

        if (isMongoDBError(error) && error.code === 8000) {
            throw new Error('Authentication failed. Please verify your MongoDB credentials.');
        }
        throw error;
    }
}

/**
 * Closes the MongoDB connection
 * @returns {Promise<void>}
 */
export async function closeConnection(): Promise<void> {
    try {
        const { client } = await connectToDatabase();
        await client.close();
        console.log('MongoDB connection closed.');
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
        throw error;
    }
}

// Export a function to get the client promise, not the promise itself
export default { getClientPromise };
import { MongoClient, Db } from 'mongodb';

const DATABASE_NAME = process.env.MONGODB_DB || 'clevers_schools';

/**
 * Tuned for serverless (Vercel), where every cold start pays the full
 * connection cost against a wall-clock timeout.
 *
 * minPoolSize was 5, which forced the driver to complete FIVE TLS handshakes
 * to Atlas before the pool was usable. Against a Dublin cluster from a US
 * function, on a cold start, that routinely exceeded the old 10s
 * connectTimeoutMS and surfaced as:
 *   "Socket 'secureConnect' timed out after 10002ms"
 * A serverless function should open connections lazily — one is enough.
 */
const options = {
    maxPoolSize: 10,
    minPoolSize: 0,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    // Without this the driver uses its own 30s default for picking a server,
    // independent of connectTimeoutMS; setting it explicitly keeps the two
    // budgets aligned and makes failures predictable rather than confusing.
    serverSelectionTimeoutMS: 30000,
};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
    // eslint-disable-next-line no-var
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Initialize client lazily - only when actually needed
function getClientPromise(): Promise<MongoClient> {
    // Read env var at call time, not module load time (Vercel may inject after module load)
    const uri = process.env.MONGODB_URI || '';

    if (!uri) {
        return Promise.reject(new Error('Missing MONGODB_URI environment variable'));
    }

    if (process.env.NODE_ENV === 'development') {
        if (!global._mongoClientPromise) {
            client = new MongoClient(uri, options);
            global._mongoClientPromise = client.connect()
                .catch(err => {
                    console.error('Failed to connect to MongoDB:', err);
                    // Reset so the next call retries instead of returning a cached rejected promise
                    global._mongoClientPromise = undefined;
                    throw err;
                });
        }
        return global._mongoClientPromise;
    } else {
        if (!clientPromise) {
            client = new MongoClient(uri, options);
            clientPromise = client.connect()
                .catch(err => {
                    console.error('Failed to connect to MongoDB:', err);
                    // Reset so the next call retries instead of returning a cached rejected promise
                    clientPromise = null;
                    throw err;
                });
        }
        return clientPromise;
    }
}

/**
 * Connects to the MongoDB database
 * @returns {Promise<{db: Db, client: MongoClient}>}
 */
export async function connectToDatabase(): Promise<{ db: Db; client: MongoClient }> {
    try {
        const client = await getClientPromise();
        const db = client.db(DATABASE_NAME);
        return { db, client };
    } catch (error: unknown) {
        console.error('Error connecting to database:', error);
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

export default { getClientPromise };
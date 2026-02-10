import { MongoClient, Db } from 'mongodb';

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
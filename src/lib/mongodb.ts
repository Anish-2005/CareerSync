import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://anish:anish@cluster0.hqbs2di.mongodb.net/';

console.log('MongoDB: URI present:', !!MONGODB_URI);
console.log('MongoDB: URI starts with mongodb:', MONGODB_URI.startsWith('mongodb'));

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  console.log('MongoDB: dbConnect called');

  if (cached.conn) {
    console.log('MongoDB: Using cached connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('MongoDB: Creating new connection promise');
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB: Connection established successfully');
      return mongoose;
    }).catch((error) => {
      console.error('MongoDB: Connection failed:', error);
      throw error;
    });
  }

  try {
    console.log('MongoDB: Awaiting connection promise');
    cached.conn = await cached.promise;
    console.log('MongoDB: Connection ready');
  } catch (e) {
    console.error('MongoDB: Error during connection:', e);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
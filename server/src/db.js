import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/civicchain';

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`[db] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`[db] Error: ${error.message}`);
    } else {
      console.error(`[db] Unknown connection error`);
    }
    process.exit(1);
  }
};

import * as mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected to: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
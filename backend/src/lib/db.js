import mongoose from 'mongoose';

import { ENV } from './env.js';

export const connectDB = async () => {
  try {
    const connection =await mongoose.connect(ENV.DB_URL);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
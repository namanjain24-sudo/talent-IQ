import { StreamChat } from 'stream-chat';
import { StreamClient } from '@stream-io/node-sdk';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Stream Chat Server Client
export const chatServer = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET
);

// Initialize Stream Video Server Client
export const videoServer = new StreamClient(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET,
  'video'
);
import { StreamVideoClient } from "@stream-io/video-react-sdk";
import axios from 'axios';
import authService from './auth';

const apiKey = import.meta.env.VITE_STREAM_API_KEY;
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

let client = null;

export const initializeStreamClient = async (user, token) => {
  // if client exists with same user instead of creating again return it

  if (client && client?.user?.id === user.id) return client;

  if (client) {
    await disconnectStreamClient();
  }

  if (!apiKey) throw new Error("Stream API key is not provided.");

  client = new StreamVideoClient({
    apiKey,
    user,
    token,
  });

  return client;
};

export const disconnectStreamClient = async () => {
  if (client) {
    try {
      await client.disconnectUser();
      client = null;
    } catch (error) {
      console.error("Error disconnecting Stream client:", error);
    }
  }
};

export const getStreamChatToken = async () => {
  try {
    const token = authService.getToken();
    const response = await axios.get(`${API_URL}/api/chat/token`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    // Don't log network errors - backend might not be running
    if (error.code !== 'ERR_NETWORK' && error.message !== 'Network Error') {
      console.error('Error fetching chat token:', error);
    }
    throw error;
  }
};

export const getStreamVideoToken = async () => {
  try {
    const token = authService.getToken();
    const response = await axios.get(`${API_URL}/api/chat/video/token`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    // Don't log network errors - backend might not be running
    if (error.code !== 'ERR_NETWORK' && error.message !== 'Network Error') {
      console.error('Error fetching video token:', error);
    }
    throw error;
  }
};

export const getStreamToken = async () => {
  try {
    const token = authService.getToken();
    const response = await axios.get(`${API_URL}/api/chat/token`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stream token:', error);
    throw error;
  }
};
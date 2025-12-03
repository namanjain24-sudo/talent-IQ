import axios from 'axios';
import authService from '../lib/auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Fetch Stream Chat Token
export const getStreamChatToken = async () => {
  try {
    const token = authService.getToken();
    const response = await axios.get(`${API_URL}/api/chat/chat/token`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching chat token:', error);
    throw error;
  }
};

// Fetch Stream Video Token
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
    console.error('Error fetching video token:', error);
    throw error;
  }
};
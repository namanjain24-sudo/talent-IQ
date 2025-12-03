import axios from 'axios';
import authService from '../lib/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors - refresh token and retry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await authService.refreshAccessToken();
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Redirect to login if refresh fails
        authService.logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Sessions API
export const sessionApi = {
  createSession: async (data) => {
    const response = await api.post("/sessions", data);
    return response.data;
  },

  getActiveSessions: async () => {
    const response = await api.get("/sessions/active");
    return response.data;
  },
  
  getMyRecentSessions: async () => {
    const response = await api.get("/sessions/my-recent");
    return response.data;
  },

  getSessionById: async (id) => {
    const response = await api.get(`/sessions/${id}`);
    return response.data;
  },

  joinSession: async (id) => {
    const response = await api.post(`/sessions/${id}/join`);
    return response.data;
  },
  
  leaveSession: async (id) => {
    const response = await api.post(`/sessions/${id}/leave`);
    return response.data;
  },
  
  endSession: async (id) => {
    const response = await api.post(`/sessions/${id}/end`);
    return response.data;
  },
  
  getStreamToken: async () => {
    const response = await api.get(`/chat/token`);
    return response.data;
  },
};
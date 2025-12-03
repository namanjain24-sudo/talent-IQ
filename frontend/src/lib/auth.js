const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();
    
    if (response.ok && data.accessToken) {
      localStorage.setItem('token', data.accessToken);
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      }
      return data.accessToken;
    } else {
      throw new Error(data.message || 'Failed to refresh token');
    }
  } catch (error) {
    console.error('Token refresh error:', error);
    logout();
    throw error;
  }
};

const register = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    
    if (response.ok && data.accessToken) {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.'
    };
  }
};

const login = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    
    if (response.ok && data.accessToken) {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.'
    };
  }
};

const logout = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (refreshToken) {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ refreshToken }),
      });
      
      if (!response.ok) {
        console.warn('Logout API warning:', response.status, response.statusText);
      }
    }
  } catch (error) {
    console.error('Logout API error:', error);
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
};

const logoutAll = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (token) {
      await fetch(`${API_BASE_URL}/auth/logout-all`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
    }
  } catch (error) {
    console.error('Logout all API error:', error);
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
};

const getToken = () => {
  return localStorage.getItem('token');
};

const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const isLoggedIn = () => {
  return !!getToken();
};

const authenticatedRequest = async (url, options = {}) => {
  let token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  if (response.status === 401) {
    try {
      const newToken = await refreshAccessToken();
      headers['Authorization'] = `Bearer ${newToken}`;
      
      const retryResponse = await fetch(url, {
        ...options,
        headers,
      });
      
      return retryResponse;
    } catch (refreshError) {
      window.location.href = '/login';
      throw refreshError;
    }
  }
  
  return response;
};

const authService = {
  register,
  login,
  logout,
  logoutAll,
  getToken,
  getUser,
  isLoggedIn,
  authenticatedRequest,
  refreshAccessToken
};

export default authService;
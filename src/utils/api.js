const API_BASE_URL = 'http://localhost:3000/api';

const getToken = () => localStorage.getItem('token');

const request = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || '请求失败');
    }

    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

export const api = {
  auth: {
    login: (username, password) =>
      request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      }),
    register: (data) =>
      request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updatePassword: (oldPassword, newPassword) =>
      request('/auth/password', {
        method: 'PUT',
        body: JSON.stringify({ oldPassword, newPassword }),
      }),
    getProfile: () => request('/auth/profile'),
  },

  companies: {
    create: (data) =>
      request('/companies', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    list: () => request('/companies'),
    get: (id) => request(`/companies/${id}`),
  },

  employment: {
    create: (data) =>
      request('/employment-data', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    list: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return request(`/employment-data${queryString ? `?${queryString}` : ''}`);
    },
    get: (id) => request(`/employment-data/${id}`),
  },

  audit: {
    company: (id, action, comment) =>
      request(`/audit/company/${id}`, {
        method: 'POST',
        body: JSON.stringify({ action, comment }),
      }),
    data: (id, action, comment) =>
      request(`/audit/data/${id}`, {
        method: 'POST',
        body: JSON.stringify({ action, comment }),
      }),
    pending: () => request('/audit/pending'),
  },

  notifications: {
    list: () => request('/notifications'),
    markRead: (id) =>
      request(`/notifications/${id}/read`, {
        method: 'PUT',
      }),
    create: (data) =>
      request('/notifications', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },
};

export default api;

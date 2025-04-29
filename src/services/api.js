import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/', // Notez le /api/ à la fin
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    // Si erreur 401 et pas déjà une tentative de refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post('http://localhost:8000/api/token/refresh/', {
          refresh: refreshToken
        });
        
        localStorage.setItem('access_token', response.data.access);
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Si le refresh échoue, déconnectez l'utilisateur
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login'; // Force reload pour nettoyer l'état
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;

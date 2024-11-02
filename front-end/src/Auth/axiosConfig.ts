import axios from 'axios';

// Создание инстанса axios
const api = axios.create({
    baseURL: 'http://localhost:5173',
});

// Интерсептор для проверки ответов
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
            // Удаление токена, если получен 401 или 403
            localStorage.removeItem('token');
            // Редирект на страницу логина
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
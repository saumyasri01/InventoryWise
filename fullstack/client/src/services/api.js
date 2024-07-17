import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

export const fetchBooks = async (filters) => {
    const response = await api.get('/books', { params: filters });
    return response.data;
};

export const fetchBook = async (id) => {
    const response = await api.get(`/books/${id}`);
    return response.data;
};

// Add other API functions as needed

// src/services/bookService.js
const API_BASE_URL = 'http://localhost:3000/api';

export const fetchBooks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/books`);
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};
const mysql = require('mysql2');
const connectDB = require('../config/db');
const connection = connectDB();

const getAllBooks = (callback) => {
    const query = `SELECT book_id, title, price, publication_date, author_name, genre_name FROM Books`;
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error in getAllBooks:', error);
            return callback(error, null);
        }
        console.log('getAllBooks results:', results);
        callback(null, results);
    });
};

const getBookById = (id, callback) => {
    const query = `SELECT book_id, title, price, publication_date, author_name, genre_name FROM Books WHERE book_id = ?`;
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error in getBookById:', error);
            return callback(error, null);
        }
        console.log('getBookById results:', results);
        callback(null, results);
    });
};

const insertBook = (title, price, publication_date, author_name, genre_name, callback) => {
    console.log('Inserting book with data:', { title, price, publication_date, author_name, genre_name });

    if (!title || !price || !publication_date || !author_name || !genre_name) {
        console.error('Invalid input data for insertBook');
        return callback(new Error('Invalid input data'), null);
    }

    const query = 'INSERT INTO Books (title, price, publication_date, author_name, genre_name) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [title, price, publication_date, author_name, genre_name], (error, result) => {
        if (error) {
            console.error('Error in insertBook:', error);
            return callback(error, null);
        }
        console.log('insertBook result:', result);
        callback(null, result);
    });
};

const updateBookById = (id, title, price, publication_date, author_name, genre_name, callback) => {
    console.log('Updating book with data:', { id, title, price, publication_date, author_name, genre_name });

    if (!id || !title || !price || !publication_date || !author_name || !genre_name) {
        console.error('Invalid input data for updateBookById');
        return callback(new Error('Invalid input data'), null);
    }

    const query = 'UPDATE Books SET title = ?, price = ?, publication_date = ?, author_name = ?, genre_name = ? WHERE book_id = ?';
    connection.query(query, [title, price, publication_date, author_name, genre_name, id], (error, result) => {
        if (error) {
            console.error('Error in updateBookById:', error);
            return callback(error, null);
        }
        console.log('updateBookById result:', result);
        callback(null, result);
    });
};

const deleteBookById = (id, callback) => {
    if (!id) {
        console.error('Invalid input data for deleteBookById');
        return callback(new Error('Invalid input data'), null);
    }

    connection.query('DELETE FROM Books WHERE book_id = ?', [id], (error, result) => {
        if (error) {
            console.error('Error in deleteBookById:', error);
            return callback(error, null);
        }
        console.log('deleteBookById result:', result);
        callback(null, result);
    });
};

module.exports = { getAllBooks, getBookById, insertBook, updateBookById, deleteBookById };
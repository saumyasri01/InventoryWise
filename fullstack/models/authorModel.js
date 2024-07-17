const mysql = require('mysql2');
const connectDB = require('../config/db');

const connection = connectDB();

const getAllAuthors = (callback) => {
    connection.query('SELECT * FROM Authors', callback);
};

const fetchAuthorById = (id, callback) => {
    connection.query('SELECT * FROM Authors WHERE author_id = ?', [id], callback);
};

const createAuthor = (name, biography, callback) => {
    connection.query('INSERT INTO Authors (name, biography) VALUES (?, ?)', [name, biography], callback);
};

const updateAuthor = (id, name, biography, callback) => {
    connection.query('UPDATE Authors SET name = ?, biography = ? WHERE author_id = ?', [name, biography, id], callback);
};

const deleteAuthor = (id, callback) => {
    connection.beginTransaction((err) => {
        if (err) {
            return callback(err);
        }

        // First, check if the author has any books
        connection.query('SELECT COUNT(*) as bookCount FROM Books WHERE author_id = ?', [id], (err, results) => {
            if (err) {
                return connection.rollback(() => callback(err));
            }

            const bookCount = results[0].bookCount;

            if (bookCount > 0) {
                return connection.rollback(() => callback(new Error(`Cannot delete author. They have ${bookCount} associated book(s).`)));
            }

            // If no books, proceed with author deletion
            connection.query('DELETE FROM Authors WHERE author_id = ?', [id], (err, result) => {
                if (err) {
                    return connection.rollback(() => callback(err));
                }

                connection.commit((err) => {
                    if (err) {
                        return connection.rollback(() => callback(err));
                    }
                    callback(null, result);
                });
            });
        });
    });
};

module.exports = { getAllAuthors, fetchAuthorById, createAuthor, updateAuthor, deleteAuthor };
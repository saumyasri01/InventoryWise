const connectDB = require('../config/db');

const connection = connectDB();

const getAllGenres = (callback) => {
    connection.query('SELECT * FROM Genres', callback);
};

const fetchGenreById = (id, callback) => {
    connection.query('SELECT * FROM Genres WHERE genre_id = ?', [id], callback);
};

const createGenre = (genreName, callback) => {
    connection.query('INSERT INTO Genres (genre_name) VALUES (?)', [genreName], callback);
};

const deleteGenre = (id, callback) => {
    connection.query('DELETE FROM Genres WHERE genre_id = ?', [id], callback);
};

module.exports = { getAllGenres, fetchGenreById, createGenre, deleteGenre };
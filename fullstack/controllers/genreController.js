const { getAllGenres, fetchGenreById, createGenre, deleteGenre } = require('../models/genreModel');

const getGenres = (req, res) => {
    getAllGenres((err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching genres' });
        } else {
            res.json(results);
        }
    });
};

const getGenreByIdCtrl = (req, res) => {
    const genreId = req.params.id;
    
    fetchGenreById(genreId, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching genre' });
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ message: 'Genre not found' });
            }
        }
    });
};

const createGenreCtrl = (req, res) => {
    const { genreName } = req.body;
    
    createGenre(genreName, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error creating genre' });
        } else {
            res.status(201).json({ message: 'Genre created successfully', id: results.insertId });
        }
    });
};

const deleteGenreCtrl = (req, res) => {
    const genreId = req.params.id;
    
    deleteGenre(genreId, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error deleting genre' });
        } else {
            if (results.affectedRows > 0) {
                res.json({ message: 'Genre deleted successfully' });
            } else {
                res.status(404).json({ message: 'Genre not found' });
            }
        }
    });
};

module.exports = { getGenres, getGenreByIdCtrl, createGenreCtrl, deleteGenreCtrl };
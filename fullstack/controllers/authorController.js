const { getAllAuthors, fetchAuthorById, createAuthor, updateAuthor, deleteAuthor } = require('../models/authorModel');

const getAuthors = (req, res) => {
    getAllAuthors((err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching authors' });
        } else {
            res.json(results);
        }
    });
};

const getAuthorByIdCtrl = (req, res) => {
    const authorId = req.params.id;

    fetchAuthorById(authorId, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching author' });
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ message: 'Author not found' });
            }
        }
    });
};

const createAuthorCtrl = (req, res) => {
    const { name, biography } = req.body;

    createAuthor(name, biography, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error creating author' });
        } else {
            res.status(201).json({ message: 'Author created successfully' });
        }
    });
};

const updateAuthorCtrl = (req, res) => {
    const authorId = req.params.id;
    const { name, biography } = req.body;

    updateAuthor(authorId, name, biography, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error updating author' });
        } else {
            res.json({ message: 'Author updated successfully' });
        }
    });
};

const deleteAuthorCtrl = (req, res) => {
    const authorId = req.params.id;

    deleteAuthor(authorId, (err, results) => {
        if (err) {
            console.error(err);
            if (err.message && err.message.includes('Cannot delete author')) {
                // This is the case where the author has associated books
                return res.status(400).json({ message: err.message });
            }
            // For other types of errors
            return res.status(500).json({ message: 'An error occurred while deleting the author' });
        }

        // Check if any rows were affected by the delete operation
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Author not found' });
        }

        res.json({ message: 'Author deleted successfully' });
    });
};

module.exports = { getAuthors, getAuthorByIdCtrl, createAuthorCtrl, updateAuthorCtrl, deleteAuthorCtrl };
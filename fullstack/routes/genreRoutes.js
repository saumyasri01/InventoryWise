const express = require('express');
const { getGenres, getGenreByIdCtrl, createGenreCtrl, deleteGenreCtrl } = require('../controllers/genreController');


const router = express.Router();

router.get('/', getGenres);
router.get('/:id', getGenreByIdCtrl);
router.post('/', createGenreCtrl);
router.delete('/:id',  deleteGenreCtrl);

module.exports = router;
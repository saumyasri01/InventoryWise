const express = require('express');
const router = express.Router();
const { getAuthors, getAuthorByIdCtrl, createAuthorCtrl, updateAuthorCtrl, deleteAuthorCtrl } = require('../controllers/authorController');


// Routes
router.get('/', getAuthors);
router.get('/:id', getAuthorByIdCtrl);
router.post('/',  createAuthorCtrl);
router.put('/:id', updateAuthorCtrl);
router.delete('/:id', deleteAuthorCtrl);

module.exports = router;

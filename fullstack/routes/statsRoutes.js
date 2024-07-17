const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/statsController');

// Define the route for getting stats
router.get('/', getStats);

module.exports = router;

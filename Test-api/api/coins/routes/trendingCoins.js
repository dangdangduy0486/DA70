const express = require('express');
const router = express.Router();

const { getTrendingCoins, TredingCoinsParser } = require('../controllers/trendingCoinsController');

router.get('/', TredingCoinsParser);

module.exports = router;
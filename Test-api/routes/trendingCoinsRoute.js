const express = require('express');
const router = express.Router();

const { getTrendingCoins, TredingCoinsParser } = require('../controllers/TrendingCoinsController');

router.get('/', TredingCoinsParser);

module.exports = router;
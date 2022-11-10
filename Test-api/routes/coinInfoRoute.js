const express = require('express');
const { getCoinInfo, CoinParser } =  require('../controllers/CoinInfoController');

const router = express.Router();

router.get('/', CoinParser);

module.exports = router;

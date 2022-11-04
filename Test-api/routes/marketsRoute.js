const express = require('express');
// const fetch = require('node-fetch');
const { marketsParser, getAllMarkets } =  require('../controllers/marketsController');

const router = express.Router();

router.get('/', marketsParser);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getCoinInfo,
  CoinParser,
} = require("../controllers/CoinInfoController");

router.get("/", CoinParser);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getCoinInfo,
  CoinParser,
} = require("../controllers/coinInfo");

router.get("/", CoinParser);

module.exports = router;

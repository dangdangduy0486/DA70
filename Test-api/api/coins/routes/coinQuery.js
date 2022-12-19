const express = require("express");
const router = express.Router();

const {
  CoinParser,
  getCoinQuery,
} = require("../controllers/coinQueryController");

router.get("/", CoinParser);

router.get("/get-all", getCoinQuery);

module.exports = router;

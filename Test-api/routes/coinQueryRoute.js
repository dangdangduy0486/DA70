const express = require("express");
const router = express.Router();

const {
  CoinParser,
  getCoinQuery,
  autoSaveCoinInfo,
} = require("../controllers/coinQueryController");

router.get("/", CoinParser);

router.get("/get-all", getCoinQuery);

router.patch("/save", autoSaveCoinInfo);

module.exports = router;

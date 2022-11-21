const express = require("express");
const {
  marketsParser,
  getAllMarkets,
} = require("../controllers/marketsController");

const router = express.Router();

router.get("/", marketsParser);

module.exports = router;

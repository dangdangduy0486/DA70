const express = require("express");
const { exchangeRatesParser } = require("../controllers/exchangeController");

const router = express.Router();

router.get("/", exchangeRatesParser);

module.exports = router;

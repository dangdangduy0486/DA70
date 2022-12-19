const express = require("express");
const { exchangeRatesParser } = require("../controllers/exchangeController");

const router = express.Router();

router.post("/", exchangeRatesParser);

module.exports = router;

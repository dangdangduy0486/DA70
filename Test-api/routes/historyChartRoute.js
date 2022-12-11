const express = require("express");
const {
  historyChartInfoParser,
} = require("../controllers/historyChartController");

const router = express.Router();

router.get("/", historyChartInfoParser);

module.exports = router;

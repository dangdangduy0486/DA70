const express = require("express");
const {
  marketsParser,
} = require("../controllers/marketsController");

const router = express.Router();

router.get("/", marketsParser);

module.exports = router;

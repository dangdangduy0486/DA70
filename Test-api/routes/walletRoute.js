const express = require("express");
const router = express.Router();

const {
  getWallet,
  fundingRequest,
} = require("../controllers/WalletController");

router.post("/request/:email", fundingRequest);

router.get("/info/:email", getWallet);

module.exports = router;

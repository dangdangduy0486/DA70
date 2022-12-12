const express = require("express");
const router = express.Router();

const {
  getWallet,
  rechargeRequest,
} = require("../controllers/WalletController");

router.post("/request/:email", rechargeRequest);

router.get("/info/:email", getWallet);

module.exports = router;

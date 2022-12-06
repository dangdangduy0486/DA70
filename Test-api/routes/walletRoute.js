const express = require("express");
const router = express.Router();

const {
  getWallet,
  rechargeRequest,
} = require("../controllers/WalletController");

router.post("/request/:id", rechargeRequest);

router.get("/info/:id", getWallet);

module.exports = router;

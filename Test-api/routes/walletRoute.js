const express = require("express");
const router = express.Router();

const {
  getWallet,
  rechargeRequest,
} = require("../controllers/WalletController");

router.post("/recharge_request/:id", rechargeRequest);

router.get("/get_wallet/:id", getWallet);

module.exports = router;

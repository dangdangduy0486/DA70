const express = require("express");
const router = express.Router();

const {
  getOrders,
  requestSpotOrder,
  requestPostP2P,
} = require("../controllers/orderController");

//get order info
router.get("/info/:email", getOrders);

//post request order
router.post("/request/:email", requestSpotOrder);

//post request p2p
router.post("/p2p-request/:email", requestPostP2P);

module.exports = router;

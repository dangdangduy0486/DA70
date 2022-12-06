const express = require("express");
const router = express.Router();

const {
  requestSpotOrder,
  getOrders,
} = require("../controllers/orderController");

//post request order
router.post("/request/:id", requestSpotOrder);

//get order info
router.get("/info/:id", getOrders);

module.exports = router;

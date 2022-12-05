const express = require("express");
const router = express.Router();

const {
  requestSpotOrder,
  getOrders,
} = require("../controllers/orderController");

//get request order
router.get("/order_request/:id", requestSpotOrder);

//get Request
router.get("/get_request_order/:id", getOrders);

module.exports = router;

const express = require("express");
const router = express.Router();

const { getRequest } = require("../controllers/requestController");

//request recharge
router.get("/:id", getRequest);

module.exports = router;

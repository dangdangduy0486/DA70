const User = require("../models/User");
const Token = require("../models/token");
const Order = require("../models/order");
const Wallet = require("../models/wallet");
const Request = require("../models/request");

//send request order
const requestSpotOrder = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
    });

    if (!user) {
      return res.status(400).send({
        message: "Invalid link",
      });
    }

    if (
      !req.body.requestType ||
      !req.body.purchaseUnit ||
      !req.body.sellUnit ||
      !req.body.amount ||
      !req.body.sender ||
      !req.body.reciever
    ) {
      return res.status(400).send({
        message: "Missing something!!",
      });
    }

    const wallet = await Wallet.findOne({
      userID: user.id,
      currencyID: req.body.purchaseUnit,
    });

    if (!wallet) {
      return res.status(401).send({
        message: "Your amount is not enough, Please recharge more!!!",
      });
    }

    if (wallet.amount >= req.body.amount) {
      const request = await Request.create({
        userID: user.id,
        requestType: req.body.requestType,
        purchaseUnit: req.body.purchaseUnit,
        sellUnit: req.body.sellUnit,
        amount: req.body.amount,
        sender: req.body.sender,
        reciever: req.body.reciever,
      });

      return res.status(200).send({
        message: "Send request successfully!!!",
        request,
      });
    }
    return res.status(401).send({
      message: "Your amount is not enough, Please recharge more!!!",
    });
  } catch (err) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

//get request order
const getOrders = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
    });

    if (!user) {
      return res.status(400).send({
        message: "Invalid link",
      });
    }

    if (user.role !== "admin") {
      const order = await Order.find({
        userID: user.id,
      });

      return res.status(200).send({
        order,
      });
    }

    const order = await Order.find({});

    return res.status(200).send({
      order,
    });
  } catch (err) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  requestSpotOrder,
  getOrders,
};

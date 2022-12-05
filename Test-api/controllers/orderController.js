require("dotenv").config();
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");
const Token = require("../models/token");
const Order = require("../models/order");
const Wallet = require("../models/wallet");
const Request = require("../models/request");

//send request order
const requestSpotOrder = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.params.email,
    });

    if (!user)
      return res.status(400).send({
        message: "Invalid link",
      });

    if (!req.body.name || !price || !amount || !currency || !total) {
      return res.status(400).send({
        message: "Missing something!!",
      });
    }

    const wallet = await Wallet.find({
      userID: user.id,
    });

    if (wallet.currencyID === req.body.purchaseUnit) {
      if (wallet.amount >= req.body.amount) {
        let amount = parseFloat(wallet.amount) - parseFloat(req.body.amount);
        const request = await Request.create({
          userID: user.id,
          requestType: res.body.requestType,
          purchaseUnit: res.body.requestType,
          sellUnit: res.body.sellUnit,
          amount: amount,
          sender: res.body.sender,
          reciever: res.body.reciever,
        });

        return res.status(200).send({
          message: "Send request successfully!!!",
          request,
        });
      }
      return res.status(401).send({
        message: "Your amount is not enough, Please recharge more!!!",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

//get request order
const getOrders = async (req, res) => {
  try {
    let user = await User.findOne({
      id: req.params.userID,
    });

    if (!user)
      return res.status(400).send({
        message: "Invalid link",
      });

    const order = await Order.find({
      userID: user._id,
    });

    res.status(200).send({
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

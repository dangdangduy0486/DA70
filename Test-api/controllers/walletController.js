const User = require("../models/User");
const Wallet = require("../models/wallet");
const Request = require("../models/request");

//create recharge request
const rechargeRequest = async (req, res) => {
  try {
    const user = await User.findOne({
      // _id: req.params.id,
      email: req.params.email,
    });

    if (!user) {
      return res.status(400).send({
        message: "Invalid link",
      });
    }

    if (!req.body.purchaseUnit || !req.body.amount || !req.body.sender) {
      return res.status(401).send({
        message: "Missing something",
      });
    }

    const request = await Request.create({
      userID: user.id,
      requestType: "recharge",
      purchaseUnit: req.body.purchaseUnit,
      sellUnit: req.body.sellUnit,
      amount: req.body.amount,
      sender: req.body.sender,
      reciever: user.email,
      walletType: req.body.walletType,
    });

    return res.status(200).send({
      message: "Send request success!!",
      request,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

//
const getWallet = async (req, res) => {
  try {
    const user = await User.findOne({
      // _id: req.params.id,
      email: req.params.email,
    });

    if (!user) {
      return res.status(400).send({
        message: "Invalid link",
      });
    }

    if (user.role !== "admin") {
      const wallet = await Wallet.find({
        userID: user.id,
      });

      return res.status(200).send({
        wallet,
      });
    }

    const wallet = await Wallet.find({});

    return res.status(200).send({
      wallet,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
};

module.exports = {
  getWallet,
  rechargeRequest,
};

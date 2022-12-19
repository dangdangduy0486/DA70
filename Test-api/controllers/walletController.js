const User = require("../models/User");
const Wallet = require("../models/wallet");
const Request = require("../models/request");
const Currency = require("../models/currency");

const generateMD5 = (input) => {
  const expire = Math.ceil(Date.now() / 1000) + 25200;
  const hash = CryptoJS.MD5(expire + ` cntt@da&)dUybAo` + input);
  const base64 = hash
    .toString(CryptoJS.enc.Base64)
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return base64;
};
//create recharge request
const fundingRequest = async (req, res) => {
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

    if (!req.body.purchaseUnit || !req.body.amount) {
      return res.status(401).send({
        message: "Missing something",
      });
    }

    const request = await Request.create({
      userID: user.id,
      requestType: "funding",
      firstUnit: req.body.firstUnit,
      secondUnit: req.body.secondUnit,
      amount: req.body.amount,
      recieverAddress: generateMD5(user.email),
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
  fundingRequest,
};

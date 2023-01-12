require("dotenv").config();
const User = require("../models/User");
const Wallet = require("../models/wallet");
const Request = require("../models/request");
const Currency = require("../models/currency");

// const generateMD5 = (input) => {
//   const expire = Math.ceil(Date.now() / 1000) + 25200;
//   const hash = CryptoJS.MD5(expire + ` cntt@da&)dUybAo` + input);
//   const base64 = hash
//     .toString(CryptoJS.enc.Base64)
//     .replace(/=/g, "")
//     .replace(/\+/g, "-")
//     .replace(/\//g, "_");
//   return base64;
// };

const encoded = (value) => {
  var encrypted = CryptoJS.AES.encrypt(value, process.env.HASH_SECRET_KEY);
  return encrypted.toString();
};
const decoded = (encrypted) => {
  var bytes = CryptoJS.AES.decrypt(encrypted, process.env.HASH_SECRET_KEY);
  var decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
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
      secondUnit: req.body.secondUnit.toUpperCase(),
      amount: req.body.amount,
      recieverAddress: encoded(user.email),
      walletType: req.body.walletType,
      date: new Date(),
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

    const wallet = await Wallet.find({
      userID: user.id,
    });

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

require("dotenv").config();
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");
const Token = require("../models/token");
const Wallet = require("../models/wallet");
const Request = require("../models/request");

const generateMD5 = (input) => {
  const expire = 252001080;
  const hash = CryptoJS.MD5(expire + ` cntt@da&)dUybAo` + input);
  const base64 = hash
    .toString(CryptoJS.enc.Base64)
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return base64;
};

//forgot password
const forgotPassword = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(409).send({ message: "User Not Exist!" });

    const url = `${process.env.BASE_URL}api/user/reset-password/${user.email}`;
    await sendEmail(user.email, "Password Reset", url);

    res
      .status(201)
      .send({ message: "An Email sent to your account please check" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//get - reset password
const resetPasswordRequest = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.email,
    });

    if (!user)
      return res.status(400).send({
        message: "Invalid link",
      });

    // const token = await Token.findOne({
    //   userID: user._id,
    //   token: req.params.token,
    // });

    // if (!token)
    //   return res.status(400).send({
    //     message: "Invalid link",
    //   });

    // const salt = await bcrypt.genSalt(Number(process.env.SALT));
    // const hashPassword = await bcrypt.hash(req.body.password, salt);

    // user = await User.create({ ...req.body, password: hashPassword });
    // const token = await Token.create({
    //   userID: user._id,
    //   token: generateMD5(),
    // });

    res.status(200).send({
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//reset password
const resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });

    if (!user)
      return res.status(400).send({
        message: "Invalid link",
      });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.newpassword, salt);
    await User.updateOne(
      { email: req.params.email },
      {
        $set: {
          password: hashPassword,
        },
      }
    );

    res.status(201).send({ message: "Reset password successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//get info
const getUserInfo = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.params.email,
    });

    if (!user)
      return res.status(400).send({
        message: "Invalid link",
      });

    res.status(200).send({
      email: user.email,
      fullname: user.fullname,
      role: user.role,
    });
  } catch (err) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

//update info
const editUserInfo = async (req, res) => {
  try {
    let user = await User.findOneAndUpdate(
      {
        email: req.params.email,
      },
      {
        ...req.body,
      }
    );

    if (!user)
      return res.status(400).send({
        message: "Invalid link",
      });

    res.status(200).send({
      message: "Update user information successfully!!!",
    });
  } catch (err) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

//create request
const request = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });

    if (!user) {
      return res.status(400).send({
        message: "Invalid link",
      });
    }

    if (req.params.type === "spot") {
      const existWallet = await Wallet.findOne({
        userID: user._id,
        currencyID: req.body.secondUnit,
      });

      if (!existWallet) {
        return res.status(401).send({
          message: "Please use other currency units",
        });
      }
      let total = parseFloat(existWallet.amount) - parseFloat(req.body.total);
      if (total > 0) {
        await Request.create({
          userID: user._id,
          requestType: req.params.type,
          type: req.body.type ? req.body.type : null,
          firstUnit: req.body.firstUnit ? req.body.firstUnit : null,
          secondUnit: req.body.secondUnit ? req.body.secondUnit : null,
          amount: req.body.amount ? req.body.amount : null,
          total: req.body.total ? req.body.total : null,
          senderAddress: req.body.senderAddress
            ? generateMD5(req.body.senderAddress)
            : null,
          recieverAddress: req.body.recieverAddress
            ? generateMD5(req.body.recieverAddress)
            : null,
        });

        await Wallet.findOneAndUpdate(
          {
            userID: user._id,
            currencyID: req.body.secondUnit,
          },
          { amount: total }
        );

        return res.status(200).send({
          message: "Your request has been sent",
        });
      }
      return res.status(401).send({
        message: "Your amount is not enough",
      });
    }
    const request = await Request.create({
      userID: user._id,
      requestType: req.params.type,
      type: req.body.type ? req.body.type : null,
      firstUnit: req.body.firstUnit ? req.body.firstUnit : null,
      secondUnit: req.body.secondUnit ? req.body.secondUnit : null,
      amount: req.body.amount ? req.body.amount : null,
      total: req.body.total ? req.body.total : null,
      senderAddress: req.body.senderAddress ? req.body.senderAddress : null,
      recieverAddress: req.body.recieverAddress
        ? generateMD5(req.body.recieverAddress)
        : null,
    });

    return res.status(200).send({
      request,
      message: "Your request has been sent",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const requestInfo = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });
    if (!user) {
      return res.status(400).send({
        message: "Invalid link",
      });
    }

    if (user.role === "admin") {
      const request = await Request.find({
        requestType: req.params.type,
      });

      return res.status(200).send({
        request,
      });
    }

    const request = await Request.find({
      userID: user._id,
      requestType: req.params.type,
    });

    return res.status(200).send({
      request,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  forgotPassword,
  resetPasswordRequest,
  resetPassword,
  getUserInfo,
  editUserInfo,
  request,
  requestInfo,
};

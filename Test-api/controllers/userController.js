require("dotenv").config();
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");
const Token = require("../models/token");
const Order = require("../models/order");

const generateMD5 = () => {
  const expire = Math.ceil(Date.now() / 1000) + 25200;
  const hash = CryptoJS.MD5(expire + ` cntt@da&)dUybAo`);
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

    const url = `${process.env.BASE_URL}api/user/reset-password/${user.id}`;
    await sendEmail(user.email, "Password Reset", url);

    res
      .status(201)
      .send({ message: "An Email sent to your account please check" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//get - reset password
const resetPasswordRequest = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.userID,
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
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//reset password
const resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.userID,
    });

    if (!user)
      return res.status(400).send({
        message: "Invalid link",
      });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.newpassword, salt);
    await User.updateOne(
      { _id: req.params.userID },
      {
        $set: {
          password: hashPassword,
        },
      }
    );

    res.status(201).send({ message: "Reset password successfully" });
  } catch (error) {
    console.log(error);
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

//send request order
const requestOrder = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.params.email,
    });

    if (!user)
      return res.status(400).send({
        message: "Invalid link",
      });

    const { name, price, amount, currency, total } = req.body;
    // if (!name || !price || !amount || !currency || !total) {
    //   return res.status(400).send({
    //     message: "Missing something!!",
    //   });
    // }
    const order = await Order.create({
      userID: user.id,
      name,
      price,
      amount,
      currency,
      total,
    });

    res.status(200).send({
      message: "Send request successfully!!!",
      order,
    });
  } catch (err) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

//get request order
const getResquestOrder = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.params.email,
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
  forgotPassword,
  resetPasswordRequest,
  resetPassword,
  getUserInfo,
  editUserInfo,
  requestOrder,
  getResquestOrder,
};

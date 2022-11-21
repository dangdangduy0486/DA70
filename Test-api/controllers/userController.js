require("dotenv").config();
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const CryptoJS = require("crypto-js");

const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");
const Token = require("../models/token");

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

const signup = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = await User.create({ ...req.body, password: hashPassword });
    const token = await Token.create({
      userID: user._id,
      token: generateMD5(),
    });

    const url = `${process.env.BASE_URL}api/user/verify/${user.id}/${token.token}`;
    await sendEmail(user.email, "Verify Email", url);

    res
      .status(201)
      .send({ message: "An Email sent to your account please verify" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.userID,
    });

    if (!user)
      return res.status(400).send({
        message: "Invalid link",
      });

    const token = await Token.findOne({
      userID: user._id,
      token: req.params.token,
    });

    if (!token)
      return res.status(400).send({
        message: "Invalid link",
      });

    await User.findOneAndUpdate({ _id: user._id }, { verified: true });
    res.status(200).send({
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ 
        message: "Invalid Email or Password" 
      });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    if (!user.verified) {
      let token = await Token.findOne({ userID: user._id });
      if (!token) {
        token = await Token.create({
          userID: user._id,
          // token: crypto.randomBytes(32).toString("hex"),
          token: generateMD5(),
        });
        const url = `${process.env.BASE_URL}api/user/verify/${user.id}/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);
      }

      return res
        .status(400)
        .send({ message: "An Email sent to your account please verify" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "30s",
    });

    res.cookie(String(user._id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30),
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).send({
      message: "logged in successfully",
      token: token,
      email: user.email,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
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
const getUser = async (req, res) => {
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
    });
  } catch (err) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

//ADMIN ONLY !!!
//get all users
const allUsers = async (req, res) => {
  const users = await User.find({ role: "member" });

  return res.status(200).json({ users });
};

//delete user
const deleteUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Missing something here!!!" });
  } else {
    await User.findOneAndDelete({ email: email });
    return res.status(200).json({ message: "Delete success" });
  }
};

module.exports = {
  signup,
  verifyEmail,
  login,
  forgotPassword,
  resetPasswordRequest,
  resetPassword,
  getUser,
  allUsers,
  deleteUser,
};

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
    const generateMD5 = () => {
      const expire = Math.ceil(Date.now() / 1000) + 25200;
      const hash = CryptoJS.MD5(expire + ` ai_zone_cloudcam`);
      const base64 = hash
        .toString(CryptoJS.enc.Base64)
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
      return base64;
    };
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

  await User.findOneAndUpdate(
      { _id: user._id },
      { verified: true }
    );
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
    const Validate = (data) => {
      const schema = Joi.object({
        email: Joi.string().email().required().label("email"),
        password: Joi.string().required().label("password"),
      });
      return schema.validate(data);
    };

    const { error } = Validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    if (!user.verified) {
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await Token.create({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
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

    res.status(200).send({ data: token, message: "logged in successfully" });
  } catch (error) {
    res.statur(500).send({
      message: "Internal Server Error",
    });
  }
};

const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;
  try {
    user = await User.findById(userId, "password");
  } catch (err) {
    return new Error(err);
  }

  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }
  return res.status(200).json({ user });
};

//ADMIN ONLY !!!
//get all users
const allUsers = async (req, res) => {
  const users = await User.find({});

  return res.status(200).json({ message: users });
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
  getUser,
  allUsers,
  deleteUser,
};

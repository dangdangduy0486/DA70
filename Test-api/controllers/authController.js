require("dotenv").config();
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

//signup
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

    await Token.create({
      userID: user._id,
      token: token,
    });

    const url = `${process.env.BASE_URL}api/auth/verify/${user.id}/${token.token}`;
    await sendEmail(user.email, "Verify Email", url);

    res.status(201).send({
      message: "An Email sent to your account please verify",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error,
    });
  }
};

//verify email
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

//login
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user || !req.body.password)
      return res.status(401).send({
        message: "Invalid Email or Password",
      });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(401).send({
        message: "Invalid Email or Password",
      });

    if (!user.verified) {
      let token = await Token.findOne({ userID: user._id });
      if (!token) {
        token = await Token.create({
          userID: user._id,
          token: generateMD5(),
        });
        const url = `${process.env.BASE_URL}api/user/verify/${user.id}/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);
      }

      return res
        .status(400)
        .send({ message: "An Email sent to your account please verify" });
    }
    const token = jwt.sign(
      {
        email: user.email,
        userID: user.id,
      },
      process.env.JWT_ACCESS_TOKEN,
      {
        expiresIn: "1d",
      }
    );
    console.log(token);

    await Token.create({
      userID: user._id,
      token: token,
    });
    // const refreshToken = jwt.sign(
    //   {
    //     email: user.email,
    //   },
    //   process.env.JWT_REFRESH_TOKEN,
    //   {
    //     expiresIn: "1d",
    //   }
    // );

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

module.exports = {
  signup,
  verifyEmail,
  login,
};

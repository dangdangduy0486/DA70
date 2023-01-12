require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");
const Token = require("../models/token");

const generateMD5 = (input) => {
  const expire = Math.ceil(Date.now() / 1000) + 25200;
  const hash = CryptoJS.MD5(expire + process.env.HASH_SECRET_KEY + input);
  const base64 = hash
    .toString(CryptoJS.enc.Base64)
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return base64;
};

const encoded = (value) => {
  var encrypted = CryptoJS.AES.encrypt(value, ` cntt@da&)dUybAo`);
  return encrypted.toString();
};
const decoded = (encrypted) => {
  var bytes = CryptoJS.AES.decrypt(encrypted, ` cntt@da&)dUybAo`);
  var decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
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
    const token = await Token.create({
      userID: user._id,
      token: generateMD5(user._id),
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
      message: "Internal Server Error3",
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
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: user.email,
          role: user.role,
        },
      },
      process.env.JWT_ACCESS_TOKEN,
      {
        expiresIn: "7d",
      }
    );

    const refreshToken = jwt.sign(
      {
        email: user.email,
      },
      process.env.JWT_REFRESH_TOKEN,
      {
        expiresIn: "7d",
      }
    );

    //create secure cookie with access token
    res.cookie("jwt", accessToken, {
      // httpOnly: true, //accessible only by web server
      // secure: true, //https
      // sameSite: "None", //cross-site cookie
      // maxAge: 7 * 24 * 60 * 60 * 1000, //cookie exp
    });

    res.status(200).json({
      message: "logged in successfully",
      accessToken,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

// const refresh = (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies);
//   if (!cookies?.jwt)
//     return res.status(401).json({
//       message: "Unauthorized",
//     });

//   const refreshToken = cookies.jwt;

//   jwt.verify(
//     refreshToken,
//     process.env.JWT_REFRESH_TOKEN,
//     async (err, decoded) => {
//       if (err)
//         return res.status(403).json({
//           message: "Forbidden",
//         });

//       const user = await User.findOne({
//         email: decoded.email,
//       }).exec();

//       if (!user)
//         return res.status(401).json({
//           message: "Unauthorized",
//         });

//       const accessToken = jwt.sign(
//         {
//           UserInfo: {
//             email: user.email,
//             role: user.role,
//           },
//         },
//         process.env.JWT_ACCESS_TOKEN,
//         { expiresIn: "15m" }
//       );

//       res.json({ accessToken });
//     }
//   );
// };

const logout = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204);

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  res.json({
    message: "Cookie cleared",
  });
};

module.exports = {
  signup,
  verifyEmail,
  login,
  // refresh,
  logout,
};

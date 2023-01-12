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
const { findOne } = require("../models/request");

// const generateMD5 = (input) => {
//   const expire = 252001080;
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
    //sdfsdfdsdsfdsf\

    const authHeader = req.headers["authorization"];
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).send({
        message: "A token is require for authenticcation!!",
      });
    }
    // 'Beaer [token]'
    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN
      // async (err, decoded) => {
      //   if (err)
      //     return res.status(403).send({
      //       message: "Forbidden",
      //     });
      //   const email = decoded.UserInfo.email;
      //   return email;
      // }
    );
    //fsdfdsfdsfdsf
    const user = await User.findOne({
      email: decodedToken.UserInfo.email,
    });

    if (!user) {
      return res.status(400).send({
        message: "Invalid link",
      });
    }

    if (req.params.type === "spot") {
      const existWallet = await Wallet.findOne({
        userID: user._id,
        currencyID: req.body.secondUnit.toUpperCase(),
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
          secondUnit: req.body.secondUnit
            ? req.body.secondUnit.toUpperCase()
            : null,
          amount: req.body.amount ? req.body.amount : null,
          total: req.body.total ? req.body.total : null,
          senderAddress: req.body.senderAddress
            ? encoded(req.body.senderAddress)
            : null,
          recieverAddress: req.body.recieverAddress
            ? encoded(req.body.recieverAddress)
            : null,
          date: new Date(),
        });

        // await Wallet.findOneAndUpdate(
        //   {
        //     userID: user._id,
        //     currencyID: req.body.secondUnit,
        //   },
        //   { amount: total }
        // );

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
      secondUnit: req.body.secondUnit
        ? req.body.secondUnit.toUpperCase()
        : null,
      amount: req.body.amount ? req.body.amount : null,
      total: req.body.total ? req.body.total : null,
      senderAddress: req.body.senderAddress ? req.body.senderAddress : null,
      recieverAddress: req.body.recieverAddress
        ? encoded(req.body.recieverAddress)
        : null,
      date: new Date(),
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

const p2pRequest = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });

    if (!user) {
      return res.status(400).send({
        message: "Invalid link",
      });
    }

    if (req.body.type === "buy") {
      const existWallet = await Wallet.findOne({
        userID: user.id,
        currencyID: req.body.secondUnit.toUpperCase(),
      });
      // console.log(req.body.secondUnit.toUpperCase());
      // console.log(user.id);
      // console.log(existWallet);

      if (!existWallet) {
        return res.status(401).send({
          message: "Please use other currency units",
        });
      }
      let total = parseFloat(existWallet.amount) - parseFloat(req.body.total);
      if (total > 0) {
        await Request.create({
          userID: user._id,
          requestType: "p2p",
          type: req.body.type ? req.body.type : null,
          firstUnit: req.body.firstUnit ? req.body.firstUnit : null,
          secondUnit: req.body.secondUnit
            ? req.body.secondUnit.toUpperCase()
            : null,
          amount: req.body.amount ? req.body.amount : null,
          total: req.body.total ? req.body.total : null,
          senderAddress: req.body.senderAddress
            ? encoded(req.body.senderAddress)
            : null,
          recieverAddress: req.body.recieverAddress
            ? encoded(req.body.recieverAddress)
            : null,
          date: new Date(),
        });

        return res.status(200).send({
          message: "Your request has been sent",
        });
      }
      return res.status(401).send({
        message: "Your amount is not enough",
      });
    } else if (req.body.type === "sell") {
      const existWallet = await Wallet.findOne({
        userID: user._id,
        currencyID: req.body.firstUnit, // unit that in user wallet
      });
      // console.log(existWallet);

      if (!existWallet) {
        return res.status(401).send({
          message: "Please use other currency units",
        });
      }

      let total = parseFloat(existWallet.amount) - parseFloat(req.body.amount);
      if (total > 0) {
        await Request.create({
          userID: user._id,
          requestType: "p2p",
          type: req.body.type ? req.body.type : null,
          firstUnit: req.body.firstUnit ? req.body.firstUnit : null,
          secondUnit: req.body.secondUnit
            ? req.body.secondUnit.toUpperCase()
            : null,
          amount: req.body.amount ? req.body.amount : null,
          total: req.body.total ? req.body.total : null,
          senderAddress: req.body.senderAddress
            ? encoded(req.body.senderAddress)
            : null,
          recieverAddress: req.body.recieverAddress
            ? encoded(req.body.recieverAddress)
            : null,
          date: new Date(),
        });

        return res.status(200).send({
          message: "Your request has been sent",
        });
      }
      return res.status(401).send({
        message: "Your amount is not enough",
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
//
const p2pRequestInfo = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });
    if (!user) {
      return res.status(400).send({
        message: "Invalid link",
      });
    }

    if (req.params.type === "own") {
      const request = await Request.find({
        requestType: "p2pReq",
        userID: user.id,
      });

      return res.status(200).send({
        request,
      });
    }
    const request = await Request.find({
      requestType: "p2p",
      type: req.params.type,
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

const p2pClientRequest = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });

    if (!user) {
      return res.status(400).send({
        message: "Invalid link",
      });
    }
    if (req.body.requestType === "p2pReq" && req.body.type === "buy") {
      const existWallet = await Wallet.findOne({
        userID: user._id,
        currencyID: req.body.secondUnit.toUpperCase(),
      });

      if (!existWallet) {
        return res.status(401).send({
          message: "Please use other currency units",
        });
      }

      let total = parseFloat(existWallet.amount) - parseFloat(req.body.total);
      if (decoded(req.body.recieverAddress) === req.body.senderAddress) {
        return res.status(401).send({
          message: "This is your post!!",
        });
      }
      const publicRequest = await Request.findOne({
        _id: req.body.requestOf,
      });
      // console.log(req.body.requestOf);
      // console.log(publicRequest);
      if (total > 0) {
        await Request.create({
          userID: publicRequest.userID,
          requestType: "p2pReq",
          type: req.body.type ? req.body.type : null,
          firstUnit: req.body.firstUnit ? req.body.firstUnit : null,
          secondUnit: req.body.secondUnit
            ? req.body.secondUnit.toUpperCase()
            : null,
          amount: req.body.amount ? req.body.amount : null,
          total: req.body.total ? req.body.total : null,
          senderAddress: req.body.senderAddress
            ? encoded(req.body.senderAddress)
            : null,
          recieverAddress: req.body.recieverAddress
            ? req.body.recieverAddress
            : null,
          requestOf: req.body.requestOf,
          date: new Date(),
        });
        return res.status(200).send({
          message: "Your request has been sent",
        });
      }
      return res.status(401).send({
        message: "Your amount is not enough",
      });
    } else if (req.body.requestType === "p2pReq" && req.body.type === "sell") {
      const existWallet = await Wallet.findOne({
        userID: user._id,
        currencyID: req.body.secondUnit.toUpperCase(),
      });

      if (!existWallet) {
        return res.status(401).send({
          message: "Please use other currency units",
        });
      }

      let total = parseFloat(existWallet.amount) - parseFloat(req.body.total);
      if (decoded(req.body.recieverAddress) === req.body.senderAddress) {
        return res.status(401).send({
          message: "This is your post!!",
        });
      }
      const publicRequest = await Request.findOne({
        _id: req.body.requestOf,
      });
      // console.log(req.body.requestOf);
      // console.log(publicRequest);
      if (total > 0) {
        await Request.create({
          userID: publicRequest.userID,
          requestType: "p2pReq",
          type: req.body.type ? req.body.type : null,
          firstUnit: req.body.firstUnit ? req.body.firstUnit : null,
          secondUnit: req.body.secondUnit
            ? req.body.secondUnit.toUpperCase()
            : null,
          amount: req.body.amount ? req.body.amount : null,
          total: req.body.total ? req.body.total : null,
          senderAddress: req.body.senderAddress
            ? encoded(req.body.senderAddress)
            : null,
          recieverAddress: req.body.recieverAddress
            ? req.body.recieverAddress
            : null,
          requestOf: req.body.requestOf,
          date: new Date(),
        });
        return res.status(200).send({
          message: "Your request has been sent",
        });
      }
      return res.status(401).send({
        message: "Your amount is not enough",
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const p2pOnwerResonse = async (req, res) => {
  try {
    const owner = await User.findOne({
      email: req.params.email,
    });

    console.log("1");

    if (!owner) {
      return res.status(400).send({
        message: "Invalid link",
      });
    }

    //Check owner and client
    await Request.findByIdAndUpdate(
      {
        _id: req.body.requestID,
      },
      {
        status: req.body.status,
      }
    );
    const request = await Request.findOne({
      _id: req.body.requestID,
    });

    //call request info
    console.log("2");
    const client = await User.findOne({
      email: decoded(request.recieverAddress),
    });

    if (!client) {
      return res.status(400).send({
        message: "Invalid link",
      });
    }
    console.log("3");
    //updated status
    console.log("4");
    if (
      request.requestType === "p2pReq" &&
      request.type === "buy" &&
      request.status === "approved"
    ) {
      const ownerFiatUnit = await Wallet.findOne({
        userID: request.userID,
        currencyID: request.secondUnit,
      });
      console.log("5");
      // console.log("hello2");

      //owner---------------------------------
      // check on-sale units
      if (ownerFiatUnit) {
        console.log("6");

        const ownerFiatAmount =
          parseFloat(ownerFiatUnit) - parseFloat(request.total);
        //amount not enough
        if (ownerFiatAmount < 0) {
          console.log("7");
          // console.log("pending");
          await Request.findOneAndUpdate(
            {
              _id: req.body.requestID,
            },
            {
              status: "pending",
            }
          );
          return res.status(401).send({
            message: "Amount not enough",
          });
        } else if (ownerFiatAmount > 0) {
          console.log("8");
          await Wallet.findOneAndUpdate(
            {
              _id: ownerFiatUnit.id,
            },
            {
              amount: ownerFiatAmount,
            }
          );
        }

        //end update owner wallet---------------------------------------

        //Update client wallet---------------------------------------

        // end update client wallet---------------------------------------
      } else if (!ownerFiatUnit) {
        console.log("9");
        await Request.findOneAndUpdate(
          {
            _id: req.body.requestID,
          },
          {
            status: "pending",
          }
        );
        return res.status(401).send({
          message: "you can't do this process",
        });
      }

      const ownerCryptoUnit = await Wallet.findOne({
        userID: request.userID,
        currencyID: request.firstUnit,
      });
      console.log("10");
      if (ownerCryptoUnit) {
        console.log("11");
        const ownerCryptoAmount =
          parseFloat(ownerCryptoUnit.amount) + parseFloat(request.amount);
        await Wallet.findOneAndUpdate(
          {
            _id: ownerCryptoUnit.id,
          },
          {
            amount: ownerCryptoAmount,
          }
        );
      } else if (!ownerCryptoUnit) {
        console.log("12");
        let name =
          request.firstUnit.charAt(0).toUpperCase() +
          request.firstUnit.slice(1);
        const currency = await Currency.findOne({
          name: name,
        });
        if (currency) {
          if (
            currency.category === "Suggested Currencies" ||
            currency.category === "Fiat Currencies"
          ) {
            type = "Fiat Currencies";
          } else {
            type = "Cryptocurrencies";
          }
          await Wallet.create({
            userID: request.userID,
            currencyID: request.secondUnit,
            amount: request.amount,
            type: type,
          });
        } else {
          await Wallet.create({
            userID: request.userID,
            currencyID: request.secondUnit,
            amount: request.amount,
            type: "Cryptocurrencies",
          });
        }
      }
      //owner---------------------------------
      console.log("13..1");
      //client---------------------------------
      console.log(client);
      const clientFiatUnit = await wallet.findOne({
        userID: client.id,
        currencyID: request.secondUnit,
      });
      console.log("13");
      if (clientFiatUnit) {
        console.log("14");
        const clientFiatAmount =
          parseFloat(clientFiatUnit.amount) + parseFloat(request.total);
        await wallet.findOneAndUpdate(
          {
            _id: clientFiatUnit.id,
          },
          {
            amount: clientFiatAmount,
          }
        );
      } else if (!clientFiatUnit) {
        console.log("15");
        const currency = await Currency.findOne({
          name: request.secondUnit,
        });
        if (currency) {
          if (
            currency.category === "Suggested Currencies" ||
            currency.category === "Fiat Currencies"
          ) {
            type = "Fiat Currencies";
          } else {
            type = "Cryptocurrencies";
          }
          await Wallet.create({
            userID: client.userID,
            currencyID: request.secondUnit,
            amount: request.amount,
            type: type,
          });
        } else {
          await Wallet.create({
            userID: client.userID,
            currencyID: request.secondUnit,
            amount: request.amount,
            type: "Fiat Currencies",
          });
        }
      }

      const clientCryptoUnit = await Wallet.findOne({
        userID: client.id,
        currencyID: request.firstUnit,
      });
      console.log("16");
      if (clientCryptoUnit) {
        console.log("17");
        const clientCryptoAmount =
          parseFloat(clientCryptoUnit.amount) - parseFloat(request.amount);
        await Wallet.findOneAndUpdate(
          {
            _id: clientCryptoUnit.id,
          },
          {
            amount: clientCryptoAmount,
          }
        );
      } else if (!clientCryptoUnit) {
        console.log("18");
        await Request.findOneAndUpdate(
          {
            _id: req.body.requestID,
          },
          {
            status: "pending",
          }
        );
        return res.status(401).send({
          message: "Client amount dont have enough",
        });
      }

      // await Request.findOneAndRemove({
      //   _id: request.requestOf,
      // });

      console.log("hello");
      return res.status(200).send({
        message: "Success!!!",
      });

      //client---------------------------------
    }
    console.log("20");
    return res.status(200).send({
      message: "Rejected!!",
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
  p2pRequest,
  p2pRequestInfo,
  p2pClientRequest,
  p2pOnwerResonse,
};

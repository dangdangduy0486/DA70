require("dotenv").config();
const axios = require("axios");

const User = require("../models/User");
const Wallet = require("../models/wallet");
const Request = require("../models/request");
const Currency = require("../models/currency");

//get all users
const allUsers = async (req, res) => {
  console.log("hello");
  try {
    const user = await User.findOne({
      email: req.params.email,
    });

    if (!user && user.role !== "admin") {
      return res.status(400).send({
        message: "Invalid link",
      });
    }

    const members = await User.find({ role: "member" });

    return res.status(200).send({ members });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
};

//edit user
const editUser = async (req, res) => {
  try {
    const user = await User.findOne({
      // _id: req.params.id,
      email: req.parmas.email,
    });

    if (!user) {
      return res.status(400).send({
        message: "Invalid link",
      });
    }

    if (user.role !== "admin") {
      return res.status(400).send({
        message: "Invalid link",
      });
    }

    const member = await User.findOneAndUpdate(
      {
        email: req.body.email,
      },
      {
        ...req.body,
      }
    );

    if (!member) {
      return res.status(400).send({
        message: "Invalid link",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
};

//delete user
const deleteUser = async (req, res) => {
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
      return res.status(400).send({
        message: "Invalid link",
      });
    }

    if (!req.body.email) {
      return res.status(400).json({
        message: "Missing something here!!!",
      });
    }

    await User.findOneAndDelete({
      email: req.body.email,
    });

    return res.status(200).json({
      message: "Delete success",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
};

//response wallet
const responseFunding = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });

    if (!user || user.role !== "admin") {
      return res.status(400).send({
        message: "Invalid link",
      });
    }

    if (!req.body.requestID || !req.body.status) {
      return res.status(401).send({
        message: "Missing something",
      });
    }
    //response request
    await Request.findOneAndUpdate(
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

    if (request.status === "approved") {
      const existsWallet = await Wallet.findOne({
        userID: request.userID,
        currencyID: request.firstUnit,
      });

      if (existsWallet) {
        let amount =
          parseFloat(existsWallet.amount) + parseFloat(request.amount);

        const wallet = await Wallet.findOneAndUpdate(
          {
            _id: existsWallet.id,
          },
          {
            amount: amount.toString(),
          }
        );
        return res.status(200).send({
          message: "Recharge success!!!!",
          wallet,
        });
      }

      if (!existsWallet) {
        const currency = await Currency.findOne({
          symbol: request.firstUnit,
        });

        if (
          currency.category === "Suggested Currencies" ||
          currency.category === "Fiat Currencies"
        ) {
          type = "Fiat Currencies";
        } else {
          type = "Cryptocurrencies";
        }

        const wallet = await Wallet.create({
          userID: request.userID,
          currencyID: request.firstUnit,
          amount: request.amount,
          type: type,
        });

        return res.status(200).send({
          message: "Recharge success!!",
          wallet,
        });
      }
    }
    return res.status(200).send({
      message: "Recharge denided!!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const responseSpot = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });

    if (!user || user.role !== "admin") {
      return res.status(400).send({
        message: "Invalid link",
      });
    }

    if (!req.body.requestID || !req.body.status) {
      return res.status(401).send({
        message: "Missing something",
      });
    }

    await Request.findOneAndUpdate(
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

    console.log("hello1");

    // if (request.type === "buy"  request.status === "approved") {
    if (request.type === "buy" && request.status === "approved") {
      const existsWallet = await Wallet.findOne({
        userID: request.userID,
        currencyID: request.secondUnit,
      });
      console.log("hello2");

      if (existsWallet) {
        let amount =
          parseFloat(existsWallet.amount) - parseFloat(request.total);

        console.log(parseFloat(existsWallet.amount));
        console.log(parseFloat(request.total));

        console.log(amount);

        if (amount < 0) {
          await Request.findOneAndUpdate(
            {
              _id: req.body.requestID,
            },
            {
              status: "pending",
            }
          );
          return res.status(401).send({
            message: "Please...",
          });
        }
        console.log("hello3");

        await Wallet.findOneAndUpdate(
          {
            _id: existsWallet.id,
          },
          {
            amount: amount.toString(),
          }
        );
        console.log("hello11");

        const wallet = await Wallet.findOne({
          userID: request.userID,
          currencyID: request.firstUnit,
        });
        console.log(wallet);

        console.log("hello13");

        if (wallet) {
          console.log("hello4");

          let amount = parseFloat(wallet.amount) + parseFloat(request.amount);

          console.log(request.amount);
          console.log(amount);
          await Wallet.findOneAndUpdate(
            {
              _id: wallet.id,
            },
            {
              amount: amount,
            }
          );

          return res.status(200).send({
            message: "Success!!",
          });
        }

        if (!wallet) {
          console.log("hello5");

          let name =
            request.firstUnit.charAt(0).toUpperCase() +
            request.firstUnit.slice(1);
          const currency = await Currency.findOne({
            name: name,
          });
          console.log(currency);
          console.log(request.firstUnit);
          console.log(name);
          if (currency) {
            if (
              currency.category === "Suggested Currencies" ||
              currency.category === "Fiat Currencies"
            ) {
              type = "Fiat Currencies";
            } else {
              type = "Cryptocurrencies";
            }
            const wallet = await Wallet.create({
              userID: request.userID,
              currencyID: request.firstUnit,
              amount: request.amount,
              type: type,
            });

            console.log("hello7");

            return res.status(200).send({
              message: "Success!!",
              wallet,
            });
          }

          const wallet = await Wallet.create({
            userID: request.userID,
            currencyID: request.firstUnit,
            amount: request.amount,
            type: "Cryptocurrencies",
          });

          console.log("hello7");

          return res.status(200).send({
            message: "Success!!",
            wallet,
          });
        }
      }

      if (!existsWallet) {
        console.log("hello8");
        return res.status(401).send({
          message: "Please...",
        });
      }
    }
    console.log("hello9");
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
  allUsers,
  editUser,
  deleteUser,
  responseFunding,
  responseSpot,
};

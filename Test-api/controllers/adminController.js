require("dotenv").config();
const axios = require("axios");

const User = require("../models/User");
const Order = require("../models/order");
const Wallet = require("../models/wallet");
const Request = require("../models/request");
const Currency = require("../models/currency");

//get all users
const allUsers = async (req, res) => {
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

//edit order
// const editOrder = async (req, res) => {
//   try {
//     const user = await User.findOne({
//       _id: req.params.id,
//     });

//     if (!user) {
//       return res.status(400).send({
//         message: "Invalid link",
//       });
//     }

//     if (user.role !== "admin") {
//       return res.status(400).send({
//         message: "Invalid link",
//       });
//     }

//     orders = await Order.findOneAndUpdate(
//       {
//         _id: req.params.orderID,
//       },
//       {
//         ...req.body,
//       }
//     );

//     return res.status(200).send({
//       message: "Update successfully!!!",
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: "Internal Server Error",
//       error,
//     });
//   }
// };

//deleta order
// const deleteOrder = async (req, res) => {
//   try {
//     const user = await User.findOne({
//       _id: req.params.id,
//     });

//     if (!user) {
//       return res.status(400).send({
//         message: "Invalid link",
//       });
//     }

//     if (user.role !== "admin") {
//       return res.status(400).send({
//         message: "Invalid link",
//       });
//     }

//     orders = await Order.findByIdAndDelete({
//       _id: req.params.orderID,
//     });

//     return res.status(200).send({
//       message: "Delete successfully!!!",
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: "Internal Server Error",
//       error,
//     });
//   }
// };

//response wallet
const response = async (req, res) => {
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
        type: request.type,
      });
      if (existsWallet) {
        let amount =
          parseFloat(existsWallet.amount) + parseFloat(request.amount);

        const wallet = await Wallet.findOneAndUpdate(
          {
            _id: existsWallet.id,
          },
          {
            amount: amount,
            type: request.type,
          }
        );
        return res.status(200).send({
          message: "Recharge success!!!!",
          wallet,
        });
      }

      if (!existsWallet) {
        const currency = await Currency.findOne({
          symbol: currencyID.firstUnit,
        });

        if (currency.firstUnit === "Suggested Currencies") {
          type = "Fiat Currencies";
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
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  allUsers,
  editUser,
  deleteUser,
  response,
};

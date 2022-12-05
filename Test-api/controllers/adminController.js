require("dotenv").config();
const axios = require("axios");

const User = require("../models/User");
const Order = require("../models/order");
const Wallet = require("../models/wallet");
const Request = require("../models/request");

//get all users
const allUsers = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
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
      _id: req.params.id,
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
      _id: req.params.id,
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

//get all order request
const getAllOrders = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
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

    orders = await Order.find({});

    return res.status(200).send({ orders });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
};

//response orders
const responseOrders = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
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

    await Request.findOneAndUpdate(
      {
        _id: req.params.requestID,
      },
      {
        status: req.body.status,
      }
    );

    const request = await Request.findOne({
      _id: req.body.requestID,
    });

    const order = await Order.create({
      userID: request.userID,
      purchaseUnit: req.body.purchaseUnit,
      sellUnit: req.body.sellUnit,
      price: req.body.price,
      amount: req.body.amount,
      sender: req.body.sender,
      reciever: req.body.reciever,
      total: req.body.total,
    });

    return res.status(200).send({
      message: "Recharge success!!",
      order,
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
const responseWallet = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
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

    const existsWallet = await Wallet.findOne({
      userID: request.userID,
    });
    if (existsWallet) {
      if (existsWallet.currencyID === request.purchaseUnit) {
        let amount =
          parseFloat(existsWallet.amount) + parseFloat(request.amount);
        const wallet = await Wallet.findOneAndUpdate(
          {
            _id: existsWallet.id,
          },
          {
            amount: amount,
          }
        );

        return res.status(200).send({
          message: "Recharge success!!!!",
          wallet,
        });
      }
    }

    const wallet = await Wallet.create({
      userID: request.userID,
      currencyID: request.purchaseUnit,
      amount: request.amount,
    });

    return res.status(200).send({
      message: "Recharge success!!",
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
  allUsers,
  editUser,
  deleteUser,
  getAllOrders,
  responseOrders,
  // editOrder,
  // deleteOrder,
  responseWallet,
};

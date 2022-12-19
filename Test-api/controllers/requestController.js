const User = require("../models/User");
const Order = require("../models/order");
const Wallet = require("../models/wallet");
const Request = require("../models/request");
const { request } = require("gaxios");

//send request recharge
const getRequest = async (req, res) => {
  try {
    const requestType = req.query.requestType;

    let user = await User.findOne({
      // _id: req.params.id,
      email: req.parmas.email,
    });

    if (!user) {
      return res.status(400).send({
        message: "Invalid link",
      });
    }
    console.log(requestType);

    if (requestType !== "P2P") {
      //admin get all request
      if (user.role === "admin") {
        const request = await Request.find({
          requestType: requestType,
        });

        return res.status(200).send({
          request,
        });
      }
      const request = await Request.find({
        userID: user.id,
        requestType: requestType,
      });

      return res.status(200).send({
        request,
      });
    }

    const request = await Request.find({
      requestType: requestType,
    });

    return res.status(200).send({
      request,
    });
  } catch (err) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const requestSpot = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      res.status(400).send({
        message: "Invalid link",
      });
    }

    const {
      requestType,
      type,
      firstUnit,
      secondUnit,
      amount,
      total,
      senderAddress,
      recieverAddress,
    } = req.body;

    if (!req.body) {
      res.status(401).send({
        message: "missing something",
      });
    }

    const request = await request.create({
      requestType,
      type,
      firstUnit,
      secondUnit,
      amount,
      total,
      senderAddress,
      recieverAddress,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

// const requestP2P

// const requestFunding

// const requestFutures

module.exports = {
  getRequest,
};

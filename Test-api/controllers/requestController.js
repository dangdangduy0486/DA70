const User = require("../models/User");
const Order = require("../models/order");
const Wallet = require("../models/wallet");
const Request = require("../models/request");

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

module.exports = {
  getRequest,
};

require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyUser = async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).send({
      message: "A token is require for authenticcation!!",
    });
  }
  // 'Beaer [token]'
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN, async (err, decoded) => {
    if (err)
      return res.status(403).json({
        message: "Forbidden",
      });
    const email = decoded.UserInfo.email;
    const user = await User.findOne({
      email: decoded.email,
    }).exec();

    if (!user)
      return res.status(401).json({
        message: "Unauthorized",
      });
  });
  return email;
};

module.exports = verifyUser;

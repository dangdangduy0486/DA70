require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = VerifyJWT = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) {
    return res.status(403).send({
      message: "A token is require for authenticcation!!",
    });
  }
  // 'Beaer [token]'
  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    return res.status(403).send({
      message: "A token is require for authenticcation!!",
    });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);

    req.userData = {
      email: decodedToken.email,
      userID: decodedToken.userID,
    };
  } catch (error) {
    res.status(401).send({
      message: "Auth failed!!",
    });
  }
  return next();
};

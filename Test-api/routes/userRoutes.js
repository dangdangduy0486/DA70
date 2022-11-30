const express = require("express");
const {
  forgotPassword,
  resetPasswordRequest,
  resetPassword,
  getUserInfo,
  editUserInfo,
  requestOrder,
  getResquestOrder,
} = require("../controllers/userController");

const router = express.Router();

//forgot password
router.post("/forgot-password", forgotPassword);

//reset password request
router.get("/reset-password/:userID", resetPasswordRequest);

//reset password
router.patch("/reset-password/:userID", resetPassword);

//get user info
router.get("/user-info/:email", getUserInfo);

//update user
router.patch("/update-user-info/:email", editUserInfo);

//send request order
router.post("/create-order/:email", requestOrder);

//get request order
router.get("/get-order/:email", getResquestOrder);

module.exports = router;

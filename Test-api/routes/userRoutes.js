const express = require("express");
const {
  signup,
  verifyEmail,
  login,
  forgotPassword,
  resetPasswordRequest,
  resetPassword,
  getUserInfo,
  editUserInfo
} = require("../controllers/userController");

const router = express.Router();

//signup
router.post("/signup", signup);

//verify
router.get("/verify/:userID/:token", verifyEmail);

//login
router.post("/login", login);

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

module.exports = router;

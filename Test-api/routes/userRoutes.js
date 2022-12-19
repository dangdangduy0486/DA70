const express = require("express");
const router = express.Router();

const {
  forgotPassword,
  resetPasswordRequest,
  resetPassword,
  getUserInfo,
  editUserInfo,
  request,
  requestInfo,
} = require("../controllers/userController");

//forgot password
router.post("/forgot-password", forgotPassword);

//reset password request
router.get("/reset-password/:email", resetPasswordRequest);

//reset password
router.patch("/reset-password/:email", resetPassword);

//get user info
router.get("/user-info/:email", getUserInfo);

//update user
router.patch("/update-user-info/:email", editUserInfo);

//
router.post("/request/:email/:type", request);

//
router.get("/request/:email/:type", requestInfo);

module.exports = router;

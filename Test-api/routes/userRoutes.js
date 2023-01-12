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
  p2pRequest,
  p2pRequestInfo,
  p2pClientRequest,
  p2pOnwerResonse,
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
router.post("/request/:type", request);
// router.post("/request/:email/:type", request);

//
router.get("/request/:email/:type", requestInfo);

//
router.post("/request-p2p/:email", p2pRequest);

//
router.get("/request-p2p/:email/:type", p2pRequestInfo);

//
router.post("/request-p2p/:email/client-request", p2pClientRequest);

//
router.patch("/request-p2p/:email", p2pOnwerResonse);

module.exports = router;
